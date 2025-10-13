
import { UseTasks } from "../hooks/useTasks";


function Tasks(){
  const {tasks , removeTask} = UseTasks();




  return(<> 
{tasks.map((task)=>(
  <div className="bg-black flex  justify-between text-white m-1 p-2" key={task.id}>
    <p>{task.title}</p>
    <p className="flex-1 pl-4 text-gray-500">{task.description}</p>
    <button onClick={()=> removeTask(task.id)} className="bg-red-500 px-2 rounded">Delete</button>
  </div>
))}
  </>)
}


export default Tasks;