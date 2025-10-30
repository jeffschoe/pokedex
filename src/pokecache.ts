

export type CacheEntry<T> = {
    createdAt: number; // for the Date.now() value that represents when 
    // the entry was created.
    val: T; // T, a generic that represents the object we're caching
   
};


export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, value: T) {
        // Adds a new entry to the cache object.
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: value,
        };
        this.#cache.set(key, entry);
    }

    get<T>(key: string): T | undefined {
        // Gets an entry from the cache object. 
        // It should take a key (a string) and returns some object. 
        // Return undefined if the entry is missing.
        const entry = this.#cache.get(key);
        return entry ? entry.val as T : undefined;
    }


    #startReapLoop() {
        this.#reapIntervalId = setInterval(() => {
            this.#reap();
        }, this.#interval);
    }

    #reap() {
        const cutoff = Date.now() - this.#interval;
        this.#cache.forEach((value, key) => {
            if (value.createdAt < cutoff) {
                console.log("****REAP:", JSON.stringify(key));
                this.#cache.delete(key);
            }
        });
    }


    stopReapLoop() {
        if (this.#reapIntervalId) {
            clearInterval(this.#reapIntervalId);
            this.#reapIntervalId = undefined;
        }
    }

}