<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Faaliyet Geçmişim</h1>
      <router-link to="/student/activity-add" class="bg-losev-red text-white p-2 rounded-xl active:scale-95 transition-transform">
        <Plus class="w-6 h-6" />
      </router-link>
    </div>

    <!-- Filters -->
    <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      <button
        v-for="filter in filters"
        :key="filter.id"
        @click="activeFilter = filter.id"
        class="px-4 py-2 rounded-full whitespace-nowrap text-sm font-semibold transition-colors"
        :class="[activeFilter === filter.id ? 'bg-losev-red text-white shadow-sm' : 'bg-white text-gray-500 border border-gray-100']"
      >
        {{ filter.label }}
      </button>
    </div>

    <!-- List -->
    <div class="space-y-4">
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
            <h3 class="font-bold text-gray-900 truncate">{{ activity.typeLabel }}</h3>
            <span class="text-xs font-bold text-gray-400 whitespace-nowrap">{{ activity.date }}</span>
          </div>
          <p class="text-xs text-gray-500 mt-1 line-clamp-2">{{ activity.description }}</p>

          <div class="mt-3 flex items-center justify-between">
            <div class="flex items-center gap-1 text-losev-red bg-losev-red/5 px-2 py-1 rounded-lg">
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

          <!-- Feedback if rejected -->
          <div v-if="activity.status === 'REJECTED' && activity.feedback" class="mt-3 bg-red-50 p-2 rounded-xl border border-red-100">
            <p class="text-[10px] text-red-700 font-medium italic leading-tight">
              <strong>Öğretmen Notu:</strong> {{ activity.feedback }}
            </p>
          </div>
        </div>
      </div>

      <div v-if="filteredActivities.length === 0" class="bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl py-12 px-6 text-center">
        <div class="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
          <History class="w-8 h-8 text-gray-300" />
        </div>
        <p class="text-gray-500 font-medium">Bu kategoride henüz kayıtlı faaliyetin bulunmuyor.</p>
        <router-link to="/student/activity-add" class="mt-4 inline-block text-losev-red font-bold text-sm">Hemen bir tane ekle →</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
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

const activeFilter = ref('ALL')

const activities = ref([
  {
    id: 1,
    date: '24.02.2024',
    type: 'SEMINER',
    typeLabel: 'LÖSEV Farkındalık Semineri',
    hours: 2,
    description: 'Okulumuzda düzenlenen LÖSEV bilgilendirme seminerine katıldım ve arkadaşlarıma broşür dağıttım.',
    status: 'APPROVED'
  },
  {
    id: 2,
    date: '26.02.2024',
    type: 'STANT',
    typeLabel: 'LÖSEV Standı',
    hours: 4,
    description: 'AVM içerisinde kurulan standımızda LÖSEV ürünlerinin tanıtımını gerçekleştirdim.',
    status: 'PENDING'
  },
  {
    id: 3,
    date: '15.02.2024',
    type: 'BAGIS',
    typeLabel: 'Bağış Kumbarası',
    hours: 1.5,
    description: 'Sınıfımızdaki bağış kumbarasının yönetimini sağladım.',
    status: 'REJECTED',
    feedback: 'Fotoğraf veya belge yüklenmemiş. Lütfen etkinliği kanıtlayan bir görsel ekleyip tekrar gönderin.'
  }
])

const filteredActivities = computed(() => {
  if (activeFilter.value === 'ALL') return activities.value
  return activities.value.filter(a => a.status === activeFilter.value)
})

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
    bg: 'bg-red-50',
    text: 'text-red-600',
    label: 'Reddedildi',
    icon: XCircle
  }
}
</script>
