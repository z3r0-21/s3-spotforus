import React, {useEffect, useState} from 'react'
import TenantTodoTask from '../components/Tasks/TenantTodoTask'
import { useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { axiosClient } from "../api/AxiosClient";

export default function MyTasksPage() {
    const [household, setHousehold] = useState();
    const [tasksSorted, setTasksSorted] = useState([]);
    const location = useLocation();
    const { getAccessTokenWithPopup, user, isLoading } = useAuth0();

  useEffect(() => {
    if(household){
      let allTasks = [];

      household.tenants.forEach((tenant, index)=>{
          tenant.tasks.forEach((task, index)=>{
            let newTask = {
              id: task.id,
              dueDate: task.dueDate,
              type: task.type,
              status: task.status,
              assignee: tenant
            }
            allTasks.push(newTask);
        })
      })
      

      var loggedInUserTasks = allTasks.filter(function (t) {
        return t.assignee.id === trimAuth0Id(user.sub)
      });

      loggedInUserTasks.sort((a,b) =>  new Date(b.dueDate) - new Date(a.dueDate));
      setTasksSorted(loggedInUserTasks);
    }
  }, [household])
  
  useEffect(() => {
    if(user !== undefined){
        getUserDetails();
    }
  }, [user])
  
  
  const completeTask = async(task) => {
    try {
      const token = await getAccessTokenWithPopup({
        audience: `https://users-api.com`,

      });
  
      axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;
      console.log(task)
      axiosClient.post('/tasks/completeTask/', + task.id)
      .then(function(){
          alert("Task completed sucessfully.")
          getUserDetails();
      }); 
    } 
    catch (e) {
      console.log(e.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const token = await getAccessTokenWithPopup({
        audience: `https://users-api.com`,
      });
      axiosClient.defaults.headers.common['Authorization'] = "Bearer " + token;
        axiosClient.get('/users/get/' + trimAuth0Id(user.sub))
        .then(function(response){
            console.log(response.data.household)
            setHousehold(response.data.household)
        }); 
      } catch (e) {
        console.log(e);
      }
  };

  function trimAuth0Id(str){
    return str.substring(str.indexOf("|") + 1);
  }

  return (
    <>
    {tasksSorted.length > 0 && tasksSorted.map((task, index) => (
        <TenantTodoTask task={task} completeTask={completeTask}/>
    ))}
    </>
  );
};
