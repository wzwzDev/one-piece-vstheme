// 🏴‍☠️ Luffy One Piece Theme Test File
// This file shows off all the beautiful colors!

import { Adventure } from './one-piece';

class StrewHatPirates {
    private captain: string = "Monkey D. Luffy";
    private crew: number = 10;
    
    constructor() {
        console.log("Setting sail for the Grand Line!");
    }
    
    // Keywords are in Luffy Red (#DC143C)
    public async findOnePiece(): Promise<boolean> {
        const treasureMap = "X marks the spot";
        let dreams = true;
        
        // Strings are in Straw Hat Yellow (#FFD700)
        if (this.captain === "Luffy") {
            // Numbers are in Ocean Blue (#4A90E2)
            for (let i = 0; i < 1000; i++) {
                dreams = dreams && true;
            }
        }
        
        // Functions are in Pirate Green (#32CD32)
        return this.becomeKingOfPirates();
    }
    
    private becomeKingOfPirates(): boolean {
        // Comments are styled beautifully!
        return Math.random() > 0.5; // Adventure awaits!
    }
}

// Test all the syntax highlighting:
const luffy = new StrewHatPirates();
const adventure = luffy.findOnePiece();

// Markdown-style comments
/**
 * @param crew The Straw Hat Pirates
 * @returns Adventure and friendship
 */
function setDreams(crew: string[]): void {
    crew.forEach(member => {
        console.log(`${member} joins the adventure!`);
    });
}

// Array with beautiful colors
const crew = [
    "Luffy",     // Captain
    "Zoro",      // Swordsman  
    "Nami",      // Navigator
    "Usopp",     // Sniper
    "Sanji",     // Cook
    "Chopper",   // Doctor
    "Robin",     // Archaeologist
    "Franky",    // Shipwright
    "Brook",     // Musician
    "Jinbe"      // Helmsman
];

setDreams(crew);

export { StrewHatPirates, adventure };