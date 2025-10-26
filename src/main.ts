import { startREPL } from "./repl.js"
import { State, initState } from "./state.js";

function main() {
  const state: State = initState();
  startREPL(state);

}

main();