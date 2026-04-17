<template>
  <div class="auth-page">
    <div class="overlay"></div>

    <div class="auth-container">
      <div class="auth-card">
        <h1>Create Account ✨</h1>
        <p class="subtitle">Join BookStore and start your journey</p>

        <form @submit.prevent="handleRegister">

          <div class="field">
            <label>Username</label>
            <div class="input-group">
              <span>👤</span>
              <input
                v-model="username"
                placeholder="ex: rihab_admin"
                required
              />
            </div>
          </div>

          <div class="field">
            <label>Email</label>
            <div class="input-group">
              <span>📧</span>
              <input
                v-model="email"
                type="email"
                placeholder="ex: rihab@test.com"
                required
              />
            </div>
          </div>

          <div class="field">
            <label>Password</label>
            <div class="input-group">
              <span>🔒</span>
              <input
                v-model="password"
                type="password"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button type="submit" class="btn-primary">
            Create Account
          </button>

        </form>

        <p class="switch">
          Already have an account ?
          <span @click="goLogin">Login</span>
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

const username = ref('')
const email = ref('')
const password = ref('')
const error = ref(null)

const authStore = useAuthStore()
const router = useRouter()

const handleRegister = async () => {
  try {
    await authStore.register(username.value, email.value, password.value)
    router.push('/login')
  } catch (err) {
    error.value = "Registration failed"
  }
}

const goLogin = () => {
  router.push('/login')
}
</script>

<style scoped>

/* BACKGROUND */
.auth-page {
  height: 100vh;
  background: url('https://images.unsplash.com/photo-1512820790803-83ca734da794')
    center/cover no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* OVERLAY */
.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.65);
}

/* CENTER */
.auth-container {
  position: relative;
  z-index: 2;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* CARD */
.auth-card {
  width: 420px;
  padding: 40px;
  border-radius: 20px;

  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);

  box-shadow: 0 25px 60px rgba(0,0,0,0.5);

  text-align: center;
  color: white;

  animation: fadeIn 0.6s ease;
}

/* TITLE */
.auth-card h1 {
  margin-bottom: 10px;
  font-size: 28px;
}

/* SUBTITLE */
.subtitle {
  margin-bottom: 30px;
  opacity: 0.85;
}

/* FIELD */
.field {
  text-align: left;
  margin-bottom: 18px;
}

.field label {
  font-size: 13px;
  margin-bottom: 6px;
  display: block;
  color: rgba(255,255,255,0.9);
}

/* INPUT GROUP */
.input-group {
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.95);
  border-radius: 10px;
  padding: 0 10px;
}

.input-group span {
  font-size: 14px;
  margin-right: 8px;
}

.input-group input {
  flex: 1;
  padding: 12px;
  border: none;
  outline: none;
  background: transparent;
  font-size: 14px;
}

/* FOCUS EFFECT */
.input-group:focus-within {
  box-shadow: 0 0 0 2px rgba(79,195,247,0.6);
}

/* BUTTON */
.btn-primary {
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: none;

  background: linear-gradient(135deg, #4fc3f7, #29b6f6);
  color: white;
  font-weight: bold;

  cursor: pointer;
  transition: 0.3s;

  margin-top: 15px;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 35px rgba(0,0,0,0.4);
}

/* SWITCH */
.switch {
  margin-top: 20px;
  font-size: 14px;
}

.switch span {
  color: #4fc3f7;
  cursor: pointer;
  font-weight: bold;
}

/* ERROR */
.error {
  margin-top: 15px;
  color: #ff6b6b;
}

/* ANIMATION */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

</style>