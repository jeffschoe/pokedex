import { createInterface, type Interface } from "node:readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";


export type CLICommand = {
    name: string;
    description: string;
    callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
    readline: Interface;
    commands: Record<string, CLICommand>;
    pokeAPI: PokeAPI;
    nextLocationsURL: string | null;
    prevLocationsURL: string | null;

};

export function initState(cacheInterval: number): State {
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    return {
        readline: rl, 
        commands: getCommands(),
        pokeAPI: new PokeAPI(cacheInterval),
        nextLocationsURL: "https://pokeapi.co/api/v2/location-area?offset=0&limit=20",
        prevLocationsURL: null,
    }
}