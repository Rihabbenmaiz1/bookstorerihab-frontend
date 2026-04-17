import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user')) || null)

  const login = async (identifiant, password) => {
    const res = await api.post('/auth/signin', { identifiant, password })
    token.value = res.data.access_token
    user.value = {
      username: res.data.username,
      role: res.data.role,
      id: res.data.id
    }
    localStorage.setItem('token', token.value)
    localStorage.setItem('user', JSON.stringify(user.value))
  }

  const register = async (username, email, password) => {
    await api.post('/auth/signup', { username, email, password })
  }

  const logout = () => {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const isLoggedIn = () => !!token.value
  const isAdmin = () => user.value?.role === 'admin'

  return { token, user, login, register, logout, isLoggedIn, isAdmin }
})