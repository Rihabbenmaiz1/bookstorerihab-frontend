<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <RouterLink to="/">Book Shop</RouterLink>
    </div>
    <div class="navbar-links">
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/books">All-Books</RouterLink>

      <template v-if="authStore.isLoggedIn()">
        <RouterLink to="/favourites">Favourites</RouterLink>
        <template v-if="authStore.isAdmin()">
          <RouterLink to="/admin/books">Books</RouterLink>
          <RouterLink to="/admin/authors">Authors</RouterLink>
        </template>
        <a href="#" @click.prevent="logout">Logout</a>
      </template>

      <template v-else>
        <RouterLink to="/login">Login</RouterLink>
      </template>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #1a3a5c, #2e6da4);
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.navbar-brand a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  font-family: 'Georgia', serif;
}

.navbar-links {
  display: flex;
  gap: 25px;
  align-items: center;
}

.navbar-links a {
  color: rgba(255,255,255,0.85);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: capitalize;
  transition: color 0.2s;
}

.navbar-links a:hover,
.navbar-links a.router-link-active {
  color: white;
  text-decoration: underline;
}
</style>