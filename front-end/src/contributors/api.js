import apiUrl from "../apiConfig";
import axios from "axios";

// Get all Contributors
const getAllContributors = () => {
    return axios.get(`${apiUrl}/contributors`);
};

// Create New Contributors
const addNewContributor =()=>{
    return axios.post(`${apiUrl}/contributors`)
}


export { getAllContributors, addNewContributor };