# COMMERCIALIZE APP TODO

Purpose: prioritized, dependency-aware roadmap for turning this flashcard app into a commercial mobile product (App Store / Google Play). Name chosen so `COMMERCIALIZE_APP_TODO.md` is easy to find.

## Quick checklist
- [ ] Provide an ordered feature list that builds foundational pieces first
- [ ] Mark dependencies and estimated complexity (S/M/L)
- [ ] Include short 6–12 week execution roadmap

## Implementation order (foundational first)
1. Project packaging & mobile baseline (PWA + Capacitor)
   - Why: fastest path to store packaging and native plugins.
   - Complexity: M
   - Depends on: none

2. Robust local DB + offline-first sync design (IndexedDB + sync model)
   - Why: offline resilience, foundation for sync/backup.
   - Complexity: M
   - Depends on: #1 for mobile behavior

3. Authentication & cloud backup/sync (email/Google/Firebase Auth + Firestore or custom API)
   - Why: cross-device persistence and required for subscriptions and push.
   - Complexity: M–L
   - Depends on: #2

4. App manifest, permissions, and privacy (privacy policy + consent flows)
   - Why: required for app-store review and legal compliance.
   - Complexity: S
   - Depends on: #1, #3 for data-handling text

5. Crash reporting + analytics (Sentry / Firebase + GA4)
   - Why: telemetry for iteration and beta testing.
   - Complexity: S
   - Depends on: #1

6. Polished onboarding + first-run tutorial + sample deck
   - Why: improves conversion and retention.
   - Complexity: M
   - Depends on: #2, #3

7. Background audio & microphone permissions flow
   - Why: TTS & voice-chat need robust mobile permission handling.
   - Complexity: S–M
   - Depends on: #1, #4

8. Push notifications & smart reminders (FCM / APNs)
   - Why: retention via study reminders.
   - Complexity: M
   - Depends on: #3, #4

9. Cloud-based AI service integration (server-side LLM calls)
   - Why: higher quality feedback and cost control; hide API keys.
   - Complexity: L
   - Depends on: #3, server infra

10. Subscriptions & in-app purchases (App Store / Play Billing)
    - Why: primary monetization channel.
    - Complexity: M–L
    - Depends on: #3, #9 (if premium includes server AI)

11. Intelligent scheduler & analytics dashboard
    - Why: product differentiation and retention.
    - Complexity: L
    - Depends on: #2, #3, #5

12. Multi-modal card creation (OCR, audio import, clipper)
    - Why: simpler content creation and premium add-on.
    - Complexity: M–L
    - Depends on: #9 for server processing

13. Native polish (haptics, platform UI; consider native port)
    - Why: better UX and store acceptance.
    - Complexity: M–L
    - Depends on: #1 results

14. Social / marketplace features (deck sharing, curated templates)
    - Why: virality and secondary revenue.
    - Complexity: L
    - Depends on: #3, moderation infra

15. Gamification: streaks, achievements, leaderboards
    - Why: boost engagement.
    - Complexity: M
    - Depends on: #2, #8

16. Advanced personalization & ML tuning
    - Why: retention and premium differentiation.
    - Complexity: L
    - Depends on: #11

17. Exports / integrations (Anki/CSV/LMS)
    - Why: trust and portability.
    - Complexity: S–M
    - Depends on: #2

## Minimal launch bundle (MVP for app stores)
- #1 (PWA/Capacitor), #2 (local DB), #6 (onboarding), #5 (analytics), #4 (privacy), #7 (permissions)
- Optional but highly recommended: #3 (auth & cloud backup)

## 6–12 week execution roadmap (practical)
- Weeks 1–2: #1 (packaging) + #4 (manifest & privacy) + #5 (analytics)
- Weeks 3–6: #2 (DB), #6 (onboarding), UX polish
- Weeks 7–10: #3 (auth & cloud), #7 (audio/mic), #8 (push)
- Weeks 11–12+: #9 (server AI) + #10 (subscriptions) + public beta

## Minimal paid feature set to monetize at launch
- Cloud sync & backup
- Unlimited deck import/export
- Premium voices & advanced AI feedback
- Offer a 7–14 day free trial

## Next-step options (pick one to start)
- Scaffold PWA + Capacitor mobile packaging (manifest, service worker, basic Capacitor config)
- Scaffold Authentication + basic cloud backup (Firebase starter) and schema
- Create GitHub issue list (tickets + estimated hours) from this roadmap

---
Saved: `COMMERCIALIZE_APP_TODO.md` — ask for "commercialize" or the filename to find it quickly.
