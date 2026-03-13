from PIL import Image
import numpy as np

# Load image
img = Image.open('public/logo-new.jpg').convert('RGBA')
data = np.array(img)

# Remove light background (near white)
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# Pixels where RGB are all > 200 become transparent
mask = (r > 200) & (g > 200) & (b > 200)
data[mask, 3] = 0  # Set alpha to 0 (transparent)

# Save
result = Image.fromarray(data)
result.save('public/logo-transparent.png')
print('Background removed, saved as logo-transparent.png')
