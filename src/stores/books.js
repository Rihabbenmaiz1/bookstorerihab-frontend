import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useBooksStore = defineStore('books', () => {
  const books = ref([])
  const authors = ref([])
  const loading = ref(false)

  // 🔥 GET ALL BOOKS
  const getAllBooks = async () => {
    loading.value = true
    try {
      const res = await api.get('/books/all')
      books.value = res.data.listeBooks || res.data
    } catch (err) {
      console.error('Error fetching books', err)
    } finally {
      loading.value = false
    }
  }

  // 🔥 GET AUTHORS
  const getAllAuthors = async () => {
    try {
      const res = await api.get('/author/all')
      authors.value = res.data
    } catch (err) {
      console.error('Error fetching authors', err)
    }
  }

  // 🔥 ADD BOOK
  const addBook = async (book) => {
    try {
      await api.post('/books/new', book)
      await getAllBooks()
    } catch (err) {
      console.error('Error adding book', err)
    }
  }

  // 🔥 UPDATE BOOK
  const updateBook = async (id, book) => {
    try {
      await api.put(`/books/edit/${id}`, book)
      await getAllBooks()
    } catch (err) {
      console.error('Error updating book', err)
    }
  }

  // 🔥 DELETE BOOK
  const deleteBook = async (id) => {
    try {
      await api.delete(`/books/remove/${id}`)
      await getAllBooks()
    } catch (err) {
      console.error('Error deleting book', err)
    }
  }

  // 🔥 ADD AUTHOR
  const addAuthor = async (author) => {
    try {
      await api.post('/author/add', author)
      await getAllAuthors()
    } catch (err) {
      console.error('Error adding author', err)
    }
  }

  return {
    books,
    authors,
    loading,
    getAllBooks,
    getAllAuthors,
    addBook,
    updateBook,
    deleteBook,
    addAuthor
  }
})