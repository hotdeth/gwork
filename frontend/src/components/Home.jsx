import "../index.css";
import { useState } from 'react';
import { CheckCircle2, Circle, Plus, Search, Filter, Calendar, Clock } from 'lucide-react';
import Header from "./Header";
import TaskForm from "./TaskForm";
import { motion , AnimatePresence } from "framer-motion";
import { UseTasks } from "../hooks/useTasks";
import { p } from "framer-motion/client";

function Home() {
  const [Add, setAdd] = useState(false);
  const { tasks, editTask , addTask, removeTask } = UseTasks();

  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
   const [taskform , setTasksform] = useState({title:"", description:"",})
 

  // Toggle task completion
  const toggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      editTask(id, { ...task, is_completed: task.is_completed ? 0 : 1 });
    }
  };



   function handleadd(e){
        e.preventDefault();
        addTask(taskform);
        setTasksform({title:"",description:""});
        setMessage("The Task Is add Successfully")
    }


  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ? true :
      filter === 'active' ? !task.is_completed :
      task.is_completed;

    const matchesSearch = (task.title || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Stats
  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.is_completed).length,
    active: tasks.filter(t => !t.is_completed).length,
  };

  const isToday = (dateString) => {
    if (!dateString) return false;
    const today = new Date().toISOString().split('T')[0];
    return dateString.split('T')[0] === today;
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const today = new Date().toISOString().split('T')[0];
    return dateString.split('T')[0] < today;
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <div className="content-wrapper">
          <header className="header mb-10 mt-10">
            <h1>My Tasks</h1>
            <p>Stay organized and productive</p>
          </header>

          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Total Tasks</span>
                <div className="stat-icon blue">
                  <Calendar />
                </div>
              </div>
              <div className="stat-value">{stats.total}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Active</span>
                <div className="stat-icon amber">
                  <Clock />
                </div>
              </div>
              <div className="stat-value">{stats.active}</div>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span className="stat-label">Completed</span>
                <div className="stat-icon emerald">
                  <CheckCircle2 />
                </div>
              </div>
              <div className="stat-value">{stats.completed}</div>
            </div>
          </div>

          <AnimatePresence>
            {Add && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <form onSubmit={handleadd}>
    <div className="relative bg-white flex p-5 rounded-2xl flex-col text-black h-90">    
        <h1 className="text-4xl mb-5">Add New Task</h1>
        <label className="text-3xl" htmlFor="">Title</label>
        <input value={taskform.title} onChange={(e)=> setTasksform({...TaskForm,title:e.target.value})} className="px-3 text-xl mb-5 w-100 h-10  shadow rounded" type="text" placeholder="Title"/>
         <label className="text-3xl" htmlFor="">Description</label>
        <input value={taskform.description} onChange={(e)=> setTasksform({...taskform,description:e.target.value})} className="px-3 text-xl mb-5 w-100 h-10  shadow rounded" type="text" placeholder="Description"/>
        <button className="w-20 rounded font-bold text-2xl   text-white bg-blue-600 ">Add</button>
    </div>
</form>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="tasks-container mt-10">
            <div className="tasks-header">
              <div className="controls">
                <div className="search-wrapper">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search tasks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>

                <div className="filter-buttons">
                  <button
                    onClick={() => setFilter('all')}
                    className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('active')}
                    className={`filter-button ${filter === 'active' ? 'active' : ''}`}
                  >
                    Active
                  </button>
                  <button
                    onClick={() => setFilter('completed')}
                    className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                  >
                    Completed
                  </button>
                </div>

                {Add ?
                  <button onClick={() => setAdd(!Add)} className="new-task-button-close">
                    <Circle />
                    X close
                  </button>
                  :
                  <button onClick={() => setAdd(!Add)} className="new-task-button">
                    <Plus />
                    New Task
                  </button>
                }
              </div>
            </div>

            <div className="tasks-list">
              {filteredTasks.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">
                    <Filter />
                  </div>
                  <p>No tasks found</p>
                  <p className="subtitle">Try adjusting your filters or search query</p>
                </div>
              ) : (
                filteredTasks.map((task) => (
                  <div key={task.id} className="task-item">
                    <div className="task-content">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="task-checkbox"
                      >
                        {task.is_completed ? (
                          <CheckCircle2 className="checked" />
                        ) : (
                          <Circle className="unchecked" />
                        )}
                      </button>

                      <div className="task-details">
                        <h3 className={`task-title ${task.is_completed ? 'completed' : ''}`}>
                          {task.title || "Untitled Task"}
                        </h3>

                        <div className="task-meta">
                          {task.created_at && (
                            <span
                              className={`badge date ${
                                isOverdue(task.created_at) && !task.is_completed
                                  ? "overdue"
                                  : isToday(task.created_at)
                                  ? "today"
                                  : ""
                              }`}
                            >
                              <Calendar />
                              {isToday(task.created_at)
                                ? "Today"
                                : new Date(task.created_at).toLocaleString("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                            </span>
                          )}
                          {task.is_general ? <p className="bg-yellow-400 px-3 rounded-3xl p-1">General</p> : <p className="bg-blue-400 px-3 p-1 rounded-3xl">For You</p>}
                        </div>
    
                      </div>
                      <button onClick={()=>removeTask(task.id)} className="border px-1 rounded cursor-pointer hover:bg-red-500 transition-colors duration-100">Delete</button>
                    </div>
                    
                  </div>
                ))
              )}
            
            </div>
            
          </div>

          {filteredTasks.length > 0 && (
            <div className="footer-info">
              Showing {filteredTasks.length} of {tasks.length} tasks
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
