<template>
  <div class="admin">
    <h2>Manage Books</h2>

    <button @click="showForm = !showForm">
      ➕ Add Book
    </button>

    <!-- FORM -->
    <div v-if="showForm" class="form">
      <input v-model="newBook.title" placeholder="Title" />
      <input v-model="newBook.image" placeholder="Image URL" />
      <input v-model="newBook.editor" placeholder="Editor" />
      <input v-model="newBook.year" placeholder="Year" />

      <select v-model="newBook.author">
        <option v-for="a in booksStore.authors" :key="a.id" :value="a.id">
          {{ a.name }}
        </option>
      </select>

      <button @click="addBook">Save</button>
    </div>

    <!-- TABLE -->
    <table>
      <tr>
        <th>Title</th>
        <th>Year</th>
        <th>Actions</th>
      </tr>

      <tr v-for="book in booksStore.books" :key="book.id">
        <td>{{ book.title }}</td>
        <td>{{ book.year }}</td>
        <td>
          <button @click="deleteBook(book.id)">❌</button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBooksStore } from '../../stores/books'

const booksStore = useBooksStore()

const showForm = ref(false)

const newBook = ref({
  title: '',
  image: '',
  editor: '',
  year: '',
  author: ''
})

onMounted(async () => {
  await booksStore.getAllBooks()
  await booksStore.getAllAuthors()
})

const addBook = async () => {
  await booksStore.addBook(newBook.value)
  showForm.value = false
}

const deleteBook = async (id) => {
  await booksStore.deleteBook(id)
}
</script>

<style scoped>
.admin {
  padding: 40px;
}

table {
  width: 100%;
  margin-top: 20px;
}

button {
  margin: 5px;
}
</style>