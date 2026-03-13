from PIL import Image
import numpy as np

# Load original
img = Image.open("public/logo-original.jpg").convert("RGB")
width, height = img.size
img_array = np.array(img)

print(f"Image size: {width}x{height}")
print("\nSearching for bright pink/magenta pixels (the 'ai' text)...\n")

# Find the brightest pink pixels
pink_locations = []

for y in range(height):
    for x in range(int(width * 0.6), width):  # Right 40%
        r, g, b = img_array[y, x]
        
        # Look for bright magenta/pink pixels
        # These should be the "ai" text
        if r > 150 and b > 150:  # Bright red and blue = magenta/pink
            pink_locations.append((x, y, r, g, b))

if pink_locations:
    # Sort by brightness
    pink_locations.sort(key=lambda p: p[2] + p[4], reverse=True)
    
    print("Top 20 brightest pink pixels (likely 'ai' text):")
    for i, (x, y, r, g, b) in enumerate(pink_locations[:20]):
        print(f"  {i+1}. Position ({x}, {y}): RGB({r}, {g}, {b})")
    
    print(f"\nTotal pink pixels found: {len(pink_locations)}")
    
    # Get unique colors
    colors = set((r, g, b) for _, _, r, g, b in pink_locations)
    print(f"Unique pink colors: {len(colors)}")
    
    if len(colors) <= 50:
        print("\nAll unique pink colors:")
        for color in sorted(colors, reverse=True):
            print(f"  RGB{color}")
