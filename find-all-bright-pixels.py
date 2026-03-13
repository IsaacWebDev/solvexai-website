from PIL import Image
import numpy as np

img = Image.open("public/logo-original.jpg").convert("RGB")
width, height = img.size
img_array = np.array(img)

print(f"Image size: {width}x{height}\n")

# Find ALL bright pink/magenta pixels anywhere in the image
bright_pink = []

for y in range(height):
    for x in range(width):
        r, g, b = img_array[y, x]
        
        # Bright pink/magenta: R>180, B>180, total brightness > 400
        if r > 180 and b > 180 and (int(r) + int(g) + int(b)) > 400:
            bright_pink.append((x, y, r, g, b))

if bright_pink:
    print(f"Found {len(bright_pink)} bright pink/magenta pixels\n")
    
    # Group by x position to find where text is
    x_positions = [x for x, _, _, _, _ in bright_pink]
    x_min = min(x_positions)
    x_max = max(x_positions)
    
    print(f"X range: {x_min} to {x_max}")
    print(f"This covers {(x_max - x_min) / width * 100:.1f}% of image width")
    print(f"Center of pink region: x={((x_min + x_max) / 2):.0f} ({(x_min + x_max) / 2 / width * 100:.1f}% across)")
    
    # Check which region this is in
    center = width / 2
    if x_max < center:
        print("→ This is in the LEFT half (likely 'solve' or neural icon)")
    elif x_min > center:
        print("→ This is in the RIGHT half (likely 'ai' text)")
    else:
        print("→ This spans BOTH halves (likely the central neural icon)")
else:
    print("No bright pink pixels found!")
