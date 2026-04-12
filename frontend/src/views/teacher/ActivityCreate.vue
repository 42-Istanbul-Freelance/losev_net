<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <ArrowLeft class="w-6 h-6 text-gray-600" />
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Yeni Etkinlik Oluştur</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
        {{ error }}
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Etkinlik Tarihi</label>
          <div class="relative">
            <Calendar class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model="form.date"
              type="date"
              required
              class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-losev-blue focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Etkinlik Türü</label>
          <select
            v-model="form.type"
            required
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-losev-blue focus:border-transparent outline-none transition-all appearance-none bg-white"
          >
            <option value="" disabled>Seçiniz...</option>
            <option value="SEMINAR">Seminer</option>
            <option value="STAND">Stant</option>
            <option value="DONATION">Bağış</option>
            <option value="BAZAAR">Kermes</option>
            <option value="PUBLIC_AWARENESS">Kamuoyu Bilinçlendirme</option>
            <option value="SOCIAL_MEDIA">Sosyal Medya Çalışması</option>
            <option value="AWARENESS_EVENT">Farkındalık Etkinliği</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Kredi Saati</label>
          <div class="relative">
            <Clock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model.number="form.hours"
              type="number"
              step="0.5"
              min="0.5"
              required
              class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-losev-blue focus:border-transparent outline-none transition-all"
              placeholder="Örn: 2.5"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Açıklama</label>
          <textarea
            v-model="form.description"
            rows="3"
            required
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-losev-blue focus:border-transparent outline-none transition-all resize-none"
            placeholder="Etkinlik detayları..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Katılım Kodu</label>
          <input
            v-model="form.code"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-losev-blue focus:border-transparent outline-none transition-all"
            placeholder="Örn: LOSEV2024"
          />
          <p class="mt-1 text-xs text-gray-500">Öğrencilerin bu etkinliğe katılabilmek için bu kodu girmesi gerekecektir.</p>
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-4 bg-losev-blue text-white font-bold rounded-2xl shadow-lg shadow-losev-blue/20 active:scale-95 transition-all disabled:opacity-50"
      >
        <span v-if="loading">Oluşturuluyor...</span>
        <span v-else>Etkinliği Başlat</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../services/api'
import { useAuthStore } from '../../store/auth'
import {
  ArrowLeft,
  Calendar,
  Clock
} from 'lucide-vue-next'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  date: new Date().toISOString().split('T')[0],
  type: '',
  hours: 0,
  description: '',
  code: ''
})

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    const payload = {
      ...form,
      hours: Number(form.hours)
    }
    await api.post('/activities', payload)
    const dashboardPath = router.currentRoute.value.path.startsWith('/admin')
      ? '/admin/dashboard'
      : '/teacher/dashboard'
    router.push(dashboardPath)
  } catch (err) {
    error.value = err.message || 'Etkinlik oluşturulamadı.'
  } finally {
    loading.value = false
  }
}
</script>
