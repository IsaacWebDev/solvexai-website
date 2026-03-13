from PIL import Image
import numpy as np

# Load the original logo  
img = Image.open("public/logo-original.jpg").convert("RGBA")
width, height = img.size
img_array = np.array(img)

print(f"Image size: {width}x{height}")

# Based on analysis:
# Pink pixels in "ai" region have:
# R: 101-241, G: 24-114, B: 102-246
# Average: RGB(189, 73, 204)

# Target only the RIGHT portion (where "ai" is)
right_boundary = int(width * 0.65)  # Right 35%

# Count replacements
count = 0

# Replace pink/magenta pixels with white ONLY in the right region
for y in range(height):
    for x in range(right_boundary, width):
        r, g, b, a = img_array[y, x]
        
        # Detect pink/magenta text pixels
        # Must have: high R (>100), high B (>100), low G (<150)
        # AND must be bright enough to be text (not background)
        total_brightness = int(r) + int(g) + int(b)
        
        if r > 100 and b > 100 and g < 150 and total_brightness > 250:
            # This is a pink/magenta pixel in the "ai" region
            # Replace with white
            img_array[y, x] = [255, 255, 255, a]
            count += 1

print(f"Replaced {count} pink pixels with white in 'ai' region")

# Convert back to PIL Image
result = Image.fromarray(img_array.astype('uint8'), 'RGBA')

# Save
output_path = "public/logo-white-ai.png"
result.save(output_path, "PNG", optimize=True)

print(f"Saved to {output_path}")
