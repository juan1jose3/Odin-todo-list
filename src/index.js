import "./styles.css";
import { StateHandler } from "./toDoLogic/state";
import { TodoController } from "./controller";
import { TodoView } from "./render";


const stateHandler = new StateHandler();
const todoView = new TodoView();

const todoController = new TodoController(stateHandler, todoView);
todoController.showView();
