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

    showProjects(){
        for(let project of this.projectCollection){
            console.log(`Project: ${project.projectName}`);
            console.log(`Project description: ${project.projectDescription}`);
        }
    }

    deleteProject(projectId){
        this.projectCollection.splice(this.projectCollection.findIndex(index => index.projectId === projectId), 1);
    }

    
    
    
    showTodoTasks(projectId){
        const projectIdIndex = this.getProjectIndex(projectId);
        this.projectCollection[projectIdIndex].showAll();
    }

    createTodoTask(projectId, title, description = "", dueDate, priority){
        const id = this.counter;
        this.counter ++;
        const index = this.getProjectIndex(projectId);
        this.projectCollection[index].addTodo(id,title, description, dueDate, priority);
    }

    deleteTodoTask(projectId, taskId){
        const projectIdIndex = this.getProjectIndex(projectId);
        this.projectCollection[projectIdIndex].deleteTodo(taskId);
    }

    editTodoTask(projectId, taskId, field, value){
        const projectIdIndex = this.getProjectIndex(projectId)
        this.projectCollection[projectIdIndex].editTodo(taskId, field, value);
    }

}