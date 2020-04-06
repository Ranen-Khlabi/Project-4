import apiUrl from "../apiConfig";
import axios from "axios";

// get all students
const getAllStudents = () => {
    return axios.get(`${apiUrl}/students`);
};

// Create students
const createNewStudent =(student)=>{
    return axios.post(`${apiUrl}/students`,{student})
}

// Delete Students
const deleteStudentById =(id)=>{
    return axios.delete(`${apiUrl}/students/${id}`)
};

// Login Student
const loginStudent = (student) => {
    return axios.post(`${apiUrl}/students/login`, {student})
};

export { getAllStudents, 
         createNewStudent, 
         deleteStudentById, 
         loginStudent 
        };