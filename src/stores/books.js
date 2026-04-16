import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useBooksStore = defineStore('books', () => {
  const books = ref([])
  const authors = ref([])

  const getAllBooks = async () => {
    const res = await api.get('/books/all')
    books.value = res.data.listeBooks
  }

  const getAllAuthors = async () => {
    const res = await api.get('/author/all')
    authors.value = res.data
  }

  const addBook = async (book) => {
    await api.post('/books/new', book)
    await getAllBooks()
  }

  const updateBook = async (id, book) => {
    await api.put(`/books/edit/${id}`, book)
    await getAllBooks()
  }

  const deleteBook = async (id) => {
    await api.delete(`/books/remove/${id}`)
    await getAllBooks()
  }

  const addAuthor = async (author) => {
    await api.post('/author/add', author)
    await getAllAuthors()
  }

  return { books, authors, getAllBooks, getAllAuthors, addBook, updateBook, deleteBook, addAuthor }
})