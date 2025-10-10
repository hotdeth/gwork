import { useState , useEffect } from "react";
import * as taskApi from "../api/tasks";



export const UseTasks = ()=>{
    const [tasks, setTasks] = useState([]);
    const [loading , setLoading] = useState(true);


    const fetchTasks = async()=>{
        setLoading(true);
        try{
            const res = taskApi.getTasks();
            setTasks(res.data);
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    };


    const addTask = async(task)=>{
        const res = await taskApi.createTask(task);
        setTasks(prev => [...prev, res.data]);
    };

    const editTask = async(id , task)=>{
        const res = await taskApi.updateTask(id , task);
        setTasks(prev => [...prev , res.data])
    };

    const removeTask = async(id)=>{
        const res = await taskApi.deleteTask(id);
        setTasks(prev => prev.filter(t => t.id !== id));
    };

    useEffect(()=>{
        fetchTasks();
    },[])


return{tasks, loading,fetchTasks,addTask,editTask,removeTask};
};