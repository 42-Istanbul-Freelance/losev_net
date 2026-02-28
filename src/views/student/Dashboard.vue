<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Merhaba, {{ user?.firstName || 'İnci' }}! 👋</h1>
        <p class="text-gray-500">Gönüllülük yolculuğunda harika işler çıkarıyorsun.</p>
      </div>
      <div class="bg-losev-yellow/10 p-3 rounded-2xl border border-losev-yellow/20">
        <Trophy class="w-8 h-8 text-losev-yellow" />
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="bg-blue-100 p-3 rounded-xl text-blue-600">
          <Clock class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Toplam Saat</p>
          <p class="text-2xl font-bold">12.5 <span class="text-sm font-normal text-gray-400">/ 40h</span></p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="bg-green-100 p-3 rounded-xl text-green-600">
          <Calendar class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Bu Ay</p>
          <p class="text-2xl font-bold">4.0 <span class="text-sm font-normal text-gray-400">saat</span></p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="bg-purple-100 p-3 rounded-xl text-purple-600">
          <Target class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Sıradaki Hedef</p>
          <p class="text-2xl font-bold text-losev-red">Bronz İnci</p>
        </div>
      </div>
    </div>

    <!-- Progress Card -->
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-bold text-gray-900">Rozet İlerlemesi</h2>
        <span class="text-sm font-medium text-losev-red">25 saat kaldı</span>
      </div>
      <div class="w-full bg-gray-100 rounded-full h-4 mb-2">
        <div class="bg-losev-red h-4 rounded-full transition-all duration-500" style="width: 31%"></div>
      </div>
      <div class="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
        <span>Başlangıç</span>
        <span class="text-losev-red">Bronz (25s)</span>
        <span>Gümüş (50s)</span>
        <span>Altın (100s)</span>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-2 gap-4">
      <router-link to="/student/activity-add" class="bg-losev-red text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg shadow-losev-red/20 active:scale-95 transition-transform">
        <PlusCircle class="w-8 h-8" />
        <span class="font-bold text-sm">Etkinlik Ekle</span>
      </router-link>
      <router-link to="/student/activities" class="bg-white text-gray-700 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border border-gray-200 active:scale-95 transition-transform">
        <History class="w-8 h-8 text-losev-red" />
        <span class="font-bold text-sm">Geçmişim</span>
      </router-link>
    </div>

    <!-- Badges Section -->
    <div>
      <h2 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Award class="w-5 h-5 text-losev-yellow" />
        Rozetlerim
      </h2>
      <div class="grid grid-cols-4 gap-4">
        <div v-for="i in 4" :key="i" class="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center grayscale opacity-40 border-2 border-dashed border-gray-200">
          <Award class="w-8 h-8 text-gray-400" />
        </div>
      </div>
      <p class="mt-4 text-center text-sm text-gray-400 italic">Henüz bir rozet kazanmadın. İlk adımını at!</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../../store/auth'
import {
  Trophy,
  Clock,
  Calendar,
  Target,
  PlusCircle,
  History,
  Award
} from 'lucide-vue-next'

const authStore = useAuthStore()
const user = computed(() => authStore.user)
</script>
