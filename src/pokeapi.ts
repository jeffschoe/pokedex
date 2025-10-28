export class PokeAPI{
    private static readonly baseURL = "https://pokeapi.co/api/v2";

    constructor() {}

    async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
        const url = pageURL ?? "https://pokeapi.co/api/v2/location-area";
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async fetchLocation(locationName: string): Promise<Location> {
        // implement this
        return Promise; // using this to clear error
    }
}

export type ShallowLocations = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {name: string, url: string}[];
};

export type Location = {
    // add properties here
};
