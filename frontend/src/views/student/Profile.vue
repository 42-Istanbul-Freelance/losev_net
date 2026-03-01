<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <h1 class="text-2xl font-bold text-gray-900">Profilim</h1>
    </div>

    <!-- User Info Card -->
    <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center">
      <div class="w-24 h-24 bg-losev-red/10 rounded-full flex items-center justify-center text-losev-red font-bold text-3xl mb-4 border-4 border-white shadow-lg ring-2 ring-losev-red/5">
        {{ user?.fullName?.[0] || 'İ' }}
      </div>
      <h2 class="text-xl font-bold text-gray-900">{{ user?.fullName || 'İnci Gönüllü' }}</h2>
      <p class="text-sm text-gray-500 font-medium">
        {{ user?.role === 'STUDENT' ? 'İnci Öğrencisi' : user?.role === 'TEACHER' ? 'Gönüllü Öğretmen' : 'Yönetici' }}
      </p>

      <div v-if="user?.role === 'STUDENT'" class="mt-6 w-full grid grid-cols-2 gap-4">
        <div class="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
          <p class="text-[10px] font-bold text-gray-400 uppercase">Şehir</p>
          <p class="text-sm font-bold text-gray-700">{{ user?.city || '-' }}</p>
        </div>
        <div class="bg-gray-50 p-3 rounded-2xl border border-gray-100 text-center">
          <p class="text-[10px] font-bold text-gray-400 uppercase">Sınıf</p>
          <p class="text-sm font-bold text-gray-700">{{ user?.grade || '-' }}</p>
        </div>
      </div>
    </div>

    <!-- Details -->
    <div v-if="user?.role === 'STUDENT'" class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-50">
        <h3 class="font-bold text-gray-900 flex items-center gap-2">
          <School class="w-5 h-5 text-losev-red" />
          Okul Bilgileri
        </h3>
      </div>
      <div class="p-6 space-y-4">
        <div class="flex justify-between">
          <span class="text-sm text-gray-500 font-medium">Okul Adı</span>
          <span class="text-sm text-gray-900 font-bold text-right">{{ user?.schoolName || '-' }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-sm text-gray-500 font-medium">Koordinatör Öğretmen</span>
          <span class="text-sm text-gray-900 font-bold text-right">{{ user?.coordinatorName || '-' }}</span>
        </div>
      </div>
    </div>

    <!-- Contact Info -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-50">
        <h3 class="font-bold text-gray-900 flex items-center gap-2">
          <Mail class="w-5 h-5 text-losev-red" />
          İletişim Bilgileri
        </h3>
      </div>
      <div class="p-6 space-y-4">
        <div class="flex justify-between">
          <span class="text-sm text-gray-500 font-medium">E-posta</span>
          <span class="text-sm text-gray-900 font-bold text-right truncate ml-4">{{ user?.email || '-' }}</span>
        </div>
        <div v-if="user?.gsm" class="flex justify-between">
          <span class="text-sm text-gray-500 font-medium">Telefon</span>
          <span class="text-sm text-gray-900 font-bold text-right">{{ user?.gsm }}</span>
        </div>
      </div>
    </div>

    <!-- Logout Button (Mobile only) -->
    <button
      @click="handleLogout"
      class="w-full py-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-center gap-2 text-losev-red font-bold active:bg-red-50 transition-colors"
    >
      <LogOut class="w-5 h-5" />
      Çıkış Yap
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../store/auth'
import {
  School,
  Mail,
  LogOut
} from 'lucide-vue-next'

const router = useRouter()
const authStore = useAuthStore()
const user = computed(() => authStore.user)

onMounted(async () => {
  try {
    await authStore.fetchProfile()
  } catch (err) {
    console.error('Failed to fetch profile:', err)
  }
})

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}
</script>
