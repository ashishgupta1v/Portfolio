import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/images/og', exist_ok=True)

WIDTH = 1200
HEIGHT = 630

POSTS = [
    {
        'slug': 'domain-driven-monoliths',
        'badge': 'SOFTWARE ARCHITECTURE',
        'title': 'Domain-Driven Monoliths:\nWhy Laravel Doesn\'t Need Microservices',
        'subtitle': 'Domain-driven boundaries inside a monolith get you most of the modularity benefits without the operational distributed systems tax.',
        'tags': ['Laravel 13', 'Domain-Driven Design', 'Modular Monoliths'],
        'accent': (94, 234, 212), # #5eead4
    },
    {
        'slug': 'human-in-the-loop-ai',
        'badge': 'PRODUCTION AI & HEALTHCARE',
        'title': 'Human-in-the-Loop AI:\nArchitecting High-Stakes WhatsApp Systems',
        'subtitle': 'Why personal coaching AI fails when left autonomous, and how asynchronous approval queues build lasting client trust.',
        'tags': ['Healthcare AI', 'Human-in-the-Loop', 'WhatsApp API', 'Vue 3'],
        'accent': (167, 139, 250), # #a78bfa
    },
    {
        'slug': 'grounding-llm-event-sourced-ledger',
        'badge': 'DATA INTEGRITY & LLM GROUNDING',
        'title': 'Grounding LLMs with an\nEvent-Sourced Habit Ledger',
        'subtitle': 'Eliminating hallucinations by coupling pgvector semantic search with an append-only event ledger and strict security envelopes.',
        'tags': ['pgvector', 'Event Sourcing', 'Prompt Guardrails', 'PostgreSQL'],
        'accent': (56, 189, 248), # #38bdf8
    },
    {
        'slug': 'zoeticoach-ai-whatsapp-accountability-engine',
        'badge': 'CASE STUDY · PRODUCTION AI',
        'title': 'ZoetiCoach AI: WhatsApp-First\nAccountability Engine',
        'subtitle': 'Event-sourced habit ledger, sub-70ms pgvector HNSW retrieval, and 0 injection breaches across 14,200+ evaluation traces.',
        'tags': ['Flagship Case Study', 'RAG Pipeline', 'Laravel Horizon', 'HNSW'],
        'accent': (94, 234, 212), # #5eead4
    },
]

def create_card(post):
    img = Image.new('RGB', (WIDTH, HEIGHT), color=(9, 14, 20)) # #090e14
    draw = ImageDraw.Draw(img)

    # Subtle ambient radial glow in background
    accent = post['accent']
    for r in range(260, 0, -4):
        alpha = int((1 - r / 260) * 22)
        glow_color = (
            int(accent[0] * alpha / 255 + 9 * (1 - alpha / 255)),
            int(accent[1] * alpha / 255 + 14 * (1 - alpha / 255)),
            int(accent[2] * alpha / 255 + 20 * (1 - alpha / 255)),
        )
        draw.ellipse([WIDTH - 320 - r, 80 - r, WIDTH - 320 + r, 80 + r], fill=glow_color)

    # Outer border / frame
    draw.rectangle([1, 1, WIDTH - 2, HEIGHT - 2], outline=(30, 41, 59), width=2)
    # Top accent bar
    draw.line([(0, 0), (WIDTH, 0)], fill=accent, width=4)

    # Fonts - try standard Windows system fonts or default
    try:
        title_font = ImageFont.truetype('arialbd.ttf', 46)
        badge_font = ImageFont.truetype('arialbd.ttf', 16)
        body_font = ImageFont.truetype('arial.ttf', 22)
        tag_font = ImageFont.truetype('arialbd.ttf', 16)
        brand_font = ImageFont.truetype('arialbd.ttf', 20)
    except Exception:
        title_font = ImageFont.load_default()
        badge_font = ImageFont.load_default()
        body_font = ImageFont.load_default()
        tag_font = ImageFont.load_default()
        brand_font = ImageFont.load_default()

    # Top Brand Header
    draw.text((70, 50), "ASHISH GUPTA", font=brand_font, fill=(248, 250, 252))
    draw.text((250, 50), "·   SENIOR FULL-STACK & AI ARCHITECT", font=body_font, fill=(148, 163, 184))

    # Category Pill Badge
    badge_text = post['badge']
    bbox = badge_font.getbbox(badge_text)
    badge_w = bbox[2] - bbox[0] + 28
    badge_h = 32
    draw.rounded_rectangle([70, 115, 70 + badge_w, 115 + badge_h], radius=6, fill=(15, 23, 42), outline=accent, width=1)
    draw.text((84, 122), badge_text, font=badge_font, fill=accent)

    # Title
    draw.text((70, 185), post['title'], font=title_font, fill=(255, 255, 255), spacing=14)

    # Subtitle / Excerpt
    sub_lines = []
    words = post['subtitle'].split(' ')
    current_line = []
    for w in words:
        current_line.append(w)
        if len(' '.join(current_line)) > 72:
            sub_lines.append(' '.join(current_line[:-1]))
            current_line = [w]
    if current_line:
        sub_lines.append(' '.join(current_line))

    draw.text((70, 365), '\n'.join(sub_lines), font=body_font, fill=(148, 163, 184), spacing=10)

    # Tags Row
    tag_x = 70
    tag_y = 510
    for tag in post['tags']:
        tbox = tag_font.getbbox(tag)
        tw = tbox[2] - tbox[0] + 24
        th = 32
        draw.rounded_rectangle([tag_x, tag_y, tag_x + tw, tag_y + th], radius=16, fill=(30, 41, 59))
        draw.text((tag_x + 12, tag_y + 8), tag, font=tag_font, fill=(226, 232, 240))
        tag_x += tw + 14

    # Bottom Right Domain
    draw.text((WIDTH - 240, 520), "ashishgupta.dev", font=brand_font, fill=(94, 234, 212))

    out_path = f"public/images/og/{post['slug']}.png"
    img.save(out_path, 'PNG', optimize=True)
    print(f"Saved {out_path} ({os.path.getsize(out_path)} bytes)")

for p in POSTS:
    create_card(p)
