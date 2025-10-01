const vscode = require('vscode');

function activate(context) {
    console.log('🏴‍☠️ Luffy Theme ACTIVATED!');
    
    // Test command 1
    let testCommand = vscode.commands.registerCommand('luffy.test', function () {
        vscode.window.showInformationMessage('🏴‍☠️ AHOY! Luffy Theme is working perfectly!');
    });

    // Test command 2 
    let gearSecond = vscode.commands.registerCommand('luffy.activateGearSecond', function () {
        vscode.window.showInformationMessage('🔥 GEAR SECOND ACTIVATED! Speed coding mode ON! 💨');
    });

    // Test command 3
    let crewAssemble = vscode.commands.registerCommand('luffy.crewAssemble', function () {
        vscode.window.showInformationMessage('👥 CREW ASSEMBLE command works!');
    });

    // Register ALL commands
    context.subscriptions.push(testCommand);
    context.subscriptions.push(gearSecond);
    context.subscriptions.push(crewAssemble);
    
    // Show activation message
    vscode.window.showInformationMessage('🏴‍☠️ Extension activated with 3 commands!');
}

function deactivate() {
    console.log('🏴‍☠️ Luffy theme deactivated');
}

module.exports = {
    activate,
    deactivate
};