<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <ArrowLeft class="w-6 h-6 text-gray-600" />
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Etkinlik Ekle</h1>
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
              class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-losev-red focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Etkinlik Türü</label>
          <select
            v-model="form.type"
            required
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-losev-red focus:border-transparent outline-none transition-all appearance-none bg-white"
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
          <label class="block text-sm font-semibold text-gray-700 mb-1">Harcanan Saat</label>
          <div class="relative">
            <Clock class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              v-model.number="form.hours"
              type="number"
              step="0.5"
              min="0.5"
              required
              class="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-losev-red focus:border-transparent outline-none transition-all"
              placeholder="Örn: 2.5"
            />
          </div>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Kısa Açıklama</label>
          <textarea
            v-model="form.description"
            rows="3"
            required
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-losev-red focus:border-transparent outline-none transition-all resize-none"
            placeholder="Neler yaptın? Kısaca bahset..."
          ></textarea>
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Fotoğraf / Belge Yükle</label>
          <div
            class="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-losev-red transition-colors cursor-pointer"
            @click="$refs.fileInput.click()"
          >
            <div class="bg-gray-50 p-3 rounded-full">
              <Upload class="w-8 h-8 text-gray-400" />
            </div>
            <p class="text-sm text-gray-500 font-medium">Tıkla veya sürükle bırak</p>
            <p class="text-xs text-gray-400">JPG, PNG veya PDF (Maks. 5MB)</p>
            <input
              type="file"
              ref="fileInput"
              class="hidden"
              accept="image/*,.pdf"
              @change="handleFileChange"
              multiple
            />
          </div>
          <div v-if="files.length > 0" class="mt-2 space-y-2">
            <div v-for="(file, index) in files" :key="index" class="flex items-center gap-2 bg-blue-50 p-3 rounded-xl border border-blue-100">
              <CheckCircle class="w-4 h-4 text-blue-500" />
              <span class="text-sm font-medium text-blue-700">{{ file.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-4 bg-losev-red text-white font-bold rounded-2xl shadow-lg shadow-losev-red/20 active:scale-95 transition-all disabled:opacity-50"
      >
        <span v-if="loading">Gönderiliyor...</span>
        <span v-else>Faaliyeti Kaydet</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../services/api'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Upload,
  CheckCircle
} from 'lucide-vue-next'

const router = useRouter()
const loading = ref(false)
const error = ref('')
const files = ref([])

const form = reactive({
  date: new Date().toISOString().split('T')[0],
  type: '',
  hours: null,
  description: ''
})

const handleFileChange = (e) => {
  const selectedFiles = Array.from(e.target.files)
  if (selectedFiles.length > 0) {
    files.value = selectedFiles.slice(0, 2) // Backend accepts max 2 files
  }
}

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  const formData = new FormData()
  formData.append('date', form.date)
  formData.append('type', form.type)
  formData.append('hours', form.hours)
  formData.append('description', form.description)

  files.value.forEach((file) => {
    formData.append('files', file)
  })

  try {
    await api.post('/activities', formData)
    router.push('/student/activities')
  } catch (err) {
    error.value = err.message || 'Faaliyet kaydedilemedi. Lütfen bilgilerinizi kontrol edin.'
  } finally {
    loading.value = false
  }
}
</script>
