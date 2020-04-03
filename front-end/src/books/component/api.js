import apiUrl from '../../apiConfig';
import axios from 'axios';

// Get All Books
const getAllBooks = () => {
  return axios.get(`${apiUrl}/books`);
};


// Delete Book By ID
const deleteBookById = (id) => {
  return axios.delete(`${apiUrl}/books/${id}`)
}


export { getAllBooks, deleteBookById }