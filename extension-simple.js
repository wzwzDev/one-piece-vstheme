const vscode = require('vscode');

function activate(context) {
    console.log('🏴‍☠️ Luffy Theme ACTIVATED!');
    
    // Time-based theme toggle (simplified and error-safe)
    let toggleTimeBasedThemes = vscode.commands.registerCommand('luffy.toggleTimeBasedThemes', function () {
        try {
            const config = vscode.workspace.getConfiguration();
            
            // Get current hour
            const now = new Date();
            const hour = now.getHours();
            let newTheme;
            let timeDescription;
            
            // Determine theme based on time
            if (hour >= 6 && hour < 10) {
                newTheme = 'Luffy One Piece Dawn Sailing';
                timeDescription = 'Dawn (6-10 AM)';
            } else if (hour >= 10 && hour < 17) {
                newTheme = 'Luffy One Piece Bright Adventure';
                timeDescription = 'Day (10 AM-5 PM)';
            } else if (hour >= 17 && hour < 21) {
                newTheme = 'Luffy One Piece Sunset Battle';
                timeDescription = 'Evening (5-9 PM)';
            } else {
                newTheme = 'Luffy One Piece Mysterious Night';
                timeDescription = 'Night (9 PM-6 AM)';
            }
            
            // Apply the theme
            config.update('workbench.colorTheme', newTheme, vscode.ConfigurationTarget.Global)
                .then(() => {
                    vscode.window.showInformationMessage(`🌅 Switched to ${newTheme}! Time: ${timeDescription} (Current: ${hour}:${now.getMinutes().toString().padStart(2, '0')})`);
                }, (error) => {
                    vscode.window.showErrorMessage(`Failed to switch theme: ${error.message}`);
                });
            
        } catch (error) {
            vscode.window.showErrorMessage(`🏴‍☠️ Toggle error: ${error.message}`);
            console.error('Luffy toggle error:', error);
        }
    });

    // Manual time theme selector (simplified)
    let selectTimeTheme = vscode.commands.registerCommand('luffy.selectTimeTheme', function () {
        try {
            const themes = [
                'Luffy One Piece Dawn Sailing',
                'Luffy One Piece Bright Adventure', 
                'Luffy One Piece Sunset Battle',
                'Luffy One Piece Mysterious Night',
                'Luffy One Piece Dark'
            ];
            
            vscode.window.showQuickPick(themes, {
                placeHolder: 'Choose your Grand Line time adventure!'
            }).then(selection => {
                if (selection) {
                    const config = vscode.workspace.getConfiguration();
                    config.update('workbench.colorTheme', selection, vscode.ConfigurationTarget.Global)
                        .then(() => {
                            vscode.window.showInformationMessage(`🎨 Switched to ${selection}!`);
                        }, (error) => {
                            vscode.window.showErrorMessage(`Failed to apply theme: ${error.message}`);
                        });
                }
            });
        } catch (error) {
            vscode.window.showErrorMessage(`�‍☠️ Theme selector error: ${error.message}`);
            console.error('Luffy theme selector error:', error);
        }
    });

    // Simple test command
    let testCommand = vscode.commands.registerCommand('luffy.test', function () {
        vscode.window.showInformationMessage('🏴‍☠️ AHOY! Luffy Theme is working!');
    });

    // Background command (simplified)
    let changeBackground = vscode.commands.registerCommand('luffy.changeBackground', function () {
        vscode.window.showInformationMessage('� Background system available! Check luffy-background.css file for ocean theme.');
    });

    // Gear command
    let gearSecond = vscode.commands.registerCommand('luffy.activateGearSecond', function () {
        vscode.window.showInformationMessage('🔥 GEAR SECOND ACTIVATED! Speed coding mode ON! 💨');
    });

    // Crew command
    let crewAssemble = vscode.commands.registerCommand('luffy.crewAssemble', function () {
        const crew = ['🍖 Luffy - Captain', '⚔️ Zoro - Swordsman', '🗺️ Nami - Navigator', '🎯 Usopp - Sniper', '🍳 Sanji - Cook'];
        vscode.window.showQuickPick(crew, {
            placeHolder: 'Choose your coding partner from the Straw Hat crew!'
        }).then(selection => {
            if (selection) {
                vscode.window.showInformationMessage(`🏴‍☠️ ${selection} is now helping you code!`);
            }
        });
    });

    // Register all commands
    context.subscriptions.push(testCommand, changeBackground, gearSecond, crewAssemble, toggleTimeBasedThemes, selectTimeTheme);
    
    // Show activation message
    vscode.window.showInformationMessage('🏴‍☠️ Luffy One Piece Theme activated! Try: Ctrl+Shift+P → "Luffy"');
}

function deactivate() {
    console.log('🏴‍☠️ Luffy theme deactivated');
}

module.exports = {
    activate,
    deactivate
};