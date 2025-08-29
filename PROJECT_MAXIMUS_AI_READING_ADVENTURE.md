# Project: Maximus's AI Reading Adventure

## Goal
To create an engaging, personalized, and adaptive AI-powered reading and learning tool for Maximus. The tool will foster a love for reading, provide growth-mindset feedback, enhance reading skills, and make complex topics understandable and fun through storytelling.

## Core Features

### 1. Interactive Story Generation & Customization
The AI guides Maximus through a collaborative story creation process, allowing him to actively shape the narrative before content is generated.

*   **1.1. Guided Story Brainstorming (AI-driven Conversation):**
    *   The AI initiates a fun, conversational exchange to help flesh out story ideas using open-ended questions and creative suggestions.
    *   **Gamified Interaction:** Interactions are framed as building an adventure, quest, or mystery together.
    *   **"AI Suggest" / "Magic Wand" Button:** For any story field (Title, Setting, etc.), Maximus can get an AI-generated suggestion that is contextually aware of all other filled-in details.

*   **1.2. Dynamic Story Field Completion:**
    *   An interactive interface presents key story fields (e.g., Character Role, Title, Setting, Plot Twist, Mood).
    *   Maximus can define his role in the story (e.g., Brave Knight, Silly Scientist, Curious Explorer).

*   **1.3. Advanced Image Integration:**
    The application features a robust, multi-faceted image system to provide deep visual inspiration and create a true "picture book" experience.
    *   **Multi-Image Inspiration:** Users can add multiple images to a story prompt. The AI uses all provided images as a collective source of inspiration for characters, settings, and plot points.
    *   **Personal Image Library:**
        *   A dedicated "Image Library" is accessible from the settings menu.
        *   Users can upload and save an unlimited number of personal images (e.g., photos of Maximus, drawings, inspiring pictures).
        *   Each saved image can be given a custom name and description to provide richer context to the AI.
        *   The library is persisted in the browser's local storage for use across sessions.
    *   **Flexible Image Selection:** When creating a story, images can be added by either uploading a new file for one-time use or selecting previously saved images from the personal library.
    *   **Dynamic In-Story Illustrations (The "Picture Book Experience"):**
        *   The AI generates a unique, contextually relevant illustration for **every single paragraph** of the story.
        *   User-provided images serve as a strong visual reference for the AI, ensuring consistency in the appearance of characters and settings throughout the generated illustrations.
        *   This creates a fully-illustrated, page-by-page reading experience, just like a physical picture book.

### 2. Interactive & Customizable Reading Experience

*   **2.1. Read Aloud Functionality & Voice Control:**
    *   Maximus can click on any word, phrase, or paragraph to hear it read aloud.
    *   **Full Voice Customization:** The reading voice can be fully customized. Sliders are available to adjust **Rate (speed)**, **Pitch**, and **Volume**.
    *   **Voice Selection:** Users can choose from a list of available system voices.
    *   **Persistent Settings:** Voice preferences are saved in the browser, so the chosen voice and settings are remembered for future stories.
    *   **Accessible Controls:** Voice controls are available both in the main Settings panel and directly within the story reader for on-the-fly adjustments.
    *   **Stop Playback:** A "Stop" button appears whenever the text-to-speech is active, allowing the user to interrupt the audio at any time.

*   **2.2. Pronunciation Practice & Feedback (Speech-to-Text):**
    *   **Listen & Repeat:** After clicking a word, a modal opens where Maximus can hear the word and then be prompted to repeat it into the microphone.
    *   **Pronunciation Assessment:** The tool uses speech-to-text to evaluate the pronunciation.
    *   **Growth Mindset Feedback:** All feedback is encouraging and constructive (e.g., "Great effort! Let's try that again, focusing on the 's' sound"). The UI displays what the AI heard alongside the correct word.

*   **2.3. Detailed Phonics Explanation:**
    *   **"Why does it sound like that?" Button:** Within the pronunciation modal, a button reveals a detailed, child-friendly explanation of the word's phonetic rules.
    *   **Syllable Breakdown:** Visually breaks the word into syllables (e.g., "ele-phant") and highlights the stressed syllable.
    *   **Phonetic Rules:** Explains concepts like long/short vowels, the silent 'e', and consonant blends with simple examples.

### 3. Adaptive Learning & Progress Tracking

*   **3.1. Grade-Appropriate Content Generation:**
    *   The AI is prompted to generate stories at a reading level appropriate for a young child, with simple vocabulary and sentence structures.

*   **3.2. Performance Tracking (Behind the Scenes):**
    *   The tool tracks words Maximus struggles with, making them available for focused practice.

### 4. Educational Story Transformation from Transcript
This feature transforms complex, non-fiction content (like a YouTube video transcript) into an original, child-friendly educational story.

*   **4.1. User Workflow:**
    1.  The user pastes a block of text into an input field.
    2.  The user can optionally add reference images from their library or a new upload.
    3.  The user clicks a "Create Learning Story" button.

*   **4.2. AI Processing Logic:**
    1.  **Concept Extraction:** The AI analyzes the transcript to identify key concepts and lessons.
    2.  **Analogy Generation:** It creates a relatable analogy for the core concepts (e.g., transforming "Prompt Engineering" into "How to Give a Robot the Perfect Secret Instructions").
    3.  **Narrative Construction:** The AI weaves a complete, illustrated story around this analogy, embedding the lessons into the plot and dialogue.

*   **4.3. Full Feature Integration:**
    Once generated, the educational story is a fully interactive picture book with all features, including read-aloud, voice controls, pronunciation practice, and unique images for every paragraph.

## Key Architectural Improvements

### Upfront Storybook Generation for a Seamless Experience
To provide a smooth and error-free reading experience, the application was re-architected to generate the entire storybook at once.

*   **The Problem:** The initial version generated images page-by-page. This could lead to API rate-limit errors if a user flipped through pages too quickly, and also introduced loading time on every page turn.
*   **The Solution:** When a user clicks "Write My Story," the application now performs a single, comprehensive request to the AI. The AI generates the entire story text, all corresponding image prompts, and the cover art prompt. The application then makes all image generation requests in parallel.
*   **The Benefit:** The user sees a single loading screen while the entire book is created. Once loaded, the reading experience is instantaneous and seamless. Every page and every illustration is ready immediately, eliminating errors and creating a fluid, uninterrupted adventure.

## Recommended Technical Approach

*   **Platform:** Web Application (React with TypeScript, HTML/CSS).
*   **AI Integration:** Google Gemini API (`@google/genai`) for text generation (`gemini-2.5-flash`) and image generation (`imagen-4.0-generate-001`).
*   **Speech I/O:** Browser-native Web Speech API for both Text-to-Speech (`SpeechSynthesis`) and Speech-to-Text (`SpeechRecognition`).
*   **User Data Storage:** Browser Local Storage is used to save the story history, the personal image library, and user voice preferences.
