import type { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    const area = args[0];
    if (!area) {
        console.log('Usage: explore <location-area-name>');
        return;
    }

    console.log(`Exploring ${area}...`);
    try {
        const location = await state.pokeAPI.fetchLocation(area);
        console.log('Found Pokemon:');
        for (const encounter of location.pokemon_encounters) {
        console.log(` - ${encounter.pokemon.name}`);
        }
    } catch (err) {
        console.error(err);
    }
}