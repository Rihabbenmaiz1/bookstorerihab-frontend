import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'

export const useFavouritesStore = defineStore('favourites', () => {
  const auth = useAuthStore()
  const favourites = ref([])

  // 🔑 clé unique par utilisateur
  const getKey = () => {
    return `favourites_${auth.user?.id || 'guest'}`
  }

  // 🔄 charger favoris
  const loadFavourites = () => {
    const data = localStorage.getItem(getKey())
    favourites.value = data ? JSON.parse(data) : []
  }

  // 💾 sauvegarder
  const saveFavourites = () => {
    localStorage.setItem(getKey(), JSON.stringify(favourites.value))
  }

  // ⭐ ajouter
  const addToFavourites = (book) => {
    if (!favourites.value.find(b => b.id === book.id)) {
      favourites.value.push(book)
      saveFavourites()
    }
  }

  // ❌ supprimer
  const removeFromFavourites = (bookId) => {
    favourites.value = favourites.value.filter(b => b.id !== bookId)
    saveFavourites()
  }

  // 🔍 vérifier
  const isFavourite = (bookId) => {
    return favourites.value.some(b => b.id === bookId)
  }

  return {
    favourites,
    loadFavourites,
    addToFavourites,
    removeFromFavourites,
    isFavourite
  }
})