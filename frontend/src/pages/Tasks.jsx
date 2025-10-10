import { UseTasks } from "../hooks/useTasks";

function Tasks(){
    const {tasks , loading , addTask , editTask ,removeTask } = UseTasks();

  
     return (
    <div>
      <h1>Your Tasks</h1>
      {tasks.map(task => (
        <div key={task.id}>
          <h3>{task.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
