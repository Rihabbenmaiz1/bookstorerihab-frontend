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
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue')
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

/* 🔥 VERSION MODERNE (sans next) */
router.beforeEach((to) => {
  const authStore = useAuthStore()

  // 🔐 Si route protégée et pas connecté
  if (to.meta.requiresAuth && !authStore.isLoggedIn()) {
    return '/login'
  }

  // 👑 Si route admin et pas admin
  if (to.meta.requiresAdmin && !authStore.isAdmin()) {
    return '/'
  }

  // ✅ sinon autorisé
  return true
})

export default router
