import { ProjectHandler } from "./project";

export class StateHandler{
    constructor(){
        this.projectCollection = [];
        this.counter = 1;
    }

    getProjectIndex(projectId){
        const index = this.projectCollection.findIndex(item => item.projectId === projectId);

        if (index === -1) return;

        return index;
    }

    addProject(projectId,name, description = ""){
        //const id = crypto.randomUUID();
        const newProject = new ProjectHandler(projectId, name, description);
        this.projectCollection.push(newProject);
    }

    
    
    
    showTodos(projectId){
        const projectIdIndex = this.getProjectIndex(projectId);
        this.projectCollection[projectIdIndex].showAll();
    }

    createTodo(projectId, title, description = "", dueDate, priority){
        const id = this.counter;
        this.counter ++;
        const index = this.getProjectIndex(projectId);
        this.projectCollection[index].addTodo(id,title, description, dueDate, priority);
    }

    deleteTask(projectId, taskId){
        const projectIdIndex = this.getProjectIndex(projectId);
        this.projectCollection[projectIdIndex].deleteTodo(taskId);
    }

    editTask(projectId, taskId, field, value){
        const projectIdIndex = this.getProjectIndex(projectId)
        this.projectCollection[projectIdIndex].editTodo(taskId, field, value);
    }

}