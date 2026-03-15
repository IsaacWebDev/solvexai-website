# Batch emoji replacement script for remaining files

# LiveChatWidget.tsx
$file = "components\LiveChatWidget.tsx"
(Get-Content $file) -replace '💬', '' | Set-Content $file

# StickyBookCallButton.tsx
$file = "components\StickyBookCallButton.tsx"
(Get-Content $file) -replace '📞', '' | Set-Content $file

# Navigation-new.tsx
$file = "components\Navigation-new.tsx"
(Get-Content $file) -replace '✨', '' | Set-Content $file

# FloatingActionMenu.tsx  
$file = "components\FloatingActionMenu.tsx"
(Get-Content $file) -replace '💬', 'MessageSquare' `
  -replace '📅', 'Calendar' `
  -replace '🎁', 'Gift' | Set-Content $file

# TemplateShowcase.tsx
$file = "components\sections\TemplateShowcase.tsx"
(Get-Content $file) -replace '⭐', '' | Set-Content $file

# FinalCTAParallax.tsx
$file = "components\sections\FinalCTAParallax.tsx"
(Get-Content $file) -replace '🎁', '' | Set-Content $file

# GuaranteeBadge.tsx
$file = "components\GuaranteeBadge.tsx"
(Get-Content $file) -replace '✓', '' | Set-Content $file

Write-Host "✅ Emoji removal complete for widgets" -ForegroundColor Green
