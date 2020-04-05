import apiUrl from "../apiConfig";
import axios from "axios";

// get all students
const getAllStudents = () => {
    return axios.get(`${apiUrl}/students`);
};

// Create students
const createNewStudent =(name)=>{
    return axios.post(`${apiUrl}/students`,{student:{name}})
}

// Delete Students
const deleteStudentById =(id)=>{
    return axios.delete(`${apiUrl}/students/${id}`)
};

export { getAllStudents, createNewStudent, deleteStudentById };