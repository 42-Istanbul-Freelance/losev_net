<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <ArrowLeft class="w-6 h-6 text-gray-600" />
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Katılım Onayları</h1>
    </div>

    <div v-if="loading" class="text-center py-20 text-gray-500">Yükleniyor...</div>

    <div v-else class="space-y-8">
      <!-- Participation Approvals -->
      <section v-if="pendingParticipations.length > 0">
        <div class="space-y-4">
          <div v-for="p in pendingParticipations" :key="p.id" class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <div class="mb-4">
              <div class="flex justify-between items-start mb-2">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-losev-blue/10 text-losev-blue flex items-center justify-center font-bold">
                    {{ p.student.fullName[0] }}
                  </div>
                  <div>
                    <h3 class="font-bold text-gray-900">{{ p.student.fullName }}</h3>
                    <p class="text-xs text-gray-400 font-medium uppercase tracking-tight">{{ p.student.schoolName }}</p>
                  </div>
                </div>
                <span class="text-xs font-bold text-losev-blue bg-losev-blue/10 px-2 py-1 rounded-lg">{{ p.activity.hours }}s</span>
              </div>
              <div class="mt-4 p-3 bg-gray-50 rounded-2xl">
                <p class="text-sm text-gray-700 font-medium">Etkinlik: {{ p.activity.description }}</p>
                <p class="text-xs text-gray-400 mt-1">{{ formatDate(p.activity.date) }}</p>
              </div>
            </div>
            <div class="flex gap-2">
              <button @click="updateParticipationStatus(p.id, 'APPROVED')" class="flex-1 py-3 bg-green-500 text-white rounded-2xl font-bold shadow-lg shadow-green-500/20 active:scale-95 transition-all">Onayla</button>
              <button @click="updateParticipationStatus(p.id, 'REJECTED')" class="flex-1 py-3 bg-white border border-gray-200 text-gray-700 rounded-2xl font-bold active:bg-gray-50 transition-all">Reddet</button>
            </div>
          </div>
        </div>
      </section>

      <div v-else class="bg-white border-2 border-dashed border-gray-200 rounded-3xl py-12 px-6 text-center shadow-sm">
        <div class="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
          <CheckCircle class="w-8 h-8 text-green-500" />
        </div>
        <h3 class="font-bold text-gray-900 mb-1">Bekleyen Katılım Yok</h3>
        <p class="text-gray-500 text-sm">Tüm etkinlik katılımları değerlendirildi.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../services/api'
import {
  ArrowLeft,
  CheckCircle
} from 'lucide-vue-next'

const loading = ref(true)
const pendingParticipations = ref([])

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const fetchData = async () => {
  loading.value = true
  try {
    const parts = await api.get('/activities/pending-participants')
    pendingParticipations.value = parts
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

const updateParticipationStatus = async (id, status) => {
  try {
    await api.patch(`/activities/participant/${id}/status`, { status })
    await fetchData()
  } catch (err) {
    alert(err.message || 'Hata oluştu.')
  }
}

onMounted(fetchData)
</script>
