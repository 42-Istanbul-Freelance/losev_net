<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <ArrowLeft class="w-6 h-6 text-gray-600" />
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Sıralamalar</h1>
    </div>

    <!-- Tabs -->
    <div class="flex gap-2 p-1 bg-gray-100 rounded-2xl">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
        :class="[activeTab === tab.id ? 'bg-white shadow text-losev-blue' : 'text-gray-500']"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Rankings Table -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-50">
        <h3 class="font-bold text-gray-900 flex items-center gap-2">
          <Trophy class="w-5 h-5 text-losev-yellow" />
          {{ activeTab === 'SCHOOLS' ? 'En Aktif Okullar' : 'En Aktif İnci Öğrenciler' }}
        </h3>
      </div>

      <div v-if="loading" class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-losev-blue"></div>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sıra</th>
              <th class="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">İsim / Okul</th>
              <th class="px-6 py-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Saat</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="(item, index) in activeRankings" :key="index" class="hover:bg-gray-50 transition-colors group">
              <td class="px-6 py-4">
                <div class="w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs" :class="[index < 3 ? 'bg-losev-yellow/10 text-losev-yellow' : 'bg-gray-100 text-gray-400']">
                  {{ index + 1 }}
                </div>
              </td>
              <td class="px-6 py-4">
                <p class="font-bold text-sm text-gray-900 group-hover:text-losev-blue transition-colors">{{ item.name }}</p>
                <p class="text-[10px] text-gray-400 font-medium">{{ item.sub }}</p>
              </td>
              <td class="px-6 py-4 text-right">
                <p class="font-black text-losev-blue text-sm">{{ item.hours }}s</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from '../../services/api'
import { ArrowLeft, Trophy } from 'lucide-vue-next'

const tabs = [
  { id: 'SCHOOLS', label: 'Okullar' },
  { id: 'STUDENTS', label: 'Öğrenciler' },
]

const activeTab = ref('SCHOOLS')
const loading = ref(false)
const rawRankings = ref({
  topStudents: [],
  topSchools: []
})

const fetchRankings = async () => {
  loading.value = true
  try {
    rawRankings.value = await api.get('/activities/stats/rankings')
  } catch (err) {
    console.error('Failed to fetch rankings:', err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchRankings)

const activeRankings = computed(() => {
  if (activeTab.value === 'SCHOOLS') {
    return rawRankings.value.topSchools.map(s => ({
      name: s.schoolName,
      sub: `${s.city || 'Belirtilmemiş'}`,
      hours: s.totalHours
    }))
  } else {
    return rawRankings.value.topStudents.map(s => ({
      name: s.fullName,
      sub: `${s.schoolName} - ${s.grade || '-'}`,
      hours: s.totalHours
    }))
  }
})
</script>
