<template>
  <div class="home">
    <!-- Hero Section -->
    <div class="hero">
      <h1>Découvrez des livres pour tous les goûts</h1>
      <p>Des classiques intemporels aux derniers best-sellers, trouvez votre prochaine lecture ici.</p>
      <RouterLink to="/books" class="btn-hero">Explorer le catalogue</RouterLink>
    </div>

    <!-- Livres populaires -->
    <div class="popular">
      <h2>Livres populaires</h2>
      <div class="books-grid" v-if="booksStore.books.length">
        <div class="book-card" v-for="book in booksStore.books.slice(0, 3)" :key="book.id">
          <img :src="book.image" :alt="book.title" @error="onImgError" />
          <h3>{{ book.title }}</h3>
          <p>{{ book.year }}</p>
          <RouterLink to="/books" class="btn-voir">Voir plus</RouterLink>
        </div>
      </div>
      <p v-else class="loading">Chargement des livres...</p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <h3>Besoin d'aide ?</h3>
      <p>Contactez-nous pour toute question ou assistance.</p>
      <a href="mailto:contact@bookshop.com" class="btn-contact">Contactez-nous</a>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useBooksStore } from '../stores/books'

const booksStore = useBooksStore()

onMounted(async () => {
  await booksStore.getAllBooks()
})

const onImgError = (e) => {
  e.target.src = 'https://via.placeholder.com/150x200?text=No+Image'
}
</script>

<style scoped>
.home {
  font-family: 'Georgia', serif;
}

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
  color: #1a3a5c;
  padding: 12px 30px;
  border-radius: 25px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-hero:hover {
  background: #f0f0f0;
  transform: scale(1.05);
}

.popular {
  padding: 50px 40px;
  background: #f5f5f5;
  text-align: center;
}

.popular h2 {
  font-size: 1.8rem;
  margin-bottom: 30px;
  color: #1a3a5c;
}

.books-grid {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.book-card {
  background: white;
  border-radius: 10px;
  padding: 20px;
  width: 200px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 10px;
}

.book-card h3 {
  font-size: 1rem;
  color: #1a3a5c;
  margin-bottom: 5px;
}

.book-card p {
  color: #666;
  font-size: 0.85rem;
  margin-bottom: 10px;
}

.btn-voir {
  background: #2e6da4;
  color: white;
  padding: 8px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-size: 0.85rem;
  transition: background 0.3s;
}

.btn-voir:hover {
  background: #1a3a5c;
}

.loading {
  color: #666;
  font-style: italic;
}

.footer {
  background: #1a3a5c;
  color: white;
  text-align: center;
  padding: 40px 20px;
}

.footer h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
}

.footer p {
  opacity: 0.8;
  margin-bottom: 20px;
}

.btn-contact {
  background: white;
  color: #1a3a5c;
  padding: 10px 25px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-contact:hover {
  background: #f0f0f0;
}
</style>