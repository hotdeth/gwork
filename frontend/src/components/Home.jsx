import "../index.css"
import { useState } from 'react';
import { CheckCircle2, Circle, Plus, Search, Filter, Calendar, Clock, Star} from 'lucide-react';

function Home() {
  const [tasks, setTasks] = useState([
    {id: '1', title: 'Test', completed: false, priority: 'high',
      duDate: '2025-10-08', category: 'Project'},

    {id: '2', title: 'Test2', completed: false, priority: 'medium',
      dueDate: '2025-10-09', category: 'Job'},

  ])

   const [filter, setFileter] = useState('all');
   const [searchQuery, setSearchQuery] = useState('');

   const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? {...task, completed: !task.completed } : task
    ));

    const filteredTasks = tasks.filter(task => {
      const matchesFilter =
      filter === 'all' ? true:
      filter === 'active' ? !task.completed:
      task.completed;
    

    const matchesSearch =
  task.title.toLowerCase().includes(searchQuery.toLocaleLowerCase());
  
  return mathceesFilter && matchesSearch;
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
   
   return(<>
     
     <div className="page-constainer">
        <div className="content-wrapper">
          <header className="header">
            <h1>My Task</h1>
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
          
          
        </div>
     </div>

     </>
     );

  }}


export default Home;