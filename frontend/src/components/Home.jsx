import "../index.css"
import 'react', { useState } from 'react';
import { CheckCricle2, Circle, Plus, Search, Filter, Calendar, Clock, Star} from 'lucide-react';

function Home() {
   return(<>
     
     <div className="page_constainer">
        <div className="content_wrapper">
          <header className="header">
            <h1>My Task</h1>
            <p>Stay organized and productive</p>
          </header>
          
          <div className="stats_grid">
            <div className="stat_card">
              <div className="stat_header">
                <span className="stat_label">Total Tasks</span> 
                <div className="stat_icon blue">
                  <Calendar />
                </div>
              </div>
              <div className="stat_value">{stats.totla}</div>
            </div>
            
            
            
            <div className="stat_card">
              <div className="stat_header">
               <span className="stat_label">Completed</span>
               <div className="stat_icon emerald">
                <CheckCricle2 />
               </div>
              </div>
              <div className="stat_value">{stats.completed}</div>
            </div>
            
            <div className="stat_card">
              <div className="stat_header">
                <span className="stat_label">High Priority</span>
                <div className="stat_icon red">
                  <Star />
                </div>
              </div>
              <div className="stat_value">{stats.highPriority}</div>
            </div>
          </div>
          
          
        </div>
     </div>

     </>)

  
}


export default Home;
