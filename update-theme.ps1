# Luffy Theme Quick Update Script
# Run this whenever you change icons

Write-Host "🏴‍☠️ Updating Luffy One Piece Theme..." -ForegroundColor Yellow

# Step 1: Package the extension
Write-Host "📦 Packaging extension..." -ForegroundColor Green
vsce package

# Step 2: Uninstall old version
Write-Host "🗑️ Removing old version..." -ForegroundColor Red
code --uninstall-extension your-publisher-name.luffy-one-piece-theme

# Step 3: Install new version
Write-Host "⚡ Installing updated version..." -ForegroundColor Blue
code --install-extension luffy-one-piece-theme-1.0.0.vsix

Write-Host "✅ Luffy theme updated successfully! Ahoy! 🏴‍☠️" -ForegroundColor Green
Write-Host "💡 Don't forget to select the icon theme in VS Code if needed!" -ForegroundColor Cyan