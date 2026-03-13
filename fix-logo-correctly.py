from PIL import Image

# Load original logo
img = Image.open("public/logo-original.jpg").convert("RGBA")
width, height = img.size
pixels = img.load()

print(f"Processing logo: {width}x{height}")

# Target the far RIGHT region where "ai" text is (rightmost 35%)
ai_region_start = int(width * 0.65)

count = 0

# Replace ALL pink/magenta tones with white in the "ai" region
for y in range(height):
    for x in range(ai_region_start, width):
        r, g, b, a = pixels[x, y]
        
        # Detect pink/magenta pixels:
        # - R and B both greater than G
        # - Total brightness > 100 (exclude near-black background)
        # - Either R > 100 OR B > 100 (catch medium-bright pinks)
        
        total = r + g + b
        
        if total > 100 and r > g and b > g and (r > 100 or b > 100):
            # This is a pink/magenta pixel - replace with white
            pixels[x, y] = (255, 255, 255, a)
            count += 1

print(f"Replaced {count} pink pixels with white in 'ai' region")

# Save
output = "public/logo-fixed.png"
img.save(output, "PNG", optimize=True)
print(f"Saved to {output}")
