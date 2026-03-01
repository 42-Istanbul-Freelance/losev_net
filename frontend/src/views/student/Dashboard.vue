<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Merhaba, {{ user?.fullName?.split(' ')[0] || 'İnci' }}! 👋</h1>
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
          <p class="text-2xl font-bold">{{ stats.totalHours.toFixed(1) }} <span class="text-sm font-normal text-gray-400">/ {{ nextBadgeThreshold }}h</span></p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="bg-green-100 p-3 rounded-xl text-green-600">
          <Calendar class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Bu Ay</p>
          <p class="text-2xl font-bold">{{ stats.monthlyHours.toFixed(1) }} <span class="text-sm font-normal text-gray-400">saat</span></p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="bg-purple-100 p-3 rounded-xl text-purple-600">
          <Target class="w-6 h-6" />
        </div>
        <div>
          <p class="text-sm text-gray-500 font-medium">Sıradaki Hedef</p>
          <p class="text-2xl font-bold text-losev-red">{{ nextBadgeName }}</p>
        </div>
      </div>
    </div>

    <!-- Progress Card -->
    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div class="flex justify-between items-center mb-4">
        <h2 class="font-bold text-gray-900">Rozet İlerlemesi</h2>
        <span class="text-sm font-medium text-losev-red" v-if="nextBadgeThreshold > stats.totalHours">{{ (nextBadgeThreshold - stats.totalHours).toFixed(1) }} saat kaldı</span>
        <span class="text-sm font-medium text-green-600" v-else>Tüm rozetler tamamlandı!</span>
      </div>
      <div class="w-full bg-gray-100 rounded-full h-4 mb-2">
        <div class="bg-losev-red h-4 rounded-full transition-all duration-500" :style="{ width: progressPercentage + '%' }"></div>
      </div>
      <div class="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
        <span>Başlangıç</span>
        <span :class="{'text-losev-red': stats.totalHours < 25}">Bronz (25s)</span>
        <span :class="{'text-losev-red': stats.totalHours >= 25 && stats.totalHours < 50}">Gümüş (50s)</span>
        <span :class="{'text-losev-red': stats.totalHours >= 50 && stats.totalHours < 100}">Altın (100s)</span>
        <span :class="{'text-losev-red': stats.totalHours >= 100}">Platin (200s)</span>
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
        <div v-for="badge in badges" :key="badge.id"
             class="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-gray-200"
             :class="{'grayscale opacity-40 border-dashed': stats.totalHours < badge.threshold, 'bg-white border-solid shadow-sm': stats.totalHours >= badge.threshold}">
          <Award class="w-8 h-8" :class="stats.totalHours >= badge.threshold ? badge.color : 'text-gray-400'" />
        </div>
      </div>
      <p v-if="stats.totalHours < 25" class="mt-4 text-center text-sm text-gray-400 italic">Henüz bir rozet kazanmadın. İlk adımını at!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../../store/auth'
import { api } from '../../services/api'
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

const stats = ref({
  totalHours: 0,
  monthlyHours: 0
})

const badges = [
  { id: 'bronz', threshold: 25, name: 'Bronz İnci', color: 'text-amber-600' },
  { id: 'gumus', threshold: 50, name: 'Gümüş İnci', color: 'text-gray-400' },
  { id: 'altin', threshold: 100, name: 'Altın İnci', color: 'text-yellow-500' },
  { id: 'platin', threshold: 200, name: 'Platin İnci', color: 'text-blue-400' },
]

const nextBadge = computed(() => {
  return badges.find(b => stats.value.totalHours < b.threshold) || badges[badges.length - 1]
})

const nextBadgeName = computed(() => nextBadge.value.name)
const nextBadgeThreshold = computed(() => nextBadge.value.threshold)

const progressPercentage = computed(() => {
  const current = stats.value.totalHours
  const max = 200
  return Math.min((current / max) * 100, 100)
})

onMounted(async () => {
  try {
    const data = await api.get('/activities/my/stats')
    stats.value = data
  } catch (err) {
    console.error('Failed to fetch stats:', err)
  }
})
</script>
