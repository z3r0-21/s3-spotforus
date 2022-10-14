import { axiosClient } from "./AxiosClient";

export function getAllHouseholds(){
  return axiosClient.get('/household/get/all');
}

export function addHousehold(data){
  return axiosClient.post('/household', JSON.stringify(data));
}