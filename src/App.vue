<template>
  <div>
    <NavBar />
    <RouterView />
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue'
import NavBar from './components/NavBar.vue'

import { useAuthStore } from './stores/auth'
import { useFavouritesStore } from './stores/favourites'

const authStore = useAuthStore()
const favStore = useFavouritesStore()

// 🔥 charger au démarrage
onMounted(() => {
  if (authStore.user) {
    favStore.loadFavourites()
  }
})

// 🔥 recharger quand user change (login/logout)
watch(
    () => authStore.user,
    (newUser) => {
      if (newUser) {
        favStore.loadFavourites()
      } else {
        favStore.favourites = []
      }
    }
)
</script>
