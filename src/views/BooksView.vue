<template>
  <div class="books">

    <h2>📚 Tous les livres</h2>

    <!-- ✅ MESSAGE -->
    <p v-if="message" class="success">{{ message }}</p>

    <!-- 🔍 SEARCH -->
    <div class="search-bar">

      <input
          v-model="searchText"
          type="text"
          placeholder="🔎 Rechercher par titre..."
      />

      <input v-model="startYear" type="number" placeholder="Année min" />
      <input v-model="endYear" type="number" placeholder="Année max" />

      <button @click="resetFilter" class="reset">
        Réinitialiser
      </button>

    </div>

    <!-- 🔄 Loading -->
    <p v-if="loading">Chargement...</p>

    <!-- 📭 EMPTY -->
    <p v-else-if="!filteredBooks.length">Aucun livre trouvé</p>

    <!-- 📚 LIST -->
    <div v-else class="grid">
      <div v-for="book in filteredBooks" :key="book.id" class="card">

        <img :src="book.image" @error="onImgError" />

        <h3>{{ book.title }}</h3>
        <p class="year">{{ book.year }}</p>

        <div class="actions">

          <!-- 👁 DETAIL -->
          <RouterLink :to="`/books/${book.id}`" class="btn-detail">
            👁 Voir Details
          </RouterLink>

          <!-- ⭐ FAVORITE -->
          <button
              :class="isFav(book) ? 'added' : 'btn-fav'"
              @click="addFav(book)"
          >
            {{ isFav(book) ? ' Ajouté' : '⭐ Ajouter aux favoris' }}
          </button>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useBooksStore } from '../stores/books'
import { useFavouritesStore } from '../stores/favourites'

const booksStore = useBooksStore()
const favStore = useFavouritesStore()

const loading = ref(true)
const message = ref('')

// 🔍 FILTRES
const searchText = ref('')
const startYear = ref('')
const endYear = ref('')

// 🔥 FILTRAGE AUTO
const filteredBooks = computed(() => {
  return booksStore.books.filter(book => {

    const matchTitle = book.title
        .toLowerCase()
        .includes(searchText.value.toLowerCase())

    const matchStart = !startYear.value || book.year >= startYear.value
    const matchEnd = !endYear.value || book.year <= endYear.value

    return matchTitle && matchStart && matchEnd
  })
})

// LOAD
onMounted(async () => {
  await booksStore.getAllBooks()
  loading.value = false
})

// RESET
const resetFilter = () => {
  searchText.value = ''
  startYear.value = ''
  endYear.value = ''
}

// ⭐ FAVORIS
const addFav = (book) => {
  favStore.addToFavourites(book)

  message.value = ` "${book.title}" ajouté aux favoris`

  setTimeout(() => {
    message.value = ''
  }, 2000)
}

// ✅ CHECK
const isFav = (book) => {
  return favStore.favourites.some(f => f.id === book.id)
}

// IMAGE ERROR
const onImgError = (e) => {
  e.target.src = 'https://via.placeholder.com/150x200'
}
</script>

<style scoped>

.books {
  padding: 40px;
  text-align: center;
}

/* 🔍 SEARCH */
.search-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.search-bar input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 180px;
}

.search-bar input:first-child {
  width: 250px;
}

/* RESET */
.reset {
  background: #2e6da4;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
}

/* MESSAGE */
.success {
  background: #ffc107;;
  color: white;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 10px;
  display: inline-block;
}

/* GRID */
.grid {
  display: flex;
  flex-wrap: wrap;
  gap: 25px;
  justify-content: center;
}

/* CARD */
.card {
  width: 220px;
  background: white;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-8px);
}

/* IMAGE */
.card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 10px;
}

/* ACTIONS */
.actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
}

/* DETAIL */
.btn-detail {
  background: #2e6da4;
  color: white;
  padding: 6px 10px;
  border-radius: 8px;
  text-decoration: none;
}

/* FAVORITE NORMAL */
.btn-fav {
  background: #ffc107;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  cursor: pointer;
}

/* FAVORITE ADDED (💙 meilleur que vert) */
.added {
  background: #4fc3f7;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
}

</style>