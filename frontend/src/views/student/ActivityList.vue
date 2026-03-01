<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Faaliyet Geçmişim</h1>
      <router-link to="/student/activity-add" class="bg-losev-blue text-white p-2 rounded-xl active:scale-95 transition-transform">
        <Plus class="w-6 h-6" />
      </router-link>
    </div>

    <div v-if="error" class="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 rounded-xl text-sm font-medium">
      {{ error }}
    </div>

    <!-- Filters -->
    <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        v-for="filter in filters"
        :key="filter.id"
        @click="activeFilter = filter.id"
        class="px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-colors"
        :class="[activeFilter === filter.id ? 'bg-losev-blue text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-100']"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- List -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-losev-blue"></div>
    </div>

    <div v-else class="space-y-4">
      <div
        v-for="activity in filteredActivities"
        :key="activity.id"
        class="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4"
      >
        <div
          class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          :class="[statusStyles[activity.status].bg, statusStyles[activity.status].text]"
        >
          <component :is="statusStyles[activity.status].icon" class="w-6 h-6" />
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex justify-between items-start">
            <h3 class="font-bold text-gray-900 truncate">{{ typeLabels[activity.type] }}</h3>
            <span class="text-xs font-bold text-gray-400 whitespace-nowrap">{{ formatDate(activity.date) }}</span>
          </div>
          <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ activity.description }}</p>

          <div class="mt-3 flex items-center justify-between">
            <div class="flex items-center gap-1 text-losev-blue bg-losev-blue/5 px-2 py-1 rounded-lg">
              <Clock class="w-3 h-3" />
              <span class="text-[10px] font-bold">{{ activity.hours }} Saat</span>
            </div>

            <span
              class="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg"
              :class="[statusStyles[activity.status].bg, statusStyles[activity.status].text]"
            >
              {{ statusStyles[activity.status].label }}
            </span>
          </div>

          <!-- Feedback if rejected or revision requested -->
          <div v-if="(activity.status === 'REJECTED' || activity.status === 'REVISION_REQUESTED') && activity.rejectionReason" class="mt-3 bg-blue-50 p-2 rounded-xl border border-blue-100">
            <p class="text-[10px] text-blue-700 font-medium italic leading-tight">
              <strong>Not:</strong> {{ activity.rejectionReason }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="filteredActivities.length === 0" class="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl py-12 px-6 text-center">
        <div class="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <History class="w-8 h-8 text-gray-300" />
        </div>
        <p class="text-gray-500 font-medium">Bu kategoride henüz kayıtlı faaliyetin bulunmuyor.</p>
        <router-link to="/student/activity-add" class="mt-4 inline-block text-losev-blue font-bold text-sm">Hemen bir tane ekle →</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from '../../services/api'
import {
  Plus,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  History
} from 'lucide-vue-next'

const filters = [
  { id: 'ALL', label: 'Tümü' },
  { id: 'PENDING', label: 'Onay Bekleyen' },
  { id: 'APPROVED', label: 'Onaylanan' },
  { id: 'REJECTED', label: 'Reddedilen' },
]

const typeLabels = {
  SEMINAR: 'LÖSEV Farkındalık Semineri',
  STAND: 'LÖSEV Standı',
  DONATION: 'Bağış Kumbarası',
  BAZAAR: 'Kermes Etkinliği',
  PUBLIC_AWARENESS: 'Kamuoyu Bilinçlendirme',
  SOCIAL_MEDIA: 'Sosyal Medya Çalışması',
  AWARENESS_EVENT: 'Farkındalık Etkinliği'
}

const activeFilter = ref('ALL')
const activities = ref([])
const loading = ref(false)
const error = ref('')

const fetchActivities = async () => {
  loading.value = true
  error.value = ''
  try {
    activities.value = await api.get('/activities/my')
  } catch (err) {
    error.value = 'Faaliyetler yüklenirken bir hata oluştu.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchActivities)

const filteredActivities = computed(() => {
  if (activeFilter.value === 'ALL') return activities.value
  return activities.value.filter(a => a.status === activeFilter.value)
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('tr-TR')
}

const statusStyles = {
  PENDING: {
    bg: 'bg-yellow-50',
    text: 'text-yellow-600',
    label: 'Onay Bekliyor',
    icon: AlertCircle
  },
  APPROVED: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    label: 'Onaylandı',
    icon: CheckCircle
  },
  REJECTED: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    label: 'Reddedildi',
    icon: XCircle
  },
  REVISION_REQUESTED: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    label: 'Revizyon İstendi',
    icon: AlertCircle
  }
}
</script>
