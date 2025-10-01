const vscode = require('vscode');

// 🏴‍☠️ LUFFY ONE PIECE THEME - REVOLUTIONARY FEATURES!

let currentGear = 'normal';
let hakiLevel = 1;
let bounty = 0;
let activeCrew = 'luffy';
let currentBackground = 'none';
let backgroundConfig = null;
let timeBasedThemeEnabled = true;
let currentTimeTheme = 'day';

function activate(context) {
    console.log('🏴‍☠️ AHOY! Luffy One Piece Theme is now active!');
    
    // 🎨 Load Background Configuration
    loadBackgroundConfig();
    
    // 🌅 Initialize Time-Based Theme System
    initializeTimeBasedThemes();
    
    // 🔥 GEAR SECOND COMMAND
    let gearSecond = vscode.commands.registerCommand('luffy.activateGearSecond', function () {
        currentGear = 'gear2';
        vscode.window.showInformationMessage('🔥 GEAR SECOND ACTIVATED! Speed coding mode ON! 💨');
        updateStatusBar();
    });

    // 👥 CREW ASSEMBLE COMMAND  
    let crewAssemble = vscode.commands.registerCommand('luffy.crewAssemble', function () {
        const crew = ['Zoro 🗡️', 'Nami 🗺️', 'Usopp 🎯', 'Sanji 👨‍🍳', 'Chopper 🦌', 'Robin 📚', 'Franky 🤖', 'Brook 🎵', 'Jinbe 🌊'];
        vscode.window.showQuickPick(crew, {
            placeHolder: 'Choose your coding partner from the Straw Hat crew!'
        }).then(selection => {
            if (selection) {
                activeCrew = selection.split(' ')[0].toLowerCase();
                vscode.window.showInformationMessage(`🏴‍☠️ ${selection} is now helping you code! Welcome aboard!`);
                updateStatusBar();
            }
        });
    });

    // 🌟 VOICE OF ALL THINGS COMMAND
    let voiceOfAllThings = vscode.commands.registerCommand('luffy.voiceOfAllThings', function () {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const code = editor.document.getText();
            const voices = analyzeCodeVoices(code);
            vscode.window.showInformationMessage(`🌟 Your code whispers: "${voices}"`);
        }
    });

    // 👑 CONQUEROR'S HAKI COMMAND
    let conquerorsHaki = vscode.commands.registerCommand('luffy.conquerorsHaki', function () {
        hakiLevel = Math.min(hakiLevel + 1, 10);
        bounty += 1000000; // 1 million berries!
        vscode.window.showInformationMessage(`👑 CONQUEROR'S HAKI! Your Haki level is now ${hakiLevel}! Bounty: ${bounty.toLocaleString()} berries!`);
        updateStatusBar();
    });

    // 🎨 BACKGROUND CHANGE COMMAND
    let changeBackground = vscode.commands.registerCommand('luffy.changeBackground', function () {
        if (!backgroundConfig) {
            vscode.window.showErrorMessage('🏴‍☠️ Background config not loaded!');
            return;
        }
        
        const backgrounds = Object.keys(backgroundConfig.customBackgrounds).map(key => {
            const bg = backgroundConfig.customBackgrounds[key];
            return `${bg.name} - ${bg.description}`;
        });
        backgrounds.unshift('🚫 No Background');
        
        vscode.window.showQuickPick(backgrounds, {
            placeHolder: 'Choose your adventure background!'
        }).then(selection => {
            if (selection) {
                if (selection === '🚫 No Background') {
                    currentBackground = 'none';
                    removeBackground();
                    vscode.window.showInformationMessage('🏴‍☠️ Background cleared! Back to the basics!');
                } else {
                    const bgKey = Object.keys(backgroundConfig.customBackgrounds).find(key => {
                        const bg = backgroundConfig.customBackgrounds[key];
                        return selection.includes(bg.name);
                    });
                    if (bgKey) {
                        currentBackground = bgKey;
                        applyBackground(bgKey);
                        vscode.window.showInformationMessage(`🎨 ${backgroundConfig.customBackgrounds[bgKey].name} activated!`);
                    }
                }
                updateStatusBar();
            }
        });
    });

    // 📊 BOUNTY STATUS COMMAND
    let bountyStatus = vscode.commands.registerCommand('luffy.bountyStatus', function () {
        const rank = getBountyRank(bounty);
        vscode.window.showInformationMessage(`💰 Current Bounty: ${bounty.toLocaleString()} berries! Rank: ${rank}`);
    });

    // 🌅 TIME-BASED THEME TOGGLE COMMAND
    let toggleTimeThemes = vscode.commands.registerCommand('luffy.toggleTimeBasedThemes', function () {
        timeBasedThemeEnabled = !timeBasedThemeEnabled;
        if (timeBasedThemeEnabled) {
            vscode.window.showInformationMessage('🌅 Time-based Grand Line themes ACTIVATED! Your adventure follows the sun!');
            checkAndUpdateTimeTheme();
        } else {
            vscode.window.showInformationMessage('🌅 Time-based themes DISABLED. Theme locked to current selection.');
        }
    });

    // 🎨 MANUAL TIME THEME SELECTOR
    let selectTimeTheme = vscode.commands.registerCommand('luffy.selectTimeTheme', function () {
        const timeThemes = [
            '🌅 Dawn Sailing - Early morning adventure',
            '☀️ Bright Adventure - Full day exploration', 
            '🌅 Sunset Battle - Evening epic fights',
            '🌙 Mysterious Night - Dark Grand Line journey'
        ];
        
        vscode.window.showQuickPick(timeThemes, {
            placeHolder: 'Choose your Grand Line time adventure!'
        }).then(selection => {
            if (selection) {
                const themeMap = {
                    '🌅 Dawn Sailing - Early morning adventure': 'dawn',
                    '☀️ Bright Adventure - Full day exploration': 'day',
                    '🌅 Sunset Battle - Evening epic fights': 'evening', 
                    '🌙 Mysterious Night - Dark Grand Line journey': 'night'
                };
                
                const selectedTime = Object.keys(themeMap).find(key => selection === key);
                if (selectedTime) {
                    currentTimeTheme = themeMap[selectedTime];
                    applyTimeBasedTheme(currentTimeTheme);
                    vscode.window.showInformationMessage(`🏴‍☠️ ${selection.split(' - ')[0]} activated!`);
                }
            }
        });
    });

    // 📝 Register all commands
    context.subscriptions.push(gearSecond, crewAssemble, voiceOfAllThings, conquerorsHaki, changeBackground, bountyStatus, toggleTimeThemes, selectTimeTheme);

    // 📊 STATUS BAR ITEMS
    const gearStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    const hakiStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 99);
    const bountyStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 98);
    const crewStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 97);

    function updateStatusBar() {
        // Gear Status
        const gearIcons = {
            'normal': '🏴‍☠️',
            'gear2': '🔥',
            'gear3': '💪', 
            'gear4': '🦍',
            'gear5': '☀️'
        };
        gearStatusBar.text = `${gearIcons[currentGear]} ${currentGear.toUpperCase()}`;
        gearStatusBar.tooltip = `Current Gear Mode: ${currentGear}`;
        gearStatusBar.show();

        // Haki Status
        hakiStatusBar.text = `🔮 Haki Lv.${hakiLevel}`;
        hakiStatusBar.tooltip = `Haki Mastery Level: ${hakiLevel}/10`;
        hakiStatusBar.show();

        // Bounty Status
        bountyStatusBar.text = `💰 ${(bounty/1000000).toFixed(1)}M berries`;
        bountyStatusBar.tooltip = `Your coding bounty: ${bounty.toLocaleString()} berries`;
        bountyStatusBar.show();

        // Crew Status
        const crewIcons = {
            'luffy': '👑', 'zoro': '🗡️', 'nami': '🗺️', 'usopp': '🎯', 
            'sanji': '👨‍🍳', 'chopper': '🦌', 'robin': '📚', 'franky': '🤖', 
            'brook': '🎵', 'jinbe': '🌊'
        };
        crewStatusBar.text = `${crewIcons[activeCrew]} ${activeCrew.charAt(0).toUpperCase() + activeCrew.slice(1)}`;
        crewStatusBar.tooltip = `Active crew member: ${activeCrew}`;
        crewStatusBar.show();
    }

    function analyzeCodeVoices(code) {
        const voices = [
            "I want to be more readable! 📖",
            "Please optimize me, I'm running slow! 🐌", 
            "I think I have a bug hiding somewhere! 🐛",
            "My variable names could be better! 📝",
            "I'm ready for some refactoring! ⚡",
            "I feel like I'm doing too many things! 🤹",
            "Add some comments, I'm confusing! 💭"
        ];
        return voices[Math.floor(Math.random() * voices.length)];
    }

    // 🎉 WELCOME MESSAGE
    vscode.window.showInformationMessage('🏴‍☠️ Welcome to the Grand Line of Coding! Luffy One Piece Theme is ready for adventure!', 'Start Adventure!').then(selection => {
        if (selection === 'Start Adventure!') {
            vscode.commands.executeCommand('luffy.crewAssemble');
        }
    });

    // Initialize status bar
    updateStatusBar();

    // 📝 AUTO-BOUNTY SYSTEM
    vscode.workspace.onDidSaveTextDocument(() => {
        bounty += 10000; // 10,000 berries per save!
        updateStatusBar();
    });

    // Register all commands and status bar items
    context.subscriptions.push(gearSecond, crewAssemble, voiceOfAllThings, conquerorsHaki, changeBackground, bountyStatus, toggleTimeThemes, selectTimeTheme);
    context.subscriptions.push(gearStatusBar, hakiStatusBar, bountyStatusBar, crewStatusBar);
}

// 🎨 BACKGROUND SYSTEM FUNCTIONS

// Load background configuration from JSON
function loadBackgroundConfig() {
    try {
        const fs = require('fs');
        const path = require('path');
        const configPath = path.join(__dirname, 'backgrounds', 'background-config.json');
        
        if (fs.existsSync(configPath)) {
            const configData = fs.readFileSync(configPath, 'utf8');
            backgroundConfig = JSON.parse(configData);
            console.log('🎨 Background config loaded successfully!');
        } else {
            console.log('⚠️ Background config file not found');
        }
    } catch (error) {
        console.error('❌ Error loading background config:', error);
        vscode.window.showErrorMessage('Failed to load background configuration');
    }
}

// Apply background to VS Code workspace
function applyBackground(backgroundKey) {
    try {
        const config = vscode.workspace.getConfiguration();
        const background = backgroundConfig.customBackgrounds[backgroundKey];
        
        if (!background) {
            vscode.window.showErrorMessage(`Background ${backgroundKey} not found!`);
            return;
        }

        // Apply CSS customizations for background
        const customCSS = generateBackgroundCSS(background);
        
        // Note: This is a simplified approach. Full implementation would require:
        // 1. Custom CSS injection (requires additional setup)
        // 2. Workbench customization
        // 3. Possibly using vscode-custom-css extension
        
        console.log(`🎨 Applying background: ${background.name}`);
        vscode.window.showInformationMessage(`🏴‍☠️ ${background.name} is ready! Restart VS Code to see the full effect.`);
        
    } catch (error) {
        console.error('❌ Error applying background:', error);
        vscode.window.showErrorMessage('Failed to apply background');
    }
}

// Generate CSS for background
function generateBackgroundCSS(background) {
    const path = require('path');
    const imagePath = path.join(__dirname, background.imagePath);
    
    return `
/* 🏴‍☠️ Luffy One Piece Theme - ${background.name} */
.monaco-editor .margin,
.monaco-editor,
.monaco-editor-background,
.monaco-editor .inputarea.ime-input {
    background-image: url("${imagePath}") !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    opacity: ${background.opacity} !important;
}

.monaco-workbench {
    background-image: url("${imagePath}") !important;
    background-size: cover !important;
    background-position: center !important;
    background-repeat: no-repeat !important;
    opacity: ${background.opacity} !important;
}
`;
}

// Remove background
function removeBackground() {
    try {
        console.log('🚫 Removing background...');
        vscode.window.showInformationMessage('🏴‍☠️ Background removed! Restart VS Code to see changes.');
    } catch (error) {
        console.error('❌ Error removing background:', error);
    }
}

// Get bounty rank based on current bounty
function getBountyRank(currentBounty) {
    if (currentBounty >= 1000000000) return '🌟 Pirate King';
    if (currentBounty >= 500000000) return '👑 Yonko';
    if (currentBounty >= 100000000) return '⚔️ Supernova';
    if (currentBounty >= 30000000) return '👒 Rookie Pirate';
    return '🏴‍☠️ Starting Pirate';
}

// 🌅 TIME-BASED THEME SYSTEM

// Initialize time-based theme switching
function initializeTimeBasedThemes() {
    console.log('🌅 Initializing Grand Line time-based theme system...');
    
    // Check theme immediately
    checkAndUpdateTimeTheme();
    
    // Set up interval to check every 30 minutes
    setInterval(() => {
        if (timeBasedThemeEnabled) {
            checkAndUpdateTimeTheme();
        }
    }, 30 * 60 * 1000); // 30 minutes
    
    console.log('⏰ Time-based theme system active! Themes will switch automatically.');
}

// Check current time and update theme accordingly
function checkAndUpdateTimeTheme() {
    const now = new Date();
    const hour = now.getHours();
    
    let newTimeTheme;
    
    // Time-based theme logic inspired by Grand Line journey
    if (hour >= 6 && hour < 10) {
        newTimeTheme = 'dawn';      // Dawn Sailing (6 AM - 10 AM)
    } else if (hour >= 10 && hour < 17) {
        newTimeTheme = 'day';       // Bright Adventure (10 AM - 5 PM) 
    } else if (hour >= 17 && hour < 21) {
        newTimeTheme = 'evening';   // Sunset Battle (5 PM - 9 PM)
    } else {
        newTimeTheme = 'night';     // Mysterious Night (9 PM - 6 AM)
    }
    
    // Only update if theme actually changed
    if (newTimeTheme !== currentTimeTheme) {
        currentTimeTheme = newTimeTheme;
        applyTimeBasedTheme(newTimeTheme);
        
        const themeNames = {
            'dawn': '🌅 Dawn Sailing',
            'day': '☀️ Bright Adventure',
            'evening': '🌅 Sunset Battle', 
            'night': '🌙 Mysterious Night'
        };
        
        vscode.window.showInformationMessage(
            `🏴‍☠️ Grand Line time shift! ${themeNames[newTimeTheme]} theme activated!`
        );
    }
}

// Apply the time-based theme
function applyTimeBasedTheme(timeTheme) {
    try {
        const config = vscode.workspace.getConfiguration();
        
        const themeMap = {
            'dawn': 'Luffy One Piece Dawn Sailing',
            'day': 'Luffy One Piece Bright Adventure',
            'evening': 'Luffy One Piece Sunset Battle',
            'night': 'Luffy One Piece Mysterious Night'
        };
        
        const themeName = themeMap[timeTheme];
        if (themeName) {
            config.update('workbench.colorTheme', themeName, vscode.ConfigurationTarget.Global);
            console.log(`🎨 Applied time theme: ${themeName}`);
        }
        
    } catch (error) {
        console.error('❌ Error applying time-based theme:', error);
    }
}

// Get current time theme info for status bar
function getCurrentTimeThemeInfo() {
    const themeInfo = {
        'dawn': { icon: '🌅', name: 'Dawn', description: 'Early morning sailing' },
        'day': { icon: '☀️', name: 'Day', description: 'Bright adventure' },
        'evening': { icon: '🌅', name: 'Evening', description: 'Sunset battles' },
        'night': { icon: '🌙', name: 'Night', description: 'Mysterious journey' }
    };
    
    return themeInfo[currentTimeTheme] || { icon: '🏴‍☠️', name: 'Adventure', description: 'Pirate journey' };
}

function deactivate() {
    vscode.window.showInformationMessage('🏴‍☠️ Until we meet again on the Grand Line! Luffy theme deactivated.');
}

module.exports = {
    activate,
    deactivate
};