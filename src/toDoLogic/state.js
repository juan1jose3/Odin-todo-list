import { ProjectHandler } from "./project";

export class StateHandler{
    constructor(){
        this.projectCollection = [];
    }

    addProject(projectId,name, description = ""){
        //const id = crypto.randomUUID();
        const newProject = new ProjectHandler(projectId, name, description);
        this.projectCollection.push(newProject);
    }

    createTodo(projectId, title, description = "", dueDate, priority){
        const id = crypto.randomUUID();
        const index = this.projectCollection.findIndex(item => item.projectId === projectId);

        this.projectCollection[index].addTodo(id,title, description, dueDate, priority);
    }

}