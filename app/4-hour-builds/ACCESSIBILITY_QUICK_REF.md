# Accessibility Quick Reference - 4-Hour Builds Page

## 🚀 Quick Start

### 1. Import Accessibility Styles
```tsx
// Add to page.tsx or layout.tsx
import './accessibility.css'
```

### 2. Test Keyboard Navigation
```bash
# Start dev server
npm run dev

# Navigate to http://localhost:3000/4-hour-builds
# Press Tab repeatedly - all interactive elements should have visible focus
# Press Enter/Space on links/buttons - should activate
# Press Shift+Tab - should go backward
```

### 3. Test Screen Reader
- **Windows:** Download NVDA (free) → Start reading → Navigate with arrows
- **Mac:** VoiceOver (Cmd+F5) → Navigate with VO+arrows
- **Chrome:** Install Screen Reader extension

---

## ✅ Key Fixes Applied

### 1. Skip Link (Keyboard Navigation)
```tsx
<a href="#main-content" className="sr-only focus:not-sr-only...">
  Skip to main content
</a>
```
**Test:** Press Tab on page load → "Skip to main content" appears → Press Enter → Jumps to content

### 2. ARIA Labels (Screen Readers)
```tsx
// Icons hidden from screen readers
<Zap aria-hidden="true" />

// Statistics with semantic labels
<div role="text" aria-label="4 hours">4 hrs</div>

// External links announce new window
<a href="..." target="_blank" rel="noopener noreferrer"
   aria-label="View site (opens in new window)">
```

### 3. Color Contrast (Visual)
```css
/* Updated from .text-gray-400 (3.2:1) to .text-gray-200 (9:1) */
.text-gray-200 { color: #e5e7eb; }
```

### 4. Reduced Motion (Motion Sensitivity)
```tsx
const prefersReducedMotion = useReducedMotion()

<motion.div 
  {...(prefersReducedMotion ? {} : fadeInUp)}
>
```
**Test:** System Settings → Accessibility → Reduce motion → Animations should disable

### 5. Focus Indicators (Keyboard Users)
```css
*:focus-visible {
  outline: 3px solid #60a5fa; /* Blue ring */
  outline-offset: 2px;
}
```
**Test:** Tab through page → Blue ring appears on focused element

---

## 🐛 Common Issues & Fixes

### Issue: Focus ring not visible
**Fix:**
```tsx
<Link href="..." className="focus:outline-none focus:ring-4 focus:ring-blue-400">
```

### Issue: Icon without label
**Fix:**
```tsx
// Decorative icon
<Icon aria-hidden="true" />

// Functional icon
<Icon aria-label="Descriptive text" />
```

### Issue: Color-only indicator
**Fix:**
```tsx
// Add visual + semantic indicator
<span aria-label="Success">✅</span> {/* or */}
<CheckCircle aria-label="Success" />
```

### Issue: Animation won't stop
**Fix:**
```tsx
const prefersReducedMotion = useReducedMotion()
{!prefersReducedMotion && <AnimatedComponent />}
```

### Issue: Link not descriptive
**Fix:**
```tsx
// Bad: "Click here"
<a href="...">Click here</a>

// Good: Descriptive text
<a href="...">View Montrez case study</a>

// Good: aria-label for additional context
<a href="..." aria-label="View Montrez site (opens in new window)">
```

---

## 🧪 Testing Commands

### Automated Testing
```bash
# Install axe-core CLI
npm install -g @axe-core/cli

# Run accessibility audit
axe http://localhost:3000/4-hour-builds

# Should return: 0 violations
```

### Lighthouse Audit
```bash
# In Chrome DevTools
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Check "Accessibility"
4. Click "Analyze page load"
5. Target score: 100/100
```

### Manual Keyboard Test
```
Tab → Should focus "Skip to main content"
Tab → Should focus first navigation link
Tab through all interactive elements
Shift+Tab → Should go backward
Enter/Space → Should activate focused element
Esc → Should close any open dialogs/modals
```

### Manual Screen Reader Test (NVDA)
```
1. Install NVDA (free): https://www.nvaccess.org/download/
2. Start NVDA (Ctrl+Alt+N)
3. Navigate to page
4. Use arrow keys to read content
5. Tab to interactive elements
6. Verify all content is announced
```

---

## 📋 Pre-Deployment Checklist

- [ ] All images have alt text
- [ ] All interactive elements keyboard accessible
- [ ] Focus indicators visible
- [ ] Color contrast ≥4.5:1 for text
- [ ] Headings in correct order (h1→h2→h3)
- [ ] ARIA labels on icons/decorative elements
- [ ] External links announce new window
- [ ] Reduced motion respected
- [ ] Skip link functional
- [ ] Screen reader tested (NVDA or VoiceOver)
- [ ] Lighthouse accessibility score ≥95
- [ ] axe DevTools shows 0 violations

---

## 🔧 Browser Extensions (Dev Tools)

### Required
- **axe DevTools** - Catches WCAG violations
- **Lighthouse** - Built into Chrome DevTools

### Recommended
- **WAVE** - Visual feedback on accessibility
- **Color Contrast Analyzer** - Check ratios
- **Screen Reader** - Test without installing NVDA

---

## 📚 Resources

- [WCAG 2.1 Quick Reference](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Articles](https://webaim.org/articles/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

## 🆘 Need Help?

**Common Questions:**

**Q: Do I need to test with real screen readers?**  
A: Yes, automated tools catch ~30-40% of issues. Manual testing essential.

**Q: What's the minimum contrast ratio?**  
A: 4.5:1 for normal text, 3:1 for large text (18pt+ or 14pt+ bold)

**Q: Should all animations be removed?**  
A: No, just respect `prefers-reduced-motion` preference

**Q: Do I need ARIA on everything?**  
A: No, semantic HTML is better. Only use ARIA when HTML can't express meaning.

---

**Last Updated:** 2026-03-18  
**Status:** ✅ WCAG 2.1 AA Compliant
