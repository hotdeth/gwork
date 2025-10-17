import {UseTasks} from "../hooks/useTasks"
import { useState } from "react"


function TaskForm(){
    const {tasks , loading , addTask , editTask ,removeTask } = UseTasks();
    const [taskform , setTasksform] = useState({title:"", description:"",})
 



    function handleadd(e){
        e.preventDefault();
        addTask(taskform);
        setTasksform({title:"",description:""});
        setMessage("The Task Is add Successfully")
    }

    return(<><form onSubmit={handleadd}>
    <div className="relative bg-white flex p-5 rounded-2xl flex-col text-black h-90">    
        <h1 className="text-4xl mb-5">Add New Task</h1>
        <label className="text-3xl" htmlFor="">Title</label>
        <input value={taskform.title} onChange={(e)=> setTasksform({...TaskForm,title:e.target.value})} className="px-3 text-xl mb-5 w-100 h-10  shadow rounded" type="text" placeholder="Title"/>
         <label className="text-3xl" htmlFor="">Description</label>
        <input value={taskform.description} onChange={(e)=> setTasksform({...taskform,description:e.target.value})} className="px-3 text-xl mb-5 w-100 h-10  shadow rounded" type="text" placeholder="Description"/>
        <button className="w-20 rounded font-bold text-2xl   text-white bg-blue-600 ">Add</button>
    </div>
</form>
    </>)

}


export default TaskForm;