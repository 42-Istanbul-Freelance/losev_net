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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
        <div class="bg-blue-100 p-3 rounded-xl text-blue-600">
          <Clock class="w-6 h-6" />
        </div>
        <div class="flex-1">
          <p class="text-sm text-gray-500 font-medium">Toplam Gönüllülük Saati</p>
          <p class="text-2xl font-bold">{{ stats.totalHours.toFixed(1) }} <span class="text-sm font-normal text-gray-400">/ 30.0h</span></p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center">
        <div class="flex justify-between items-end mb-2">
          <p class="text-sm text-gray-500 font-medium">İnci Sertifikası Hedefi</p>
          <p class="text-xs font-bold text-losev-blue">{{ Math.min(100, (stats.totalHours / 30 * 100)).toFixed(0) }}%</p>
        </div>
        <div class="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
          <div
            class="bg-losev-blue h-full transition-all duration-1000"
            :style="{ width: `${Math.min(100, (stats.totalHours / 30 * 100))}%` }"
          ></div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-2 gap-4">
      <router-link to="/student/activities" class="bg-losev-blue text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg shadow-losev-blue/20 active:scale-95 transition-transform">
        <LayoutList class="w-8 h-8" />
        <span class="font-bold text-sm">Etkinlik Listesi</span>
      </router-link>
      <router-link to="/student/profile" class="bg-white text-gray-700 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border border-gray-200 active:scale-95 transition-transform">
        <UserIcon class="w-8 h-8 text-losev-blue" />
        <span class="font-bold text-sm">Profilim</span>
      </router-link>
    </div>

    <!-- Announcements -->
    <div>
      <h2 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Megaphone class="w-5 h-5 text-losev-blue" />
        Duyuru Panosu
      </h2>
      <div class="space-y-4">
        <div v-for="ann in announcements" :key="ann.id" class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold text-gray-900">{{ ann.title }}</h3>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{{ new Date(ann.createdAt).toLocaleDateString('tr-TR') }}</span>
          </div>
          <p class="text-sm text-gray-600">{{ ann.content }}</p>
        </div>
        <p v-if="announcements.length === 0" class="text-center text-sm text-gray-400 py-8">Henüz duyuru bulunmuyor.</p>
      </div>
    </div>

    <!-- Badges Section -->
    <div>
      <h2 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Award class="w-5 h-5 text-losev-yellow" />
        Sertifikalarım
      </h2>
      <div class="grid grid-cols-2 gap-4">
        <div
             class="p-4 rounded-2xl flex items-center gap-4 border-2"
             :class="{'bg-gray-50 grayscale opacity-40 border-dashed border-gray-200': stats.totalHours < 30, 'bg-white border-solid border-losev-yellow shadow-sm': stats.totalHours >= 30}">
          <Award class="w-10 h-10" :class="stats.totalHours >= 30 ? 'text-losev-yellow' : 'text-gray-400'" />
          <div>
            <p class="font-bold text-sm" :class="stats.totalHours >= 30 ? 'text-gray-900' : 'text-gray-400'">İnci Sertifikası</p>
            <p class="text-xs text-gray-500">{{ stats.totalHours >= 30 ? 'Hak Kazandınız' : '30 Saat Hedefi' }}</p>
          </div>
        </div>
      </div>
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
  LayoutList,
  User as UserIcon,
  Award,
  Megaphone
} from 'lucide-vue-next'

const authStore = useAuthStore()
const user = computed(() => authStore.user)

const stats = ref({
  totalHours: 0,
  monthlyHours: 0
})

const announcements = ref([])


onMounted(async () => {
  try {
    const [statsData, annData] = await Promise.all([
      api.get('/activities/my/stats'),
      api.get('/announcements')
    ])
    stats.value = statsData
    announcements.value = annData
  } catch (err) {
    console.error('Failed to fetch data:', err)
  }
})
</script>
