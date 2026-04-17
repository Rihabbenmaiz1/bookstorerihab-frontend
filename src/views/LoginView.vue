<template>
  <div class="login-page">
    <div class="overlay"></div>

    <div class="container">
      <div class="login-card">
        <h1>Welcome Back 👋</h1>
        <p class="subtitle">Sign in to your BookStore account</p>

        <form @submit.prevent="handleLogin">
          <div class="field">
            <label>Email or Username</label>
            <input v-model="identifiant" required />
          </div>

          <div class="field">
            <label>Password</label>
            <input v-model="password" type="password" required />
          </div>

          <button type="submit">Login</button>
        </form>

        <!-- 🔥 NEW -->
        <p class="switch">
          Don’t have an account ?
          <router-link to="/register">Create one</router-link>
        </p>

        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const identifiant = ref('')
const password = ref('')
const error = ref(null)

const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  error.value = null

  try {
    await authStore.login(identifiant.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = "Invalid credentials"
  }
}
</script>

<style scoped>

/* BACKGROUND */
.login-page {
  height: 100vh;
  background: url('https://images.unsplash.com/photo-1512820790803-83ca734da794') center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.7);
}

/* CENTER */
.container {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* CARD */
.login-card {
  width: 420px;
  padding: 45px;
  border-radius: 20px;

  background: rgba(255,255,255,0.15);
  backdrop-filter: blur(25px);

  box-shadow: 0 25px 70px rgba(0,0,0,0.5);

  text-align: center;
  color: white;

  animation: fadeIn 0.5s ease;
}

/* TITLE */
.login-card h1 {
  font-size: 30px;
  margin-bottom: 8px;
}

/* SUBTITLE */
.subtitle {
  margin-bottom: 30px;
  opacity: 0.85;
  font-size: 14px;
}

/* FIELD */
.field {
  text-align: left;
  margin-bottom: 20px;
}

.field label {
  font-size: 13px;
  margin-bottom: 5px;
  display: block;
  color: rgba(255,255,255,0.9);
}

.field input {
  width: 100%;
  padding: 13px;
  border-radius: 10px;
  border: none;
  outline: none;

  background: rgba(255,255,255,0.95);
  color: black;

  font-size: 14px;
}

/* BUTTON */
button {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;

  background: linear-gradient(135deg, #4fc3f7, #29b6f6);
  color: white;
  font-weight: bold;

  cursor: pointer;
  transition: 0.3s;

  margin-top: 10px;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(0,0,0,0.4);
}

/* SWITCH LINK */
.switch {
  margin-top: 18px;
  font-size: 13px;
}

.switch a {
  color: #4fc3f7;
  text-decoration: none;
  font-weight: bold;
}

.switch a:hover {
  text-decoration: underline;
}

/* ERROR */
.error {
  margin-top: 15px;
  color: #ff6b6b;
  font-size: 13px;
}

/* ANIMATION */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

</style>