<template>
  <div class="admin">
    <h2>Manage Authors</h2>

    <div class="form">
      <input v-model="name" placeholder="Author name" />
      <button @click="addAuthor">Add Author</button>
    </div>

    <ul>
      <li v-for="author in booksStore.authors" :key="author.id">
        {{ author.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useBooksStore } from '../../stores/books'

const booksStore = useBooksStore()
const name = ref('')

onMounted(async () => {
  await booksStore.getAllAuthors()
})

const addAuthor = async () => {
  if (!name.value) return
  await booksStore.addAuthor({ name: name.value })
  name.value = ''
}
</script>

<style scoped>
.admin {
  padding: 40px;
}

.form {
  margin-bottom: 20px;
}

input {
  padding: 10px;
  margin-right: 10px;
}

button {
  padding: 10px;
  background: #2e6da4;
  color: white;
  border: none;
}
</style>