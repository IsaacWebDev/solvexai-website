from PIL import Image
import numpy as np

# Load and analyze the original logo
img = Image.open("public/logo-original.jpg").convert("RGB")
width, height = img.size
img_array = np.array(img)

print(f"Image size: {width}x{height}")
print("\nSampling colors from different regions:")

# Sample left side (should be "solve" - white)
left_sample_x = int(width * 0.2)
left_sample_y = int(height * 0.5)
left_color = img_array[left_sample_y, left_sample_x]
print(f"\nLeft side (solve) at ({left_sample_x}, {left_sample_y}): RGB{tuple(left_color)}")

# Sample center (neural network icon)
center_x = int(width * 0.5)
center_y = int(height * 0.5)
center_color = img_array[center_y, center_x]
print(f"Center (icon) at ({center_x}, {center_y}): RGB{tuple(center_color)}")

# Sample right side ("ai" text)
right_sample_x = int(width * 0.8)
right_sample_y = int(height * 0.5)
right_color = img_array[right_sample_y, right_sample_x]
print(f"Right side (ai) at ({right_sample_x}, {right_sample_y}): RGB{tuple(right_color)}")

# Let's find all pink/magenta pixels in the right portion
right_start = int(width * 0.65)
print(f"\nAnalyzing right region from x={right_start}...")

pink_pixels = []
for x in range(right_start, width):
    for y in range(height):
        r, g, b = img_array[y, x]
        # Pink/magenta: high R, low G, high B
        if r > 100 and b > 100 and g < 150:
            pink_pixels.append((r, g, b))

if pink_pixels:
    avg_pink = np.mean(pink_pixels, axis=0)
    print(f"Found {len(pink_pixels)} pink/magenta pixels")
    print(f"Average pink color: RGB({int(avg_pink[0])}, {int(avg_pink[1])}, {int(avg_pink[2])})")
    
    # Get color range
    pink_array = np.array(pink_pixels)
    print(f"R range: {pink_array[:,0].min()}-{pink_array[:,0].max()}")
    print(f"G range: {pink_array[:,1].min()}-{pink_array[:,1].max()}")
    print(f"B range: {pink_array[:,2].min()}-{pink_array[:,2].max()}")
