export class TodoController{
    constructor(stateHandler, todoView){
        this.stateHandler = stateHandler;
        this.todoView = todoView;
    }


    showView(){
        const sidebar = document.querySelector(".sidebar");
        sidebar.addEventListener("click", event => {
            const btn = event.target.closest("button");
            if(!btn) return;

            this.todoView.renderProjects(this.stateHandler.getProjects());
            
            if(btn.classList.contains("today")){
                this.todoView.wipeView();
                this.todoView.renderToday();
            }else if(btn.classList.contains("upcoming")){
                this.todoView.wipeView();
                this.todoView.renderUpcoming();
            }else if(btn.classList.contains("all-tasks")){
                this.todoView.wipeView();
                this.todoView.renderAllTasks();
            }else if(btn.classList.contains("create-project")){
                this.createNewProject();
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
        const projectId = crypto.randomUUID();
        this.stateHandler.addProject(projectId,projectName, projectDescription);
        form.reset();
        
        this.todoView.renderProject(this.stateHandler.getProjects());
    }

    deleteProject(projectId){
        this.stateHandler.deleteProject(projectId);
    }

    editProject(projectId, field, value){
        this.stateHandler.editProject(projectId, field, value);
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


