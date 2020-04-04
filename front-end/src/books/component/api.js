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

// Create a new Book
const createBook = (book) => {
  return axios.post(`${apiUrl}/books`, book);
}


export { getAllBooks, deleteBookById, createBook }