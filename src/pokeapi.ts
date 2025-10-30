import { Cache } from "./pokecache.js";

export class PokeAPI{
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    #cache: Cache;

    constructor(cacheInterval: number) {
        this.#cache = new Cache(cacheInterval); // choose an interval (ms)
    }

    async fetchLocations(pageURL?: string | null): Promise<ShallowLocations> {
        const url = pageURL ?? `${PokeAPI.baseURL}/location-area?offset=0&limit=20`;
  
        const cached = this.#cache.get<ShallowLocations>(url);
        if (cached) {
            console.log("...retrieved cached data!");
            return cached;
        }

        try {
            const resp = await fetch(url);
            console.log("...fetched API data");
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }

            const locations: ShallowLocations = await resp.json();
            this.#cache.add(url, locations);
            console.log("...stored data to cache");
            return locations;
        } catch (e) {
            throw new Error(`Error fetching locations: ${(e as Error).message}`);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        const cached = this.#cache.get<Location>(url);
        if (cached) {
            console.log("...retrieved cached data!");
            return cached;
        }

        try {
            const resp = await fetch(url);
            if (!resp.ok) {
                throw new Error(`${resp.status} ${resp.statusText}`);
            }

            console.log("...fetched API data");
            const location: Location = await resp.json();
            this.#cache.add(url, location);
            console.log("...stored data to cache");
            return location;
        } catch (e) {
            throw new Error(
                `Error fetching location '${locationName}': ${(e as Error).message}`,
            );
        }
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
