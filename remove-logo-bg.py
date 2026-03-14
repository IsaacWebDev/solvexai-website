from PIL import Image
import numpy as np

# Load the image
img = Image.open('public/logo-molecular-original.jpg').convert('RGBA')
data = np.array(img)

# Get RGB channels (ignore alpha for now)
r, g, b, a = data[:,:,0], data[:,:,1], data[:,:,2], data[:,:,3]

# Black background removal: any pixel that's dark (RGB < 30) becomes transparent
# White logo pixels (RGB > 200) stay fully opaque
black_mask = (r < 30) & (g < 30) & (b < 30)

# Set alpha channel: 0 for black pixels, 255 for everything else
data[:,:,3] = np.where(black_mask, 0, 255)

# Create new image with transparent background
img_transparent = Image.fromarray(data, 'RGBA')

# Save as PNG (supports transparency)
img_transparent.save('public/logo-molecular-white.png')
print("✓ Background removed successfully")
print("✓ Saved as: public/logo-molecular-white.png")
