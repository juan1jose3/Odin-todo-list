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

                // Project Actions
                case btn.classList.contains("add-project-btn"): {
                    this.todoView.renderProjectModal("add");
                    break;
                }

                case btn.classList.contains("create-project"):{
                    this.createNewProject();
                    break;
                }

                case btn.classList.contains("edit-project-btn"): {
                    this.todoView.renderProjectModal("edit",this.stateHandler.getProjectById(btn.dataset.projectId));
                    break;
                }

                case btn.classList.contains("edit-project"): {
                    this.editProject();
                    break;
                }


                case btn.classList.contains("delete-project-btn"): {
                    this.deleteProject(btn.dataset.projectId);
                    break;
                }

                case btn.classList.contains("project-item"): {
                    const projectId = btn.dataset.projectId;
                    const project = this.stateHandler.getProjectById(projectId);
                    this.todoView.renderProject(project);
                    break;
                }

                // Task actions 

                case btn.classList.contains("add-task-btn"): {
                    this.todoView.renderTaskModal("add");
                    break;
                }

                case btn.classList.contains("create-task"): {
                    this.createNewTask();
                    break;
                }

                case btn.classList.contains("delete-task-btn"): {
                    this.deleteTask(btn.dataset.taskId);
                    break;
                }

                case btn.classList.contains("edit-task-btn"): {
                    const task = this.getTask(btn.dataset.taskId);
                    this.todoView.renderTaskModal("edit", task);
                    break;
                }

                case btn.classList.contains("edit-task"): {
                    this.editTask(btn.dataset.taskId);
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
        this.todoView.renderCurrentProjectToSideBar(this.stateHandler.getProjects());
        this.todoView.wipeView();
        
    }

    editProject(){
        const editProjectBtn = document.querySelector(".edit-project-btn");
        const form = document.querySelector(".project-form");
        const dialogItem = document.querySelector(".dialog-item");
        const newFormData = new FormData(form);
        const projectName = newFormData.get("projectName").trim();

        if(projectName === "") return;
        const projectDescription = newFormData.get("description").trim();

        dialogItem.close();
        this.stateHandler.editProject(editProjectBtn.dataset.projectId, projectName, projectDescription);

        this.todoView.renderCurrentProjectToSideBar(this.stateHandler.getProjects());
    }


    // task methods


    createNewTask(){
        const taskForm = document.querySelector(".task-form");
        const taskDialog = document.querySelector("#task-dialog");
        const addTaskButton = document.querySelector(".add-task-btn");

        const formData = new FormData(taskForm);
        const projectId = addTaskButton.dataset.projectId;
        const taskTitle = formData.get("taskTitle").trim();
        if(taskTitle === "") return;
        const taskDescription = formData.get("taskDescription").trim();
        const dueDate = formData.get("dueDate").trim();
        const taskPriority = formData.get("taskPriority");

        this.stateHandler.createTodoTask(projectId,taskTitle, taskDescription, dueDate,taskPriority);

        taskForm.reset();
        taskDialog.close();
        this.todoView.renderProject(this.stateHandler.getProjectById(projectId));
    }

    deleteTask(){
        const projectId = document.querySelector(".add-task-btn").dataset.projectId;
        const taskId = document.querySelector(".delete-task-btn").dataset.taskId;
        this.stateHandler.deleteTodoTask(projectId, taskId);
        this.todoView.renderProject(this.stateHandler.getProjectById(projectId));
    }

    getTask(taskId){
        const projectId = document.querySelector(".add-task-btn").dataset.projectId;
        const project = this.stateHandler.getProjectById(projectId)["todoCollection"];
        return this.stateHandler.getTaskByProjectAndTask(project, taskId)
        
    }

    editTask(taskId){
        const taskForm = document.querySelector(".task-form");
        const dialogItem = document.querySelector("#task-dialog");
        const projectId = document.querySelector(".add-task-btn").dataset.projectId;
        const formData = new FormData(taskForm);

        const taskTitle = formData.get("taskTitle").trim();
        if(taskTitle === "") return;
        const taskDescription = formData.get("taskDescription").trim();
        const dueDate = formData.get("dueDate").trim();
        const taskPriority = formData.get("taskPriority") || "Medium";

        dialogItem.close();
        
        this.stateHandler.editTodoTask(projectId,taskId, taskTitle, taskDescription, dueDate, taskPriority);
        
        this.todoView.renderProject(this.stateHandler.getProjectById(projectId));
    }
}


