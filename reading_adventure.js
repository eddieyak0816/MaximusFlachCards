// reading_adventure.js
// Minimal Reading Adventure scaffold. All feature code for the Reading Adventure goes in this file.
(function(){
    // Expose the function globally so inline onclick handlers work
    window.openReadingAdventure = function() {
        // If modal already exists, bring into view
        try {
            const existing = document.getElementById('readingAdventureModal');
            if (existing) {
                existing.style.display = 'flex';
                return;
            }

            // Create a full-page reading adventure view and hide the main app container
            const existingPage = document.getElementById('readingAdventurePage');
            const mainContainer = document.querySelector('.container');
            if (existingPage) {
                // show existing page and hide main container
                if (mainContainer) mainContainer.style.display = 'none';
                existingPage.style.display = 'block';
            } else {
                const page = document.createElement('div');
                page.id = 'readingAdventurePage';
                page.style.width = '100%';
                page.style.minHeight = '100vh';
                page.style.boxSizing = 'border-box';
                page.style.padding = '24px';
                page.style.background = 'white';
                page.style.overflowY = 'auto';
                page.style.zIndex = '11000';

                page.innerHTML = `
                    <div style="max-width:980px;margin:0 auto;">
                        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                            <h2 style="margin:0;font-size:1.5rem;">Maximus's AI Reading Adventure</h2>
                            <div>
                                <button id="readingCloseBtn" style="background:#ef4444;color:#fff;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;">← Back</button>
                            </div>
                        </div>
                        <div style="margin-bottom:12px;color:#374151;">
                            <p style="margin:0 0 8px 0;">Create a fun story based on the video or transcript you just studied. This area is full-page for better visibility. All code lives in <code>reading_adventure.js</code>.</p>
                        </div>

                        <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
                            <input id="raTitle" placeholder="Story title (optional)" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;" />
                            <select id="raRole" style="padding:8px;border:1px solid #ddd;border-radius:6px;">
                                <option value="Curious Explorer">Curious Explorer</option>
                                <option value="Brave Knight">Brave Knight</option>
                                <option value="Silly Scientist">Silly Scientist</option>
                                <option value="Space Pilot">Space Pilot</option>
                            </select>
                            <button id="raSuggest" style="background:#10b981;color:#fff;border:none;padding:8px 10px;border-radius:6px;cursor:pointer;">AI Suggest</button>
                        </div>

                        <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
                            <input id="raSetting" placeholder="Setting (where the story takes place)" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;" />
                            <button id="raSuggestSetting" data-field="setting" style="background:#10b981;color:#fff;border:none;padding:8px 10px;border-radius:6px;cursor:pointer;">AI Suggest</button>
                        </div>

                        <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
                            <input id="raPlot" placeholder="Plot twist or challenge (optional)" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;" />
                            <button id="raSuggestPlot" data-field="plot" style="background:#10b981;color:#fff;border:none;padding:8px 10px;border-radius:6px;cursor:pointer;">AI Suggest</button>
                        </div>

                        <div style="display:flex;gap:8px;margin-bottom:10px;flex-wrap:wrap;">
                            <select id="raMood" style="padding:8px;border:1px solid #ddd;border-radius:6px;">
                                <option value="whimsical">Whimsical</option>
                                <option value="adventurous">Adventurous</option>
                                <option value="calm">Calm</option>
                                <option value="mysterious">Mysterious</option>
                            </select>
                            <button id="raSuggestMood" data-field="mood" style="background:#10b981;color:#fff;border:none;padding:8px 10px;border-radius:6px;cursor:pointer;">AI Suggest</button>
                            <button id="raBrainstorm" style="background:#f59e0b;color:#fff;border:none;padding:8px 10px;border-radius:6px;cursor:pointer;">Start Brainstorm</button>
                        </div>

                    <div style="margin-bottom:12px;">
                        <label style="font-weight:500;">Paste a short transcript or notes here (optional)</label>
                        <div style="font-size:12px;color:#6b7280;margin-bottom:4px;">The AI will analyze this content and incorporate key concepts into your story</div>
                        <textarea id="raTranscript" placeholder="Paste your study material, video transcript, or notes here..." style="width:100%;height:140px;padding:8px;border:1px solid #ddd;border-radius:6px;"></textarea>
                    </div>                        <div style="display:flex;gap:8px;justify-content:flex-end;margin-bottom:12px;">
                            <button id="raGenerate" style="background:#2563eb;color:#fff;border:none;padding:10px 14px;border-radius:8px;cursor:pointer;">Write My Story</button>
                        </div>

                        <div id="raOutput" style="margin-top:14px;display:none;">
                            <hr style="border:none;border-top:1px solid #eee;margin:12px 0;" />
                            <div id="raPages" style="max-height:60vh;overflow:auto;padding:6px;">
                            </div>
                        </div>
                    </div>
                `;

                // Hide main container and append page
                if (mainContainer) mainContainer.style.display = 'none';
                document.body.appendChild(page);

                // Wire back button
                document.getElementById('readingCloseBtn').onclick = () => {
                    // remove the page and restore main UI
                    const pg = document.getElementById('readingAdventurePage');
                    if (pg) pg.style.display = 'none';
                    if (mainContainer) mainContainer.style.display = '';
                };
            }

            document.getElementById('raSuggest').onclick = () => suggestForField('title');

            // per-field AI Suggest handlers
            const suggestSamples = {
                title: [
                    'Maximus and the Moonlit Map',
                    'The Little Prompt that Could',
                    'Maximus and the Robot Garden',
                    'The Secret Instructions Adventure'
                ]
            };

            async function suggestForField(field) {
                const current = {
                    title: (document.getElementById('raTitle')||{}).value || '',
                    role: (document.getElementById('raRole')||{}).value || '',
                    setting: (document.getElementById('raSetting')||{}).value || '',
                    plot: (document.getElementById('raPlot')||{}).value || '',
                    mood: (document.getElementById('raMood')||{}).value || '',
                    transcript: (document.getElementById('raTranscript')||{}).value || ''
                };

                if (!current.transcript && field === 'title') {
                    const arr = suggestSamples.title;
                    const t = arr[Math.floor(Math.random()*arr.length)];
                    document.getElementById('raTitle').value = t;
                    return;
                }

                const humanField = field === 'plot' ? 'plot twist or challenge' : field;
                const prompt = `You are a creative assistant for writing short children's stories. Provide a single concise ${humanField} suggestion based on the following partial story details:\n\nTitle: ${current.title}\nRole: ${current.role}\nSetting: ${current.setting}\nMood: ${current.mood}\nTranscript/Notes: ${current.transcript.slice(0,600)}\n\nReturn only the suggested text (no explanation).`;

                const res = await generateStoryViaProviders(prompt);
                if (res && res.success && res.text) {
                    const suggestion = (res.text || '').trim().split('\n').filter(Boolean)[0] || res.text.trim();
                    try {
                        if (field === 'title') document.getElementById('raTitle').value = suggestion;
                        if (field === 'role') document.getElementById('raRole').value = suggestion;
                        if (field === 'setting') document.getElementById('raSetting').value = suggestion;
                        if (field === 'plot') document.getElementById('raPlot').value = suggestion;
                        if (field === 'mood') document.getElementById('raMood').value = suggestion;
                    } catch (e) { console.warn('Apply suggestion failed', e); }
                } else {
                    if (field === 'title') {
                        const arr = suggestSamples.title;
                        document.getElementById('raTitle').value = arr[Math.floor(Math.random()*arr.length)];
                    } else {
                        const fallback = field === 'mood' ? 'whimsical' : 'A small, friendly idea to spark the story.';
                        try { document.getElementById(field === 'plot' ? 'raPlot' : (field === 'mood' ? 'raMood' : 'raSetting')).value = fallback; } catch(e){}
                    }
                }
            }

            document.getElementById('raSuggestSetting').onclick = () => suggestForField('setting');
            document.getElementById('raSuggestPlot').onclick = () => suggestForField('plot');
            document.getElementById('raSuggestMood').onclick = () => suggestForField('mood');

            // Guided brainstorming: simple chat UI with multi-turn suggestions
            document.getElementById('raBrainstorm').onclick = () => startGuidedBrainstorm();

            function startGuidedBrainstorm() {
                if (document.getElementById('raBrainModal')) return;

                const modal = document.createElement('div');
                modal.id = 'raBrainModal';
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100vw';
                modal.style.height = '100vh';
                modal.style.background = 'rgba(0,0,0,0.6)';
                modal.style.zIndex = '12000';
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';

                const box = document.createElement('div');
                box.style.width = 'min(900px,94vw)';
                box.style.maxHeight = '86vh';
                box.style.overflow = 'hidden';
                box.style.background = '#fff';
                box.style.borderRadius = '12px';
                box.style.boxSizing = 'border-box';
                box.style.padding = '12px';

                box.innerHTML = `
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                        <h3 style="margin:0;">Guided Story Brainstorm</h3>
                        <button id="raBrainClose" style="background:#ef4444;color:#fff;border:none;padding:6px 10px;border-radius:8px;cursor:pointer;">Close</button>
                    </div>
                    <div id="raBrainContent" style="height:58vh;overflow:auto;padding:8px;border:1px solid #eee;border-radius:8px;background:#fafafa;"></div>
                    <div style="display:flex;gap:8px;margin-top:8px;">
                        <input id="raBrainInput" placeholder="Type your reply or ask the AI a question" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;" />
                        <button id="raBrainSend" style="background:#2563eb;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;">Send</button>
                        <button id="raBrainAskAI" style="background:#10b981;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;">Ask AI</button>
                    </div>
                `;

                modal.appendChild(box);
                document.body.appendChild(modal);

                document.getElementById('raBrainClose').onclick = () => { modal.remove(); };

                const content = document.getElementById('raBrainContent');

                function appendMessage(who, text) {
                    const d = document.createElement('div');
                    d.style.marginBottom = '8px';
                    d.innerHTML = `<div style="font-size:12px;color:#6b7280;margin-bottom:4px;">${who}</div><div style="background:${who==='AI'?'#eef2ff':'#fff'};padding:8px;border-radius:8px;border:1px solid #eee;">${escapeHtml(text)}</div>`;
                    content.appendChild(d);
                    content.scrollTop = content.scrollHeight;
                }

                const transcript = (document.getElementById('raTranscript')||{}).value || '';
                const initialMsg = transcript.trim() ?
                    `Let me help you brainstorm a story based on what you've been studying! What kind of adventure would Maximus like that incorporates the concepts from your transcript? (e.g. explore a forest, travel to space, build a robot)` :
                    'Let me ask: What kind of adventure would Maximus like today? (e.g. explore a forest, travel to space, build a robot)';

                appendMessage('AI', initialMsg);

                document.getElementById('raBrainSend').onclick = () => {
                    const val = (document.getElementById('raBrainInput')||{}).value || '';
                    if (!val.trim()) return;
                    appendMessage('You', val.trim());
                    document.getElementById('raBrainInput').value = '';
                };

                document.getElementById('raBrainAskAI').onclick = async () => {
                    const q = (document.getElementById('raBrainInput')||{}).value || '';
                    const lastUser = q.trim() || 'Please suggest a fun story starter or a follow-up question to help build the story.';
                    appendMessage('You', lastUser);

                    const current = {
                        title: (document.getElementById('raTitle')||{}).value || '',
                        role: (document.getElementById('raRole')||{}).value || '',
                        setting: (document.getElementById('raSetting')||{}).value || '',
                        plot: (document.getElementById('raPlot')||{}).value || '',
                        mood: (document.getElementById('raMood')||{}).value || '',
                        transcript: (document.getElementById('raTranscript')||{}).value || ''
                    };

                    const prompt = `You are a creative brainstorming assistant for short children's stories. Use the details below to respond helpfully and positively. IMPORTANT: Pay special attention to the transcript/notes and suggest story ideas that incorporate and build upon the key concepts, themes, and educational content from the material studied.

Details:
Title: ${current.title}
Role: ${current.role}
Setting: ${current.setting}
Mood: ${current.mood}
Transcript/Notes: ${current.transcript.slice(0,600)}

User message: ${lastUser}

Respond in one or two short sentences or ask a single follow-up question to continue brainstorming. When suggesting story elements, try to weave in concepts from the transcript where appropriate.`;

                    appendMessage('AI', 'Thinking...');
                    try {
                        const res = await generateStoryViaProviders(prompt);
                        const aiText = (res && res.success && res.text) ? res.text.trim() : 'I have a fun idea: what if Maximus finds a tiny glowing map that only he can read?';
                        content.lastChild.remove();
                        appendMessage('AI', aiText);
                    } catch (e) {
                        content.lastChild.remove();
                        appendMessage('AI', 'Hmm, I had trouble connecting to the AI — try again or use the sample idea: explore a friendly robot garden.');
                    }
                    document.getElementById('raBrainInput').value = '';
                };
            }

            document.getElementById('raGenerate').onclick = async () => {
                const title = document.getElementById('raTitle').value.trim() || 'An Adventure for Maximus';
                const role = document.getElementById('raRole').value;
                const setting = document.getElementById('raSetting').value || '';
                const plot = document.getElementById('raPlot').value || '';
                const mood = document.getElementById('raMood').value || '';
                const transcript = document.getElementById('raTranscript').value.trim();

                // Show loading
                const outDiv = document.getElementById('raOutput');
                const pages = document.getElementById('raPages');
                pages.innerHTML = '<div style="color:#6b7280;">Generating story (local demo)...</div>';
                outDiv.style.display = 'block';

                // Build story prompt
                const storyPrompt = buildStoryPrompt({ title, role, setting, plot, mood, transcript });

                // Try providers in order: Gemini -> OpenAI -> Claude
                const storyResult = await generateStoryViaProviders(storyPrompt);
                let paragraphs = [];
                if (storyResult && storyResult.success && storyResult.text) {
                    // naive split into paragraphs by double-newline or sentences
                    paragraphs = storyResult.text.split(/\n\n+/).filter(Boolean);
                    if (paragraphs.length === 0) paragraphs = [storyResult.text];
                } else {
                    // Fallback local text if all providers fail - try to incorporate transcript details
                    await new Promise(r => setTimeout(r, 300));
                    if (transcript && transcript.trim()) {
                        // Extract key words/concepts from transcript for fallback story
                        const words = transcript.toLowerCase().split(/\s+/).filter(w => w.length > 3);
                        const keyConcepts = words.slice(0, 5).join(', '); // Get first 5 meaningful words

                        paragraphs = [
                            `Once upon a time, ${role} Maximus was learning about ${keyConcepts || 'amazing things'}. He remembered what he had studied and wanted to explore more.`,
                            `As Maximus went on his adventure, he thought about the important ideas from his studies, like ${keyConcepts || 'curious discoveries'}.`,
                            `He met a friendly character who helped him understand these concepts better and solve a fun challenge.`,
                            `At the end, Maximus felt proud of what he had learned and knew he could use this knowledge in exciting ways.`
                        ];
                    } else {
                        paragraphs = [
                            `Once upon a time, ${role} Maximus set out on an adventure.`,
                            `He found a curious friend who helped him learn a new trick and solve a tiny mystery.`,
                            `Together they faced a silly challenge and used clever thinking to keep going.`,
                            `At the end, Maximus learned something important and celebrated with a big smile.`
                        ];
                    }
                }

                // Render as simple pages with play buttons (TTS hook)
                pages.innerHTML = '';
                paragraphs.forEach((p,i) => {
                    const pWrap = document.createElement('div');
                    pWrap.style.padding = '10px';
                    pWrap.style.borderRadius = '8px';
                    pWrap.style.marginBottom = '10px';
                    pWrap.style.background = '#f9fafb';
                    pWrap.innerHTML = `
                        <div style="display:flex;justify-content:space-between;align-items:start;gap:8px;">
                            <div style="flex:1;">
                                <h3 style="margin:0 0 6px 0;font-size:1rem;">${i===0?title:' '}</h3>
                                <p style="margin:0;color:#111;">${escapeHtml(p)}</p>
                            </div>
                            <div style="display:flex;flex-direction:column;gap:6px;margin-left:8px;">
                                <button data-ra-play data-ra-text="${escapeAttr(p)}" style="background:#6366f1;color:#fff;border:none;padding:6px 8px;border-radius:6px;cursor:pointer;">🔊 Read</button>
                            </div>
                        </div>
                    `;
                    pages.appendChild(pWrap);
                });

                // wire TTS buttons
                pages.querySelectorAll('[data-ra-play]').forEach(b => {
                    b.onclick = () => {
                        const t = b.getAttribute('data-ra-text');
                        try { speakTextWithOptions(t); } catch(e) { alert('TTS not available in this environment.'); }
                    };
                });

            };

            // Build a friendly prompt for story generation
            function buildStoryPrompt({ title, role, setting, plot, mood, transcript }) {
                let ctx = '';
                if (transcript) {
                    ctx = `Here is the transcript or notes from the study material:\n${transcript}\n\nIMPORTANT: Carefully analyze this transcript and incorporate its key concepts, themes, specific details, and educational content into the story. Weave these elements naturally into the narrative so the story reinforces and builds upon what was learned. Reference specific ideas, facts, or concepts from the transcript where appropriate.`;
                }
                const prompt = `Write a short children's story for a young child. Title: ${title}. Main character: ${role} (named Maximus). Setting: ${setting}. Mood: ${mood}. Challenge/plot twist: ${plot}. ${ctx}

Make the language simple, friendly, and age-appropriate. Keep it to 4-8 short paragraphs. Each paragraph should be 1-3 short sentences. End with a clear lesson or positive takeaway for the child.

${transcript ? 'Ensure the story incorporates and reinforces the key concepts and details from the provided transcript, making the learning experience engaging and memorable.' : ''}`;
                return prompt;
            }

            // Attempt to generate story text using available providers
            async function generateStoryViaProviders(prompt) {
                // Try Gemini
                try {
                    const gem = await generateWithGemini(prompt);
                    if (gem && gem.success && gem.text) return { success: true, text: gem.text, provider: 'gemini' };
                } catch (e) { console.warn('Gemini failed:', e); }

                // Try OpenAI
                try {
                    const oa = await generateWithOpenAI(prompt);
                    if (oa && oa.success && oa.text) return { success: true, text: oa.text, provider: 'openai' };
                } catch (e) { console.warn('OpenAI failed:', e); }

                // Try Claude
                try {
                    const cl = await generateWithClaude(prompt);
                    if (cl && cl.success && cl.text) return { success: true, text: cl.text, provider: 'claude' };
                } catch (e) { console.warn('Claude failed:', e); }

                return { success: false };
            }

            // Provider implementations (client-side; reuse localStorage keys)
            async function generateWithGemini(prompt) {
                const apiKey = localStorage.getItem('gemini_api_key');
                if (!apiKey) return { success: false, reason: 'no_key' };
                try {
                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: prompt }] }],
                            generationConfig: { temperature: 0.7, maxOutputTokens: 1500 }
                        })
                    });
                    if (!response.ok) {
                        const err = await response.text();
                        throw new Error('Gemini error: ' + err);
                    }
                    const data = await response.json();
                    const txt = (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) || '';
                    return { success: !!txt, text: txt };
                } catch (e) { return { success: false, reason: e.message }; }
            }

            async function generateWithOpenAI(prompt) {
                const apiKey = localStorage.getItem('openai_api_key');
                if (!apiKey) return { success: false, reason: 'no_key' };
                try {
                    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
                        body: JSON.stringify({ model: 'gpt-4', messages: [{ role: 'system', content: 'You are a friendly assistant that writes short children\'s stories.' }, { role: 'user', content: prompt }], max_tokens: 1500, temperature: 0.7 })
                    });
                    if (!resp.ok) throw new Error('OpenAI error: ' + resp.status);
                    const d = await resp.json();
                    const txt = (d.choices && d.choices[0] && d.choices[0].message && d.choices[0].message.content) || '';
                    return { success: !!txt, text: txt };
                } catch (e) { return { success: false, reason: e.message }; }
            }

            async function generateWithClaude(prompt) {
                const apiKey = localStorage.getItem('anthropic_api_key');
                if (!apiKey) return { success: false, reason: 'no_key' };
                try {
                    const resp = await fetch('https://api.anthropic.com/v1/complete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
                        body: JSON.stringify({ model: 'claude-v1', prompt: prompt, max_tokens_to_sample: 1500, temperature: 0.7 })
                    });
                    if (!resp.ok) throw new Error('Claude error: ' + resp.status);
                    const d = await resp.json();
                    const txt = d.completion || d.output || '';
                    return { success: !!txt, text: txt };
                } catch (e) { return { success: false, reason: e.message }; }
            }

        } catch (e) { console.error('openReadingAdventure error', e); }
    };

    // small helpers
    function escapeHtml(s) {
        if (!s) return '';
        return String(s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; });
    }
    function escapeAttr(s) {
        if (!s) return '';
        return String(s).replace(/"/g, '&quot;').replace(/\n/g,' ');
    }
})();
