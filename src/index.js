import { StateHandler } from "./toDoLogic/state";

const state = new StateHandler();

state.addProject(1,"The Odin Project");

state.createTodo(1, "Finish Todo App", "Testing", "2026-09-30", "high");
state.createTodo(1, "Testing", "Testing1", "2026-12-30", "low");
state.showTodos(1);

//state.deleteTask(1, 1);

state.editTask(1,1, "title", "Cyka");

state.showTodos(1);

//state.deleteTask(1, 2);
//state.showTodos(1);

//console.log(state.projectCollection);

