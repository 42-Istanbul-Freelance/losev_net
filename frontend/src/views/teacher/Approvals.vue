<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <ArrowLeft class="w-6 h-6 text-gray-600" />
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Onay Bekleyenler</h1>
    </div>

    <div v-if="error" class="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 rounded-xl text-sm font-medium">
      {{ error }}
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-losev-blue"></div>
    </div>

    <div v-else-if="pendingActivities.length > 0" class="space-y-4">
      <div
        v-for="activity in pendingActivities"
        :key="activity.id"
        class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4 overflow-hidden relative"
      >
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-losev-blue/10 text-losev-blue flex items-center justify-center font-bold">
              {{ activity.student.fullName[0] }}
            </div>
            <div>
              <p class="font-bold text-sm text-gray-900">{{ activity.student.fullName }}</p>
              <p class="text-[10px] text-gray-400 font-medium">{{ activity.student.grade }} - {{ activity.student.schoolName }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs font-bold text-gray-400">{{ formatDate(activity.date) }}</p>
            <div class="mt-1 flex items-center gap-1 text-losev-blue bg-losev-blue/5 px-2 py-0.5 rounded-lg w-fit ml-auto">
              <Clock class="w-3 h-3" />
              <span class="text-[10px] font-bold">{{ activity.hours }} Saat</span>
            </div>
          </div>
        </div>

        <div class="border-y border-gray-50 py-4">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{{ typeLabels[activity.type] }}</p>
          <p class="text-sm text-gray-600 leading-relaxed">{{ activity.description }}</p>

          <div v-if="activity.imageUrl" class="mt-3 flex flex-wrap gap-2">
            <a :href="'/api/uploads/' + activity.imageUrl" target="_blank" class="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
              <div class="bg-white p-2 rounded-xl text-blue-500 shadow-sm">
                <ImageIcon class="w-5 h-5" />
              </div>
              <p class="text-xs font-bold text-blue-600">Fotoğrafı Görüntüle</p>
            </a>

            <a v-if="activity.documentUrl" :href="'/api/uploads/' + activity.documentUrl" target="_blank" class="bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
              <div class="bg-white p-2 rounded-xl text-blue-500 shadow-sm">
                <FileText class="w-5 h-5" />
              </div>
              <p class="text-xs font-bold text-blue-600">Belgeyi Görüntüle</p>
            </a>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="handleUpdateStatus(activity.id, 'APPROVED')"
            :disabled="actionLoading === activity.id"
            class="flex-1 py-3 bg-green-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 active:scale-95 transition-all disabled:opacity-50"
          >
            <Check class="w-5 h-5" />
            <span v-if="actionLoading === activity.id">İşleniyor...</span>
            <span v-else>Onayla</span>
          </button>
          <button
            @click="handleUpdateStatus(activity.id, 'REVISION_REQUESTED')"
            :disabled="actionLoading === activity.id"
            class="flex-1 py-3 bg-white border border-blue-200 text-blue-500 font-bold rounded-2xl flex items-center justify-center gap-2 active:bg-blue-50 transition-all disabled:opacity-50"
          >
            <X class="w-5 h-5" />
            <span v-if="actionLoading === activity.id">İşleniyor...</span>
            <span v-else>Düzenleme İste</span>
          </button>
        </div>
      </div>
    </div>

    <div v-else class="bg-white border-2 border-dashed border-gray-200 rounded-3xl py-12 px-6 text-center shadow-sm">
      <div class="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
        <CheckCircle class="w-8 h-8 text-green-500" />
      </div>
      <h3 class="font-bold text-gray-900 mb-1">Harika! Bekleyen İşin Kalmadı.</h3>
      <p class="text-gray-500 text-sm">Tüm öğrenci faaliyetleri değerlendirildi.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../services/api'
import {
  ArrowLeft,
  Clock,
  Image as ImageIcon,
  FileText,
  Check,
  X,
  CheckCircle
} from 'lucide-vue-next'

const pendingActivities = ref([])
const loading = ref(false)
const actionLoading = ref(null)
const error = ref('')

const typeLabels = {
  SEMINAR: 'LÖSEV Farkındalık Semineri',
  STAND: 'LÖSEV Standı',
  DONATION: 'Bağış Kumbarası',
  BAZAAR: 'Kermes Etkinliği',
  PUBLIC_AWARENESS: 'Kamuoyu Bilinçlendirme',
  SOCIAL_MEDIA: 'Sosyal Medya Çalışması',
  AWARENESS_EVENT: 'Farkındalık Etkinliği'
}

const fetchPending = async () => {
  loading.value = true
  error.value = ''
  try {
    pendingActivities.value = await api.get('/activities/pending')
  } catch (err) {
    error.value = 'Onay bekleyen faaliyetler yüklenemedi.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(fetchPending)

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toLocaleDateString('tr-TR')
}

const handleUpdateStatus = async (id, status) => {
  let rejectionReason = ''
  if (status === 'REVISION_REQUESTED' || status === 'REJECTED') {
    rejectionReason = prompt('Gerekçe giriniz (Zorunlu):')
    if (!rejectionReason) return
  }

  actionLoading.value = id
  try {
    await api.patch(`/activities/${id}/status`, { status, rejectionReason })
    pendingActivities.value = pendingActivities.value.filter(a => a.id !== id)
  } catch (err) {
    alert('Hata: ' + (err.message || 'İşlem başarısız.'))
  } finally {
    actionLoading.value = null
  }
}
</script>
