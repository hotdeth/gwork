import "../index.css";
import { useState } from 'react';
import { CheckCircle2, Circle, Plus, Search, Filter, Calendar, Clock, Star  } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useAuthHook } from "../hooks/useAuth";
import Header from "./Header";
import { UseTasks } from "../hooks/useTasks";
import TaskForm from "./TaskForm";
import { motion , AnimatePresence } from "framer-motion";

function Home() {
  const navigate = useNavigate();
  const [Add ,setadd] = useState(false);
  const {Tasks , loading , addTask , editTask ,removeTask } = UseTasks();
  const { logout } = useAuthHook();
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Review Q4 financial reports', completed: false, priority: 'high', dueDate: '2025-10-08', category: 'Work' },
    { id: '2', title: 'Update project documentation', completed: false, priority: 'medium', dueDate: '2025-10-10', category: 'Work' },
    { id: '3', title: 'Team meeting at 3 PM', completed: false, priority: 'high', dueDate: '2025-10-07', category: 'Meetings' },
    { id: '4', title: 'Grocery shopping', completed: true, priority: 'low', category: 'Personal' },
    { id: '5', title: 'Schedule dentist appointment', completed: false, priority: 'medium', dueDate: '2025-10-12', category: 'Personal' },
  ]);

  //test logout function in this page :) 
  
  function handleLogout(){
    logout();
    navigate("/login")
  }


  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesFilter =
      filter === 'all' ? true :
      filter === 'active' ? !task.completed :
      task.completed;

    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
    highPriority: tasks.filter(t => t.priority === 'high' && !t.completed).length,
  };

  const isToday = (dateString) => {
    if (!dateString) return false;
    const today = new Date().toISOString().split('T')[0];
    return dateString === today;
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const today = new Date().toISOString().split('T')[0];
    return dateString < today;
  };

  return (<>
  <Header/>
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

          <div className="stat-card">
            <div className="stat-header">
              <span className="stat-label">High Priority</span>
              <div className="stat-icon red">
                <Star />
              </div>
            </div>
            <div className="stat-value">{stats.highPriority}</div>
          </div>
        </div>

  <AnimatePresence>
   {Add && (
    <motion.div
      initial={{ opacity: 0, y: -20 }}  // starting style
      animate={{ opacity: 1, y: 0 }}    // enter animation
      exit={{ opacity: 0, y: 20 }}      // exit animation
      transition={{ duration: 0.3 }}    // speed
    >
      <TaskForm />
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
            <button onClick={()=>setadd(!Add)} className="new-task-button-close">
                <circle/>
                X close
              </button>
          :
          <button onClick={()=>setadd(!Add)} className="new-task-button">
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
                      {task.completed ? (
                        <CheckCircle2 className="checked" />
                      ) : (
                        <Circle className="unchecked" />
                      )}
                    </button>

                    <div className="task-details">
                      <h3 className={`task-title ${task.completed ? 'completed' : ''}`}>
                        {task.title}
                      </h3>

                      <div className="task-meta">
                        <span className={`badge priority-${task.priority}`}>
                          <span className="badge-dot"></span>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                        </span>

                        <span className="badge category">
                          {task.category}
                        </span>

                        {task.dueDate && (
                          <span className={`badge date ${
                            isOverdue(task.dueDate) && !task.completed
                              ? 'overdue'
                              : isToday(task.dueDate)
                              ? 'today'
                              : ''
                          }`}>
                            <Calendar />
                            {isToday(task.dueDate) ? 'Today' : task.dueDate}
                          </span>
                        )}
                      </div>
                    </div>
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
  </>);
}

export default Home;
