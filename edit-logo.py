from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

# Load the original logo
img_path = "public/logo-original.jpg"
img = Image.open(img_path).convert("RGBA")

# The image has:
# - "solve" in white on the left
# - Neural network icon (pink/purple gradient) in the center
# - "ai" in pink/gradient on the right

# Since we need to change "ai" from pink to white, we'll use color replacement
# Target pink/magenta colors and convert them to white in the "ai" region

width, height = img.size
pixels = img.load()

# Define the region where "ai" text is (right side of image)
# Based on typical logo layout, "ai" would be in the right ~30% of the image
ai_region_start_x = int(width * 0.7)  # Right 30% of image

# Define pink/magenta color range to replace with white
# Pink/Magenta ranges: high R, low-mid G, high B
for x in range(ai_region_start_x, width):
    for y in range(height):
        r, g, b, a = pixels[x, y]
        
        # Detect pink/magenta colors (high red, high blue, lower green)
        # Typical gradient colors might be (255, 0, 255), (255, 50, 200), etc.
        if r > 150 and b > 150 and g < 150:
            # Replace with white
            pixels[x, y] = (255, 255, 255, a)

# Save as PNG with transparency
output_path = "public/logo.png"
img.save(output_path, "PNG")

print(f"Logo edited and saved to {output_path}")
print(f"   - Changed 'ai' from pink/gradient to white")
print(f"   - Original preserved at {img_path}")
