import { UseTasks } from "../hooks/useTasks";
import { useState } from "react";
import TaskForm from "../components/TaskForm";

function Tasks(){
    const {tasks , loading , addTask , editTask ,removeTask } = UseTasks();
    const [taskform , setTasksform] = useState({title:"", description:"",})
  
  return(
    <TaskForm/>
  )

}

export default Tasks;
