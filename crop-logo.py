from PIL import Image
import numpy as np

# Load full logo
img = Image.open('public/solvexai-logo-perfect.png').convert('RGBA')
data = np.array(img)

# Get dimensions
h, w = data.shape[:2]

# Crop to center X/DNA helix only (middle 40% of width)
left = int(w * 0.3)
right = int(w * 0.7)
cropped = data[:, left:right]

# Save cropped X
Image.fromarray(cropped).save('public/logo-center.png')

print('X/DNA helix cropped and saved to logo-center.png')
print(f'Original size: {w}x{h}')
print(f'Cropped size: {right-left}x{h}')
