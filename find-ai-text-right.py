from PIL import Image
import numpy as np

# Load original
img = Image.open("public/logo-original.jpg").convert("RGB")
width, height = img.size
img_array = np.array(img)

print(f"Image size: {width}x{height}")

# Search in the FAR RIGHT where "ai" should be
# If logo is centered, "ai" should be around 75-90% across
far_right_start = int(width * 0.75)
far_right_end = width

print(f"\nSearching in FAR RIGHT region: x={far_right_start} to {far_right_end}")
print("Looking for ANY non-black pixels (should be the 'ai' text)...\n")

text_pixels = []

for y in range(height):
    for x in range(far_right_start, far_right_end):
        r, g, b = img_array[y, x]
        
        # Any pixel that's not near-black
        total = int(r) + int(g) + int(b)
        if total > 100:  # Anything brighter than dark background
            text_pixels.append((x, y, r, g, b))

if text_pixels:
    print(f"Found {len(text_pixels)} non-black pixels in far right")
    
    # Show sample
    print("\nSample of 30 pixels:")
    for i, (x, y, r, g, b) in enumerate(text_pixels[:30]):
        print(f"  Position ({x}, {y}): RGB({r}, {g}, {b})")
    
    # Get color distribution
    colors = {}
    for _, _, r, g, b in text_pixels:
        color = (r, g, b)
        colors[color] = colors.get(color, 0) + 1
    
    print(f"\nTop 10 most common colors:")
    for color, count in sorted(colors.items(), key=lambda x: x[1], reverse=True)[:10]:
        print(f"  RGB{color}: {count} pixels")
else:
    print("NO TEXT FOUND in far right region!")
    print("'ai' text must be in a different location.")
