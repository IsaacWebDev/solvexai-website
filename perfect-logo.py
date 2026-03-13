from PIL import Image
import numpy as np
from scipy.ndimage import gaussian_filter, binary_erosion

# Load the ultra-clean logo
img = Image.open('C:/Users/isaac/.openclaw/workspace/solvexai-website/public/solvexai-logo-ultra-clean.png').convert('RGBA')
data = np.array(img)

print(f"Original shape: {data.shape}")
print(f"Original non-transparent pixels: {np.sum(data[:,:,3] > 0)}")

# ULTRA AGGRESSIVE - focus on X/helix area
# Remove anything darker than RGB 50
dark = (data[:,:,:3] < 50).all(axis=2)
data[dark, 3] = 0
print(f"After removing RGB < 50: {np.sum(data[:,:,3] > 0)}")

# Semi-dark (RGB < 80) - make 90% transparent
semi_dark = ((data[:,:,:3] < 80).all(axis=2)) & (data[:,:,3] > 0)
data[semi_dark, 3] = (data[semi_dark, 3] * 0.1).astype(np.uint8)
print(f"After semi-dark removal: {np.sum(data[:,:,3] > 0)}")

# Edge cleanup - erode alpha slightly to remove fringe
alpha_mask = data[:,:,3] > 0
alpha_mask_clean = binary_erosion(alpha_mask, iterations=1)
data[~alpha_mask_clean, 3] = 0
print(f"After edge cleanup: {np.sum(data[:,:,3] > 0)}")

# Smooth edges
alpha = data[:,:,3].astype(float)
alpha = gaussian_filter(alpha, sigma=0.8)
data[:,:,3] = alpha.astype(np.uint8)

# Save the perfect logo
output_path = 'C:/Users/isaac/.openclaw/workspace/solvexai-website/public/solvexai-logo-perfect.png'
Image.fromarray(data).save(output_path)
print(f"[SUCCESS] Perfect logo saved to: {output_path}")
print(f"Final non-transparent pixels: {np.sum(data[:,:,3] > 0)}")
