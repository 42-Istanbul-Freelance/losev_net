<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-900">Etkinlikler</h1>
    </div>

    <!-- Active Activities -->
    <div class="space-y-4">
      <h2 class="font-bold text-gray-700 text-sm uppercase tracking-wider">Aktif Etkinlikler</h2>
      <div v-for="activity in activeActivities" :key="activity.id" class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
        <div class="flex justify-between items-start mb-3">
          <div>
            <span class="text-[10px] font-bold text-losev-blue bg-losev-blue/10 px-2 py-1 rounded-lg uppercase tracking-wider mb-2 inline-block">
              {{ activity.type }}
            </span>
            <h3 class="font-bold text-gray-900 text-lg">{{ activity.description }}</h3>
          </div>
          <div class="text-right">
            <span class="block font-bold text-gray-900">{{ activity.hours }}s</span>
            <span class="text-xs text-gray-400">{{ formatDate(activity.date) }}</span>
          </div>
        </div>

        <button
          @click="joinActivity(activity.id)"
          :disabled="isJoined(activity.id) || joiningId === activity.id"
          :class="[
            'w-full py-3 rounded-2xl font-bold transition-all active:scale-95',
            isJoined(activity.id)
              ? 'bg-green-50 text-green-600 cursor-default'
              : 'bg-losev-blue text-white shadow-lg shadow-losev-blue/20'
          ]"
        >
          <span v-if="joiningId === activity.id">İşleniyor...</span>
          <span v-else-if="isJoined(activity.id)" class="flex items-center justify-center gap-2">
            <CheckCircle class="w-5 h-5" /> {{ getParticipationStatus(activity.id) }}
          </span>
          <span v-else>Katılım Bildir</span>
        </button>
      </div>
      <p v-if="activeActivities.length === 0" class="text-center text-gray-400 py-10 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
        Şu an aktif etkinlik bulunmuyor.
      </p>
    </div>

    <!-- My Participations -->
    <div class="space-y-4" v-if="participations.length > 0">
      <h2 class="font-bold text-gray-700 text-sm uppercase tracking-wider">Katılım Geçmişim</h2>
      <div v-for="p in participations" :key="p.id" class="bg-white p-4 rounded-2xl border border-gray-100 flex items-center justify-between">
        <div>
          <p class="font-bold text-gray-900">{{ p.activity.description }}</p>
          <p class="text-xs text-gray-400">{{ formatDate(p.activity.date) }} • {{ p.activity.hours }} saat</p>
        </div>
        <div :class="statusClass(p.status)" class="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
          {{ translateStatus(p.status) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { api } from '../../services/api'
import { CheckCircle } from 'lucide-vue-next'

const activities = ref([])
const participations = ref([])
const joiningId = ref(null)

const activeActivities = computed(() => {
  // Simple logic: all activities are active for now
  return activities.value
})

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const statusClass = (status) => {
  switch (status) {
    case 'APPROVED': return 'bg-green-100 text-green-700'
    case 'REJECTED': return 'bg-red-100 text-red-700'
    default: return 'bg-orange-100 text-orange-700'
  }
}

const translateStatus = (status) => {
  switch (status) {
    case 'APPROVED': return 'Onaylandı'
    case 'REJECTED': return 'Reddedildi'
    default: return 'Bekliyor'
  }
}

const isJoined = (activityId) => {
  return participations.value.some(p => p.activityId === activityId)
}

const getParticipationStatus = (activityId) => {
  const p = participations.value.find(p => p.activityId === activityId)
  return translateStatus(p?.status)
}

const fetchData = async () => {
  try {
    const [actData, partData] = await Promise.all([
      api.get('/activities'),
      api.get('/activities/my-participations')
    ])
    activities.value = actData
    participations.value = partData
  } catch (err) {
    console.error('Fetch error:', err)
  }
}

const joinActivity = async (activityId) => {
  const code = prompt('Lütfen bu etkinlik için size verilen katılım kodunu giriniz:')
  if (!code) return

  joiningId.value = activityId
  try {
    await api.post('/activities/join', { activityId, code })
    await fetchData()
  } catch (err) {
    alert(err.message || 'Katılım bildirilemedi. Kodun doğru olduğundan emin olun.')
  } finally {
    joiningId.value = null
  }
}

onMounted(fetchData)
</script>
