import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CalendarTask from '../components/Tasks/CalendarTask';
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { axiosClient } from "../api/AxiosClient";

const HouseholdSchedulePage = () => {
  const [tasks, setTasks] = useState([]);
  const [household, setHousehold] = useState();
  const location = useLocation();
  const data = location.state?.data;
  const { getAccessTokenWithPopup } = useAuth0();
  
  useEffect(() => {
    if(data !== null){
      setHousehold(data)
    }
  }, [data])
  

  useEffect(() => {
    if(household !== undefined){
      let tasks = [];

      household.tenants.forEach((tenant, index)=>{
          tenant.tasks.forEach((task, index)=>{
            let newTask = {
              id: task.id,
              dueDate: task.dueDate,
              type: task.type,
              status: task.status,
              assignee: tenant
            }
            tasks.push(newTask);
        })
      })
      
      tasks.sort((a,b) =>  new Date(b.dueDate) - new Date(a.dueDate));
      setTasks(tasks);
    }
  }, [household])

  const getTasks = async() => {
    try {
      const token = await getAccessTokenWithPopup({
        audience: `https://users-api.com`,
      });
  
      axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;

      axiosClient.get('/household/get/' + household.id)
      .then(function(response){
          setHousehold(response.data);
      }); 
    } 
    catch (e) {
      console.log(e.message);
    }
  };

  const deleteTask = async(task) => {
    try {
      const token = await getAccessTokenWithPopup({
        audience: `https://users-api.com`,
        scope: "crud:all",
      });
  
      axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;

      axiosClient.delete('/tasks/delete/' + task.id)
      .then(function(response){
          alert("Task deleted sucessfully.")
          getTasks();
      }); 
    } 
    catch (e) {
      console.log(e.message);
    }
  };
  
  const handleStatusChange = async(task, status) => {
    try {
      const token = await getAccessTokenWithPopup({
        audience: `https://users-api.com`,
        scope: "crud:all",
      });
  
      axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;

      switch(status) {
        case "tbc":
          task.status = "ToBeCompleted";
          break;
        case "c":
          task.status = "Completed";
          break;
        case "nc":
          task.status = "NotCompleted";
          break;
        default:
          task.status = "ToBeCompleted";
      }

      axiosClient.post('/tasks/add', JSON.stringify(task))
      .then(function(response){
          alert("Task updated sucessfully.")
          getTasks();
      }); 
    } 
    catch (e) {
      console.log(e.message);
    }
  };


  return (
    <>
    {tasks.length > 0 && tasks.map((task, index) => (
        <CalendarTask task={task} handleStatusChange={handleStatusChange} deleteTask={deleteTask}/>
    ))}
    </>
    // <div className="flex flex-col">
    //   <div className="flex justify-between">
    //     <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l" onClick={prevWeek}>Previous Week</button>
    //     <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r" onClick={nextWeek}>Next Week</button>
    //   </div>
    //   <div className="flex flex-col">
    //     {schedule.length > 0 && schedule[week].map((task, index) => (
    //       <div key={index} className="bg-white rounded-lg p-4 my-2">
    //         <p className="text-lg font-medium">{task.type}</p>
    //         <p className="text-gray-600">Assigned To: {task.assignee}</p>
    //         <p className="text-gray-600">Due Date: {task.dueDate}</p>
    //       </div>
    //     ))}
    //   </div>
 
    // <div>
    // <h1 className="text-lg font-medium">Todo List</h1>
    // <div className="bg-white p-4 rounded-lg">
    //   {tasks.map(task => (
    //     <CalendarTask key={task.id} task={task} />
    //   ))}
    // </div>
  // </div>

  // <>
  // <CalendarTask />
  // </>
  );
};

export default HouseholdSchedulePage;
