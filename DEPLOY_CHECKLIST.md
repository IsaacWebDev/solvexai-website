# SolveXAI Redesign - Deployment Checklist

## ✅ COMPLETED (Automated)

- [✅] Jellyfish base image generated (4K, photorealistic)
- [✅] Logo backgrounds removed (NUCLEAR cleanup)
- [✅] RealisticJellyfishBG component created
- [✅] All pages updated (app/page.tsx, Navigation, IntroScreen)
- [✅] Old LED jellyfish files deleted
- [✅] Old logo files deleted
- [✅] Build successful (TypeScript clean)
- [✅] All routes working

---

## ⏳ MANUAL STEPS (Isaac)

### Step 1: Generate Kling AI Video (45-60 min)

1. **Open browser:** https://klingai.com
2. **Upload image:** 
   ```
   C:\Users\isaac\.openclaw\workspace\solvexai-website\2026-03-14-04-16-06-jellyfish-base.png
   ```
3. **Paste prompt:**
   ```
   Jellyfish swimming gracefully through water. Smooth floating motion from left to right. Tentacles flowing naturally. Subtle pulsing of bell. Slow, elegant movement. 10-second loop. Cinematic underwater lighting. Maintain photorealistic quality.
   ```
4. **Settings:**
   - Duration: 10 seconds
   - Motion: Slow/Medium
   - Camera: Static
   - Quality: Professional/High
   
5. **Wait for generation** (~30-45 minutes)

6. **Download video to:**
   ```
   C:\Users\isaac\.openclaw\workspace\solvexai-website\public\videos\jellyfish-animated.mp4
   ```

---

### Step 2: Test Locally (5 min)

```bash
cd C:\Users\isaac\.openclaw\workspace\solvexai-website
npm run dev
```

**Test checklist:**
- [ ] Video plays smoothly in background
- [ ] Video loops seamlessly (no jump)
- [ ] Logos are transparent (no white boxes)
- [ ] Center logo (molecular structure) visible in navigation
- [ ] Name logo (solve X ai) visible in navigation
- [ ] Intro screen logo looks clean
- [ ] All pages load without errors
- [ ] No console errors

---

### Step 3: Build for Production (2 min)

```bash
npm run build
```

**Expected:** ✅ Success (already tested, should pass)

---

### Step 4: Deploy to Vercel (5 min)

```bash
git add .
git commit -m "Complete redesign: realistic jellyfish video + new transparent logos"
git push origin master
```

**Vercel will auto-deploy.**

**Check deployment:**
- [ ] Open Vercel dashboard
- [ ] Wait for build to complete (~2-3 minutes)
- [ ] Visit live site
- [ ] Test video on mobile and desktop
- [ ] Verify logos on all pages

---

### Step 5: Final Verification (5 min)

**Live site checks:**
- [ ] Homepage: Video background working
- [ ] Homepage: Intro screen logo clean
- [ ] Navigation: Center logo clean (desktop)
- [ ] Navigation: Name logo clean (desktop)
- [ ] Templates page: Working
- [ ] About page: Working
- [ ] Contact page: Working
- [ ] Mobile responsive: All pages
- [ ] Mobile: Video plays (if supported)
- [ ] Load time: <3 seconds (video should preload)

---

## 🎨 QUALITY CHECKS

**Jellyfish Video:**
- [ ] Photorealistic (not LED/neon style)
- [ ] Purple/blue color palette (#8B5CF6 to #3B82F6)
- [ ] Smooth swimming motion
- [ ] 10-second loop (no visible jump)
- [ ] High quality (1080p minimum, 4K preferred)
- [ ] File size: <10MB (ideally <5MB)

**Logos:**
- [ ] Molecular logo: Zero background
- [ ] Name logo: Zero background
- [ ] No white halos or artifacts
- [ ] Crisp edges
- [ ] Look good on dark backgrounds
- [ ] Readable at all sizes

---

## 🚀 OPTIONAL OPTIMIZATIONS

**If video file is too large (>10MB):**

```bash
# Compress video with FFmpeg
ffmpeg -i jellyfish-animated.mp4 -c:v libx264 -crf 28 -preset slow -c:a copy jellyfish-animated-compressed.mp4
```

**If video doesn't loop smoothly:**
- Re-generate on Kling AI with "perfect loop" emphasis
- Or use video editing tool to blend first/last frames

**If logos need adjustment:**
- Scripts are in `scripts/` directory
- Adjust erosion iterations (currently 3) for cleaner/fuller edges
- Re-run: `python scripts/clean-center-logo.py`

---

## 📊 PERFORMANCE TARGETS

**Lighthouse Scores (aim for):**
- Performance: 85+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

**Core Web Vitals:**
- LCP (Largest Contentful Paint): <2.5s
- FID (First Input Delay): <100ms
- CLS (Cumulative Layout Shift): <0.1

**Video should not block page load** (lazy loading enabled in component)

---

## ❌ ROLLBACK PLAN (If Issues)

**If video causes problems:**
1. Remove video file: `public/videos/jellyfish-animated.mp4`
2. Component will show gradient fallback (already styled)

**If logos have issues:**
1. Restore old logos from git history
2. Revert Navigation.tsx and IntroScreen.tsx changes

**Full rollback:**
```bash
git revert HEAD
git push origin master
```

---

## 📞 SUPPORT

**Issues with:**
- Kling AI: Check https://klingai.com/docs
- Video encoding: Use HandBrake or FFmpeg
- Vercel deployment: Check Vercel dashboard logs
- Logo cleanup: Re-run Python scripts with adjusted parameters

---

## ✅ SUCCESS CRITERIA

**Redesign is complete when:**
- [ ] Realistic jellyfish video plays as background
- [ ] All LED jellyfish removed
- [ ] New logos applied across all pages
- [ ] Build succeeds
- [ ] Deployed to Vercel
- [ ] All pages working on live site
- [ ] Mobile responsive
- [ ] No console errors

---

**Total Time Estimate:** 60-75 minutes (mostly Kling AI generation wait time)

**Current Status:** 80% complete (pending Kling AI video)

---

**NEXT ACTION:** Upload jellyfish base image to Kling AI and generate video
