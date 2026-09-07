const fs = require("fs");

const FILE = "tasks.json";
/**
 * - 1. Add Tasks gettask|savetask|addTask
 * - 2. Update tasks description
 * - 3. Delete Tasks
 * - 4. Mark Tasks
 * - 5. List Tasks
 */

/**
 * - 1. Add Tasks
 */
// Read task from the JSON file
function getTasks(){
    if(!fs.existsSync(FILE)){
    fs.writeFileSync(FILE, "[]");
}
const data = fs.readFileSync(FILE, "utf-8");

//Return an empty array if file not found
if(data ===""){
    return [];
}
return JSON.parse(data);
}

//Saves tasks to the json file
function saveTasks(tasks){
    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2))
}

//Add a new task
function addTask(description){
    const tasks = getTasks();

    let newId;
    if(tasks.length=== 0){
        newId = 1
    }else{
        //Find the biggest ID and add 1
        const tasksIds = tasks.map(task => task.id);
        const biggestId= Math.max(...tasksIds);

        newId = biggestId +1
    };

    const newTask = {
        id: newId,
        description: description,
        status: "todo",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks(tasks)
    console.log("Task added Successfully")
};

/**
 * - 2. Updates task description
 */
function updateTask(id, description){
    const tasks = getTasks();

    let task = null;

    for(let i = 0; i < tasks.length; i++){
        if(tasks[i].id ===id){
            task = tasks[i];
            break;
        };
    };

    if(!task){
        console.log("Task not found");
        return;
    }
    task.description = description;
    task.updatedAt = new Date().toISOString();

    saveTasks(tasks)

    console.log("Task updated successfully.");
}

/**
 * - 3. Deletes Task
 */
function deleteTask(id){
    const tasks = getTasks();
    // To check whather task exists
    let taskExists = false;
    for(let i = 0; i< tasks.length; i++){
        if(tasks[i].id ===id){
            taskExists = true
            break;
        }
    }
    if(!taskExists){
        console.log("Task not found");
        return
    }
    const newTasks = [];
    //To push tasks accept deleted task
    for(let i =0; i<tasks.length; i++){
        if(tasks[i].id !==id)
        newTasks.push(tasks[i]);
    }
    saveTasks(newTasks);

    console.log("Task Deleted successfully")
}

/**
 * - 4. Mark Tasks
 */
function markTask(id, status){
    const tasks = getTasks();
    //Find Task by ID
    let task = null;
    for(let i=0;i<tasks.length; i++){
        if(tasks[i].id ===id){
            task = tasks[i];
            break
        }
    }
    if(!task){
        console.log("Task not found");
        return
    }
    task.status = status;
    task.updatedAt = new Date().toISOString();
    saveTasks(tasks);
    console.log(`status: ${status}`)
}

/**
 * - 5.List Tasks
 */
function listTasks(status){
    const tasks = getTasks();

    let filteredTasks;
    if(status){
        filteredTasks =[];
        //To filter the tasks using status
        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].status ===status){
                filteredTasks.push(tasks[i])
            }
        }
    }else{
        filteredTasks = tasks
    }
    console.log(filteredTasks)
}
module.exports ={
    addTask, updateTask, deleteTask, markTask, listTasks
}