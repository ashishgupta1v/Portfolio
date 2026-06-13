---
slug: "krishan-balram-gaushala-devotee-engagement-platform"
title: "Krishan Balram Gaushala: Building an Automation-Driven Devotee Engagement & Event Management Portal"
summary: "How I transitioned a traditional community organization from paper registries to an automated, digital-first devotee engagement platform under strict hosting budgets."
client: "Krishan Balram Gaushala"
role: "Lead Full-Stack Engineer"
industry: "Non-Profit / Community Platform"
timeline: "2025"
published_at: "2026-06-13"
featured_outcome: "Automated 100% of devotee milestone wishing, achieved a 99.1% payload reduction on media uploads via browser canvas compression, and implemented an uninterrupted SPA ambient audio engine."
permission_status: "client approved"
seo_title: "Krishan Balram Gaushala Case Study | Devotee Engagement Platform"
seo_description: "Read how I built a devotee portal for Krishan Balram Gaushala with Laravel, Vue 3, client-side Canvas compression, persistent audio, and SQLite WAL."
tags: ["Case Study", "WhatsApp API", "PWA", "Full-Stack", "Mobile Optimization"]
stack: ["Laravel", "Vue 3", "Inertia.js", "Vite", "Pinia", "SQLite (WAL Mode)", "Green-API"]
---

## Executive Summary

Krishan Balram Gaushala is a prominent cow shelter in Ludhiana, Punjab, managing relationships with thousands of local devotees, donors, and volunteers. Transitioning from paper registries to an automated, digital-first devotee engagement platform required a design that could run efficiently on extremely lightweight, cost-effective hosting.

By architecting a decoupled Laravel and Vue 3 application integrated via Inertia.js, I built a devotee portal that automates daily blessings via Green-API (WhatsApp), implements client-side Canvas image compression for a 99.1% bandwidth saving, configures SQLite WAL mode for concurrency, and utilizes a Pinia-wrapped HTML5 audio architecture for uninterrupted devotional music streaming across route transitions.

## The Situation & Challenge (The \"Why\")

The gaushala operates with limited technical staff and a restricted hosting budget, but services a highly active community of devotees who primarily access the internet via mobile devices. The project presented several critical challenges:

* **Manual Outreach Bottlenecks:** Staff had to manually check physical registers daily and type out individual WhatsApp birthday/anniversary blessings to thousands of devotees.
* **Infrastructure Constraints:** The system needed to run on lightweight, cost-effective hosting without expensive VPS requirements, demanding highly optimized resource usage.
* **Devotee Retention:** The shelter needed a modern, welcoming mobile-first gateway that could engage devotees through devotional media, upcoming events, and instant sign-ups.

## The Technical Hurdles (The Engineering \"Action\")

### A. The Media Payload Challenge (99%+ Bandwidth Saving)
* **Problem:** Devotees uploaded raw high-resolution profile photos (up to 15MB) from their smartphones. Serving these huge original images inside tiny `44x44` navigation avatars caused severe dashboard load lags. Furthermore, the server's environment lacked PHP's `GD`/`Imagick` libraries, meaning the server could not compress the files.
* **Solution:** Built an in-browser image pipeline inside Vue using the **HTML5 Canvas API**. It intercepts file uploads, downscales the largest side to `400px` preserving aspect ratio, and exports it as an `80%` quality compressed JPEG.
* **Engineering Impact:** Reduced image file sizes from **1.36 MB to 11.4 KB** (a `99.1%` payload reduction), ensuring instant load times and saving gigabytes of hosting storage.

```typescript
export function useImageCompressor() {
    const compress = (file: File, maxW = 400, maxH = 400, quality = 0.8): Promise<Blob> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target?.result as string;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    if (width > height) {
                        if (width > maxW) {
                            height = Math.round((height * maxW) / width);
                            width = maxW;
                        }
                    } else {
                        if (height > maxH) {
                            width = Math.round((width * maxH) / height);
                            height = maxH;
                        }
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    if (!ctx) return reject(new Error('Canvas context not available'));

                    ctx.drawImage(img, 0, 0, width, height);
                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                resolve(blob);
                            } else {
                                reject(new Error('Canvas compression failed'));
                            }
                        },
                        'image/jpeg',
                        quality
                    );
                };
            };
            reader.onerror = (err) => reject(err);
        });
    };

    return { compress };
}
```

### B. SQLite Concurrency Control (WAL Mode Optimization)
* **Problem:** Using SQLite on a platform with concurrent web requests (devotee logins, updates) alongside background workers (dispatched queue workers sending bulk WhatsApp wishes) frequently triggered `"Database is locked"` transaction exceptions.
* **Solution:** Optimized the SQLite engine within Laravel by enabling **WAL (Write-Ahead Logging)** mode and adjusting the connection config with a `60000ms` `busy_timeout` threshold.
* **Engineering Impact:** Enabled safe concurrent read/write transactions, preventing system lockouts and job worker crashes.

### C. Persistent SPA Ambient Audio Architecture
* **Problem:** Devotees expect a serene experience with devotional chants (Bhajans) playing in the background. However, browser security policies restrict automatic audio play on page loads, and standard page routing disrupts audio media tags.
* **Solution:** Created a global audio manager using **Pinia** and HTML5 Audio.
  * Implemented an async `HEAD` validation pre-flight check to test local file availability and dynamically swap to CDN fallbacks when needed.
  * Added global event listeners (`click` and `touchstart`) to bypass autoplay policies, and added cache-busting version queries to force audio updates.
* **Engineering Impact:** Provides uninterrupted, clean audio that persists gracefully as users navigate across dashboard pages.

### D. Progressive Web App (PWA) Install Funnel
* **Problem:** Devotees, particularly older ones, needed quick access to the app without having to search an App Store.
* **Solution:** Configured full PWA compliance and designed a custom banner that detects user browser environments:
  * **Android/Chrome:** Listens to `beforeinstallprompt` and launches the native APK installation overlay.
  * **iOS/Safari:** Shows a step-by-step guidance popup demonstrating how to add the page to the Home Screen using the Safari Share sheet.

## Key Results & Impact Metrics (The \"Result\")

* **Outreach Automation:** Automated 100% of devotee birthday and anniversary blessings, saving hours of manual labor daily.
* **Performance Gains:** Achieved a sub-second load time on the profile dashboard.
* **Operational Savings:** Kept hosting costs at a bare minimum by utilizing SQLite and client-side media compression.

## Visual Assets Checklist for Your Portfolio

To make the case study visually pop, include:
1. **Desktop & Mobile Mockups:** Side-by-side screenshots of the responsive devotee dashboard (profile details + upcoming events feed).
2. **Architecture Diagram:** A simple flow chart showing how devotee registration triggers the **Green-API Queue Worker** to send a welcome message.
3. **Interactive Toggle Preview:** A GIF or short clip showcasing the floating glassmorphic audio control button dynamically playing/pausing music.
4. **PWA Overlay Screenshot:** The custom iOS Safari installation banner showing the step-by-step guide.
