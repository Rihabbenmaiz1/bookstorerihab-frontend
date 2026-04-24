<template>
  <div class="home">

    <!-- HERO -->
    <div class="hero">
      <h1>Découvrez des livres pour tous les goûts</h1>
      <p>
        Des classiques intemporels aux derniers best-sellers,
        trouvez votre prochaine lecture ici.
      </p>
      <RouterLink to="/books" class="btn-hero">
        Explorer le catalogue
      </RouterLink>
    </div>

    <!-- LIVRES RÉCENTS -->
    <div class="popular">
      <h2>📚 Livres récents</h2>

      <div class="books-grid" v-if="recentBooks.length">
        <div class="book-card" v-for="book in recentBooks" :key="book.id">

          <img :src="book.image" :alt="book.title" @error="onImgError" />

          <h3>{{ book.title }}</h3>

          <p class="year">📅 {{ book.year }}</p>

          <!-- 🔥 BOUTON INTELLIGENT -->
          <button class="btn-voir" @click="goToBook(book.id)">
            Voir plus
          </button>

        </div>
      </div>

      <p v-else class="loading">Chargement des livres...</p>
    </div>

    <!-- FOOTER -->
    <div class="footer">
      <div class="footer-container">

        <div class="footer-section">
          <h2>📚 BookShop</h2>
          <p>
            Votre librairie en ligne pour découvrir les meilleurs livres,
            des classiques aux nouveautés.
          </p>
        </div>

        <div class="footer-section">
          <h3>Navigation</h3>
          <ul>
            <li><RouterLink to="/">Accueil</RouterLink></li>
            <li><RouterLink to="/books">Livres</RouterLink></li>
            <li><RouterLink to="/favourites">Favoris</RouterLink></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Contact</h3>
          <p>📧 contact@bookshop.com</p>
          <p>📞 +216 12 345 678</p>
          <p>📍 Tunisie</p>
        </div>

        <div class="footer-section">
          <h3>Suivez-nous</h3>
          <div class="socials">
            <a href="#">🌐 Facebook</a>
            <a href="#">📸 Instagram</a>
            <a href="#">🐦 Twitter</a>
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <p>© 2026 BookShop — Tous droits réservés</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useBooksStore } from '../stores/books'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const booksStore = useBooksStore()
const router = useRouter()
const authStore = useAuthStore()

onMounted(async () => {
  await booksStore.getAllBooks()
})

/* 🔥 livres récents */
const recentBooks = computed(() => {
  return [...booksStore.books]
      .sort((a, b) => b.year - a.year)
      .slice(0, 3)
})

/* 🔥 IMAGE FALLBACK */
const onImgError = (e) => {
  e.target.src = 'https://via.placeholder.com/150x200?text=No+Image'
}

/* 🔥 REDIRECTION INTELLIGENTE */
const goToBook = (id) => {
  if (!authStore.isLoggedIn()) {
    router.push(`/login?redirect=/books/${id}`)
  } else {
    router.push(`/books/${id}`)
  }
}
</script>

<style scoped>
.home {
  font-family: 'Georgia', serif;
}

/* HERO */
.hero {
  background: linear-gradient(135deg, #1a3a5c, #2e6da4);
  color: white;
  text-align: center;
  padding: 80px 20px;
}

.hero h1 {
  font-size: 2.2rem;
  margin-bottom: 15px;
}

.hero p {
  font-size: 1rem;
  margin-bottom: 30px;
  opacity: 0.9;
}

.btn-hero {
  background: white;
  color: #2e6da4;
  padding: 10px 20px;
  border-radius: 20px;
  text-decoration: none;
  font-weight: bold;
}

/* BOOKS */
.popular {
  padding: 40px;
  text-align: center;
}

.books-grid {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.book-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 180px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  transition: 0.3s;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
}

.book-card h3 {
  margin: 10px 0;
}

.year {
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 10px;
}

.btn-voir {
  border: none;
  background: #2e6da4;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-voir:hover {
  background: #1a3a5c;
}

/* FOOTER */
.footer {
  background: #1a3a5c;
  color: white;
  padding: 40px 20px 20px;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}

.footer-section {
  max-width: 250px;
}

.footer-section h2,
.footer-section h3 {
  margin-bottom: 10px;
}

.footer-section p {
  font-size: 0.9rem;
  opacity: 0.9;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  margin-bottom: 6px;
}

.footer-section a {
  color: white;
  text-decoration: none;
  opacity: 0.9;
}

.footer-section a:hover {
  opacity: 1;
  text-decoration: underline;
}

.socials {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.footer-bottom {
  text-align: center;
  margin-top: 30px;
  border-top: 1px solid rgba(255,255,255,0.2);
  padding-top: 15px;
  font-size: 0.85rem;
  opacity: 0.8;
}
</style>