import { axiosClient } from "./AxiosClient";

export function getAllHouseholds(){
  return axiosClient.get('/household/get/all');
}

export function addHousehold(data){
  return axiosClient.post('/household', JSON.stringify(data));
}

export function joinHousehold(user, jc){
  return axiosClient.put(`/household/addTenant/${user}/${jc}`)
}