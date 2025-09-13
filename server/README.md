Caption-only proxy for the Maximus Flashcards app

This Express server accepts POST /transcribe { url } and performs a captions-first flow:
  - If the URL is a YouTube video and captions (automatic or uploaded) exist, the server returns them.
  - If no captions are available, the server will NOT attempt audio download or cloud transcription.

This repository includes a Python helper `get_captions.py` which uses the `youtube-transcript-api` package to fetch YouTube captions.

Prerequisites (Windows):
 - Node.js and npm
 - Python 3 on PATH
 - Install the Python dependency for the caption helper:

```powershell
pip install youtube-transcript-api
```

Quick start (from repository root):

```powershell
cd server
npm install
npm start
# Server listens on http://localhost:3000
```

Example request (from the app or curl):

```powershell
curl -X POST http://localhost:3000/transcribe -H "Content-Type: application/json" -d '{"url":"https://www.youtube.com/watch?v=VIDEO_ID"}'
```

Notes:
 - This server intentionally does not use any cloud transcription service. OpenAI or other audio transcription fallbacks are disabled by design to avoid cloud costs.
 - If you need audio transcription in the future, consider adding a separate, secured service behind this proxy.
