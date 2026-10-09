export class ToDoTask{
    constructor(id ,title, description = "", dueDate, priority, isDone=false){
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.isDone = isDone;
    }

}