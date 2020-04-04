import apiUrl from "../apiConfig";
import axios from "axios";

// Get all Contributors
const getAllContributors = () => {
    return axios.get(`${apiUrl}/contributors`);
};

// Create New Contributors
const createNewContributor =(name)=>{
    return axios.post(`${apiUrl}/contributors`, {contributor:{name}})
}


export { getAllContributors, createNewContributor };