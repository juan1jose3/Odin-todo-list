import {ToDoTask} from "./todos";

export class ProjectHandler{
    constructor(projectId, projectName, projectDescription){
        this.projectId = projectId;
        this.projectName = projectName;
        this.projectDescription = projectDescription;
        this.todoCollection = [];
    }

    getTodoIndex(id){
        const index = this.todoCollection.findIndex(todo => todo.id === id);
        if(index === -1) return;
        return index;
    }

    
    addTodo(id,title, description = "", dueDate, priority){
        const newTask = new ToDoTask(id, title, description, dueDate, priority);
        this.todoCollection.push(newTask);
    }

    deleteTodo(id){
        const index = this.getTodoIndex(id);
        if(index === undefined) return;
        this.todoCollection.splice(index, 1);
    }
    
    editTodo(taskId, taskTitle, taskDescription, dueDate, taskPriority){
        const index = this.getTodoIndex(taskId);
        if(taskTitle === "") return;
        this.todoCollection[index]["title"] = taskTitle;
        this.todoCollection[index]["description"] = taskDescription;
        this.todoCollection[index]["dueDate"] = dueDate;
        this.todoCollection[index]["priority"] = taskPriority;
    }

    showAll(){ // I have to change this to return when UI
        for(let task of this.todoCollection){
            console.log(`id: ${task.id}`);
            console.log(`title: ${task.title}`);
            console.log(`description: ${task.description}`);
            console.log(`dueDate: ${task.dueDate}`);
            console.log(`priority: ${task.priority}`);
        }
    }




}