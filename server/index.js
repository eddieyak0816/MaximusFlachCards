// Caption-only transcription proxy
// This server attempts to fetch YouTube captions via the python helper `get_captions.py`.
// It does NOT download audio or call any cloud transcription APIs.

const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
app.use(cors());
app.use(express.json());

function runCommand(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const p = spawn(cmd, args, Object.assign({ cwd: __dirname }, opts));
    let stdout = '';
    let stderr = '';
    p.stdout.on('data', d => stdout += d.toString());
    p.stderr.on('data', d => stderr += d.toString());
    p.on('error', e => reject(e));
    p.on('close', code => {
      if (code === 0) resolve({ stdout, stderr }); else reject(new Error(`Exit ${code}: ${stderr || stdout}`));
    });
  });
}

function extractYouTubeId(u) {
  try {
    const m1 = u.match(/(?:youtu\.be\/|v=|\/embed\/)([A-Za-z0-9_-]{11})/);
    if (m1 && m1[1]) return m1[1];
    const parsed = new URL(u);
    if (parsed.searchParams && parsed.searchParams.get('v')) return parsed.searchParams.get('v');
  } catch (e) { }
  return null;
}

app.post('/transcribe', async (req, res) => {
  const { url } = req.body || {};
  if (!url) return res.status(400).json({ error: 'Missing url in body' });

  try {
    const ytId = extractYouTubeId(url);
    if (!ytId) return res.status(400).json({ error: 'unsupported_url', message: 'Only YouTube URLs are supported by this caption-only server.' });

    try {
  // Prefer the project's virtualenv python when present (Windows and Unix paths)
  let pythonCmd = 'python';
  const winVenv = path.join(__dirname, '.venv', 'Scripts', 'python.exe');
  const nixVenv = path.join(__dirname, '.venv', 'bin', 'python');
  if (fs.existsSync(winVenv)) pythonCmd = winVenv;
  else if (fs.existsSync(nixVenv)) pythonCmd = nixVenv;

  const out = await runCommand(pythonCmd, [path.join(__dirname, 'get_captions.py'), ytId]);
      const j = JSON.parse(out.stdout || out.stderr || '{}');
      if (j.transcript) return res.json({ transcript: j.transcript, source: 'youtube_captions' });
      return res.status(404).json({ error: 'captions_not_found', message: 'No captions available for that video.' });
    } catch (e) {
  console.warn('caption helper error', String(e));
  // Provide stderr/exit info when available for easier debugging
  return res.status(500).json({ error: 'caption_helper_failed', message: 'Caption helper failed to run. Ensure python and youtube-transcript-api are installed and the server process can execute the interpreter.', details: String(e.message || e) });
    }

  } catch (err) {
    console.error('transcribe error', err);
    res.status(500).json({ error: String(err.message || err) });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Caption-only proxy listening on http://localhost:${PORT}`));
