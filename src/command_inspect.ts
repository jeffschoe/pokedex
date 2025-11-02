import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    const pokemonName = args[0];
    if (!pokemonName) {
        console.log('Usage: inspect <pokemon-name>');
        return;
    }

    const caughtPokemon = state.caughtPokemon[pokemonName];
    
    if (!caughtPokemon) {
        console.log(`you have not caught ${pokemonName} yet, or ${pokemonName} is not a valid pokemon.`);
        return;
    }

    const pokemon = state.caughtPokemon[pokemonName];
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats:`);
    for (const statEntry of pokemon.stats) {
        console.log(`  -${statEntry.stat.name}: ${statEntry.base_stat}`)
    }
    console.log(`Types:`);
    for (const typeEntry of pokemon.types) {
        console.log(`  -${typeEntry.type.name}`);
    }

}