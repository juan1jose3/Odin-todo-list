export class TodoController{
    constructor(stateHandler, todoView){
        this.stateHandler = stateHandler;
        this.todoView = todoView;
    }


    showView(){
        const mainContainer = document.querySelector(".main-container");
        mainContainer.addEventListener("click", event => {
            const btn = event.target.closest("button");
            if(!btn) return;

            this.todoView.renderProjects(this.stateHandler.getProjects());

            switch (true) {
                case btn.classList.contains("today"):
                    this.todoView.wipeView();
                    this.todoView.renderToday();
                    break;

                case btn.classList.contains("upcoming"):
                    this.todoView.wipeView();
                    this.todoView.renderUpcoming();
                    break;

                case btn.classList.contains("all-tasks"):
                    this.todoView.wipeView();
                    this.todoView.renderAllTasks();
                    break;

                case btn.classList.contains("create-project"):
                    this.createNewProject();
                    break;

                case btn.classList.contains("project-item"): {
                    const projectId = btn.dataset.projectId;
                    const project = this.stateHandler.getProjectById(projectId);
                    this.todoView.renderProject(project);
                    break;
                }
            }
        });
    }
    
    // project methods
    
    createNewProject(){
        const form = document.querySelector(".project-form");
        const dialogItem = document.querySelector(".dialog-item");

        const formData = new FormData(form);
        const projectName = formData.get("projectName").trim();
        if(projectName === "") return;
        const projectDescription = formData.get("description").trim();
        const projectId = crypto.randomUUID();
        this.stateHandler.addProject(projectId,projectName, projectDescription);
        form.reset();
        dialogItem.close();
        
        
        this.todoView.renderCurrentProjectToSideBar(this.stateHandler.getProjects());
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


