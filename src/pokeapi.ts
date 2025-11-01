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

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

        const cached = this.#cache.get<Pokemon>(url);
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
            const pokemon: Pokemon = await resp.json();
            this.#cache.add(url, pokemon);
            console.log("...stored data to cache");
            return pokemon;
        } catch (e) {
            throw new Error(
                `Error fetching pokemon '${pokemonName}': ${(e as Error).message}`,
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
    encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

export type Pokemon = {
    name: string;
    base_experience: number;
    height: number;
    weight: number;
    stats: {
      base_stat: number;
      effort: number;
      stat: {
        name: string;
        url: string;
      }
    }[];
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      }
    }[];    
};
