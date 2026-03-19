<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <ArrowLeft class="w-6 h-6 text-gray-600" />
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Bekleyen Onaylar</h1>
    </div>

    <div v-if="loading" class="text-center py-20 text-gray-500">Yükleniyor...</div>

    <div v-else class="space-y-8">
      <!-- User Approvals -->
      <section v-if="pendingUsers.length > 0">
        <h2 class="font-bold text-gray-700 text-sm uppercase tracking-wider mb-4">Yeni Kayıtlar</h2>
        <div class="space-y-4">
          <div v-for="user in pendingUsers" :key="user.id" class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <div class="flex items-center gap-4 mb-4">
              <div class="bg-losev-blue/10 p-3 rounded-2xl text-losev-blue">
                <UserIcon class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-bold text-gray-900">{{ user.fullName }}</h3>
                <p class="text-xs text-gray-400 font-medium uppercase tracking-tight">{{ user.role }} • {{ user.schoolName }}</p>
              </div>
            </div>
            <div class="flex gap-2">
              <button @click="updateUserStatus(user.id, 'APPROVED')" class="flex-1 py-3 bg-losev-blue text-white rounded-2xl font-bold shadow-lg shadow-losev-blue/20">Onayla</button>
              <button @click="updateUserStatus(user.id, 'REJECTED')" class="flex-1 py-3 bg-gray-100 text-gray-700 rounded-2xl font-bold">Reddet</button>
            </div>
          </div>
        </div>
      </section>

      <!-- Participation Approvals -->
      <section v-if="pendingParticipations.length > 0">
        <h2 class="font-bold text-gray-700 text-sm uppercase tracking-wider mb-4">Etkinlik Katılımları</h2>
        <div class="space-y-4">
          <div v-for="p in pendingParticipations" :key="p.id" class="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
            <div class="mb-4">
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-bold text-gray-900">{{ p.student.fullName }}</h3>
                <span class="text-xs font-bold text-losev-blue bg-losev-blue/10 px-2 py-1 rounded-lg">{{ p.activity.hours }}s</span>
              </div>
              <p class="text-sm text-gray-500 line-clamp-2">Etkinlik: {{ p.activity.description }}</p>
              <p class="text-xs text-gray-400 mt-1">{{ formatDate(p.activity.date) }}</p>
            </div>
            <div class="flex gap-2">
              <button @click="updateParticipationStatus(p.id, 'APPROVED')" class="flex-1 py-3 bg-green-500 text-white rounded-2xl font-bold shadow-lg shadow-green-500/20">Onayla</button>
              <button @click="updateParticipationStatus(p.id, 'REJECTED')" class="flex-1 py-3 bg-red-500 text-white rounded-2xl font-bold shadow-lg shadow-red-500/20">Reddet</button>
            </div>
          </div>
        </div>
      </section>

      <p v-if="pendingUsers.length === 0 && pendingParticipations.length === 0" class="text-center text-gray-400 py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
        Bekleyen onay bulunmuyor.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../services/api'
import {
  ArrowLeft,
  User as UserIcon
} from 'lucide-vue-next'

const loading = ref(true)
const pendingUsers = ref([])
const pendingParticipations = ref([])

const formatDate = (dateStr) => {
  return new Date(dateStr).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
}

const fetchData = async () => {
  loading.value = true
  try {
    const [users, parts] = await Promise.all([
      api.get('/users/pending'),
      api.get('/activities/pending-participants')
    ])
    pendingUsers.value = users
    pendingParticipations.value = parts
  } catch (err) {
    console.error('Fetch error:', err)
  } finally {
    loading.value = false
  }
}

const updateUserStatus = async (id, status) => {
  try {
    await api.patch(`/users/${id}/status`, { status })
    await fetchData()
  } catch (err) {
    alert(err.message || 'Hata oluştu.')
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
