# scripts/generate-template-mockups.py
from PIL import Image, ImageDraw, ImageFont
import os

templates = [
    {"name": "Restaurant Delight", "gradient": ("#FF6B35", "#F7931E"), "price": 497},
    {"name": "Law Firm Authority", "gradient": ("#004E89", "#1A759F"), "price": 697},
    {"name": "Fitness Studio Energy", "gradient": ("#FF9F1C", "#FFBF69"), "price": 597},
    {"name": "Real Estate Luxury", "gradient": ("#B8860B", "#DAA520"), "price": 897},
    {"name": "E-Commerce Clean", "gradient": ("#8B5CF6", "#3B82F6"), "price": 997},
    {"name": "Medical Practice", "gradient": ("#10B981", "#34D399"), "price": 797}
]

os.makedirs('public/template-mockups', exist_ok=True)

for template in templates:
    # Create 1200x750 image
    img = Image.new('RGB', (1200, 750), color=template['gradient'][0])
    draw = ImageDraw.Draw(img)
    
    # Draw gradient (simple vertical)
    for y in range(750):
        ratio = y / 750
        r1, g1, b1 = tuple(int(template['gradient'][0][i:i+2], 16) for i in (1, 3, 5))
        r2, g2, b2 = tuple(int(template['gradient'][1][i:i+2], 16) for i in (1, 3, 5))
        r = int(r1 + (r2 - r1) * ratio)
        g = int(g1 + (g2 - g1) * ratio)
        b = int(b1 + (b2 - b1) * ratio)
        draw.rectangle([(0, y), (1200, y+1)], fill=(r, g, b))
    
    # Add template name (center)
    try:
        font = ImageFont.truetype("arial.ttf", 80)
    except:
        font = ImageFont.load_default()
    
    text = template['name']
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    x = (1200 - text_width) / 2
    y = (750 - text_height) / 2
    
    # Text shadow
    draw.text((x+4, y+4), text, fill=(0, 0, 0, 128), font=font)
    # Text
    draw.text((x, y), text, fill=(255, 255, 255), font=font)
    
    # Save
    filename = template['name'].lower().replace(' ', '-')
    img.save(f'public/template-mockups/{filename}.jpg', 'JPEG', quality=90)
    print(f'[OK] Created {filename}.jpg')

print('[SUCCESS] All template mockups created')
