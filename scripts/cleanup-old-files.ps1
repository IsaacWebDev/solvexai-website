# Cleanup script for old jellyfish and logo files

$filesToDelete = @(
    "components\3d\LEDJellyfish.tsx",
    "components\3d\LEDTurtle.tsx",
    "components\3d\LEDMantaRay.tsx",
    "components\3d\LEDConstellation.tsx",
    "components\3d\OceanBackground.tsx",
    "components\3d\DNABackground.tsx",
    "components\backgrounds\AnimatedJellyfishBG.tsx",
    "public\videos\jellyfish-background.webm",
    "public\logo-center.png",
    "public\logo-center-nuclear-clean.png",
    "public\solvexai-logo-ultra-clean.png",
    "public\solvexai-logo-nuclear-clean.png",
    "public\solvexai-logo-perfect.png"
)

$deletedCount = 0
$notFoundCount = 0

foreach ($file in $filesToDelete) {
    $fullPath = Join-Path $PSScriptRoot "..\$file"
    if (Test-Path $fullPath) {
        Remove-Item $fullPath -Force
        Write-Host "Deleted: $file" -ForegroundColor Green
        $deletedCount++
    } else {
        Write-Host "- Not found: $file" -ForegroundColor Gray
        $notFoundCount++
    }
}

Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Deleted: $deletedCount files" -ForegroundColor Green
Write-Host "  Not found: $notFoundCount files" -ForegroundColor Gray
Write-Host ""
Write-Host "Cleanup complete!" -ForegroundColor Cyan
