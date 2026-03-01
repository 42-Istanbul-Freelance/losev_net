import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/',
      component: () => import('../layouts/AuthLayout.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../views/Login.vue')
        },
        {
          path: 'register',
          component: () => import('../views/Register.vue')
        }
      ]
    },
    {
      path: '/student',
      component: () => import('../layouts/MainLayout.vue'),
      meta: { requiresAuth: true, role: 'STUDENT' },
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/student/Dashboard.vue')
        },
        {
          path: 'activity-add',
          component: () => import('../views/student/ActivityForm.vue')
        },
        {
          path: 'activities',
          component: () => import('../views/student/ActivityList.vue')
        },
        {
          path: 'profile',
          component: () => import('../views/student/Profile.vue')
        }
      ]
    },
    {
      path: '/teacher',
      component: () => import('../layouts/MainLayout.vue'),
      meta: { requiresAuth: true, role: 'TEACHER' },
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/teacher/Dashboard.vue')
        },
        {
          path: 'approvals',
          component: () => import('../views/teacher/Approvals.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('../layouts/MainLayout.vue'),
      meta: { requiresAuth: true, role: 'ADMIN' },
      children: [
        {
          path: 'dashboard',
          component: () => import('../views/admin/Dashboard.vue')
        },
        {
          path: 'rankings',
          component: () => import('../views/admin/Rankings.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.role && authStore.userRole !== to.meta.role) {
    // Basic role protection (e.g., student trying to access admin dashboard)
    if (authStore.userRole === 'TEACHER') next('/teacher/dashboard')
    else if (authStore.userRole === 'ADMIN') next('/admin/dashboard')
    else next('/student/dashboard')
  } else {
    next()
  }
})

export default router
