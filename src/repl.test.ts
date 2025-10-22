import { cleanInput } from "./repl";
import { describe, expect, test } from "vitest";

describe.each([
    {
        input: "  hello  world  ",
        expected: ["hello", "world"],
    },
    {
        input: "bat man is cool.",
        expected: ["bat", "man", "is", "cool."],
    },
    {
        input: "/ chitty kitty . ",
        expected: ["/", "chitty", "kitty", "."],
    },
])("cleanInput($input)", ({ input, expected }) => {
    test(`Expected: ${expected}`, () => {
        const actual = cleanInput(input);
   
        // The `expect` and `toHaveLength` functions are from vitest
        // they will fail the test if the condiiton is not met
        expect(actual).toHaveLength(expected.length);
        for (const i in expected) {
            // likewise, the `toBe` function will fail the test if the values are not equal
            expect(actual[i]).toBe(expected[i]);
            
        }
    });
});