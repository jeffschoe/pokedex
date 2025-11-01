import { commandHelp } from "./command_help.js";
import { commandExit } from "./command_exit.js";
import { commandMapForward, commandMapBack } from "./command_map.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandInspect } from "./command_inspect.js";

import type { CLICommand } from "./state.js";


export function getCommands(): Record<string, CLICommand> {
    return {
        help: {
            name: "help",
            description: "Displays a help message",
            callback: commandHelp,
        },
        exit: {
            name: "exit",
            description: "Exit the Pokedex",
            callback: commandExit,
        },
        map: {
            name: "map",
            description: "Get the next page of locations",
            callback: commandMapForward,
        },
        mapb: {
            name: "mapb",
            description: "Get the previous page of locations",
            callback: commandMapBack,
        },
        explore: {
            name: "explore",
            description: "Lists pokemon found in an area. Usage Example > explore pastoria-city-area",
            callback: commandExplore,
        },
        catch: {
            name: "catch",
            description: "Attempt to catch a pokemon. Usage Example > catch pikachu",
            callback: commandCatch,
        },
        inspect: {
            name: "inspect",
            description: "Inspect a pokemon you have caught. Usage Example > inspect pikachu",
            callback: commandInspect,
        },
    };
}