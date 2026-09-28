export class TodoController{
    constructor(stateHandler, todoView){
        this.stateHandler = stateHandler;
        this.todoView = todoView;
    }

    wipeView(){
        const mainContent = document.querySelector(".main-content");
        mainContent.textContent = "";
    }

    showView(){
        const sidebar = document.querySelector(".sidebar");
        sidebar.addEventListener("click", event => {
            const btn = event.target.closest("button");
            if(!btn) return;
            
            if(btn.classList.contains("today")){
                this.wipeView();
                this.todoView.renderToday();
            }else if(btn.classList.contains("upcoming")){
                this.wipeView();
                this.todoView.renderUpcoming();
            }else if(btn.classList.contains("all-tasks")){
                this.wipeView();
                this.todoView.renderAllTasks();
            }
        });
    }
    
    // project methods

    createNewProject(projectName, description){
        this.stateHandler.addProject(projectName, description);
    }

    deleteProject(projectId){
        this.stateHandler.deleteProject(projectId);
    }

    editProject(projectId, field, value){
        this.stateHandler.editProject(projectId, field, value);
    }

    showProjects(){
        this.stateHandler.showProjects();
    }

    // task methods
    createNewTask(projectId, title, description, dueDate, priority){
        this.stateHandler.createTodoTask(projectId, title, description, dueDate,priority);
    }

    deleteTask(projectId,taskId){
        this.stateHandler.deleteTodoTask(projectId, taskId);
    }

    editTask(projectId, taskId, field, value){
        this.stateHandler.editTodoTask(projectId, taskId, field, value);
    }
}