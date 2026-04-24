<template>
  <nav class="navbar">
    <!-- LOGO -->
    <div class="navbar-brand">
      <RouterLink to="/">Book Shop</RouterLink>
    </div>

    <!-- LINKS -->
    <div class="navbar-links">

      <RouterLink to="/">Accueil</RouterLink>

      <!-- 🔐 CONNECTÉ -->
      <template v-if="auth.isLoggedIn()">

        <RouterLink to="/books">All Books</RouterLink>

        <!-- ⭐ TOUJOURS visible -->
        <RouterLink to="/favourites">
          Mes Favoris
        </RouterLink>

        <!-- 👑 ADMIN -->
        <template v-if="auth.isAdmin()">
          <RouterLink to="/admin/books">Admin Books</RouterLink>
          <RouterLink to="/admin/authors">Admin Authors</RouterLink>
        </template>

        <a href="#" class="logout-btn" @click.prevent="logout">
          Logout
        </a>

      </template>

      <!-- ❌ PAS CONNECTÉ -->
      <template v-else>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/register" class="register-btn">
          Register
        </RouterLink>
      </template>

    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/')
}
</script>

<style scoped>
.navbar {
  background: linear-gradient(135deg, #1a3a5c, #2e6da4);
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

/* LOGO */
.navbar-brand a {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
}

/* LINKS */
.navbar-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.navbar-links a {
  color: rgba(255,255,255,0.9);
  text-decoration: none;
  font-weight: 500;
  transition: 0.2s;
}

.navbar-links a:hover {
  color: white;
  transform: translateY(-1px);
}

/* REGISTER BUTTON */
.register-btn {
  background: linear-gradient(135deg, #4fc3f7, #29b6f6);
  padding: 6px 14px;
  border-radius: 20px;
  color: white;
}

/* LOGOUT */
.logout-btn {
  background: #ffc107;
  padding: 6px 12px;
  border-radius: 8px;
  color: white;
}
</style>