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
