from PIL import Image
import numpy as np
from scipy.ndimage import binary_erosion, gaussian_filter

# Load image 1 (molecular structure)
img = Image.open('C:/Users/isaac/.openclaw/media/inbound/file_271---db50dcfd-38c9-472e-8dec-0a399933605d.jpg').convert('RGBA')
data = np.array(img)

# NUCLEAR background removal
# Remove all white/light pixels (RGB > 150)
light_mask = (data[:,:,0] > 150) | (data[:,:,1] > 150) | (data[:,:,2] > 150)
data[light_mask, 3] = 0

# Remove semi-transparent (alpha < 200)
semi_transparent = data[:,:,3] < 200
data[semi_transparent, 3] = 0

# Aggressive erosion (clean edges)
alpha_mask = data[:,:,3] > 0
alpha_mask_clean = binary_erosion(alpha_mask, iterations=3)
data[~alpha_mask_clean, 3] = 0

# Smooth edges
alpha = data[:,:,3].astype(float)
alpha = gaussian_filter(alpha, sigma=0.8)
data[:,:,3] = alpha.astype(np.uint8)

# Save
Image.fromarray(data).save('public/logo-center-final.png')
print('Center logo cleaned')
