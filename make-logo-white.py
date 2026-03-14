from PIL import Image
import numpy as np

# Load the logo
img = Image.open('public/solvexai-logo-final.png').convert('RGBA')
data = np.array(img)

# Find black pixels (RGB < 50)
black_mask = (data[:,:,0] < 50) & (data[:,:,1] < 50) & (data[:,:,2] < 50) & (data[:,:,3] > 0)

# Change black to white
data[black_mask, 0:3] = 255

# Save white version
Image.fromarray(data).save('public/solvexai-logo-white.png')
print('White logo created successfully')
