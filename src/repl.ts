import { createInterface } from 'node:readline';

export function startREPL(): void {

    // Node's standard input and output streams for reading from and writing to the terminal.
    const rl = createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "Pokedex > ",
    });

    // display prompt and wait for user to type something
    rl.prompt();

    rl.on("line", async (input) => { //async for future use when we start awaiting commands
        const words = cleanInput(input);
        if (words.length === 0) {
            rl.prompt();
            return;
        }

        const commandName = words[0];
        console.log(`Your command was: ${commandName}`); 
        rl.prompt();
    });
}

/*The purpose of this function will be to split the user's 
input into "words" based on whitespace. It should also 
lowercase the input and trim any leading or trailing 
whitespace. */
export function cleanInput(input: string): string[] {
    // get input into string format so it can be checked before .split() turns it into an array
    const loweredTrimmedInput = input.toLowerCase().trim();
    // '/.../' is for regex, '\s' is for whitespace, '+' is 1 or more
    return loweredTrimmedInput !== "" ? loweredTrimmedInput.split(/\s+/) : [];
}