const ICONS = {
    trash: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
    edit: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`,
    plus: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
    search: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>`
};

export class TodoView{

    renderSearch(){
        const mainContent = document.querySelector(".main-content");
        mainContent.textContent = "";

        const searchContainer = document.createElement("div");
        searchContainer.classList.add("project-container", "search-container");

        const header = document.createElement("div");
        header.classList.add("project-header");

        const title = document.createElement("h1");
        title.textContent = "Search Tasks";

        const description = document.createElement("p");
        description.textContent = "Search across all your projects by task title or description";

        const searchInputWrapper = document.createElement("div");
        searchInputWrapper.classList.add("search-input-wrapper");

        const searchIconSpan = document.createElement("span");
        searchIconSpan.classList.add("search-input-icon");

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.placeholder = "Type to search tasks...";
        searchInput.classList.add("search-input");
        searchInput.autocomplete = "off";

        searchInputWrapper.append(searchIconSpan, searchInput);
        header.append(title, description, searchInputWrapper);
        searchContainer.appendChild(header);

        const resultsContainer = document.createElement("div");
        resultsContainer.classList.add("task-list-container", "search-results-container");

        const initialMsg = document.createElement("p");
        initialMsg.classList.add("empty-tasks-message");
        resultsContainer.appendChild(initialMsg);

        searchContainer.appendChild(resultsContainer);
        mainContent.appendChild(searchContainer);

        searchInput.focus();
    }

    renderSearchResults(tasks = [], query = ""){
        const resultsContainer = document.querySelector(".search-results-container");
        if(!resultsContainer) return;

        resultsContainer.textContent = "";

        const cleanQuery = query.trim();
        if(cleanQuery === ""){
            const initialMsg = document.createElement("p");
            initialMsg.textContent = "Start typing above to search tasks...";
            initialMsg.classList.add("empty-tasks-message");
            resultsContainer.appendChild(initialMsg);
            return;
        }

        if(tasks.length === 0){
            const emptyMsg = document.createElement("p");
            emptyMsg.textContent = `No tasks found matching "${cleanQuery}".`;
            emptyMsg.classList.add("empty-tasks-message");
            resultsContainer.appendChild(emptyMsg);
            return;
        }

        for(let task of tasks){
            const taskCard = this.createTaskElement(task, false);
            resultsContainer.appendChild(taskCard);
        }
    }

    wipeView(){
        const mainContent = document.querySelector(".main-content");
        mainContent.textContent = "";
    }

    renderProjects(projects){
        console.log(projects);
    }

    renderToday(tasks = []){
        this.renderTaskListView("Today", "Tasks scheduled for today", tasks);
    }

    renderAllTasks(tasks = []){
        this.renderTaskListView("All Tasks", "Every task across all your projects", tasks);
    }

    renderTaskListView(viewTitle, viewSubtitle, tasks = []){
        const mainContent = document.querySelector(".main-content");
        mainContent.textContent = "";

        const projectContainer = document.createElement("div");
        projectContainer.classList.add("project-container");

        const header = document.createElement("div");
        header.classList.add("project-header");

        const title = document.createElement("h1");
        title.textContent = viewTitle;

        const description = document.createElement("p");
        description.textContent = viewSubtitle;

        header.append(title, description);
        projectContainer.appendChild(header);

        const taskListContainer = document.createElement("div");
        taskListContainer.classList.add("task-list-container");

        if(!tasks || tasks.length === 0){
            const emptyMsg = document.createElement("p");
            emptyMsg.textContent = viewTitle === "Today" 
                ? "No tasks due today. You're all caught up!" 
                : "No tasks found across any projects.";
            emptyMsg.classList.add("empty-tasks-message");
            taskListContainer.appendChild(emptyMsg);
        } else {
            for(let task of tasks){
                const taskCard = this.createTaskElement(task, false);
                taskListContainer.appendChild(taskCard);
            }
        }

        projectContainer.appendChild(taskListContainer);
        mainContent.appendChild(projectContainer);
    }

    createTaskElement(task, showActions = true){
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

        // Right side: Due Date, Priority badge, Delete/Edit buttons
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

        if(showActions){
            const editBtn = document.createElement("button");
            editBtn.innerHTML = ICONS.edit;
            editBtn.title = "Edit Task";
            editBtn.classList.add("custom-button", "edit-task-btn");
            editBtn.dataset.taskId = task.id;
            rightGroup.appendChild(editBtn);

            const deleteBtn = document.createElement("button");
            deleteBtn.innerHTML = ICONS.trash;
            deleteBtn.title = "Delete Task";
            deleteBtn.classList.add("custom-button", "delete-task-btn");
            deleteBtn.dataset.taskId = task.id;
            rightGroup.appendChild(deleteBtn);
        }

        taskCard.append(leftGroup, rightGroup);

        return taskCard;
    }

    renderTaskModal(action, task = null){
        const form = document.querySelector(".task-form");
        const dialog = document.querySelector("#task-dialog");
        const submitBtn = document.querySelector(".task-submit-btn");
        const taskDialogTitle = document.querySelector(".task-dialog-title");

        const actionButton = {
            "edit": () => {
                submitBtn.classList.remove("create-task");
                submitBtn.classList.add("edit-task");
            },
            "add": () => {
                submitBtn.classList.remove("edit-task");
                submitBtn.classList.add("create-task");
            }
        };

        if(action === "edit" && task){
            taskDialogTitle.textContent = "Edit Task";
            submitBtn.textContent = "Save Changes";
            submitBtn.dataset.taskId = task.id;
            actionButton[action]();

            
            form.taskTitle.value = task.title;
            form.taskDescription.value = task.description || "";
            form.dueDate.value = task.dueDate || "";

            
            const priorityRadio = form.querySelector(`input[name="taskPriority"][value="${task.priority}"]`);
            if (priorityRadio) {
                priorityRadio.checked = true;
            }
        } else {
            taskDialogTitle.textContent = "Create a new task";
            submitBtn.textContent = "Create!";
            delete submitBtn.dataset.taskId;
            actionButton[action]();

            form.reset();
            
            const defaultRadio = form.querySelector("#medium");
            if (defaultRadio) {
                defaultRadio.checked = true;
            }
        }

        dialog.showModal();
    }

    renderProjectModal(action, project=null){

        const form = document.querySelector(".project-form");
        const dialog = document.querySelector("#custom-dialog");
        const submitBtn = document.querySelector(".project-submit-btn");
        const projectDialogTitle = document.querySelector(".project-dialog-title");

        const actionButton ={
            "edit": () => submitBtn.classList.replace("create-project", "edit-project"),

            "add": () => submitBtn.classList.replace("edit-project", "create-project")
        }

        if(action === "edit"){
            projectDialogTitle.textContent = "Edit project";
            form.projectName.value = project.projectName;
            form.description.value = project.projectDescription;
            submitBtn.dataset.projectId = project.projectId;
            actionButton[action](); 
            submitBtn.dataset.action = "edit";            
            submitBtn.textContent = "Edit!";
            
        }else{
            projectDialogTitle.textContent = "Add a project";
            submitBtn.textContent = "Create!";
            actionButton[action](); 
            submitBtn.dataset.action = "create";
            form.reset();
        }
        dialog.showModal();

    }

    renderCurrentProjectToSideBar(projectList){
        const currentProjectsList = document.querySelector(".current-projects-list");
        currentProjectsList.textContent = "";

        for(let project of projectList){
            const projectItem = document.createElement("div");
            projectItem.classList.add("project-item-container");

            const projectBtn = document.createElement("button");
            projectBtn.textContent = project.projectName;
            projectBtn.dataset.projectId = project.projectId;
            projectBtn.classList.add("custom-button", "project-item");

            const projectBtnsWrapper = document.createElement("div");
            projectBtnsWrapper.classList.add("project-item-actions");

            const editProjectBtn = document.createElement("button");
            editProjectBtn.innerHTML = ICONS.edit;
            editProjectBtn.title = "Edit Project";
            editProjectBtn.dataset.projectId = project.projectId;
            editProjectBtn.classList.add("custom-button", "edit-project-btn");

            const deleteProjectBtn = document.createElement("button");
            deleteProjectBtn.innerHTML = ICONS.trash;
            deleteProjectBtn.title = "Delete Project";
            deleteProjectBtn.dataset.projectId = project.projectId;
            deleteProjectBtn.classList.add("custom-button", "delete-project-btn");

            projectBtnsWrapper.append(editProjectBtn, deleteProjectBtn);
            projectItem.append(projectBtn, projectBtnsWrapper);
            currentProjectsList.appendChild(projectItem);
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

        const actionsWrapper = document.createElement("div");
        actionsWrapper.classList.add("project-actions");

        const addTaskBtn = document.createElement("button");
        addTaskBtn.innerHTML = `${ICONS.plus} <span>Add Task</span>`;
        addTaskBtn.classList.add("custom-button", "add-task-btn");
        addTaskBtn.dataset.projectId = project.projectId;

        const editProjectBtn = document.createElement("button");
        editProjectBtn.innerHTML = `${ICONS.edit} <span>Edit Project</span>`;
        editProjectBtn.title = "Edit Project";
        editProjectBtn.classList.add("custom-button", "edit-project-btn");
        editProjectBtn.dataset.projectId = project.projectId;

        const deleteProjectBtn = document.createElement("button");
        deleteProjectBtn.innerHTML = `${ICONS.trash} <span>Delete Project</span>`;
        deleteProjectBtn.title = "Delete Project";
        deleteProjectBtn.classList.add("custom-button", "delete-project-btn");
        deleteProjectBtn.dataset.projectId = project.projectId;

        actionsWrapper.append(addTaskBtn, editProjectBtn, deleteProjectBtn);

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

        header.append(title, description, actionsWrapper);
        projectContainer.appendChild(header);
        
        projectContainer.appendChild(taskListContainer);

        mainContent.appendChild(projectContainer);

    }

}