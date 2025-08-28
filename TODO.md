# TODO / Task List

This file tracks planned features, improvements, and bugs for the Prompt Engineering Learning Lab. Update this list as you add or complete tasks.

## Planned Tasks
- [ ] Add password protection for private access
- [ ] Modularize JavaScript and CSS files
- [ ] Improve mobile responsiveness
- [ ] Add user authentication (optional)
- [ ] Create backend proxy for AI API calls (to avoid CORS issues)
- [ ] Add export/import for flashcards
- [ ] Write tests for core features
- [ ] Add more subjects and flashcard templates

## User-requested feature roadmap (saved)
The list below captures the features you asked for, ordered by logical implementation sequence (each item has acceptance criteria, dependencies, and next steps). We'll use this as the canonical plan to iterate from.

1) Import / Export & Automatic Backup (CSV first, Anki .apkg optional)
	 - Why: Enables backups, transfers, and export to other SRS systems.
	 - Acceptance criteria:
		 - Export to CSV (cards with id, front, back, tags/category, nextReview, ease/repetitions) works and downloads a file.
		 - Import CSV recreates cards (with simple conflict resolution option: skip/merge/overwrite).
		 - Automatic export (CSV) runs at the end of every study session and stores the file locally and attempts a cloud sync (see below).
		 - Optional: .apkg export/import available via server-side helper or JS library (deferred if needed).
	 - Dependencies: none for CSV; .apkg requires a library or server helper.
	 - Estimated effort: small → CSV (2–4 hrs), .apkg (medium → 1–2 days or backend helper).
	 - Next steps: implement CSV export/import API in the SPA; add a toggle to auto-backup at session end.

2) Cloud Sync / Backup (Google Drive minimum)
	 - Why: Keep backups off-device and support cross-device sync/backups.
	 - Acceptance criteria:
		 - At least one automatic cloud backup (Google Drive) successfully runs at end of session when enabled.
		 - Manual "Backup now" and "Restore from cloud" controls exist.
	 - Dependencies: Google OAuth client ID & Drive API usage (frontend-only OAuth flow possible but better with a light backend for refresh tokens). For an MVP we can use client-side OAuth (Drive file create/overwrite) and store token in browser session/localStorage.
	 - Estimated effort: medium → 1–2 days for frontend-only flow; longer with secure backend.
	 - Next steps: implement CSV auto-backup to Google Drive using OAuth2 flow and store a Drive file id in localStorage.

3) Default pacing schedule presets + "Apply to all" + Per-category pacing
	 - Why: Quickly set study pacing globally or per-category.
	 - Acceptance criteria:
		 - UI for presets (e.g., Conservative, Balanced, Aggressive) and a quick "Apply to all categories" button.
		 - Per-category schedule UI (in Manage Categories) that overrides global presets.
		 - Study queue builder respects those limits and pacing values.
	 - Dependencies: Category settings already exist (new/review caps); extend schema to store pacing presets (interval multipliers, initial intervals, ease defaults).
	 - Estimated effort: small→medium (4–8 hrs).
	 - Next steps: design small data model for pacing presets, add UI, wire into queue construction and calculateNextReview logic.

4) Card review filters (only new, only hard, only flagged)
	 - Why: Focused study sessions for specific goals.
	 - Acceptance criteria:
		 - Filters available when starting a session and combinable (e.g., only hard & only flagged).
		 - Filtered sessions show counts and respect per-category caps/pacing.
	 - Dependencies: need flagging UI + difficulty metadata (already present).
	 - Estimated effort: small (3–6 hrs).
	 - Next steps: add filter UI, implement filter logic in getFlashcardsDueForReview/startCategoryReview.

5) Session analytics: daily/weekly counts, retention rate, hardest cards
	 - Why: Track progress and surface weak cards.
	 - Acceptance criteria:
		 - Dashboard shows daily and weekly study counts, retention rate (% of correct / quality-based), and a list of top N hardest cards (by wrong/low-quality history).
		 - Data stored in `studySessions` store and aggregated efficiently.
	 - Dependencies: study session recording is already present; add counters/aggregation and a small charting lib (optional).
	 - Estimated effort: medium (1–2 days).
	 - Next steps: implement aggregated queries over `studySessions`, add small UI cards and export option.

6) Card-level audio (TTS) + optional recording for pronunciation
	 - Why: Add listening and pronunciation practice.
	 - Acceptance criteria:
		 - Front/back TTS playback using browser SpeechSynthesis API (works offline in browser without external keys).
		 - Optional record button to capture user's voice and attach a short recording to the card (stored in IndexedDB as blob URL or base64).
	 - Dependencies: none (browser APIs available). For higher-quality TTS, optional AI APIs or device TTS engines could be used.
	 - Estimated effort: small (4–8 hrs).
	 - Next steps: add play/record buttons on card UI, store audio blob in flashcard object, enable playback in All-Cards view.

7) Voice chat for Stage 2 (AI-guided spoken recall / hints)
	 - Why: Let the AI act as a spoken partner that helps recall and offers hints.
	 - Acceptance criteria:
		 - During Active Recall, user can speak answer; the AI returns a spoken hint/feedback (text + TTS). If mic unavailable, fallback to text.
		 - AI attempts to prompt recall first (e.g., Socratic hints) before revealing answers.
	 - Dependencies: microphone access, Web Speech API (SpeechRecognition) for client-side speech-to-text (limited support), or a server-side STT for better accuracy; LLM backend or client-side LLM for generating hints.
	 - Risks/Notes: Browser speech recognition is inconsistent across platforms (Safari/iOS limitations). For reliable cross-device behavior, plan a small backend STT/LLM proxy.
	 - Estimated effort: medium→large (2–5 days depending on STT/LLM choices).
	 - Next steps: prototype client-side flow using Web Speech API + LLM hint generation; fall back to text where unsupported.

8) Reminders / notifications (local push, daily email)
	 - Why: Bring users back and enforce daily practice.
	 - Acceptance criteria:
		 - Local push notifications using the Notifications API and optionally the Service Worker (requires HTTPS / PWA packaging).
		 - Optional daily email reminders via backend (deferred unless you want to self-host/email service).
	 - Dependencies: PWA setup for push; backend for email scheduling.
	 - Estimated effort: small→medium (PWA push ~1–2 days; email requires backend integration).
	 - Next steps: add PWA manifest, service worker stub, and local notification toggle; defer email until a backend is available.

9) Lightweight gamification: points, streaks, badges
	 - Why: Increase motivation and retention.
	 - Acceptance criteria:
		 - Points awarded per studied correct card, streak counter for consecutive days, simple badges (e.g., 7-day streak, 100 cards studied).
		 - Small UI to show current points and badges; persistent in IndexedDB/localStorage.
	 - Dependencies: studySessions tracking already exists; wire points calculation and badge rules.
	 - Estimated effort: small (4–8 hrs).
	 - Next steps: propose a minimal points/streak system and add a "Achievements" panel.

10) Mobile-friendly UI tweaks & keyboard shortcuts
	 - Why: Improve review speed on iPad and phones.
	 - Acceptance criteria:
		 - Responsive layouts for iPad/phone, larger touch targets, and optional compact review mode.
		 - Keyboard shortcuts for desktop (space=flip, 1/2/3 rating, n=next, p=previous).
	 - Dependencies: front-end CSS (Tailwind already present) and accessibility testing.
	 - Estimated effort: small (1–2 days for polish).
	 - Next steps: add compact mode and a keyboard shortcuts help overlay; test on iPad.

11) Turn the web app into a mobile app (PWA → wrapper / native)
	 - Why: Native-like install, background sync, push notifications, and App Store distribution if desired.
	 - Acceptance criteria:
		 - App installable as a PWA with offline capabilities and the key features working offline (study, TTS, local DB).
		 - Optionally build native wrappers (Capacitor/Expo) for App Store packaging.
	 - Dependencies: PWA support (Service Worker), possible native wrapper tooling.
	 - Estimated effort: medium→large (several days to a week depending on platform packaging).
	 - Next steps: add PWA manifest and service worker, validate offline behavior, then prototype a native wrapper.

Notes, assumptions and alternatives
- CSV export/import is the fastest and most interoperable backup path; .apkg is powerful but requires extra tooling—I recommend implementing CSV first and providing an "Export for Anki" option later (either via a small server-side generator or a JS library).
- Google Drive client-side OAuth is feasible for an MVP but storing long-lived refresh tokens securely requires a backend—acceptable trade-offs should be documented.
- Any feature that requires reliable STT or higher-quality LLM audio should be prototyped with client-side browser APIs first and moved to a backend if reliability/accuracy is insufficient.

How we'll work incrementally
- I'll add the above roadmap to this file (done). Pick the first item you'd like me to implement (I recommend: CSV import/export + auto-backup to Drive), and I'll implement it, add UI, tests, and then run/build checks.


## Completed Tasks
- [x] Create initial app and README
- [x] Set up .gitignore
- [x] Create TODO.md for task tracking

## Bugs / Issues
- [ ] CORS errors when calling some AI APIs directly from browser

---
Add new tasks above as needed. Mark tasks as completed by changing [ ] to [x].

## Implemented features (current)

The following features and engineering changes have been implemented in the SPA (`index.html`) during recent work. Keep this list for quick reference.

- Central Settings modal for AI Tone, Humor, and global TTS voice/rate/pitch.
- Play-sample TTS preview and voice-list priming & retries.
- Shared speech recognition routed to modal and inline chats with listening indicator and auto-send of final transcripts.
- Stop controls (cancel TTS & STT, suppress auto-restart).
- Enter-to-send behaviour for AI chat inputs (Enter sends, Shift+Enter newline).
- Configurable verbose escalation (`aiVerboseAfter`, default 5) with per-conversation counting and session-level VERBOSE_MODE injection.
- inferVideoTopic(transcript) used to create "Video about <topic>" context for flashcard prompts.
- TTS priming helper (`primeTTSOnFirstGesture`) and voice-loading helper (`ensureVoicesLoaded`).
- Conversation helper fields exposed for STT/TTS: `_chatHistory`, `_contextText`, `_userMessageCount`, `_suppressAutoRestart`, `_lastUtterance` and helpers `startSharedRecognitionForConversation()` / `stopAiSpeechForConversation()`.

Notes:
- Verbose-mode visible badge and persistence across reloads are planned but not implemented yet.
- Voice enumeration behavior may still vary across browsers; test and report any issues.
