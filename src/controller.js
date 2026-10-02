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

            this.todoView.renderProjects(this.stateHandler.getProjects());
            
            if(btn.classList.contains("today")){
                this.wipeView();
                this.todoView.renderToday();
            }else if(btn.classList.contains("upcoming")){
                this.wipeView();
                this.todoView.renderUpcoming();
            }else if(btn.classList.contains("all-tasks")){
                this.wipeView();
                this.todoView.renderAllTasks();
            }else if(btn.classList.contains("create-project")){
                this.createNewProject();
                this.showProjects();
                
            }
        });
    }
    
    // project methods

    createNewProject(){
        const form = document.querySelector(".project-form");
        const formData = new FormData(form);
        const projectName = formData.get("projectName").trim();
        if(projectName === "") return;
        const projectDescription = formData.get("description").trim();
        console.log(projectName);
        console.log(projectDescription);
        this.stateHandler.addProject(projectName, projectDescription);
        form.reset();
        document.querySelector(".dialog-item").close();
    }

    deleteProject(projectId){
        this.stateHandler.deleteProject(projectId);
    }

    editProject(projectId, field, value){
        this.stateHandler.editProject(projectId, field, value);
    }

    showProjects(){
        console.log(this.stateHandler.getProjects());
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


