import { ProjectHandler } from "./project";

export class StateHandler{
    constructor(){
        this.projectCollection = [];
    }

    getProjectIndex(projectId){
        const index = this.projectCollection.findIndex(item => item.projectId === projectId);

        if (index === -1) return;

        return index;
    }

    addProject(name, description = ""){
        const projectId = crypto.randomUUID();
        const newProject = new ProjectHandler(projectId, name, description);
        this.projectCollection.push(newProject);
    }

    getProjects(){ // I have to change this to return when UI
        return this.projectCollection;
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
        const taskId = crypto.randomUUID();
        const index = this.getProjectIndex(projectId);
        if(index === undefined) return;
        this.projectCollection[index].addTodo(taskId,title, description, dueDate, priority);
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