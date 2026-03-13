from PIL import Image, ImageDraw, ImageEnhance
import numpy as np

# Load the original logo
img_path = "public/logo-original.jpg"
img = Image.open(img_path).convert("RGBA")

width, height = img.size
pixels = img.load()

print(f"Processing image: {width}x{height}")

# The "ai" text is on the right side
# Let's be more aggressive with pink/magenta replacement
ai_region_start_x = int(width * 0.65)  # Right 35% of image

replaced_count = 0

for x in range(ai_region_start_x, width):
    for y in range(height):
        r, g, b, a = pixels[x, y]
        
        # More aggressive pink/magenta detection
        # Looking for colors where:
        # - Red is relatively high (>100)
        # - Blue is relatively high (>100) 
        # - Green is lower than both red and blue
        # This catches pink, magenta, purple gradients
        
        if r > 100 and b > 100 and g < max(r, b):
            # Replace with white
            pixels[x, y] = (255, 255, 255, a)
            replaced_count += 1

print(f"Replaced {replaced_count} pixels in 'ai' region")

# Also try to catch any remaining purple/pink tones in the right area
for x in range(ai_region_start_x, width):
    for y in range(height):
        r, g, b, a = pixels[x, y]
        
        # Catch lighter pink/purple shades
        if r > 150 or b > 150:
            if g < 200 and (r > g or b > g):
                pixels[x, y] = (255, 255, 255, a)

# Save as PNG with transparency
output_path = "public/logo.png"
img.save(output_path, "PNG", optimize=True)

print(f"Logo saved to {output_path}")
print("'ai' text changed from pink/gradient to white")
