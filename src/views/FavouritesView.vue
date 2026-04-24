<template>
  <div class="favourites">
    <h2>My Favourites</h2>

    <div v-if="favStore.favourites.length" class="grid">
      <div 
        v-for="book in favStore.favourites" 
        :key="book.id" 
        class="card"
      >
        <img :src="book.image" @error="onImgError" />
        <h3>{{ book.title }}</h3>
        <p>{{ book.year }}</p>

        <button @click="remove(book.id)">
          X Supprimer
        </button>
      </div>
    </div>

    <p v-else class="empty">
      No favourites yet
    </p>
  </div>
</template>

<script setup>
import { useFavouritesStore } from '../stores/favourites'

const favStore = useFavouritesStore()

const remove = (id) => {
  favStore.removeFromFavourites(id)
}

const onImgError = (e) => {
  e.target.src = 'https://via.placeholder.com/150x200?text=No+Image'
}
</script>

<style scoped>
.favourites {
  padding: 40px;
  text-align: center;
}

h2 {
  color: #1a3a5c;
  margin-bottom: 20px;
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
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 8px;
  margin-top: 10px;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #c0392b;
}

.empty {
  color: #666;
  font-style: italic;
}
</style>