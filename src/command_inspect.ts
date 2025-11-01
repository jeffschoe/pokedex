import type { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]): Promise<void> {
    const pokemonName = args[0];
    if (!pokemonName) {
        console.log('Usage: inspect <pokemon-name>');
        return;
    }

    console.log(`Throwing a Pokeball at ${pokemonName}...`);
    try { 
        const location = await state.pokeAPI.fetchPokemon(pokemonName);
        //keep working here
        console.log('Found Pokemon:');
        for (const encounter of pokemonName) {
        console.log(` - ${encounter}`);
        }
    } catch (err) {
        console.error(err);
    }
}