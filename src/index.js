import { StateHandler } from "./toDoLogic/state";

const state = new StateHandler();

state.addProject(1,"The Odin Project");

state.createTodo(1, "Finish Todo App", "Testing", "2026-09-30", "high");

console.log(state);

