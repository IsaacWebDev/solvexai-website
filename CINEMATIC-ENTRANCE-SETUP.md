# Cinematic Entrance Setup

## Current Implementation

✅ **CinematicEntrance component created**
- Gate image display with ENTER button
- Video plays fullscreen after click
- Smooth transitions to homepage
- Skip buttons included

## Required Assets

### 1. Gate Image
**Location:** `public/images/gate.jpg` or `gate.webp`

**Requirements:**
- High resolution (at least 1920x1080)
- Château/gate aesthetic
- Dark/moody atmosphere preferred

**Current placeholder:** Using galaxy image temporarily

### 2. Intro Video
**Location:** `public/videos/intro.mp4`

**Requirements:**
- Format: MP4 (H.264 codec)
- Resolution: 1920x1080 or higher
- Duration: 3-5 seconds recommended
- Aspect ratio: 16:9
- Size: < 5MB for fast loading

**Recommended specs:**
```bash
# Compress with ffmpeg if needed:
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset fast -c:a aac -b:a 128k public/videos/intro.mp4
```

## Usage

The entrance flow:
1. User lands on site
2. Sees gate image with "ENTER" button
3. Clicks ENTER
4. Video plays fullscreen (immersive, cinematic)
5. Video ends → fades into homepage
6. localStorage saves visit (skip on return)

## Customization

Edit `app/page.tsx`:

```tsx
<CinematicEntrance
  onComplete={handleCinematicComplete}
  gateImageUrl="/images/your-gate-image.jpg"  // Change this
  videoUrl="/videos/your-intro.mp4"           // Change this
/>
```

## Skip Options

Built-in skip buttons:
- On gate screen: "Skip intro" (bottom right)
- During video: "Skip →" button

Users who've visited before automatically skip.

## Performance

- Gate image: Next.js Image component (optimized)
- Video: Preloaded, muted for autoplay
- Smooth transitions (0.5-0.8s fades)
- Fallback if video autoplay fails

## Browser Compatibility

✅ Modern browsers (Chrome, Firefox, Safari, Edge)
⚠️ Autoplay restrictions may apply on some mobile browsers
- Video is muted to bypass autoplay restrictions
- Skip button appears if autoplay fails

## Status

🟡 **Awaiting Assets:**
- [ ] Château gate image (high-res)
- [ ] Intro video (3-5 seconds, cinematic)

Once assets are added:
1. Place files in correct folders
2. Update file paths in `app/page.tsx`
3. Test on multiple devices
4. Deploy

## Alternative: Use Existing Assets

If you have specific images/videos, send them and I'll:
1. Optimize them
2. Place them correctly
3. Update all references
4. Deploy immediately
