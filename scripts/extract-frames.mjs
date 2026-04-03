#!/usr/bin/env node
/**
 * Video Frame Extractor — 4K Sequence Generator
 *
 * 1. Extracts all frames from the 4K source video
 * 2. Removes the "Veo" watermark (bottom-right) via inpainting crop
 * 3. Produces 120 evenly-sampled, 4K WebP frames for scroll-driven playback
 *
 * Usage:  node scripts/extract-frames.mjs
 * Source: public/images/Untitled design.mp4  (3840x2160 4K)
 * Output: public/sequence/0000.webp … 0119.webp
 */

import { execFileSync } from 'child_process';
import sharp from 'sharp';
import { mkdirSync, existsSync, readdirSync, unlinkSync, rmSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ──────────────────────────────────────
// Config
// ──────────────────────────────────────
const CFG = {
    // Use the 4K video as primary source
    videoPath: join(ROOT, 'public', 'images', 'Untitled design.mp4'),
    // Fallback to the 720p video
    videoFallback: join(ROOT, 'public', 'images', 'D_Cinematic_Video_Portrait_Generation.mp4'),
    outputDir: join(ROOT, 'public', 'sequence'),
    tempDir:   join(ROOT, 'scripts', '_raw_frames'),
    ffmpeg:    require('@ffmpeg-installer/ffmpeg').path,
    // Output config
    targetFrames: 120,        // number of scroll frames to produce
    outputWidth:  3840,       // 4K
    outputHeight: 2160,       // 4K
    webpQuality:  88,         // high quality for 4K
    // Watermark region (bottom-right corner — Veo logo)
    // We'll crop this from the frame by inpainting/blending
    watermark: {
        // Tight logo-only box to avoid visible delogo smearing
        right:  230,
        bottom: 90,
        width:  210,
        height: 72,
    },
};

// ──────────────────────────────────────
// Math
// ──────────────────────────────────────
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

// ──────────────────────────────────────
// Step 1: Extract raw frames from video
// ──────────────────────────────────────
function extractRawFrames(videoPath) {
    mkdirSync(CFG.tempDir, { recursive: true });

    // Clean temp dir
    const oldFiles = readdirSync(CFG.tempDir).filter(f => f.endsWith('.png'));
    for (const f of oldFiles) unlinkSync(join(CFG.tempDir, f));

    console.log('  Extracting raw frames with ffmpeg...');

    // Extract every frame as high-quality PNG.
    // delogo removes the Veo mark at source level before per-frame post-processing.
    const isFallback = videoPath === CFG.videoFallback;
    const delogo = isFallback
        ? 'fps=30,delogo=x=1040:y=625:w=180:h=62:show=0'
        : `fps=30,delogo=x=${3840 - CFG.watermark.right}:y=${2160 - CFG.watermark.bottom}:w=${CFG.watermark.width}:h=${CFG.watermark.height}:show=0`;
    const args = [
        '-i', videoPath,
        '-vf', delogo,
        '-q:v', '1',               // best quality
        join(CFG.tempDir, 'raw_%06d.png'),
    ];

    try {
        execFileSync(CFG.ffmpeg, args, {
            stdio: ['ignore', 'pipe', 'pipe'],
            maxBuffer: 50 * 1024 * 1024,
        });
    } catch (err) {
        const stderr = err?.stderr?.toString?.() || '';
        if (stderr) console.error(stderr);
        throw err;
    }

    const frames = readdirSync(CFG.tempDir)
        .filter(f => f.startsWith('raw_') && f.endsWith('.png'))
        .sort();

    console.log(`  Extracted ${frames.length} raw frames`);
    return frames.map(f => join(CFG.tempDir, f));
}

// ──────────────────────────────────────
// Step 2: Optional post-pass
// ──────────────────────────────────────
async function removeWatermark(inputBuffer, frameWidth, frameHeight) {
    // Keep frame untouched after delogo; this avoids box artifacts.
    return inputBuffer;
}

// ──────────────────────────────────────
// Step 3: Sample, clean, and output final frames
// ──────────────────────────────────────
async function processFrames(rawFramePaths) {
    const totalRaw = rawFramePaths.length;
    const target = CFG.targetFrames;

    // Clean old output
    const old = readdirSync(CFG.outputDir).filter(f => /\.(webp|png)$/i.test(f));
    if (old.length) {
        console.log(`  Cleaning ${old.length} old output frames...`);
        for (const f of old) unlinkSync(join(CFG.outputDir, f));
    }

    console.log(`  Processing ${target} frames from ${totalRaw} raw frames...`);
    console.log(`  Output: ${CFG.outputWidth}x${CFG.outputHeight} WebP (q${CFG.webpQuality})\n`);

    for (let i = 0; i < target; i++) {
        // Map output frame index to raw frame index (evenly sampled)
        const rawIdx = Math.min(
            Math.floor((i / (target - 1)) * (totalRaw - 1)),
            totalRaw - 1,
        );
        const rawPath = rawFramePaths[rawIdx];

        // Read raw frame
        let buffer = await sharp(rawPath).toBuffer();
        const meta = await sharp(buffer).metadata();

        // Remove watermark
        buffer = await removeWatermark(buffer, meta.width, meta.height);

        // Resize to target 4K if needed (the source is already 4K so this is mostly a passthrough)
        if (meta.width !== CFG.outputWidth || meta.height !== CFG.outputHeight) {
            buffer = await sharp(buffer)
                .resize(CFG.outputWidth, CFG.outputHeight, {
                    fit: 'cover',
                    kernel: 'lanczos3',
                })
                .toBuffer();
        }

        // Write as WebP
        const frameId = String(i).padStart(4, '0');
        await sharp(buffer)
            .webp({ quality: CFG.webpQuality, effort: 4 })
            .toFile(join(CFG.outputDir, `${frameId}.webp`));

        const pct = Math.round(((i + 1) / target) * 100);
        process.stdout.write(`\r  Processing: ${pct}%  [${i + 1}/${target}]`);
    }

    console.log('\n');
}

// ──────────────────────────────────────
// Main
// ──────────────────────────────────────
async function main() {
    console.log('\n  Video Frame Extractor — 4K Sequence');
    console.log('  ====================================\n');

    // Find the video source
    let videoPath = CFG.videoPath;
    if (!existsSync(videoPath)) {
        videoPath = CFG.videoFallback;
        if (!existsSync(videoPath)) {
            console.error('  [!] No video found in public/images/');
            process.exit(1);
        }
        console.log('  Using fallback 720p video (will upscale to 4K)');
    }
    console.log(`  Video:  ${videoPath.split(/[/\\]/).pop()}`);

    // Check ffmpeg
    if (!existsSync(CFG.ffmpeg)) {
        console.error(`  [!] ffmpeg not found at: ${CFG.ffmpeg}`);
        console.error('      Run: npm install --save-dev @ffmpeg-installer/ffmpeg');
        process.exit(1);
    }

    mkdirSync(CFG.outputDir, { recursive: true });

    // Step 1: Extract raw frames
    const t0 = Date.now();
    const rawFrames = extractRawFrames(videoPath);

    if (rawFrames.length === 0) {
        console.error('  [!] No frames extracted from video');
        process.exit(1);
    }

    // Step 2 & 3: Process (watermark removal + output)
    await processFrames(rawFrames);

    // Stats
    const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
    const totalBytes = readdirSync(CFG.outputDir)
        .filter(f => f.endsWith('.webp'))
        .reduce((sum, f) => sum + statSync(join(CFG.outputDir, f)).size, 0);

    console.log(`  Done in ${elapsed}s`);
    console.log(`  ${CFG.targetFrames} WebP frames = ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  Resolution: ${CFG.outputWidth}x${CFG.outputHeight}`);
    console.log(`  Output: ${CFG.outputDir}\n`);

    // Cleanup temp
    console.log('  Cleaning up temp frames...');
    try { rmSync(CFG.tempDir, { recursive: true, force: true }); } catch { /* ignore */ }
    console.log('  Done!\n');
}

main().catch(err => { console.error('\n  Fatal:', err.message); process.exit(1); });
