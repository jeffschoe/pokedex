import type { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    const pokemonName = args[0];
    if (!pokemonName) {
        console.log('Usage: catch <pokemon-name>');
        return;
    }

    console.log(`Throwing a Pokeball at ${pokemonName}...`);

    try { 
        const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
        const maxBaseExperience = 608; //Blissey
        //const minBaseExperience = 39; //Caterpie (value not use right now)
        const catchThreshold = 0.8 * pokemon.base_experience / maxBaseExperience;
        if (Math.random() > catchThreshold) {
            state.caughtPokemon[pokemon.name] = pokemon;
            console.log(`${pokemon.name} was caught!`);
            console.log("You may now inspect it with the inspect command.");
        } else {
            console.log(`${pokemon.name} escaped!`);
        }

    } catch (err) {
        console.error(`${err} - Pokemon not found!`);
    }
}
