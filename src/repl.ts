import { State } from './state.js';

export async function startREPL(state: State): Promise<void> {

    // display prompt and wait for user to type something
    state.readline.prompt();

    state.readline.on("line", async (input) => { //async for future use when we start awaiting commands
        const words = cleanInput(input);
        if (words.length === 0) {
            state.readline.prompt();
            return;
        }

        const commandName = words[0];

        const cmd = state.commands[commandName];
        if (cmd) {
            try {
                await cmd.callback(state);
            } catch (err) {
                console.error(err);
            }
        } else { 
            console.log(
                `Unknown command: "${commandName}". Type "help" for a list of commands.`
            );
        }

        state.readline.prompt();
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