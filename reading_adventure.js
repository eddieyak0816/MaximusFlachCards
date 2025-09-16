// reading_adventure.js
// Minimal Reading Adventure scaffold. All feature code for the Reading Adventure goes in this file.
(function(){
    // Expose the function globally so inline onclick handlers work
    window.openReadingAdventure = function() {
        try {
            // If modal already exists, bring into view
            const existing = document.getElementById('readingAdventureModal');
            if (existing) {
                existing.style.display = 'flex';
                return;
            }

            // Make regenerateImage callable from modal buttons / inline handlers
            window.regenerateImage = regenerateImage;
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
                    </div>

                    <div style="margin-bottom:12px;">
                        <label style="font-weight:500;">Reference Image (optional)</label>
                        <div style="font-size:12px;color:#6b7280;margin-bottom:4px;">Upload a reference image to guide the AI image generation style</div>
                        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
                            <input type="file" id="raReferenceImage" accept="image/*" style="flex:1;padding:8px;border:1px solid #ddd;border-radius:6px;" />
                            <button id="raClearReference" style="background:#6b7280;color:#fff;border:none;padding:8px 12px;border-radius:6px;cursor:pointer;display:none;">Clear</button>
                        </div>
                        <div id="raReferencePreview" style="margin-top:8px;display:none;">
                            <img id="raReferenceImg" style="max-width:200px;max-height:200px;border:1px solid #ddd;border-radius:6px;" alt="Reference image" />
                        </div>
                    </div>

                        <div style="display:flex;gap:8px;justify-content:flex-end;margin-bottom:12px;align-items:center;">
                            <label for="raImageProviderSelect" style="font-size:12px;color:#374151;margin-right:6px;">Image Provider:</label>
                            <select id="raImageProviderSelect" style="padding:8px;border:1px solid #ddd;border-radius:6px;">
                                <option value="auto">Auto (recommended)</option>
                                <option value="pollinations">Pollinations.ai</option>
                                <option value="gemini">Gemini</option>
                            </select>
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

            // Populate image provider select dynamically based on enabled providers and last-used service
            setTimeout(() => {
                const sel = document.getElementById('raImageProviderSelect');
                if (!sel) return;

                // Clear existing options and always include Auto
                sel.innerHTML = '';
                const autoOpt = document.createElement('option'); autoOpt.value = 'auto'; autoOpt.text = 'Auto (recommended)'; sel.appendChild(autoOpt);

                // Helper to add option if not present
                function addProviderOption(value, label) {
                    if (!Array.from(sel.options).some(o => o.value === value)) {
                        const opt = document.createElement('option'); opt.value = value; opt.text = label; sel.appendChild(opt);
                    }
                }

                // Add Pollinations (no key required)
                addProviderOption('pollinations', 'Pollinations.ai');

                // Add Gemini if enabled or has keys
                try {
                    const gemEnabled = localStorage.getItem('gemini_enabled') === 'true';
                    const gemKeys = getApiKeys && typeof getApiKeys === 'function' ? getApiKeys('gemini') : [];
                    if (gemEnabled || (gemKeys && gemKeys.length > 0)) addProviderOption('gemini', 'Gemini');
                } catch (e) { /* ignore */ }

                // If last book used a different service, ensure it's present
                if (window._raLastBook && window._raLastBook.images && window._raLastBook.images.length) {
                    const svc = window._raLastBook.images[0] && window._raLastBook.images[0].service;
                    if (svc) addProviderOption(svc, svc.charAt(0).toUpperCase() + svc.slice(1));
                }

                // If user saved a preference, prefer it
                const saved = localStorage.getItem('preferredImageAI');
                if (saved && Array.from(sel.options).some(o => o.value === saved)) sel.value = saved;
                else if (window._raLastBook && window._raLastBook.images && window._raLastBook.images.length) {
                    const svc = window._raLastBook.images[0] && window._raLastBook.images[0].service;
                    if (svc && Array.from(sel.options).some(o => o.value === svc)) sel.value = svc;
                }
            }, 50);

            // Persist changes to the image provider selection
            setTimeout(() => {
                const sel = document.getElementById('raImageProviderSelect');
                if (!sel) return;
                sel.onchange = () => {
                    try { localStorage.setItem('preferredImageAI', sel.value); } catch (e) { /* ignore */ }
                };
            }, 100);

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

            // Reference image upload handlers
            document.getElementById('raReferenceImage').onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    // Validate file type
                    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
                    if (!validTypes.includes(file.type)) {
                        alert('Please select a valid image file (JPEG, PNG, or WebP)');
                        e.target.value = '';
                        return;
                    }

                    // Validate file size (max 10MB)
                    const maxSize = 10 * 1024 * 1024; // 10MB
                    if (file.size > maxSize) {
                        alert('Please select an image smaller than 10MB');
                        e.target.value = '';
                        return;
                    }

                    // Show loading state
                    const previewDiv = document.getElementById('raReferencePreview');
                    previewDiv.innerHTML = '<div style="padding:20px;text-align:center;color:#6b7280;">Loading image...</div>';
                    previewDiv.style.display = 'block';

                    const reader = new FileReader();
                    reader.onload = function(e) {
                        // Create the image element with the loaded data
                        previewDiv.innerHTML = `<img id="raReferenceImg" src="${e.target.result}" style="max-width:200px;max-height:200px;border:1px solid #ddd;border-radius:6px;" alt="Reference image" />`;
                        document.getElementById('raClearReference').style.display = 'inline-block';
                    };
                    reader.onerror = function() {
                        alert('Error reading the image file. Please try again.');
                        e.target.value = '';
                        previewDiv.style.display = 'none';
                    };
                    reader.readAsDataURL(file);
                }
            };

            document.getElementById('raClearReference').onclick = function() {
                document.getElementById('raReferenceImage').value = '';
                document.getElementById('raReferencePreview').style.display = 'none';
                document.getElementById('raReferencePreview').innerHTML = '<img id="raReferenceImg" style="max-width:200px;max-height:200px;border:1px solid #ddd;border-radius:6px;" alt="Reference image" />';
                document.getElementById('raClearReference').style.display = 'none';
            };

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

                // Generate images for the story
                pages.innerHTML = '<div style="color:#6b7280;">✨ Creating illustrations for your story...</div>';

                const storyContext = { title, role, setting, plot, mood, transcript };
                const imagePrompts = await generateImagePromptsForStory(paragraphs, storyContext);

                pages.innerHTML = '<div style="color:#6b7280;">🎨 Generating beautiful images...</div>';

                const imageResults = await generateImagesForStory(imagePrompts, storyContext);

                // Render as picture book pages with images and play buttons
                pages.innerHTML = '';

                // Check if we have any real AI-generated images vs fallbacks
                const realImages = imageResults.filter(img => img.success && !img.isFallback).length;
                const totalImages = imageResults.length;

                if (realImages > 0) {
                    const statusMsg = document.createElement('div');
                    statusMsg.style.background = '#d1fae5';
                    statusMsg.style.color = '#065f46';
                    statusMsg.style.padding = '10px';
                    statusMsg.style.borderRadius = '8px';
                    statusMsg.style.marginBottom = '15px';
                    statusMsg.style.textAlign = 'center';
                    statusMsg.innerHTML = `🎨 Successfully generated ${realImages}/${totalImages} AI illustrations!`;
                    pages.appendChild(statusMsg);
                }

                paragraphs.forEach((p, i) => {
                    const pWrap = document.createElement('div');
                    pWrap.setAttribute('data-ra-paragraph', i);
                    pWrap.style.padding = '15px';
                    pWrap.style.borderRadius = '12px';
                    pWrap.style.marginBottom = '15px';
                    pWrap.style.background = '#f9fafb';
                    pWrap.style.border = '2px solid #e5e7eb';

                    const imageResult = imageResults.find(img => img.index === i);
                    const serviceBadge = imageResult && imageResult.service
                        ? imageResult.service === 'pollinations'
                            ? '<div style="position:absolute;top:15px;left:15px;background:#10b981;color:white;padding:4px 8px;border-radius:6px;font-size:11px;font-weight:bold;">🌸 Pollinations.ai</div>'
                            : imageResult.service === 'gemini'
                            ? '<div style="position:absolute;top:15px;left:15px;background:#8b5cf6;color:white;padding:4px 8px;border-radius:6px;font-size:11px;font-weight:bold;">🤖 Gemini</div>'
                            : '<div style="position:absolute;top:15px;left:15px;background:#f59e0b;color:white;padding:4px 8px;border-radius:6px;font-size:11px;font-weight:bold;">🎨 Fallback</div>'
                        : '';

                                        const imageHtml = imageResult && imageResult.success
                                                ? `<div style="position:relative;display:inline-block;">
                                                        ${serviceBadge}
                                                        <img data-ra-paragraph-index="${i}" src="${imageResult.imageData}" alt="Story illustration" onclick="openFullscreenImage('${imageResult.imageData}')" style="width:300px;height:300px;object-fit:cover;border-radius:12px;margin-bottom:10px;border:3px solid #d1d5db;cursor:pointer;transition:transform 0.2s;" onmouseover="this.style.transform='scale(1.02)'" onmouseout="this.style.transform='scale(1)'" />
                                                        <div style="position:absolute;bottom:15px;right:15px;background:rgba(0,0,0,0.7);color:white;padding:4px 8px;border-radius:6px;font-size:12px;pointer-events:none;opacity:0.8;">🔍 Click to enlarge</div>
                                                        <button onclick="regenerateImage(${i})" style="position:absolute;top:15px;right:15px;background:#3b82f6;color:white;padding:4px 8px;border-radius:6px;font-size:11px;border:none;cursor:pointer;opacity:0.8;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">🔄 Regenerate</button>
                                                    </div>`
                        : `<div style="width:300px;height:300px;background:#f3f4f6;border:3px solid #d1d5db;border-radius:12px;margin-bottom:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;color:#9ca3af;font-size:14px;">
                            🎨 Image generation failed
                            <button onclick="regenerateImage(${i})" style="margin-top:10px;background:#3b82f6;color:white;padding:6px 12px;border-radius:6px;font-size:12px;border:none;cursor:pointer;">🔄 Try Again</button>
                          </div>`;

                    pWrap.innerHTML = `
                        <div style="display:flex;gap:20px;align-items:flex-start;max-width:100%;">
                            <div style="flex-shrink:0;">
                                ${imageHtml}
                            </div>
                            <div style="flex:1;min-width:0;">
                                <h3 style="margin:0 0 8px 0;font-size:1.1rem;color:#1f2937;">${i === 0 ? title : ''}</h3>
                                <p style="margin:0 0 12px 0;color:#111;line-height:1.5;">${escapeHtml(p)}</p>
                                <button data-ra-play data-ra-text="${escapeAttr(p)}" style="background:#6366f1;color:#fff;border:none;padding:8px 12px;border-radius:8px;cursor:pointer;font-size:14px;">
                                    🔊 Read Aloud
                                </button>
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

                // Book modal: creates a popup styled like an open book with page-turning
                function openBookModal(pagesContent, imageResults = []) {
                    // If modal exists and is hidden, show it; if visible, bring to front and return
                    let modal = document.getElementById('raBookModal');
                    if (modal) {
                        if (modal.style.display === 'none') {
                            modal.style.display = 'flex';
                        }
                        modal.scrollTop = 0;
                        return;
                    }

                    modal = document.createElement('div');
                    modal.id = 'raBookModal';
                    modal.style.position = 'fixed';
                    modal.style.top = '0';
                    modal.style.left = '0';
                    modal.style.width = '100vw';
                    modal.style.height = '100vh';
                    modal.style.background = 'rgba(0,0,0,0.6)';
                    modal.style.display = 'flex';
                    modal.style.alignItems = 'center';
                    modal.style.justifyContent = 'center';
                    modal.style.zIndex = 13000;

                    const book = document.createElement('div');
                    book.id = 'raBook';
                    book.style.width = 'min(1000px,94vw)';
                    book.style.height = 'min(640px,86vh)';
                    book.style.background = '#f7f3ef';
                    book.style.borderRadius = '8px';
                    book.style.boxShadow = '0 10px 30px rgba(0,0,0,0.35)';
                    book.style.display = 'flex';
                    book.style.alignItems = 'center';
                    book.style.justifyContent = 'center';
                    book.style.position = 'relative';
                    book.style.overflow = 'hidden';

                    // Inner container for pages
                    const pagesContainer = document.createElement('div');
                    pagesContainer.id = 'raBookPages';
                    pagesContainer.style.width = '100%';
                    pagesContainer.style.height = '100%';
                    pagesContainer.style.display = 'flex';
                    pagesContainer.style.alignItems = 'center';
                    pagesContainer.style.justifyContent = 'center';
                    pagesContainer.style.padding = '24px';
                    pagesContainer.style.boxSizing = 'border-box';

                    // Page width and height - make single page view so image can be larger
                    const modalInnerWidth = Math.min(1000, window.innerWidth * 0.94 - 48);
                    const pageWidth = Math.floor(modalInnerWidth - 48); // single page uses most width
                    const pageHeight = Math.floor(Math.min(820, window.innerHeight * 0.86 - 48));

                    // Build page elements (single page visible at a time)
                    const pageElements = [];
                    for (let i = 0; i < pagesContent.length; i++) {
                        const p = document.createElement('div');
                        p.className = 'raBookPage';
                        p.style.width = pageWidth + 'px';
                        p.style.height = pageHeight + 'px';
                        p.style.background = 'white';
                        p.style.borderRadius = '6px';
                        p.style.boxShadow = 'inset 0 1px 0 rgba(0,0,0,0.03), 0 6px 18px rgba(0,0,0,0.08)';
                        p.style.margin = '0 8px';
                        p.style.padding = '18px';
                        p.style.boxSizing = 'border-box';
                        p.style.overflow = 'hidden';
                        p.style.display = 'flex';
                        p.style.flexDirection = 'column';

                        // Text at the top
                        const textWrap = document.createElement('div');
                        textWrap.style.flex = '0 0 auto';
                        textWrap.style.marginBottom = '12px';
                        textWrap.style.overflowY = 'auto';
                        textWrap.style.fontSize = '16px';
                        textWrap.style.color = '#111827';
                        textWrap.innerHTML = `<h3 style="margin:0 0 8px 0;font-size:1.1rem;">${pagesContent[i].title || ''}</h3><div style="white-space:pre-wrap">${pagesContent[i].text}</div>`;

                        // Add TTS read and stop buttons inline with the text
                        const ttsWrap = document.createElement('div');
                        ttsWrap.style.marginTop = '10px';
                        const ttsBtn = document.createElement('button');
                        ttsBtn.textContent = '🔈 Read';
                        ttsBtn.style.marginRight = '8px';
                        ttsBtn.style.background = '#f59e0b';
                        ttsBtn.style.color = 'white';
                        ttsBtn.style.border = 'none';
                        ttsBtn.style.padding = '8px 10px';
                        ttsBtn.style.borderRadius = '8px';
                        ttsBtn.style.cursor = 'pointer';
                        ttsBtn.onclick = () => {
                            try {
                                window.speechSynthesis.cancel();
                                const utter = new SpeechSynthesisUtterance(pagesContent[i].text);
                                utter.rate = 0.95;
                                utter.pitch = 1;
                                window.speechSynthesis.speak(utter);
                            } catch (e) { console.warn('TTS failed', e); }
                        };

                        const ttsStopBtn = document.createElement('button');
                        ttsStopBtn.textContent = '■ Stop';
                        ttsStopBtn.style.background = '#ef4444';
                        ttsStopBtn.style.color = 'white';
                        ttsStopBtn.style.border = 'none';
                        ttsStopBtn.style.padding = '8px 10px';
                        ttsStopBtn.style.borderRadius = '8px';
                        ttsStopBtn.style.cursor = 'pointer';
                        ttsStopBtn.onclick = () => { try { window.speechSynthesis.cancel(); } catch (e) { console.warn('TTS stop failed', e); } };

                        ttsWrap.appendChild(ttsBtn);
                        ttsWrap.appendChild(ttsStopBtn);
                        textWrap.appendChild(ttsWrap);

                        // Image area below the text, larger and centered
                        const imgWrap = document.createElement('div');
                        imgWrap.style.flex = '1 1 auto';
                        imgWrap.style.display = 'flex';
                        imgWrap.style.alignItems = 'center';
                        imgWrap.style.justifyContent = 'center';
                        imgWrap.style.textAlign = 'center';

                        if (imageResults[i] && imageResults[i].imageData) {
                            const img = document.createElement('img');
                            img.src = imageResults[i].imageData;
                            img.setAttribute('data-ra-paragraph-index', i);
                            img.style.maxWidth = '100%';
                            img.style.maxHeight = (pageHeight * 0.68) + 'px';
                            img.style.borderRadius = '8px';
                            img.style.objectFit = 'cover';
                            img.alt = 'Story illustration';
                            img.style.cursor = 'pointer';

                            img.addEventListener('click', async () => {
                                try {
                                    const sel = document.getElementById('raImageProviderSelect');
                                    const preferred = sel ? (sel.value || (localStorage.getItem('preferredImageAI') || 'auto')) : (localStorage.getItem('preferredImageAI') || 'auto');

                                    // Build a try-order array based on preference but always allow the alternative as a fallback
                                    let order = [];
                                    if (preferred === 'pollinations') order = ['pollinations', 'gemini'];
                                    else if (preferred === 'gemini') order = ['gemini', 'pollinations'];
                                    else order = ['pollinations', 'gemini']; // auto prefers pollinations first

                                    let largeResult = null;
                                    for (const svc of order) {
                                        if (svc === 'gemini') {
                                            try {
                                                const res = await generateImageWithGemini(imagePromptForIndex(i), null, { width: 1024, height: 768 });
                                                if (res && res.success) {
                                                    largeResult = res;
                                                    largeResult.service = 'gemini';
                                                    break;
                                                }
                                            } catch (e) { console.warn('Gemini large image attempt failed', e); }
                                        } else if (svc === 'pollinations') {
                                            try {
                                                const res = await generateImageWithPollinations(imagePromptForIndex(i), null, { width: 1024, height: 768 });
                                                if (res && res.success) {
                                                    largeResult = res;
                                                    largeResult.service = 'pollinations';
                                                    break;
                                                }
                                            } catch (e) { console.warn('Pollinations large image attempt failed', e); }
                                        }
                                    }

                                    if (!largeResult || !largeResult.success) {
                                        largeResult = { success: true, imageData: generateFallbackImage({ role: document.getElementById('raRole')?.value || 'Curious Explorer' }, i), service: 'fallback' };
                                    }

                                    if (largeResult && largeResult.success) openFullscreenImage(largeResult.imageData, 1024, 768);
                                } catch (e) { console.warn('Large image load failed', e); }
                            });

                            imgWrap.appendChild(img);

                            const regen = document.createElement('button');
                            regen.textContent = '🔄 Regenerate';
                            regen.style.marginLeft = '8px';
                            regen.style.background = '#3b82f6';
                            regen.style.color = 'white';
                            regen.style.border = 'none';
                            regen.style.padding = '6px 10px';
                            regen.style.borderRadius = '6px';
                            regen.style.cursor = 'pointer';
                            regen.onclick = () => { window.regenerateImage(i); };
                            imgWrap.appendChild(regen);
                        }

                        p.appendChild(textWrap);
                        p.appendChild(imgWrap);
                        pageElements.push(p);
                    }

                    // Create view that shows a single centered page at a time
                    const view = document.createElement('div');
                    view.id = 'raBookView';
                    view.style.display = 'flex';
                    view.style.alignItems = 'center';
                    view.style.justifyContent = 'center';
                    view.style.width = '100%';
                    view.style.height = '100%';
                    view.style.overflow = 'hidden';
                    view.style.transition = 'transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)';
                    view.style.willChange = 'transform';

                    // Inner strip that will slide left/right
                    const strip = document.createElement('div');
                    strip.id = 'raBookStrip';
                    strip.style.display = 'flex';
                    strip.style.alignItems = 'center';
                    strip.style.justifyContent = 'center';
                    const PAGE_GAP = 16;
                    strip.style.gap = PAGE_GAP + 'px';
                    strip.style.padding = '12px';
                    strip.style.boxSizing = 'border-box';
                    strip.style.boxSizing = 'border-box';

                    // Append each page to the strip
                    pageElements.forEach(pe => strip.appendChild(pe));

                    view.appendChild(strip);
                    pagesContainer.appendChild(view);
                    book.appendChild(pagesContainer);

                    // Controls
                    const controls = document.createElement('div');
                    controls.style.position = 'absolute';
                    controls.style.bottom = '18px';
                    controls.style.left = '50%';
                    controls.style.transform = 'translateX(-50%)';
                    controls.style.display = 'flex';
                    controls.style.gap = '12px';

                    const prevBtn = document.createElement('button');
                    prevBtn.textContent = '◀ Prev';
                    prevBtn.style.padding = '10px 14px';
                    prevBtn.style.borderRadius = '8px';
                    prevBtn.style.border = 'none';
                    prevBtn.style.background = '#e5e7eb';
                    prevBtn.style.cursor = 'pointer';

                    const nextBtn = document.createElement('button');
                    nextBtn.textContent = 'Next ▶';
                    nextBtn.style.padding = '10px 14px';
                    nextBtn.style.borderRadius = '8px';
                    nextBtn.style.border = 'none';
                    nextBtn.style.background = '#10b981';
                    nextBtn.style.color = 'white';
                    nextBtn.style.cursor = 'pointer';

                    const closeBtn = document.createElement('button');
                    closeBtn.textContent = 'Close ✕';
                    closeBtn.style.position = 'absolute';
                    closeBtn.style.top = '14px';
                    closeBtn.style.right = '14px';
                    closeBtn.style.padding = '8px 10px';
                    closeBtn.style.border = 'none';
                    closeBtn.style.background = '#ef4444';
                    closeBtn.style.color = 'white';
                    closeBtn.style.borderRadius = '8px';
                    closeBtn.style.cursor = 'pointer';

                    controls.appendChild(prevBtn);
                    controls.appendChild(nextBtn);
                    book.appendChild(controls);
                    book.appendChild(closeBtn);

                    modal.appendChild(book);
                    document.body.appendChild(modal);

                    // Pagination state (single page index)
                    let pageIndex = (window._raLastBook && typeof window._raLastBook.currentPage === 'number') ? window._raLastBook.currentPage : 0;

                    // Page indicator
                    const pageIndicator = document.createElement('div');
                    pageIndicator.style.alignSelf = 'center';
                    pageIndicator.style.padding = '8px 12px';
                    pageIndicator.style.borderRadius = '8px';
                    pageIndicator.style.background = 'rgba(255,255,255,0.9)';
                    pageIndicator.style.fontSize = '14px';
                    pageIndicator.style.color = '#111827';
                    pageIndicator.style.margin = '0 6px';
                    pageIndicator.textContent = `Page ${pageIndex+1} / ${pageElements.length}`;

                    // Insert indicator between prev and next
                    controls.insertBefore(pageIndicator, nextBtn);

                    function updateView() {
                        // Center the selected page by translating the strip
                        const offset = -((pageWidth + PAGE_GAP) * pageIndex);
                        strip.style.transform = `translateX(${offset}px)`;
                        pageIndicator.textContent = `Page ${pageIndex+1} / ${pageElements.length}`;
                        // persist last page so reopening restores it
                        if (!window._raLastBook) window._raLastBook = {};
                        window._raLastBook.currentPage = pageIndex;
                    }

                    prevBtn.onclick = () => {
                        pageIndex = Math.max(0, pageIndex - 1);
                        updateView();
                    };
                    nextBtn.onclick = () => {
                        pageIndex = Math.min(pageElements.length - 1, pageIndex + 1);
                        updateView();
                    };

                    closeBtn.onclick = () => {
                        // hide modal so it can be reopened without regenerating
                        modal.style.display = 'none';
                    };

                    // Keyboard navigation
                    function onKey(e) {
                        if (e.key === 'ArrowLeft') prevBtn.click();
                        if (e.key === 'ArrowRight') nextBtn.click();
                        if (e.key === 'Escape') closeBtn.click();
                    }
                    window.addEventListener('keydown', onKey);

                    // Clean up when modal removed
                    const observer = new MutationObserver(() => {
                        if (!document.body.contains(modal)) {
                            window.removeEventListener('keydown', onKey);
                            observer.disconnect();
                        }
                    });
                    observer.observe(document.body, { childList: true });

                    // Centering helper to add padding so the first and last pages can be centered
                    function centerStrip() {
                        try {
                            const viewWidth = view.clientWidth || (Math.min(1000, window.innerWidth * 0.94 - 48));
                            const sidePad = Math.max(0, Math.floor((viewWidth - pageWidth) / 2));
                            strip.style.paddingLeft = sidePad + 'px';
                            strip.style.paddingRight = sidePad + 'px';
                        } catch (e) { /* ignore */ }
                    }

                    // Recompute centering on resize
                    window.addEventListener('resize', () => { centerStrip(); updateView(); });

                    // Initial centering and start view
                    centerStrip();
                    updateView();
                }

                // Helper to reconstruct an image prompt for a particular page index (best-effort)
                function imagePromptForIndex(i) {
                    try {
                        const modalPages = document.querySelectorAll('#raBookStrip .raBookPage');
                        if (modalPages && modalPages.length > i) {
                            const textDiv = modalPages[i].querySelector('div');
                            const paragraphText = textDiv ? textDiv.textContent || '' : '';
                            const storyContext = { role: document.getElementById('raRole')?.value || 'Curious Explorer' };
                            return `Beautiful cartoon illustration of ${storyContext.role} Maximus ${paragraphText.substring(0, 100)}..., cute expressive characters with big eyes, bright vibrant colors, whimsical magical elements, soft rounded shapes, Disney/Pixar style children's book illustration`;
                        }
                    } catch (e) { }
                    return 'Cute cartoon illustration of Maximus in an adventure, bright colors, whimsical';
                }

                // Build pages array for the book modal
                const pagesArray = paragraphs.map((p, i) => ({ title: '', text: p.trim() }));

                // Persist last generated book so it can be reopened
                window._raLastBook = { pages: pagesArray, images: imageResults };

                // Add a small 'Open Book' button so user can reopen without regenerating
                try {
                    let openBtn = document.getElementById('raOpenBookBtn');
                    if (!openBtn) {
                        openBtn = document.createElement('button');
                        openBtn.id = 'raOpenBookBtn';
                        openBtn.textContent = '📖 Open Book';
                        openBtn.style.marginBottom = '12px';
                        openBtn.style.background = '#6b21a8';
                        openBtn.style.color = 'white';
                        openBtn.style.border = 'none';
                        openBtn.style.padding = '8px 12px';
                        openBtn.style.borderRadius = '8px';
                        openBtn.style.cursor = 'pointer';
                        openBtn.onclick = () => {
                            if (window._raLastBook) openBookModal(window._raLastBook.pages, window._raLastBook.images);
                        };
                        const outDiv = document.getElementById('raOutput');
                        outDiv.insertBefore(openBtn, outDiv.firstChild);
                    }

                    // Open the book modal with pages and image results
                    openBookModal(pagesArray, imageResults);
                } catch (e) {
                    console.warn('Failed to open book modal', e);
                    // Fallback: render inline as before
                    pages.innerHTML = '';
                    paragraphs.forEach((p, i) => {
                        const pWrap = document.createElement('div');
                        pWrap.style.padding = '15px';
                        pWrap.style.borderRadius = '12px';
                        pWrap.style.marginBottom = '15px';
                        pWrap.style.background = '#f9fafb';
                        pWrap.innerText = p;
                        pages.appendChild(pWrap);
                    });
                }
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
                // Try each saved Gemini API key until one works
                const keys = (typeof getApiKeys === 'function') ? (getApiKeys('gemini') || []) : [];
                if (!keys || keys.length === 0) return { success: false, reason: 'no_key' };

                for (let k = 0; k < keys.length; k++) {
                    const apiKey = keys[k];
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
                            console.warn(`Gemini key ${k} failed:`, err);
                            continue; // try next key
                        }
                        const data = await response.json();
                        const txt = (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) || '';
                        if (txt) return { success: true, text: txt, keyIndex: k };
                    } catch (e) {
                        console.warn(`Gemini key ${k} threw:`, e);
                        continue; // try next key
                    }
                }
                console.warn('All Gemini text keys failed. Ensure keys have quota or try another provider.');
                return { success: false, reason: 'all_keys_failed' };
            }

            // Generate image using Gemini's image generation
            async function generateImageWithGemini(imagePrompt, referenceImage = null, opts = {}) {
                // Try each saved Gemini API key until one successfully returns an image
                const keys = (typeof getApiKeys === 'function') ? (getApiKeys('gemini') || []) : [];
                if (!keys || keys.length === 0) return { success: false, reason: 'no_key' };

                const width = opts.width || 300;
                const height = opts.height || 300;
                const aspect = (width/height).toFixed(2);

                for (let k = 0; k < keys.length; k++) {
                    const apiKey = keys[k];
                    try {
                        const requestBody = {
                            prompt: { text: imagePrompt },
                            generationConfig: {
                                numberOfImages: 1,
                                aspectRatio: (Math.abs(width/height - 4/3) < 0.1) ? "4:3" : undefined,
                                personGeneration: "allow_adult",
                                imageSize: { width, height }
                            }
                        };

                        if (referenceImage) {
                            try {
                                requestBody.prompt.image = { bytesBase64Encoded: referenceImage.split(',')[1] };
                                requestBody.prompt.text = `Generate an image in the style of the reference image: ${imagePrompt}`;
                            } catch (e) { console.warn('Failed to process reference image for Gemini:', e); delete requestBody.prompt.image; }
                        }

                        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-001:predict?key=${apiKey}`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(requestBody)
                        });

                        if (!response.ok) {
                            const err = await response.text();
                            console.warn(`Gemini image key ${k} failed:`, err);
                            continue; // try next key
                        }

                        const data = await response.json();
                        if (data.predictions && data.predictions[0] && data.predictions[0].bytesBase64Encoded) {
                            return { success: true, imageData: `data:image/png;base64,${data.predictions[0].bytesBase64Encoded}`, keyIndex: k };
                        } else {
                            console.warn(`Gemini image key ${k} returned no data`);
                            continue;
                        }
                    } catch (e) {
                        console.warn(`Gemini image key ${k} threw:`, e);
                        continue;
                    }
                }

                console.warn('All Gemini image keys failed. Ensure keys have quota or try another provider.');
                return { success: false, reason: 'all_keys_failed' };
            }

            // Generate image using Pollinations.ai (free alternative to Gemini)
            async function generateImageWithPollinations(imagePrompt, referenceImage = null, opts = {}) {
                try {
                    // URL encode the prompt for the API
                    const encodedPrompt = encodeURIComponent(imagePrompt);

                    const width = opts.width || 300;
                    const height = opts.height || 300;

                    // Build the API URL with parameters for cartoon-style images
                    let apiUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&model=flux&seed=${Math.floor(Math.random() * 1000000)}&enhance=true`;

                    // Add reference image for image-to-image generation
                    if (referenceImage) {
                        // For Pollinations.ai, we can include the reference image as a style reference
                        // by adding it to the prompt and using a different model that supports image-to-image
                        apiUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=300&height=300&model=flux&seed=${Math.floor(Math.random() * 1000000)}&enhance=true&style=${encodeURIComponent('in the style of the reference image')}`;
                    }

                    const response = await fetch(apiUrl);

                    if (!response.ok) {
                        throw new Error('Pollinations.ai API error: ' + response.status);
                    }

                    // Get the image as a blob and convert to base64
                    const imageBlob = await response.blob();

                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => {
                            resolve({
                                success: true,
                                imageData: reader.result,
                                service: 'pollinations'
                            });
                        };
                        reader.onerror = () => {
                            resolve({ success: false, reason: 'Failed to process image data' });
                        };
                        reader.readAsDataURL(imageBlob);
                    });

                } catch (e) {
                    console.warn('Pollinations.ai image generation failed:', e);
                    return { success: false, reason: e.message };
                }
            }

            // Regenerate a specific image
            async function regenerateImage(paragraphIndex) {
                console.log('Regenerating image for paragraph', paragraphIndex);

                // Prefer finding any image element tagged with the paragraph index
                let imageElement = document.querySelector(`img[data-ra-paragraph-index='${paragraphIndex}']`);
                if (!imageElement) {
                    // Fallback to image inside raPages area
                    imageElement = document.querySelector(`#raPages img[data-ra-paragraph-index='${paragraphIndex}']`);
                }
                if (!imageElement) {
                    // Last resort: first matching alt-nth fallback
                    imageElement = document.querySelector(`img[alt="Story illustration"]:nth-of-type(${paragraphIndex + 1})`);
                }

                if (imageElement) {
                    imageElement.style.opacity = '0.5';
                    imageElement.style.filter = 'blur(2px)';
                }

                try {
                    const storyContext = {
                        role: document.getElementById('raRole')?.value || 'Curious Explorer',
                        setting: document.getElementById('raSetting')?.value || 'magical forest',
                        mood: document.getElementById('raMood')?.value || 'whimsical'
                    };

                    // Try to find the paragraph text by matching elements with data attributes
                    let paragraphText = '';
                    const pageEl = document.querySelector(`[data-ra-paragraph='${paragraphIndex}']`);
                    if (pageEl) paragraphText = pageEl.textContent || '';
                    if (!paragraphText) {
                        const modalPages = document.querySelectorAll('#raBookStrip .raBookPage');
                        if (modalPages && modalPages.length > paragraphIndex) {
                            const textDiv = modalPages[paragraphIndex].querySelector('div');
                            paragraphText = textDiv ? textDiv.textContent || '' : '';
                        }
                    }
                    if (!paragraphText) {
                        const paragraphs = document.querySelectorAll('#raPages p');
                        paragraphText = paragraphs[paragraphIndex]?.textContent || '';
                    }

                    const imagePrompt = `Beautiful cartoon illustration of ${storyContext.role} Maximus ${paragraphText.substring(0, 200)}..., cute expressive characters with big eyes, bright vibrant colors, whimsical magical elements, soft rounded shapes, Disney/Pixar style children's book illustration`;

                    // Get reference image if uploaded
                    const referenceImageInput = document.getElementById('raReferenceImage');
                    const referenceImage = referenceImageInput && referenceImageInput.files[0] ?
                        await new Promise((resolve) => {
                            const reader = new FileReader();
                            reader.onload = () => resolve(reader.result);
                            reader.readAsDataURL(referenceImageInput.files[0]);
                        }) : null;


                    const sel = document.getElementById('raImageProviderSelect');
                    const preferredImageAI = sel ? (sel.value || (localStorage.getItem('preferredImageAI') || 'auto')) : (localStorage.getItem('preferredImageAI') || 'auto');
                    let newImageResult = null;

                    // Determine try order
                    let order = [];
                    if (preferredImageAI === 'pollinations') order = ['pollinations', 'gemini'];
                    else if (preferredImageAI === 'gemini') order = ['gemini', 'pollinations'];
                    else order = ['pollinations', 'gemini'];

                    for (const svc of order) {
                        try {
                            if (svc === 'pollinations') {
                                const pollinationsResult = await generateImageWithPollinations(imagePrompt, referenceImage);
                                if (pollinationsResult && pollinationsResult.success) {
                                    newImageResult = { success: true, imageData: pollinationsResult.imageData, service: 'pollinations' };
                                    break;
                                }
                            } else if (svc === 'gemini') {
                                const geminiResult = await generateImageWithGemini(imagePrompt, referenceImage);
                                if (geminiResult && geminiResult.success) {
                                    newImageResult = { success: true, imageData: geminiResult.imageData, service: 'gemini' };
                                    break;
                                }
                            }
                        } catch (e) { console.warn('Regenerate attempt failed for', svc, e); }
                    }

                    if (!newImageResult) {
                        newImageResult = { success: true, imageData: generateFallbackImage(storyContext, paragraphIndex), service: 'fallback' };
                    }

                    // Update DOM for found image element and any inline mirrors
                    if (newImageResult.success) {
                        if (imageElement) {
                            imageElement.src = newImageResult.imageData;
                            imageElement.style.opacity = '1';
                            imageElement.style.filter = 'none';
                            imageElement.setAttribute('data-ra-paragraph-index', paragraphIndex);
                        }

                        // Update or create badge near the image
                        const container = (imageElement && (imageElement.parentElement || imageElement.closest('.raBookPage'))) || null;
                        if (container) {
                            let badge = container.querySelector('.raServiceBadge');
                            const badgeHtml = newImageResult.service === 'pollinations'
                                ? { html: '🌸 Pollinations.ai', bg: '#10b981' }
                                : newImageResult.service === 'gemini'
                                ? { html: '🤖 Gemini', bg: '#8b5cf6' }
                                : { html: '🔧 Fallback', bg: '#9ca3af' };
                            if (badge) {
                                badge.textContent = badgeHtml.html;
                                badge.style.background = badgeHtml.bg;
                            } else {
                                badge = document.createElement('div');
                                badge.className = 'raServiceBadge';
                                badge.textContent = badgeHtml.html;
                                badge.style.position = 'absolute';
                                badge.style.top = '15px';
                                badge.style.left = '15px';
                                badge.style.background = badgeHtml.bg;
                                badge.style.color = 'white';
                                badge.style.padding = '4px 8px';
                                badge.style.borderRadius = '6px';
                                badge.style.fontSize = '11px';
                                badge.style.fontWeight = 'bold';
                                if (container && getComputedStyle(container).position === 'static') container.style.position = 'relative';
                                container.appendChild(badge);
                            }
                        }

                        // Update the inline image mirror if present
                        const inlineImg = document.querySelector(`#raPages img[data-ra-paragraph-index='${paragraphIndex}']`);
                        if (inlineImg && inlineImg !== imageElement) {
                            inlineImg.src = newImageResult.imageData;
                            inlineImg.setAttribute('data-ra-paragraph-index', paragraphIndex);
                        }

                        console.log('Successfully regenerated image for paragraph', paragraphIndex, 'using', newImageResult.service);
                    }

                } catch (error) {
                    console.error('Failed to regenerate image:', error);
                    if (imageElement) {
                        imageElement.style.opacity = '1';
                        imageElement.style.filter = 'none';
                    }
                }
            }

            // Fallback image generation using placeholder/fallback method
            function generateFallbackImage(storyContext, paragraphIndex) {
                // Create a colorful SVG placeholder image
                const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];
                const color = colors[paragraphIndex % colors.length];

                const svg = `
                    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
                        <rect width="300" height="300" fill="${color}" rx="12"/>
                        <circle cx="150" cy="120" r="35" fill="white" opacity="0.8"/>
                        <rect x="125" y="165" width="50" height="20" fill="white" opacity="0.8" rx="10"/>
                        <text x="150" y="220" text-anchor="middle" fill="white" font-family="Arial" font-size="16" font-weight="bold">
                            Page ${paragraphIndex + 1}
                        </text>
                        <text x="150" y="240" text-anchor="middle" fill="white" font-family="Arial" font-size="12">
                            ${storyContext.role} Maximus
                        </text>
                    </svg>
                `;

                return `data:image/svg+xml;base64,${btoa(svg)}`;
            }

            // Generate image prompts for each paragraph
            async function generateImagePromptsForStory(paragraphs, storyContext) {
                const imagePrompts = [];

                for (let i = 0; i < paragraphs.length; i++) {
                    const paragraph = paragraphs[i];
                    const prompt = `Create a detailed image description for a beautiful children's cartoon story illustration. The story is about ${storyContext.role} Maximus in ${storyContext.setting} with a ${storyContext.mood} mood.

Paragraph content: "${paragraph}"

Create a vivid, magical cartoon-style image prompt that captures the essence of this specific moment in the story. Focus on:
- Cute, expressive cartoon characters with big eyes and friendly faces
- Bright, vibrant colors and playful cartoon aesthetics
- Whimsical and magical elements
- Soft, rounded shapes and gentle curves
- Storybook illustration style with depth and character
- Age-appropriate for young children (4-8 years old)
- High-quality digital cartoon art style

Make it look like a beautiful page from a Disney or Pixar children's book. Return only the image prompt, no explanation.`;

                    try {
                        const result = await generateWithGemini(prompt);
                        if (result.success && result.text) {
                            imagePrompts.push(result.text.trim());
                        } else {
                            // Fallback prompt
                            imagePrompts.push(`Beautiful cartoon illustration of ${storyContext.role} Maximus having an adventure in ${storyContext.setting}, cute expressive characters with big eyes, bright vibrant colors, whimsical magical elements, soft rounded shapes, Disney/Pixar style children's book illustration`);
                        }
                    } catch (e) {
                        console.warn('Failed to generate image prompt for paragraph', i, e);
                        imagePrompts.push(`Beautiful cartoon illustration of ${storyContext.role} Maximus having an adventure in ${storyContext.setting}, cute expressive characters with big eyes, bright vibrant colors, whimsical magical elements, soft rounded shapes, Disney/Pixar style children's book illustration`);
                    }
                }

                return imagePrompts;
            }

            // Generate images for all paragraphs in parallel
            async function generateImagesForStory(imagePrompts, storyContext) {
                // Get reference image if uploaded
                const referenceImageInput = document.getElementById('raReferenceImage');
                const referenceImage = referenceImageInput && referenceImageInput.files[0] ?
                    await new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result);
                        reader.readAsDataURL(referenceImageInput.files[0]);
                    }) : null;

                const imagePromises = imagePrompts.map(async (prompt, index) => {
                    try {
                        // Determine user's selected image AI from dropdown (if present) or fallback to stored preference
                        const selector = document.getElementById('raImageProviderSelect');
                        const selectedProvider = selector ? selector.value : (localStorage.getItem('preferredImageAI') || 'auto');

                        const preferredImageAI = selectedProvider || (localStorage.getItem('preferredImageAI') || 'auto');

                            // Determine try order based on user selection, but always allow fallback to the other
                            let order = [];
                            if (preferredImageAI === 'pollinations') order = ['pollinations', 'gemini'];
                            else if (preferredImageAI === 'gemini') order = ['gemini', 'pollinations'];
                            else order = ['pollinations', 'gemini']; // auto prefers pollinations first

                            // If last book used a different service for this index, ensure it's tried first
                            const lastBookService = (window._raLastBook && window._raLastBook.images && window._raLastBook.images[index] && window._raLastBook.images[index].service) || null;
                            if (lastBookService && order.indexOf(lastBookService) === -1) order.unshift(lastBookService);

                            for (const svc of order) {
                                try {
                                    if (svc === 'pollinations') {
                                        const pollinationsResult = await generateImageWithPollinations(prompt, referenceImage);
                                        if (pollinationsResult && pollinationsResult.success) {
                                            return { success: true, imageData: pollinationsResult.imageData, index, service: 'pollinations' };
                                        }
                                    } else if (svc === 'gemini') {
                                        const geminiResult = await generateImageWithGemini(prompt, referenceImage);
                                        if (geminiResult && geminiResult.success) {
                                            return { success: true, imageData: geminiResult.imageData, index, service: 'gemini' };
                                        }
                                    }
                                } catch (e) { console.warn('Image generation attempt failed for', svc, e); }
                            }

                        // Use fallback image if all else fails
                        console.warn('Using fallback image for paragraph', index);
                        return {
                            success: true,
                            imageData: generateFallbackImage(storyContext, index),
                            index,
                            isFallback: true,
                            service: 'fallback'
                        };
                    } catch (e) {
                        console.warn('Image generation failed for paragraph', index, e);
                        // Use fallback image
                        return {
                            success: true,
                            imageData: generateFallbackImage(storyContext, index),
                            index,
                            isFallback: true,
                            service: 'fallback'
                        };
                    }
                });

                const results = await Promise.all(imagePromises);
                return results;
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

    // Fullscreen image viewer
    window.openFullscreenImage = function(imageSrc) {
        // Create fullscreen overlay
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(0,0,0,0.95)';
        overlay.style.zIndex = '12000';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.cursor = 'pointer';

    // Create the image with much larger size
    const img = document.createElement('img');
    img.src = imageSrc;
    img.style.maxWidth = '95vw';
    img.style.maxHeight = '95vh';
        img.style.width = 'auto';
        img.style.height = 'auto';
        img.style.objectFit = 'contain';
        img.style.borderRadius = '12px';
        img.style.boxShadow = '0 20px 60px rgba(0,0,0,0.8)';
        img.style.imageRendering = 'high-quality';

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '20px';
        closeBtn.style.right = '20px';
        closeBtn.style.background = 'rgba(0,0,0,0.7)';
        closeBtn.style.color = 'white';
        closeBtn.style.border = 'none';
        closeBtn.style.borderRadius = '50%';
        closeBtn.style.width = '40px';
        closeBtn.style.height = '40px';
        closeBtn.style.fontSize = '20px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.display = 'flex';
        closeBtn.style.alignItems = 'center';
        closeBtn.style.justifyContent = 'center';

        // Close on click (overlay or button)
        const closeOverlay = function() {
            document.body.removeChild(overlay);
        };

        overlay.onclick = closeOverlay;
        closeBtn.onclick = function(e) {
            e.stopPropagation(); // Prevent overlay click when clicking button
            closeOverlay();
        };

        overlay.appendChild(img);
        overlay.appendChild(closeBtn);
        document.body.appendChild(overlay);
    };
})();
