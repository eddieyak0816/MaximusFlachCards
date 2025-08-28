# Prompt Engineering Learning Lab

Prompt Engineering Learning Lab is a web-based flashcard app designed to help users learn prompt engineering and other subjects by creating smart, personalized flashcards from YouTube videos and transcripts. The app uses AI (Google Gemini, OpenAI, Anthropic) to analyze video content and generate educational flashcards, supporting active recall and spaced repetition for effective learning.

## Features
- Video Input: Paste a YouTube URL or transcript to start learning from any video.
- AI Integration: Add your own API keys for Google Gemini, OpenAI, or Anthropic to enable real AI-powered flashcard generation. If no keys are provided, the app uses pattern matching to create flashcards.
- Active Recall: Answer targeted questions to reinforce memory before seeing the flashcards.
- Prompt Engineering: The app analyzes your transcript and creates specific, engaging flashcards using AI or pattern matching.
- Flashcard Study: Study with spaced repetition; cards you struggle with appear more often to improve retention.
- Dashboard: Track your total cards, cards due today, and cards studied today.
- Local Storage: All data is stored locally in your browser using IndexedDB. API keys are never sent to any server.

## How It Works
1. Paste a YouTube URL or transcript.
2. (Optional) Setup AI: Enter your API keys for Gemini, OpenAI, or Anthropic for advanced flashcard generation.
3. Start Active Recall: Answer questions about the video to reinforce learning.
4. Generate Flashcards: The app uses AI or pattern matching to create flashcards from your content.
5. Study: Use the flashcard interface to study, rate your recall, and benefit from spaced repetition.
6. Review Dashboard: Track your progress and review cards due for study.

## Privacy & Security
- API keys are stored locally in your browser and only sent to the respective AI services for flashcard generation.
- No data is sent to any external server except for AI API calls (if keys are provided).
- All flashcards and study data remain private on your device.

## Getting Started
1. Open `index.html` in your browser.
2. Follow the on-screen instructions to begin learning.
3. (Optional) Add your AI API keys for enhanced flashcard generation.

## Requirements
- Modern web browser (Chrome, Edge, Firefox, Safari)
- Internet connection (for AI API calls and YouTube data)

## License
This project is for educational and personal use. See LICENSE for details.

## Recent updates (implemented)

The following UX and engineering changes have been implemented in the single-file SPA (`index.html`) and are available in the app now. This list is intended as a short reference for contributors and to help when debugging or adding related features.

- Centralized Settings modal for AI Tone, Humor, and global TTS voice/rate/pitch (replaces per-card voice selectors).
- Play-sample TTS preview button and improved voice enumeration (priming + retries / onvoiceschanged handling).
- Shared speech recognition: a single recognizer routed to modal and inline chats, with a live listening indicator and automatic sending of final transcripts.
- Stop controls that cancel active TTS and STT and suppress automatic microphone restart until the user restarts it.
- Enter-to-send keyboard behaviour for AI chat inputs (Enter = send, Shift+Enter = newline).
- Configurable escalation to verbose/detailed AI responses after N user messages (setting `aiVerboseAfter`, default 5) with per-conversation message counting.
- Injection of a session-level "VERBOSE_MODE" system instruction into conversations when the escalation threshold is reached (conversation-level `_verboseMode` flag).
- AI prompt improvement: the app now infers a short "Video about <topic>" string from the transcript (via `inferVideoTopic`) and uses that in flashcard generation instead of raw video titles.
- TTS priming helper (`primeTTSOnFirstGesture`) and `ensureVoicesLoaded()` helper to improve cross-browser voice availability.
- Conversation helper fields and helpers added for STT/TTS and escalation: conversations expose `_chatHistory`, `_contextText`, `_userMessageCount`, `_suppressAutoRestart`, and `_lastUtterance`, plus `startSharedRecognitionForConversation()` and `stopAiSpeechForConversation()`.
Note: Some voice enumeration behavior is browser-dependent; priming and retries improve reliability but may still require user interaction in certain environments. Verbose-mode persistence across page reloads and a visible "Detailed answers ON" badge are discussed but not yet implemented (see TODO.md).
