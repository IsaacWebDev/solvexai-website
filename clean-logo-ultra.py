from PIL import Image
import numpy as np
from scipy.ndimage import gaussian_filter

# Load logo
print("Loading logo...")
img = Image.open('C:/Users/isaac/.openclaw/workspace/solvexai-website/public/solvexai-logo-final.png').convert('RGBA')
data = np.array(img)

print(f"Original size: {data.shape}")

# AGGRESSIVE removal - any dark pixel becomes transparent
# Threshold: RGB < 40 (very aggressive)
print("Removing dark pixels (RGB < 40)...")
dark = (data[:,:,:3] < 40).all(axis=2)
data[dark, 3] = 0

# Also remove semi-dark pixels (RGB < 60)
print("Removing semi-dark pixels (RGB < 60)...")
semi_dark = (data[:,:,:3] < 60).all(axis=2)
data[semi_dark, 3] = (data[semi_dark, 3] * 0.3).astype(np.uint8)  # 70% more transparent

# Edge cleanup - blur then sharpen alpha
print("Smoothing edges...")
alpha = data[:,:,3].astype(float)
alpha = gaussian_filter(alpha, sigma=1)  # Smooth edges
data[:,:,3] = alpha.astype(np.uint8)

# Save ultra-clean version
output_path = 'C:/Users/isaac/.openclaw/workspace/solvexai-website/public/solvexai-logo-ultra-clean.png'
print(f"Saving to {output_path}...")
Image.fromarray(data).save(output_path)

print("✅ Ultra-clean logo created!")
print(f"   Saved: {output_path}")
