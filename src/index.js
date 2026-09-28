import "./styles.css";
import { StateHandler } from "./toDoLogic/state";
import { TodoController } from "./controller";
import { TodoView } from "./render";


const stateHandler = new StateHandler();
const todoView = new TodoView();

const todoController = new TodoController(stateHandler, todoView);
todoController.showView();

/*
const state = new StateHandler();

state.addProject(1,"The Odin Project");

state.createTodoTask(1, "Finish Todo App", "Testing", "2026-09-30", "high");
state.createTodoTask(1, "Testing", "Testing1", "2026-12-30", "low");
state.showTodoTasks(1);

//state.deleteTask(1, 1);

state.editTodoTask(1,1, "title", "Cyka");
state.editTodoTask(1, 1, "priority", "mid");

console.log("modified");
state.showTodoTasks(1);

console.log("Current Projects");

state.showProjects()

state.deleteProject(1);


state.showProjects();

console.log(state.projectCollection);

//state.deleteTask(1, 2);
//state.showTodos(1);

//console.log(state.projectCollection);
*/
