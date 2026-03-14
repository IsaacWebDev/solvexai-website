from PIL import Image
import numpy as np
from scipy.ndimage import binary_erosion, gaussian_filter

# Load image 2 (solve X ai text)
img = Image.open('C:/Users/isaac/.openclaw/media/inbound/file_272---c2d2c61c-c048-42ab-abb5-e45b5f551f46.jpg').convert('RGBA')
data = np.array(img)

# NUCLEAR background removal (same process)
light_mask = (data[:,:,0] > 150) | (data[:,:,1] > 150) | (data[:,:,2] > 150)
data[light_mask, 3] = 0

semi_transparent = data[:,:,3] < 200
data[semi_transparent, 3] = 0

alpha_mask = data[:,:,3] > 0
alpha_mask_clean = binary_erosion(alpha_mask, iterations=3)
data[~alpha_mask_clean, 3] = 0

alpha = data[:,:,3].astype(float)
alpha = gaussian_filter(alpha, sigma=0.8)
data[:,:,3] = alpha.astype(np.uint8)

# Save
Image.fromarray(data).save('public/solvexai-logo-final.png')
print('Name logo cleaned')
