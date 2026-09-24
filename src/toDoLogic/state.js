import { ProjectHandler } from "./project";

export class StateHandler{
    constructor(){
        this.projectCollection = [];
        this.counter = 1; // I have to remove this
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

    showProjects(){ // I have to change this to return when UI
        for(let project of this.projectCollection){
            console.log(`Project: ${project.projectName}`);
            console.log(`Project description: ${project.projectDescription}`);
        }
    }

    deleteProject(projectId){
        const index = this.getProjectIndex(projectId);
        if(index === undefined) return;
        this.projectCollection.splice(index, 1);
    }

    editProject(projectId, field, value){
        const index = this.getProjectIndex(projectId);
        if(index === undefined) return;
        this.projectCollection[index][field] = value;
    }

    // TodoTask methods
     
    showTodoTasks(projectId){ // I have to replace this by returning when UI
        this.projectCollection[this.getProjectIndex(projectId)].showAll();
    }

    createTodoTask(projectId, title, description = "", dueDate, priority){
        const id = this.counter;
        this.counter ++; // remove this and use crypto.randomUUID(); 
        const index = this.getProjectIndex(projectId);
        if(index === undefined) return;
        this.projectCollection[index].addTodo(id,title, description, dueDate, priority);
    }

    deleteTodoTask(projectId, taskId){
        const index = this.getProjectIndex(projectId);
        if(index === undefined) return;
        this.projectCollection[index].deleteTodo(taskId);
    }

    editTodoTask(projectId, taskId, field, value){
        const index = this.getProjectIndex(projectId);
        if(index === undefined) return;
        this.projectCollection[index].editTodo(taskId, field, value);
    }

}