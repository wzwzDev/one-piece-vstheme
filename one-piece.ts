// 🏴‍☠️ One Piece Adventure Module
// Core types and interfaces for the Straw Hat Pirates adventure!

export interface Adventure {
    destination: string;
    crewSize: number;
    treasureFound: boolean;
    dangerLevel: number;
}

export interface CrewMember {
    name: string;
    role: string;
    bounty: number;
    devilFruit?: string;
    weapon?: string;
}

export interface Ship {
    name: string;
    type: string;
    crew: CrewMember[];
    currentLocation: string;
}

export class OnePieceWorld {
    public static readonly GRAND_LINE = "Grand Line";
    public static readonly EAST_BLUE = "East Blue";
    public static readonly NEW_WORLD = "New World";
    
    private adventures: Adventure[] = [];
    
    constructor() {
        console.log("🌊 Welcome to the world of One Piece!");
    }
    
    public startAdventure(destination: string): Adventure {
        const newAdventure: Adventure = {
            destination,
            crewSize: 10,
            treasureFound: false,
            dangerLevel: Math.floor(Math.random() * 10) + 1
        };
        
        this.adventures.push(newAdventure);
        return newAdventure;
    }
    
    public getAdventures(): Adventure[] {
        return this.adventures;
    }
}

export const STRAW_HAT_CREW: CrewMember[] = [
    { name: "Monkey D. Luffy", role: "Captain", bounty: 3000000000, devilFruit: "Gomu Gomu no Mi" },
    { name: "Roronoa Zoro", role: "Swordsman", bounty: 1111000000, weapon: "Three Sword Style" },
    { name: "Nami", role: "Navigator", bounty: 366000000, weapon: "Clima-Tact" },
    { name: "Usopp", role: "Sniper", bounty: 500000000, weapon: "Kabuto" },
    { name: "Vinsmoke Sanji", role: "Cook", bounty: 1032000000, weapon: "Black Leg Style" },
    { name: "Tony Tony Chopper", role: "Doctor", bounty: 1000, devilFruit: "Hito Hito no Mi" },
    { name: "Nico Robin", role: "Archaeologist", bounty: 930000000, devilFruit: "Hana Hana no Mi" },
    { name: "Franky", role: "Shipwright", bounty: 394000000, weapon: "Cyborg Body" },
    { name: "Brook", role: "Musician", bounty: 383000000, devilFruit: "Yomi Yomi no Mi" },
    { name: "Jinbe", role: "Helmsman", bounty: 1100000000, weapon: "Fish-Man Karate" }
];

export default OnePieceWorld;