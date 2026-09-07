//Import the exported functions from taskManager.js
const {addTask, updateTask, deleteTask, markTask, listTasks} = require("./taskManager");

//to accept commands or arguments from terminal
const args = process.argv.slice(2);

const command = args[0];

//To check which command user intered
switch (command) {
    //Add new task
    case "add":
        if(!args[1]){
            console.log("Please provide Task Description")
        }else{
            addTask(args[1])
        }
        break;
    
    //Update an existing task    
    case "update":
        if(!args[1]){
            console.log("node app.js update <id> <description>")
        }else{
            updateTask(Number(args[1]), args[2]);
        }
        break;

    // Delete an existing task
    case "delete":
        if(!args[1]){
            console.log("Provide a task ID")
        }else{
            deleteTask(Number(args[1]));
        }
        break;
    
    //Mark a task as inprogress
    case "in-progress":
        if(!args[1]){
            console.log("Provide a Taask ID")
        }else{
            markTask(Number(args[1]), "in-progress");
        }
        break;

    //Mark a task as done
    case "done":
        if(!args[1]){
            console.log("Provide a Task ID")
        }else{
            markTask(Number(args[1]), "done")
        }
        break;

    //List all tasks
    case "list":
        if(!args[1]){
            listTasks();
        }else if(
            args[1] === "done" ||
            args[1] === "todo" ||
            args[1] === "in-progress"
        ) {
            listTasks(args[1]);
        }else{
            console.log("invalid status");
        }
        break;

    //Handle wrong commands
    default:
        console.log("Invalid Command");
        console.log("Available Commands");
        console.log("add");
        console.log("update");
        console.log("delete");
        console.log("in-progress");
        console.log("done");
        console.log("list"); 
}