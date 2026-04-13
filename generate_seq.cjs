/**
 * generate_seq.cjs
 * ─────────────────────────────────────────────────────────────────────────
 * Extracts 90 frames from the first 3 seconds of the source video,
 * converts them to high-quality WebP, and writes them to public/sequence/
 * as 0000.webp … 0089.webp (replacing any previous frames).
 *
 * Usage:  node generate_seq.cjs  [optional-video-path]
 * ─────────────────────────────────────────────────────────────────────────
 */
'use strict';

const path  = require('path');
const fs    = require('fs');
const os    = require('os');
const sharp = require('sharp');
const ffmpeg = require('fluent-ffmpeg');

// ── Resolve binary paths from the npm packages ───────────────────────────
const ffmpegPath  = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;
ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

// ── Config ────────────────────────────────────────────────────────────────
const VIDEO_PATH  = process.argv[2] ||
    path.resolve('C:/Users/ashis/Downloads/D_Cinematic_Video_Portrait_Generation.mp4');
const SEQ_DIR     = path.resolve(__dirname, 'public/sequence');
const FRAME_COUNT = 90;          // keep existing 90-frame contract
const CLIP_SECS   = 3;           // first N seconds to use
const TARGET_FPS  = FRAME_COUNT / CLIP_SECS;   // = 30 fps
const WEBP_QUALITY = 80;         // higher than old 65 → higher quality per request
const OUTPUT_WIDTH  = 1280;      // preserve native width
const OUTPUT_HEIGHT = 720;       // preserve native height

// ── Helpers ───────────────────────────────────────────────────────────────
function pad(n) { return String(n).padStart(4, '0'); }

function clearOldFrames() {
    if (!fs.existsSync(SEQ_DIR)) { fs.mkdirSync(SEQ_DIR, { recursive: true }); return; }
    const files = fs.readdirSync(SEQ_DIR).filter(f => /^\d{4}\.(webp|png|jpg|jpeg)$/.test(f));
    files.forEach(f => fs.unlinkSync(path.join(SEQ_DIR, f)));
    console.log(`Removed ${files.length} old frames from public/sequence/`);
}

function extractFrames(tmpDir) {
    return new Promise((resolve, reject) => {
        let frameCount = 0;
        ffmpeg(VIDEO_PATH)
            .inputOptions(['-t', String(CLIP_SECS)])
            .videoFilter(`fps=${TARGET_FPS},scale=${OUTPUT_WIDTH}:${OUTPUT_HEIGHT}`)
            .outputOptions(['-qscale:v', '1',   // highest JPEG/PNG quality from ffmpeg
                            '-frames:v', String(FRAME_COUNT)])
            .output(path.join(tmpDir, '%04d.png'))
            .on('start',    cmd  => console.log('FFmpeg started:', cmd.slice(0, 120) + '…'))
            .on('progress', info => {
                if (info.frames && info.frames !== frameCount) {
                    frameCount = info.frames;
                    process.stdout.write(`\r  Extracting frame ${frameCount}/${FRAME_COUNT} `);
                }
            })
            .on('end',   () => { process.stdout.write('\n'); resolve(); })
            .on('error', reject)
            .run();
    });
}

async function convertToWebP(tmpDir) {
    const pngFiles = fs.readdirSync(tmpDir)
        .filter(f => f.endsWith('.png'))
        .sort();

    console.log(`Converting ${pngFiles.length} PNGs → WebP (quality ${WEBP_QUALITY})…`);

    let converted = 0;
    for (const file of pngFiles) {
        const frameIndex = parseInt(file, 10) - 1;   // ffmpeg starts at 0001.png
        const srcPath  = path.join(tmpDir,  file);
        const destPath = path.join(SEQ_DIR, `${pad(frameIndex)}.webp`);

        await sharp(srcPath)
            .resize(OUTPUT_WIDTH, OUTPUT_HEIGHT, { fit: 'fill' })
            .webp({ quality: WEBP_QUALITY, effort: 5, lossless: false })
            .toFile(destPath);

        converted++;
        if (converted % 10 === 0 || converted === pngFiles.length) {
            process.stdout.write(`\r  Converted ${converted}/${pngFiles.length} frames`);
        }
    }
    process.stdout.write('\n');
    return converted;
}

// ── Main ──────────────────────────────────────────────────────────────────
async function run() {
    if (!fs.existsSync(VIDEO_PATH)) {
        console.error(`ERROR: Video not found at:\n  ${VIDEO_PATH}`);
        process.exit(1);
    }

    const stat  = fs.statSync(VIDEO_PATH);
    console.log(`\nSource : ${VIDEO_PATH}`);
    console.log(`Size   : ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Target : ${FRAME_COUNT} frames from first ${CLIP_SECS}s at ${TARGET_FPS}fps → ${WEBP_QUALITY}% WebP\n`);

    clearOldFrames();

    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'seq-'));
    console.log(`Temp dir: ${tmpDir}`);

    try {
        console.log('Phase 1 — Extracting PNG frames with FFmpeg…');
        await extractFrames(tmpDir);

        console.log('\nPhase 2 — Compressing to WebP with sharp…');
        const converted = await convertToWebP(tmpDir);

        // Integrity check
        const finalFiles = fs.readdirSync(SEQ_DIR).filter(f => f.endsWith('.webp'));
        const totalKB    = finalFiles.reduce((acc, f) =>
            acc + fs.statSync(path.join(SEQ_DIR, f)).size / 1024, 0);

        console.log('\n────────────────────────────────────────────────');
        console.log(`✓ ${converted} WebP frames written to public/sequence/`);
        console.log(`✓ Total size: ${(totalKB / 1024).toFixed(2)} MB`);
        console.log(`✓ Avg per frame: ${(totalKB / finalFiles.length).toFixed(1)} KB`);
        console.log('────────────────────────────────────────────────\n');
    } finally {
        // Clean up temp PNGs
        fs.readdirSync(tmpDir).forEach(f => fs.unlinkSync(path.join(tmpDir, f)));
        fs.rmdirSync(tmpDir);
    }
}

run().catch(err => { console.error('\nFATAL:', err.message); process.exit(1); });
