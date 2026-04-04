const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const seqDir = path.resolve(__dirname, 'public/sequence');
const MAX_FRAMES = 90;

async function run() {
    let beforeSize = 0;
    let afterSize = 0;
    
    // Process frames 0000 to 0089
    for (let i = 0; i < MAX_FRAMES; i++) {
        const id = String(i).padStart(4, '0');
        const file = path.join(seqDir, `${id}.webp`);
        const temp = path.join(seqDir, `${id}_temp.webp`);
        
        if (fs.existsSync(file)) {
            const statBefore = fs.statSync(file);
            beforeSize += statBefore.size;
            
            // Re-encode
            await sharp(file)
                .webp({ quality: 65 })
                .toFile(temp);
                
            fs.unlinkSync(file);
            fs.renameSync(temp, file);
            
            const statAfter = fs.statSync(file);
            afterSize += statAfter.size;
            
            if (i % 10 === 0) console.log(`Processed ${i}/${MAX_FRAMES} frames...`);
        }
    }
    
    // Delete remaining frames > 89
    let deleted = 0;
    for (let i = MAX_FRAMES; i < 200; i++) {
        const id = String(i).padStart(4, '0');
        const file = path.join(seqDir, `${id}.webp`);
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            deleted++;
        }
    }
    
    console.log(`\nCompression Results:`);
    console.log(`Original size of kept frames: ${(beforeSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Compressed size: ${(afterSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Deleted ${deleted} frames from the end of the sequence.`);
}

run().catch(console.error);
