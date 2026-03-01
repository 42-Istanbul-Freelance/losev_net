<template>
  <div class="min-h-screen bg-gray-100 flex flex-col pb-20 sm:pb-0 sm:pl-64">
    <!-- Top Header -->
    <header class="bg-white border-b h-16 flex items-center justify-between px-4 sticky top-0 z-10">
      <div class="flex items-center gap-2">
        <img src="https://www.losev.org.tr/frontend/images/logo.png" alt="LÖSEV Logo" class="h-10" />
        <span class="font-bold text-losev-red hidden sm:block">İnci Takip Sistemi</span>
      </div>
      <div class="flex items-center gap-4">
        <button @click="handleLogout" class="text-gray-500 hover:text-losev-red transition-colors">
          <LogOut class="w-6 h-6" />
        </button>
      </div>
    </header>

    <!-- Sidebar (Desktop) -->
    <aside class="hidden sm:flex flex-col w-64 bg-white border-r fixed left-0 top-0 bottom-0 z-20">
      <div class="p-6">
        <img src="https://www.losev.org.tr/frontend/images/logo.png" alt="LÖSEV Logo" class="h-12" />
        <p class="mt-2 text-sm font-semibold text-losev-red italic">Gönüllülük Takip Sistemi</p>
      </div>
      <nav class="flex-1 px-4 space-y-2">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
          :class="[$route.path.includes(item.path) ? 'bg-losev-red text-white' : 'text-gray-600 hover:bg-gray-100']"
        >
          <component :is="item.icon" class="w-5 h-5" />
          <span class="font-medium">{{ item.label }}</span>
        </router-link>
      </nav>
    </aside>

    <!-- Bottom Nav (Mobile) -->
    <nav class="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around items-center h-16 z-20 px-2">
      <router-link
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="flex flex-col items-center justify-center flex-1 h-full transition-colors"
        :class="[$route.path.includes(item.path) ? 'text-losev-red' : 'text-gray-400']"
      >
        <component :is="item.icon" class="w-6 h-6" />
        <span class="text-[10px] mt-1 font-medium">{{ item.label }}</span>
      </router-link>
    </nav>

    <!-- Content Area -->
    <main class="flex-1 p-4 sm:p-8">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'
import {
  LayoutDashboard,
  PlusCircle,
  History,
  User,
  CheckCircle,
  BarChart3,
  Trophy,
  LogOut
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const role = computed(() => authStore.userRole || 'STUDENT')

const navItems = computed(() => {
  if (role.value === 'TEACHER') {
    return [
      { path: '/teacher/dashboard', label: 'Özet', icon: LayoutDashboard },
      { path: '/teacher/approvals', label: 'Onaylar', icon: CheckCircle },
      { path: '/teacher/profile', label: 'Profil', icon: User },
    ]
  } else if (role.value === 'ADMIN') {
    return [
      { path: '/admin/dashboard', label: 'Dashboard', icon: BarChart3 },
      { path: '/admin/rankings', label: 'Sıralama', icon: Trophy },
    ]
  } else {
    return [
      { path: '/student/dashboard', label: 'Özet', icon: LayoutDashboard },
      { path: '/student/activity-add', label: 'Ekle', icon: PlusCircle },
      { path: '/student/activities', label: 'Geçmiş', icon: History },
      { path: '/student/profile', label: 'Profil', icon: User },
    ]
  }
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
