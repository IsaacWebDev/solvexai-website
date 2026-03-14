#!/usr/bin/env python3
"""
NUCLEAR-CLEAN LOGO SCRIPT
Removes ALL background from logos aggressively
"""

from PIL import Image
import numpy as np
from scipy.ndimage import binary_erosion, gaussian_filter
import os

def nuclear_clean_logo(input_path, output_path):
    """
    Ultra-aggressive background removal
    Removes EVERYTHING that's not pure color
    """
    print(f"Nuclear-cleaning: {input_path}")
    
    # Load image
    img = Image.open(input_path).convert('RGBA')
    data = np.array(img)
    
    # NUCLEAR option - remove EVERYTHING that's not pure color
    # Remove all light pixels (RGB > 150)
    light_mask = (data[:,:,0] > 150) | (data[:,:,1] > 150) | (data[:,:,2] > 150)
    data[light_mask, 3] = 0
    
    # Remove semi-transparent pixels (alpha < 200)
    semi_transparent = data[:,:,3] < 200
    data[semi_transparent, 3] = 0
    
    # Erode edges aggressively (iterations=3)
    alpha_mask = data[:,:,3] > 0
    alpha_mask_clean = binary_erosion(alpha_mask, iterations=3)
    data[~alpha_mask_clean, 3] = 0
    
    # Smooth edges
    alpha = data[:,:,3].astype(float)
    alpha = gaussian_filter(alpha, sigma=0.8)
    data[:,:,3] = alpha.astype(np.uint8)
    
    # Save nuclear-clean version
    Image.fromarray(data).save(output_path)
    print(f'Nuclear-clean logo saved: {output_path}')

if __name__ == '__main__':
    # Get script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    public_dir = os.path.join(os.path.dirname(script_dir), 'public')
    
    # Clean both logos
    logos = [
        ('solvexai-logo-ultra-clean.png', 'solvexai-logo-nuclear-clean.png'),
        ('logo-center.png', 'logo-center-nuclear-clean.png')
    ]
    
    for input_name, output_name in logos:
        input_path = os.path.join(public_dir, input_name)
        output_path = os.path.join(public_dir, output_name)
        
        if os.path.exists(input_path):
            nuclear_clean_logo(input_path, output_path)
        else:
            print(f'Not found: {input_path}')
    
    print('\nAll logos nuclear-cleaned!')
