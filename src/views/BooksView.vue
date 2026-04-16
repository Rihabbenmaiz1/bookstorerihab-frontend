<template>
  <div class="books">
    <h2>All Books</h2>

    <!-- 🔄 Loading -->
    <p v-if="loading">Loading books...</p>

    <!-- 📭 Aucun livre -->
    <p v-else-if="!booksStore.books.length">No books available</p>

    <!-- 📚 Liste des livres -->
    <div v-else class="grid">
      <div v-for="book in booksStore.books" :key="book.id" class="card">
        <img :src="book.image" @error="onImgError" />
        <h3>{{ book.title }}</h3>
        <p>{{ book.year }}</p>

        <button @click="addFav(book)">
          ⭐ Add to favourites
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useBooksStore } from '../stores/books'
import { useFavouritesStore } from '../stores/favourites'

const booksStore = useBooksStore()
const favStore = useFavouritesStore()

const loading = ref(true)

onMounted(async () => {
  await booksStore.getAllBooks()
  loading.value = false
})

const addFav = (book) => {
  favStore.addToFavourites(book)
}

const onImgError = (e) => {
  e.target.src = 'https://via.placeholder.com/150x200'
}
</script>

<style scoped>
.books {
  padding: 40px;
  text-align: center;
}

.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
}

.card {
  width: 200px;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

button {
  background: #2e6da4;
  color: white;
  border: none;
  padding: 8px;
  margin-top: 10px;
  cursor: pointer;
}

button:hover {
  background: #1f4e7a;
}
</style>