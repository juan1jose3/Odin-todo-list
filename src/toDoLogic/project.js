import {ToDoTask} from "./todos";

export class ProjectHandler{
    constructor(projectId, projectName, projectDescription){
        this.projectId = projectId;
        this.projectName = projectName;
        this.projectDescription = projectDescription;
        this.todoCollection = [];
    }

    
    addTodo(id,title, description = "", dueDate, priority){
        const newTask = new ToDoTask(id, title, description, dueDate, priority);
        this.todoCollection.push(newTask);
    }

    deleteTodo(id){
        const index = this.todoCollection.findIndex(task => task.id === id);
        this.todoCollection.splice(index, 1);
    }
    
    editTodo(id, field, value){
        const index = this.todoCollection.findIndex(task => task.id === id);
        this.todoCollection[index].field = value;
    }

    showAll(){
        for(task of this.todoCollection){
            console.log(`id: ${task.id}`);
            console.log(`title: ${task.title}`);
            console.log(`description: ${task.description}`);
            console.log(`dueDate: ${task.dueDate}`);
            console.log(`priority: ${task.priority}`);
        }
    }




}