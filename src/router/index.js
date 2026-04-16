import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/books',
      name: 'books',
      component: () => import('../views/BooksView.vue')
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: () => import('../views/FavouritesView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin/books',
      name: 'admin-books',
      component: () => import('../views/admin/AdminBooksView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/admin/authors',
      name: 'admin-authors',
      component: () => import('../views/admin/AdminAuthorsView.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn()) {
    next('/login')
  } else if (to.meta.requiresAdmin && !authStore.isAdmin()) {
    next('/')
  } else {
    next()
  }
})

export default router
