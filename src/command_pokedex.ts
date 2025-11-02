import type { State } from "./state.js";

export async function commandPokedex(state: State): Promise<void> {
    console.log("Your Pokedex:");

    for (const pokemon in state.caughtPokemon) {
        console.log(` - ${pokemon}`)
    }
}