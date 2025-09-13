#!/usr/bin/env python3
"""
Helper script: fetch captions for a YouTube video id using youtube-transcript-api.
Prints JSON to stdout: {"transcript": "..."} on success, or {"error": "..."} on failure.
Exit code 0 on success, 1 on failure.

Requires: pip install youtube-transcript-api
"""
import sys
import json

def out(obj):
    sys.stdout.write(json.dumps(obj, ensure_ascii=False))

if len(sys.argv) < 2:
    out({"error": "missing_video_id"})
    sys.exit(2)

video_id = sys.argv[1]

try:
    from youtube_transcript_api import YouTubeTranscriptApi
except Exception as e:
    out({"error": f"missing_python_dependency: {e}"})
    sys.exit(1)

try:
    fetched = YouTubeTranscriptApi().fetch(video_id)
    # fetched can be a list of dicts or objects depending on the package version
    texts = []
    for s in fetched:
        text = ''
        try:
            # dict-like
            if hasattr(s, 'get'):
                text = s.get('text', '')
            # object with attribute .text (e.g., FetchedTranscriptSnippet)
            elif hasattr(s, 'text'):
                text = getattr(s, 'text') or ''
            else:
                # try item access
                try:
                    text = s['text']
                except Exception:
                    text = str(s)
        except Exception:
            # fallback to string representation
            text = str(s)
        texts.append(text)

    transcript = "\n".join([t for t in texts if t]).strip()
    if not transcript:
        out({"error": "no_transcript_found", "debug_items": texts[:5]})
        sys.exit(1)
    out({"transcript": transcript})
    sys.exit(0)
except Exception as e:
    out({"error": str(e)})
    sys.exit(1)
