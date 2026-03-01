<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <ArrowLeft class="w-6 h-6 text-gray-600" />
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Kullanıcı Onayları</h1>
    </div>

    <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
      {{ error }}
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-losev-red"></div>
    </div>

    <div v-else-if="pendingUsers.length > 0" class="space-y-4">
      <div
        v-for="user in pendingUsers"
        :key="user.id"
        class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4 overflow-hidden relative"
      >
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-losev-red/10 text-losev-red flex items-center justify-center font-bold">
              {{ user.fullName[0] }}
            </div>
            <div>
              <p class="font-bold text-sm text-gray-900">{{ user.fullName }}</p>
              <p class="text-[10px] text-gray-400 font-medium">{{ user.email }}</p>
            </div>
          </div>
          <div class="text-right">
            <span
              class="px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider"
              :class="user.role === 'STUDENT' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'"
            >
              {{ user.role === 'STUDENT' ? 'Öğrenci' : 'Öğretmen' }}
            </span>
          </div>
        </div>

        <div v-if="user.role === 'STUDENT'" class="grid grid-cols-2 gap-4 border-y border-gray-50 py-4">
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Okul</p>
            <p class="text-sm text-gray-700 font-semibold">{{ user.schoolName || '-' }}</p>
          </div>
          <div>
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Şehir / Sınıf</p>
            <p class="text-sm text-gray-700 font-semibold">{{ user.city || '-' }} / {{ user.grade || '-' }}</p>
          </div>
          <div class="col-span-2">
            <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Öğretmen Ata</p>
            <select
              v-model="user.selectedTeacherId"
              class="w-full mt-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-losev-red"
            >
              <option :value="undefined">Seçilmedi (Opsiyonel)</option>
              <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
                {{ teacher.fullName }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="handleUpdateStatus(user.id, 'APPROVED')"
            :disabled="actionLoading === user.id"
            class="flex-1 py-3 bg-green-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 active:scale-95 transition-all disabled:opacity-50"
          >
            <Check class="w-5 h-5" />
            <span v-if="actionLoading === user.id">İşleniyor...</span>
            <span v-else>Onayla</span>
          </button>
          <button
            @click="handleUpdateStatus(user.id, 'REJECTED')"
            :disabled="actionLoading === user.id"
            class="flex-1 py-3 bg-white border border-red-200 text-red-500 font-bold rounded-2xl flex items-center justify-center gap-2 active:bg-red-50 transition-all disabled:opacity-50"
          >
            <X class="w-5 h-5" />
            <span v-if="actionLoading === user.id">İşleniyor...</span>
            <span v-else>Reddet</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="bg-white border-2 border-dashed border-gray-200 rounded-3xl py-12 px-6 text-center shadow-sm">
      <div class="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
        <CheckCircle class="w-8 h-8 text-green-500" />
      </div>
      <h3 class="font-bold text-gray-900 mb-1">Bekleyen Kayıt Yok</h3>
      <p class="text-gray-500 text-sm">Tüm üyelik başvuruları değerlendirildi.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../services/api'
import {
  ArrowLeft,
  Check,
  X,
  CheckCircle
} from 'lucide-vue-next'

const pendingUsers = ref([])
const teachers = ref([])
const loading = ref(false)
const actionLoading = ref(null)
const error = ref('')

const fetchTeachers = async () => {
  try {
    teachers.value = await api.get('/users/teachers')
  } catch (err) {
    console.error('Failed to fetch teachers:', err)
  }
}

const fetchPending = async () => {
  loading.value = true
  error.value = ''
  try {
    pendingUsers.value = await api.get('/users/pending')
  } catch (err) {
    error.value = 'Onay bekleyen kullanıcılar yüklenemedi.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await Promise.all([fetchPending(), fetchTeachers()])
})

const handleUpdateStatus = async (id, status) => {
  if (status === 'REJECTED' && !confirm('Bu kullanıcıyı reddetmek istediğinize emin misiniz?')) {
    return
  }

  const user = pendingUsers.value.find(u => u.id === id)
  const payload = { status }

  if (status === 'APPROVED' && user.selectedTeacherId) {
    payload.teacherId = user.selectedTeacherId
  }

  actionLoading.value = id
  try {
    await api.patch(`/users/${id}/status`, payload)
    pendingUsers.value = pendingUsers.value.filter(u => u.id !== id)
  } catch (err) {
    alert('Hata: ' + (err.message || 'İşlem başarısız.'))
  } finally {
    actionLoading.value = null
  }
}
</script>
