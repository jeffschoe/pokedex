


/*The purpose of this function will be to split the user's 
input into "words" based on whitespace. It should also 
lowercase the input and trim any leading or trailing 
whitespace. */
export function cleanInput(input: string): string[] {
    // '/.../' is for regex
    // '\s' is for whitespace, '+' is 1 or more
    return input.toLowerCase().trim().split(/\s+/);
}