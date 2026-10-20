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

    createTaskElement(task){
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");
        if (task.isDone) {
            taskCard.classList.add("completed");
        }
        if (task.priority) {
            taskCard.classList.add(`priority-${task.priority.toLowerCase()}`);
        }
        taskCard.dataset.taskId = task.id;

        // Left side: Checkbox + Title & Description
        const leftGroup = document.createElement("div");
        leftGroup.classList.add("task-left");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = Boolean(task.isDone);
        checkbox.classList.add("task-checkbox");
        checkbox.dataset.taskId = task.id;

        const infoWrapper = document.createElement("div");
        infoWrapper.classList.add("task-info");

        const taskTitle = document.createElement("h4");
        taskTitle.textContent = task.title;
        taskTitle.classList.add("task-title");

        infoWrapper.appendChild(taskTitle);

        if (task.description) {
            const taskDesc = document.createElement("p");
            taskDesc.textContent = task.description;
            taskDesc.classList.add("task-description");
            infoWrapper.appendChild(taskDesc);
        }

        leftGroup.append(checkbox, infoWrapper);

        // Right side: Due Date, Priority badge, Delete button
        const rightGroup = document.createElement("div");
        rightGroup.classList.add("task-right");

        if (task.dueDate) {
            const dueDateSpan = document.createElement("span");
            dueDateSpan.textContent = task.dueDate;
            dueDateSpan.classList.add("task-due-date");
            rightGroup.appendChild(dueDateSpan);
        }

        if (task.priority) {
            const priorityBadge = document.createElement("span");
            priorityBadge.textContent = task.priority;
            priorityBadge.classList.add("task-priority-badge");
            rightGroup.appendChild(priorityBadge);
        }

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "🗑";
        deleteBtn.classList.add("custom-button", "delete-task-btn");
        deleteBtn.dataset.taskId = task.id;
        rightGroup.appendChild(deleteBtn);

        taskCard.append(leftGroup, rightGroup);

        return taskCard;
    }

    renderAddTaskModal(){
        document.querySelector("#task-dialog").showModal();

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