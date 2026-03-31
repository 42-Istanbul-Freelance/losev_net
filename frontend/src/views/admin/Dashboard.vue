<template>
  <div class="space-y-6 pb-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Genel Merkez Paneli</h1>
        <p class="text-gray-500">Türkiye Geneli Etki Analizi</p>
      </div>
      <div class="bg-losev-blue p-3 rounded-2xl border border-losev-blue/20">
        <Globe class="w-8 h-8 text-white" />
      </div>
    </div>

    <!-- Impact Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
        <div class="bg-blue-100 p-4 rounded-2xl text-blue-600">
          <Clock class="w-8 h-8" />
        </div>
        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Toplam Gönüllülük Saati</p>
          <p class="text-3xl font-black text-gray-900">{{ globalStats.totalApprovedHours.toLocaleString('tr-TR') }}+</p>
          <div class="mt-1 flex items-center gap-1 text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full w-fit">
            <TrendingUp class="w-3 h-3" />
            Aktif Sistem
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
        <div class="bg-purple-100 p-4 rounded-2xl text-purple-600">
          <Users class="w-8 h-8" />
        </div>
        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Katkı Sağlayan İller</p>
          <p class="text-3xl font-black text-gray-900">{{ globalStats.cityDistribution.length }} İl</p>
          <div class="mt-1 flex items-center gap-1 text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full w-fit">
            <MapPin class="w-3 h-3" />
            Türkiye Geneli
          </div>
        </div>
      </div>
    </div>

    <!-- User Approvals CTA -->
    <router-link to="/admin/user-approvals" class="bg-losev-yellow p-6 rounded-3xl shadow-lg shadow-losev-yellow/20 flex items-center justify-between group active:scale-[0.98] transition-all">
      <div class="flex items-center gap-4">
        <div class="bg-white/20 p-3 rounded-2xl text-white">
          <UserPlus class="w-8 h-8" />
        </div>
        <div>
          <h2 class="text-white font-bold text-lg">Kullanıcı Onayları</h2>
          <p class="text-white/80 text-sm">Bekleyen {{ pendingUsersCount }} başvuru var</p>
        </div>
      </div>
      <ArrowRight class="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
    </router-link>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from '../../services/api'
import {
  Globe,
  Clock,
  Users,
  TrendingUp,
  MapPin,
  Map,
  ArrowRight,
  UserPlus
} from 'lucide-vue-next'

const globalStats = ref({
  totalApprovedHours: 0,
  cityDistribution: []
})

const rankings = ref({
  topStudents: [],
  topSchools: []
})

const pendingUsersCount = ref(0)
const loading = ref(false)

const fetchPendingUsers = async () => {
  try {
    const pendingUsers = await api.get('/users/pending')
    pendingUsersCount.value = pendingUsers.length
  } catch (err) {
    console.error('Failed to fetch pending users:', err)
  }
}

const fetchGlobalStats = async () => {
  try {
    globalStats.value = await api.get('/activities/stats/global')
  } catch (err) {
    console.error('Failed to fetch global stats:', err)
  }
}

const fetchRankings = async () => {
  try {
    rankings.value = await api.get('/activities/stats/rankings')
  } catch (err) {
    console.error('Failed to fetch rankings:', err)
  }
}

onMounted(async () => {
  loading.value = true
  await Promise.all([fetchGlobalStats(), fetchRankings(), fetchPendingUsers()])
  loading.value = false
})

const topCities = computed(() => {
  if (!globalStats.value.cityDistribution.length) return []

  const sorted = [...globalStats.value.cityDistribution].sort((a, b) => b.totalHours - a.totalHours)
  const max = sorted[0].totalHours

  return sorted.slice(0, 3).map(c => ({
    name: c.city,
    hours: c.totalHours,
    percent: (c.totalHours / max) * 100
  }))
})

const topSchools = computed(() => rankings.value.topSchools.slice(0, 3))

</script>
