// Luffy One Piece Theme Test File
// This file demonstrates the theme's syntax highlighting

import { Adventure } from './one-piece';

/**
 * Monkey D. Luffy - Future Pirate King
 * @param dream - The dream to achieve
 * @returns Promise of adventure
 */
class PirateKing {
    private name: string = "Monkey D. Luffy";
    private dream: string = "Become the Pirate King!";
    private crew: string[] = [
        "Roronoa Zoro",
        "Nami", 
        "Usopp",
        "Sanji",
        "Tony Tony Chopper",
        "Nico Robin",
        "Franky",
        "Brook",
        "Jinbe"
    ];

    constructor(adventure: Adventure) {
        this.adventure = adventure;
    }

    // Gomu Gomu abilities
    gomuGomuPistol(): number {
        const power = 1000;
        const speed = 999;
        return power * speed;
    }

    // Set sail for adventure!
    async setSail(): Promise<boolean> {
        try {
            console.log(`${this.name}: "${this.dream}"`);
            
            for (let i = 0; i < this.crew.length; i++) {
                console.log(`Crew member: ${this.crew[i]}`);
            }

            // Regular expressions for treasure maps
            const treasurePattern = /X marks the spot/gi;
            const coordinates = "N 123° 45' W 67° 89'";
            
            if (treasurePattern.test(coordinates)) {
                return true;
            }

            return false;
        } catch (error) {
            console.error("Adventure failed:", error);
            return false;
        }
    }
}

// Export the adventure
export default PirateKing;

/* 
 * Test various language constructs:
 * - Keywords: class, constructor, async, await, try, catch
 * - Strings: "quoted strings", 'single quotes'
 * - Numbers: 1000, 999, 123.45
 * - Comments: // single line, /* multi line */
 * - Operators: =, +, *, <, >
 * - Functions: gomuGomuPistol(), setSail()
 * - Arrays: string[]
 * - Types: string, number, boolean, Promise
 */