export class TodoView{

    renderSearch(){

    }

    wipeView(){
        const mainContent = document.querySelector(".main-content");
        mainContent.textContent = "";
    }

    renderProjects(projects){
        console.log(projects);

    }

    renderToday(){
        const mainContent = document.querySelector(".main-content");
        const todayWrapper = document.createElement("div");
        todayWrapper.textContent = "rtedsñlfdsf";
        mainContent.appendChild(todayWrapper);
    }

    renderCurrentProjectToSideBar(projectList){
        const currentProjectsList = document.querySelector(".current-projects-list");
        currentProjectsList.textContent = "";

        for(let project of projectList){
            const projectBtn = document.createElement("button");
            projectBtn.textContent = project.projectName;
            projectBtn.dataset.projectId = project.projectId;
            projectBtn.classList.add("custom-button", "project-item");
            currentProjectsList.appendChild(projectBtn);
        }

    }


    renderProject(project){
        const mainContent = document.querySelector(".main-content");
        mainContent.textContent = "";
        
        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");

        const header = document.createElement("div");
        header.classList.add("project-header");

        const title = document.createElement("h1");
        title.textContent = project.projectName;

        const description = document.createElement("p");
        description.textContent = project.projectDescription;

        const addTaskBtn = document.createElement("button");
        addTaskBtn.textContent = "+ Add Task";
        addTaskBtn.classList.add("custom-button", "add-task-btn");
        addTaskBtn.dataset.projectId = project.projectId;


        const taskListContainer = document.createElement("div");
        taskListContainer.classList.add("task-list-container");  

        const toDos = project.todoCollection;

        if(toDos.length === 0){
            const emptyMsg = document.createElement("p"); 
            emptyMsg.textContent = "No tasks yet in this project."; 
            emptyMsg.classList.add("empty-tasks-message"); 
            taskListContainer.appendChild(emptyMsg);  
        }else{
            for(let toDo of toDos){
                const taskCard = this.createTaskElement(toDo);
                taskListContainer.appendChild(taskCard);
            }
        }

        header.append(title, description, addTaskBtn);
        projectContainer.appendChild(header);
        
        projectContainer.appendChild(taskListContainer);

        mainContent.appendChild(projectContainer);

    }

    renderAllTasks(){
        
    }

    renderUpcoming(){
 
    }

}