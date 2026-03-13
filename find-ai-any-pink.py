from PIL import Image

img = Image.open("public/logo-original.jpg").convert("RGB")
width, height = img.size
img_array = img.load()

print(f"Image size: {width}x{height}\n")

# Search far right for ANY shade of pink/magenta
# Pink = R > B and R > G OR B > G and B > R (magenta leans blue)
far_right_start = int(width * 0.65)

pink_shades = []

for y in range(height):
    for x in range(far_right_start, width):
        r, g, b = img_array[x, y]
        
        # Any pinkish tone: R and B both higher than G
        # Even dark/muted pinks
        if r > g and b > g and (r + b) > (g * 2):
            pink_shades.append((x, y, r, g, b))

print(f"Found {len(pink_shades)} pink-toned pixels in far right region")

if pink_shades:
    # Sample some
    print("\nSample pink pixels:")
    for x, y, r, g, b in pink_shades[:30]:
        print(f"  ({x}, {y}): RGB({r}, {g}, {b})")
    
    # Find brightest
    brightest = max(pink_shades, key=lambda p: p[2] + p[3] + p[4])
    print(f"\nBrightest pink pixel: ({brightest[0]}, {brightest[1]}): RGB({brightest[2]}, {brightest[3]}, {brightest[4]})")
else:
    print("Still no pink found! The 'ai' text might not actually be pink in this version.")
