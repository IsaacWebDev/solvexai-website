from PIL import Image
import numpy as np

# Load the original logo
img = Image.open("public/logo-original.jpg").convert("RGBA")
width, height = img.size

print(f"Image size: {width}x{height}")

# Convert to numpy array for easier manipulation
img_array = np.array(img)

# Define regions (rough estimates based on typical logo layout)
# "solve" is on the left, "ai" is on the right
# Neural network icon is in the center

# Right 30% is where "ai" text is
ai_region_start = int(width * 0.70)

print(f"Processing 'ai' region from x={ai_region_start} to x={width}")

# For all pixels in the "ai" region
for x in range(ai_region_start, width):
    for y in range(height):
        r, g, b, a = img_array[y, x]
        
        # Detect non-black colors (anything that's part of text)
        # If the pixel is bright enough to be text (not background)
        if r > 50 or g > 50 or b > 50:
            # Check if it's pink/magenta/purple (R and B > G)
            if r > g and b > g:
                # Make it pure white
                img_array[y, x] = [255, 255, 255, a]

# Convert back to PIL Image
result = Image.fromarray(img_array, 'RGBA')

# Save with a new name to bust cache
output_path = "public/logo.png"
result.save(output_path, "PNG", optimize=True, quality=100)

print(f"\nLogo saved to {output_path}")
print("Changed 'ai' text from pink/magenta to white")

# Also save a version with a different filename to force cache bust
cache_bust_path = "public/logo-v2.png"
result.save(cache_bust_path, "PNG", optimize=True, quality=100)
print(f"Also saved as {cache_bust_path} for cache busting")
