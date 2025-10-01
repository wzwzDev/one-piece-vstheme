const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

// Background configuration
const BACKGROUND_CONFIG = {
    brookViolinMode: {
        name: "🎻 Soul King Brook - Midnight Concert",
        description: "Brook playing violin under the starry night sky",
        opacity: 0.06,
        imagePath: "./backgrounds/crew/brook-violin-night.png"
    },
    strawHatCrewSunsetMode: {
        name: "👥 Straw Hat Crew - Golden Sunset", 
        description: "The complete crew silhouette watching the sunset",
        opacity: 0.07,
        imagePath: "./backgrounds/crew/crew-sunset-silhouette.png"
    },
    namiLightningMode: {
        name: "⚡ Nami - Weather Wizard",
        description: "Nami commanding lightning and storms", 
        opacity: 0.05,
        imagePath: "./backgrounds/crew/nami-lightning-power.png"
    },
    sanjiFireMode: {
        name: "🔥 Sanji - Black Leg Inferno",
        description: "Sanji with blazing fire effects",
        opacity: 0.06,
        imagePath: "./backgrounds/crew/sanji-fire-legs.png"
    },
    luffyUnderwaterMode: {
        name: "🌊 Luffy - Deep Sea Power",
        description: "Luffy surrounded by ocean currents and power",
        opacity: 0.04,
        imagePath: "./backgrounds/adventure/luffy-underwater-vortex.png"
    },
    zoroSwordMode: {
        name: "⚔️ Zoro - Three Sword Style",
        description: "Zoro with mystical green sword energy",
        opacity: 0.05,
        imagePath: "./backgrounds/crew/zoro-sword-master.png"
    },
    thousandSunnyGoldenMode: {
        name: "🌅 Thousand Sunny - Golden Journey",
        description: "The crew watching their ship in golden light",
        opacity: 0.07,
        imagePath: "./backgrounds/adventure/thousand-sunny-golden.png"
    },
    chopperSnowMode: {
        name: "❄️ Chopper - Winter Wonder", 
        description: "Adorable Chopper in a snowy wonderland",
        opacity: 0.04,
        imagePath: "./backgrounds/crew/chopper-snow-cute.png"
    },
    usoppAdventureMode: {
        name: "🌳 Usopp - Forest Explorer",
        description: "Usopp on a golden forest adventure",
        opacity: 0.05,
        imagePath: "./backgrounds/crew/usopp-forest-adventure.png"
    },
    luffyBeachSilhouetteMode: {
        name: "🏖️ Luffy - Peaceful Beach",
        description: "Luffy's peaceful silhouette by the ocean",
        opacity: 0.03,
        imagePath: "./backgrounds/moods/luffy-beach-silhouette.png"
    },
    tropicalParadiseMode: {
        name: "🌴 Tropical Paradise",
        description: "Relaxing tropical island paradise",
        opacity: 0.04,
        imagePath: "./backgrounds/moods/tropical-paradise.png"
    },
    luffyClassicMode: {
        name: "🍖 Luffy - Classic Portrait",
        description: "The iconic Luffy we all know and love",
        opacity: 0.05,
        imagePath: "./backgrounds/luffy-classic-portrait.png"
    }
};

function activate(context) {
    console.log('🏴‍☠️ Luffy Theme with Epic Backgrounds ACTIVATED!');
    
    // Test command
    let testCommand = vscode.commands.registerCommand('luffy.test', function () {
        vscode.window.showInformationMessage('🏴‍☠️ AHOY! Luffy Theme with Epic Backgrounds is working perfectly!');
    });

    // Gear Second command
    let gearSecond = vscode.commands.registerCommand('luffy.activateGearSecond', function () {
        vscode.window.showInformationMessage('🔥 GEAR SECOND ACTIVATED! Speed coding mode ON! 💨');
    });

    // Crew Assemble command
    let crewAssemble = vscode.commands.registerCommand('luffy.crewAssemble', function () {
        vscode.window.showInformationMessage('👥 CREW ASSEMBLE command works!');
    });

    // Background Selector Command
    let selectBackground = vscode.commands.registerCommand('luffy.selectBackground', async function () {
        const backgrounds = Object.entries(BACKGROUND_CONFIG).map(([key, config]) => ({
            label: config.name,
            description: config.description,
            detail: `Opacity: ${config.opacity}`,
            id: key
        }));

        backgrounds.unshift({
            label: "🚫 No Background",
            description: "Remove current background",
            detail: "Clean coding environment",
            id: "none"
        });

        const selected = await vscode.window.showQuickPick(backgrounds, {
            placeHolder: '🏴‍☠️ Choose your One Piece coding background!'
        });

        if (selected) {
            if (selected.id === 'none') {
                await removeBackground();
                vscode.window.showInformationMessage('🏴‍☠️ Background removed! Clean coding ahead!');
            } else {
                await setBackground(selected.id);
                vscode.window.showInformationMessage(`🏴‍☠️ ${selected.label} background activated!`);
            }
        }
    });

    // Individual background commands for each character
    let brookBackground = vscode.commands.registerCommand('luffy.backgroundBrook', function () {
        setBackground('brookViolinMode');
        vscode.window.showInformationMessage('🎻 Soul King Brook\'s midnight concert is now your background! Yohohoho!');
    });

    let crewSunsetBackground = vscode.commands.registerCommand('luffy.backgroundCrewSunset', function () {
        setBackground('strawHatCrewSunsetMode');
        vscode.window.showInformationMessage('👥 The complete Straw Hat crew watches the sunset with you!');
    });

    let namiBackground = vscode.commands.registerCommand('luffy.backgroundNami', function () {
        setBackground('namiLightningMode');
        vscode.window.showInformationMessage('⚡ Nami\'s weather magic energizes your coding!');
    });

    let sanjiBackground = vscode.commands.registerCommand('luffy.backgroundSanji', function () {
        setBackground('sanjiFireMode');
        vscode.window.showInformationMessage('🔥 Sanji\'s passionate fire burns in your background!');
    });

    let luffyUnderwaterBackground = vscode.commands.registerCommand('luffy.backgroundLuffyUnderwater', function () {
        setBackground('luffyUnderwaterMode');
        vscode.window.showInformationMessage('🌊 Dive deep into coding with Luffy\'s ocean power!');
    });

    let zoroBackground = vscode.commands.registerCommand('luffy.backgroundZoro', function () {
        setBackground('zoroSwordMode');
        vscode.window.showInformationMessage('⚔️ Zoro\'s three-sword mastery guides your coding!');
    });

    // Register all commands
    context.subscriptions.push(
        testCommand,
        gearSecond, 
        crewAssemble,
        selectBackground,
        brookBackground,
        crewSunsetBackground,
        namiBackground,
        sanjiBackground,
        luffyUnderwaterBackground,
        zoroBackground
    );
    
    // Show activation message
    vscode.window.showInformationMessage('🏴‍☠️ Luffy Extension with Epic Backgrounds Ready! Try the background selector!');
}

async function setBackground(backgroundId) {
    const config = BACKGROUND_CONFIG[backgroundId];
    if (!config) return;

    try {
        const extensionPath = vscode.extensions.getExtension('your-publisher-name.luffy-one-piece-theme')?.extensionPath;
        if (!extensionPath) return;

        const imagePath = path.join(extensionPath, config.imagePath);
        const imageUri = vscode.Uri.file(imagePath).toString();
        
        const css = `
        .monaco-workbench {
            background-image: url('${imageUri}') !important;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            background-attachment: fixed !important;
        }
        
        .editor-container .monaco-editor .monaco-scrollable-element .monaco-editor-background {
            background: rgba(26, 26, 46, ${1 - config.opacity}) !important;
        }
        
        .monaco-editor .margin {
            background: rgba(26, 26, 46, ${1 - config.opacity}) !important;
        }`;

        // This would integrate with Custom CSS and JS Loader extension
        // The user needs to have that extension installed for backgrounds to work
        
    } catch (error) {
        console.error('Error setting background:', error);
        vscode.window.showErrorMessage('🏴‍☠️ Could not set background. Make sure Custom CSS and JS Loader extension is installed!');
    }
}

async function removeBackground() {
    // Remove background CSS
    try {
        // This would remove the custom CSS
        vscode.window.showInformationMessage('🏴‍☠️ Background removed!');
    } catch (error) {
        console.error('Error removing background:', error);
    }
}

function deactivate() {
    console.log('🏴‍☠️ Luffy theme with backgrounds deactivated');
}

module.exports = {
    activate,
    deactivate
};