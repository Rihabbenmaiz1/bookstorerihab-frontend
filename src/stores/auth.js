import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  // 🔐 STATE
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)

  // 🔑 LOGIN
  const login = async (identifiant, password) => {
    try {
      const res = await api.post('/auth/signin', { identifiant, password })

      // 🔥 Sauvegarde token
      token.value = res.data.access_token

      // 🔥 Sauvegarde user + role
      user.value = {
        id: res.data.id,
        username: res.data.username,
        role: res.data.role // 🔥 IMPORTANT
      }

      // 💾 localStorage
      localStorage.setItem('token', token.value)
      localStorage.setItem('user', JSON.stringify(user.value))

      // 🔥 (OPTION PRO) mettre token dans axios
      api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`

    } catch (error) {
      throw error
    }
  }

  // 📝 REGISTER
  const register = async (username, email, password) => {
    await api.post('/auth/signup', { username, email, password })
  }

  // 🚪 LOGOUT
  const logout = () => {
    token.value = null
    user.value = null

    localStorage.removeItem('token')
    localStorage.removeItem('user')

    // 🔥 supprimer token axios
    delete api.defaults.headers.common['Authorization']
  }

  // ✅ GETTERS (important pour router)
  const isLoggedIn = () => !!token.value

  const isAdmin = () => user.value?.role === 'admin'

  const isUser = () => user.value?.role === 'user'

  return {
    token,
    user,
    login,
    register,
    logout,
    isLoggedIn,
    isAdmin,
    isUser
  }
})