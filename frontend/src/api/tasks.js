import axios from "axios";

const API_URL = "http://localhost/api";


const getHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("token")}`,
  Accept: "application/json",
  "Content-Type": "application/json",
});


export const getTasks =  ()=> axios.get(`${API_URL}/tasks` , {headers:getHeaders()});
export const createTask = (task)=> axios.post(`${API_URL}/tasks` , task,{headers:getHeaders()});
export const updateTask = (id,task)=> axios.put(`${API_URL}/tasks/${id}` , task,{headers:getHeaders()});
export const deleteTask = (id)=> axios.delete(`${API_URL}/tasks/${id}` ,{headers:getHeaders()});


// export function getTasks(){
//         let tata;
//         axios.get(`${API_URL}/tasks`,{headers:getHeaders()})
//         .then((res)=>{
//             tata = res.data
//         }).catch(err => console.log(err))

//         return tata;
// }