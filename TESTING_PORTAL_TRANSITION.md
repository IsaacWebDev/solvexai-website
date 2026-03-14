# 🧪 Portal Transition Testing Guide

## Quick Test (Local Development)

### 1. Start Dev Server
```bash
cd C:\Users\isaac\.openclaw\workspace\solvexai-website
npm run dev
```

### 2. Clear Intro Cache (if you've already seen it)
Open browser console (F12) and run:
```javascript
localStorage.removeItem('solvexai-intro-seen');
```
Then refresh the page.

### 3. Trigger Transition
1. **Wait for Matrix animation** to load (purple/blue code rain)
2. **Wait for logo** to fade in (~1s)
3. **Wait for [ENTER] button** to appear (~1.5s)
4. **Click [ENTER]** or press **Enter key**
5. **Watch the magic** 🚀

---

## What to Look For

### ✅ Phase 1: Initial Click (0s)
- [ENTER] button should respond to click
- Logo + button start fading out
- No delay or lag

### ✅ Phase 2: Acceleration (0-0.5s)
- Matrix code particles **start moving toward you**
- Movement should be smooth, not jerky
- Vignette (dark edges) fades in
- Screen subtly widens (FOV increase)

### ✅ Phase 3: Warp Tunnel (0.5-1.5s)
- **Particles rush past rapidly**
- **Particles grow in size** as they approach
- **Fish-eye effect** (screen feels curved)
- **Tunnel sensation** (depth perception)
- Vignette intensifies

### ✅ Phase 4: Peak Warp (1.5-1.8s)
- **Maximum speed**
- **Brief cyan/white FLASH** (should be intense but not blinding)
- Particles at largest size
- Peak motion blur (Enhanced version only)

### ✅ Phase 5: Deceleration (1.8-2.3s)
- Speed **smoothly decreases**
- FOV returns to normal
- Vignette fades out
- Portal overlay fades to transparent

### ✅ Phase 6: Homepage Reveal (2.3s+)
- Homepage **smoothly appears**
- Ocean jellyfish background visible
- Navigation bar present
- No jarring cut or flash

---

## Performance Checks

### Frame Rate
- Open DevTools → Performance tab
- Record during transition
- **Target: 60 FPS sustained**
- Accept: 50+ FPS acceptable
- ⚠️ If <30 FPS: reduce particles or use Core version

### Network
- Transition should work **even without internet** after first load
- Three.js loaded from node_modules (local)

### Browser Compatibility
Test in:
- ✅ Chrome (recommended)
- ✅ Edge
- ✅ Firefox
- ⚠️ Safari (may have slight performance differences)
- ⚠️ Mobile (may need particle reduction)

---

## Common Issues & Fixes

### Issue: "Intro doesn't show on refresh"
**Cause:** localStorage remembers you've seen it  
**Fix:**
```javascript
localStorage.removeItem('solvexai-intro-seen');
// Then refresh
```

### Issue: "Particles don't move"
**Cause:** Canvas not rendering  
**Fix:**
1. Check browser console for errors
2. Ensure WebGL is enabled: `chrome://gpu`
3. Try hard refresh (Ctrl+Shift+R)

### Issue: "Transition stutters/lags"
**Cause:** Too many particles for device  
**Fix:** Reduce particle count
```tsx
// In PortalTransition.tsx or EnhancedPortalTransition.tsx
const particleCount = 1500; // Down from 2500
```

### Issue: "Flash is too bright"
**Cause:** Flash opacity too high  
**Fix:**
```tsx
// In transition file, find:
animate={{ opacity: [0, 0.6, 0] }}
// Change to:
animate={{ opacity: [0, 0.4, 0] }}
```

### Issue: "Transition too fast/slow"
**Cause:** Phase durations need adjustment  
**Fix:** Modify timeline in PortalTransition.tsx:
```tsx
const timeline = [
  { phase: 'zoom', delay: 0, duration: 700 },      // Slower (was 500)
  { phase: 'warp', delay: 700, duration: 1200 },   // Slower (was 1000)
  { phase: 'landing', delay: 1900, duration: 900 },// Slower (was 800)
  { phase: 'complete', delay: 2800, duration: 0 }  // Adjusted
];
```

### Issue: "Black screen after transition"
**Cause:** Z-index conflict or onComplete not firing  
**Fix:**
1. Check browser console for errors
2. Verify `onComplete` callback exists in parent component
3. Check z-index: portal (10000) > intro (9999)

---

## A/B Test: Core vs Enhanced

### Test Both Versions
1. **Default (Core):**
   - Already set up in IntroScreen.tsx
   - Test as-is

2. **Enhanced:**
   - Open `components/IntroScreen.tsx`
   - Change line 5:
   ```tsx
   // From:
   import { PortalTransition } from './transitions/PortalTransition';
   
   // To:
   import { EnhancedPortalTransition as PortalTransition } from './transitions/EnhancedPortalTransition';
   ```
   - Save and test

### Comparison Points
| Aspect | Core | Enhanced |
|--------|------|----------|
| Speed lines | ❌ | ✅ |
| Lighting effects | ❌ | ✅ |
| Dynamic vignette | Static | Animated |
| Flash effect | Simple | Gradient |
| Performance | 60 FPS | 55-60 FPS |
| File size | Smaller | +3KB |

---

## Mobile Testing

### Responsive Design
Test on:
- iPhone (Safari)
- Android (Chrome)
- iPad

### Expected Behavior
- **Portrait:** Particles should fill screen
- **Landscape:** Wider tunnel effect
- **Touch:** [ENTER] button clickable

### Performance Tweaks for Mobile
If FPS drops below 30:
```tsx
// Add at top of CodeTunnel component
const isMobile = window.innerWidth < 768;
const particleCount = isMobile ? 1000 : 2500;
```

---

## Debug Mode

### Enable Detailed Logging
Add to PortalTransition.tsx:
```tsx
useEffect(() => {
  if (!isActive) return;
  
  console.log('[Portal] Transition started');
  
  timeline.forEach(({ phase, delay }) => {
    setTimeout(() => {
      console.log(`[Portal] Phase: ${phase}`);
      setPhase(phase as any);
    }, delay);
  });
}, [isActive]);
```

### Monitor Phase Changes
Open console and watch for:
```
[Portal] Transition started
[Portal] Phase: zoom
[Portal] Phase: warp
[Portal] Phase: landing
[Portal] Phase: complete
```

---

## Final Checklist

Before deploying to production:

- [ ] Test in Chrome (primary browser)
- [ ] Test in Firefox
- [ ] Test on mobile device
- [ ] Verify 60 FPS on desktop
- [ ] Verify 30+ FPS on mobile
- [ ] Confirm flash isn't blinding
- [ ] Confirm transition feels smooth (no jank)
- [ ] Verify homepage loads correctly after
- [ ] Test with slow 3G throttling (DevTools)
- [ ] Verify localStorage persistence works
- [ ] Test keyboard trigger (Enter key)
- [ ] Test mouse click trigger

---

## Video Recording (for Review)

### Record the Transition
1. Clear localStorage
2. Start screen recording (Win+G on Windows)
3. Refresh page
4. Wait for intro
5. Click [ENTER]
6. Record full transition + homepage load
7. Stop recording
8. Review at 0.5× speed to spot issues

### What to Look For in Slow-Mo
- Particle movement (should be continuous)
- Frame drops (stuttering)
- Z-index issues (elements appearing in wrong order)
- Timing issues (phases too fast/slow)

---

## Success Metrics

### Excellent ✅
- 60 FPS throughout
- Smooth acceleration/deceleration
- Flash is impactful but not jarring
- Users say "Wow!" or "That's sick!"

### Good ✔️
- 50+ FPS
- Slight stutter on low-end devices
- Transition feels intentional

### Needs Work ⚠️
- <30 FPS
- Jarring cuts
- Users confused about what happened

---

## Advanced Tweaks (Optional)

### Add Sound Effect
1. Get sound file: `portal-whoosh.mp3`
2. Place in `public/sounds/`
3. Add to transition:
```tsx
const handleEnter = () => {
  const audio = new Audio('/sounds/portal-whoosh.mp3');
  audio.volume = 0.5;
  audio.play();
  setShowTransition(true);
};
```

### Add Haptic Feedback (Mobile)
```tsx
if (navigator.vibrate) {
  navigator.vibrate([50, 30, 50]); // Buzz pattern
}
```

### Custom Particle Characters (Matrix Style)
Replace colored dots with actual letters (requires more work):
- Use THREE.TextGeometry
- Or use sprite-based text textures
- Renders "A", "B", "0", "1" instead of dots

---

## Getting Help

### If Something's Broken
1. Check browser console for errors
2. Verify all files exist:
   - `components/transitions/PortalTransition.tsx`
   - `components/transitions/EnhancedPortalTransition.tsx`
   - `components/IntroScreen.tsx` (updated)
3. Run build: `npm run build`
4. Check for TypeScript errors

### Performance Issues
1. Reduce particle count
2. Use Core instead of Enhanced
3. Disable motion blur
4. Test on different device

---

**Happy Testing!** 🚀

If transition feels **epic and cinematic** → Deploy ✅  
If something feels off → Tweak timing/particles → Test again → Deploy ✅
