import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const routes = [
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
    component: () => import('../views/BooksView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/books/:id',
    name: 'book-detail',
    component: () => import('../views/BookDetail.vue'),
    meta: { requiresAuth: true }
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
    path: '/admin/books/add',
    name: 'admin-books-add',
    component: () => import('../views/admin/AdminBookFormView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/books/edit/:id',
    name: 'admin-books-edit',
    component: () => import('../views/admin/AdminBookFormView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/authors',
    name: 'admin-authors',
    component: () => import('../views/admin/AdminAuthorsView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.path === '/login' && auth.isLoggedIn()) {
    return '/'
  }

  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    return `/login?redirect=${to.fullPath}`
  }

  if (to.meta.requiresAdmin && !auth.isAdmin()) {
    return '/'
  }

  return true
})

export default router