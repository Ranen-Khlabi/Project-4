import apiUrl from "../apiConfig";
import axios from "axios";

// get all students
const getAllStudents = () => {
    return axios.get(`${apiUrl}/students`);
};

// Create students
const addNewStudent =()=>{
    return axios.post(`${apiUrl}/students`)
}

export { getAllStudents, addNewStudent };