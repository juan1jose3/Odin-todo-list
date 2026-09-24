export class TodoController{
    constructor(stateHandler, todoView){
        this.stateHandler = stateHandler;
        this.todoView = todoView;
        this.sidebar = document.querySelector(".sidebar");
    }

    viewRendering(){
        this.sidebar.addEventListener("click", event => {

        });
    }

}