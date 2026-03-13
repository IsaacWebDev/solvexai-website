# DNA Helix Video Background

## Video Requirements
- **Format:** WebM (primary) + MP4 (fallback)
- **Resolution:** 1920x1080 minimum (4K preferred)
- **Duration:** 15 seconds (seamless loop)
- **File Size:** <5MB (compressed)
- **FPS:** 30 or 60

## Generation Options

### Option 1: Kling AI (Recommended)
**Prompt:**
```
Cinematic DNA double helix animation, electric blue (#00F0FF) glowing structure slowly rotating and swirling across pure black background, smooth camera movement circling the helix, dynamic cyan lighting, particles floating around helix, seamless loop, 4K quality, 15 seconds duration, professional motion graphics, immersive atmosphere
```

### Option 2: Fallback CSS Animation
If video generation is unavailable, the homepage uses a CSS gradient fallback:
```css
background: linear-gradient(to bottom right, black, #172554, black);
opacity: 0.4;
```

## Placement
- `dna-helix.webm` - Primary (WebM format, better compression)
- `dna-helix.mp4` - Fallback (wider browser support)
- `dna-helix-poster.jpg` - Poster image (shows while loading)

## Compression
Use FFmpeg to compress:
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -c:a copy dna-helix.mp4
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 dna-helix.webm
```
