<template>
  <div v-if="book" class="page">

    <!-- 🔥 HERO -->
    <div class="hero" :style="{ backgroundImage: `url(${book.image})` }">
      <div class="overlay"></div>
    </div>

    <div class="container">
      <button class="back-btn" @click="$router.back()">⬅ Retour</button>

      <div class="card">

        <!-- IMAGE -->
        <div class="image">
          <img :src="book.image" @error="onImgError" />
        </div>

        <!-- INFOS -->
        <div class="info">
          <h1>{{ book.title }}</h1>

          <p class="author">
            ✍️
            {{ book.author
              ? book.author.prenom + ' ' + book.author.nom
              : "Auteur inconnu" }}
          </p>

          <p class="meta">
            📅 {{ book.year }} • 🏢 {{ book.editor }}
          </p>

          <p class="desc">
            {{ book.summary || "Aucune description disponible pour ce livre." }}
          </p>

          <!-- 🔥 ACTIONS -->
          <div class="actions">

            <!-- ⭐ FAVORIS -->
            <button
                v-if="!isFav"
                class="fav"
                @click="addToFav"
            >
              ⭐ Ajouter aux favoris
            </button>

            <button
                v-else
                class="added"
                disabled
            >
              💙 Déjà en favoris
            </button>

            <!-- 👑 ADMIN ONLY -->
            <button
                v-if="auth.isAdmin()"
                class="delete"
                @click="deleteBook"
            >
              🗑 Supprimer
            </button>

          </div>

        </div>
      </div>
    </div>
  </div>

  <!-- LOADING -->
  <div v-else class="loading">
    <div class="spinner"></div>
    <p>Chargement...</p>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

// 🔥 STORES
import { useAuthStore } from '../stores/auth'
import { useFavouritesStore } from '../stores/favourites'

const route = useRoute()
const router = useRouter()

const auth = useAuthStore()
const favStore = useFavouritesStore()

const book = ref(null)

// 🔥 LOAD BOOK + FAV
onMounted(async () => {
  try {
    const res = await api.get(`/books/search/${route.params.id}`)
    book.value = Array.isArray(res.data) ? res.data[0] : res.data

    // ⚠️ IMPORTANT
    favStore.loadFavourites()

  } catch (err) {
    console.error(err)
  }
})

// ✅ CHECK FAVORI (reactif)
const isFav = computed(() => {
  if (!book.value) return false
  return favStore.favourites.some(f => f.id === book.value.id)
})

// ⭐ ADD FAVORI
const addToFav = () => {
  favStore.addToFavourites(book.value)
}

// 🗑 DELETE (ADMIN ONLY)
const deleteBook = async () => {
  if (confirm("Supprimer ce livre ?")) {
    await api.delete(`/books/remove/${book.value.id}`)
    router.push('/books')
  }
}

// IMAGE ERROR
const onImgError = (e) => {
  e.target.src = 'https://via.placeholder.com/300x400?text=No+Image'
}
</script>

<style scoped>

/* 🌌 GLOBAL */
.page {
  font-family: 'Segoe UI', sans-serif;
  min-height: 100vh;
  background: #0f172a;
  color: white;
}

/* 🔥 HERO */
.hero {
  height: 300px;
  background-size: cover;
  background-position: center;
  filter: blur(8px);
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.6);
}

/* 📦 CONTAINER */
.container {
  position: relative;
  margin-top: -150px;
  padding: 40px;
}

/* 🔙 BACK */
.back-btn {
  background: rgba(255,255,255,0.1);
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 10px;
  margin-bottom: 20px;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

/* 🧊 CARD */
.card {
  display: flex;
  gap: 40px;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.6);
}

/* IMAGE */
.image img {
  width: 260px;
  height: 380px;
  border-radius: 15px;
  object-fit: cover;
}

/* INFO */
.info {
  flex: 1;
}

.author {
  color: #38bdf8;
}

.meta {
  color: #94a3b8;
}

.desc {
  margin-top: 20px;
}

/* ACTIONS */
.actions {
  display: flex;
  gap: 15px;
  margin-top: 25px;
}

/* FAVORITE */
.fav {
  background: #facc15;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  cursor: pointer;
}

/* ADDED */
.added {
  background: #4fc3f7;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  color: white;
}

/* DELETE */
.delete {
  background: #ef4444;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  color: white;
}

/* LOADING */
.loading {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top: 5px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>