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

    renderProject(projectList){
        const currentProjectsList = document.querySelector(".current-projects-list");
        currentProjectsList.textContent = "";

        for(let project of projectList){
            const projectBtn = document.createElement("button");
            projectBtn.textContent = project.projectName;
            projectBtn.dataset.projectId = project.projectId;
            projectBtn.classList.add("custom-button");
            currentProjectsList.appendChild(projectBtn);
        }

    }

    renderAllTasks(){
        
    }

    renderUpcoming(){
 
    }

}