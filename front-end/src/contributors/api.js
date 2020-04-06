import apiUrl from "../apiConfig";
import axios from "axios";

// Get all Contributors
const getAllContributors = () => {
    return axios.get(`${apiUrl}/contributors`);
};

// Create New Contributors
const addNewContributor =(contributor)=>{
    return axios.post(`${apiUrl}/contributors`, {contributor})
}

// Delete Contributor by ID
const deleteContributor = (id) => {
    return axios.delete(`${apiUrl}/contributors/${id}`);
  }


export { getAllContributors, addNewContributor, deleteContributor };