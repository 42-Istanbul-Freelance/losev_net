<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <ArrowLeft class="w-6 h-6 text-gray-600" />
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Duyuru Yayınla</h1>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6 bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <div v-if="error" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
        {{ error }}
      </div>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Başlık</label>
          <input
            v-model="form.title"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-losev-blue focus:border-transparent outline-none transition-all"
            placeholder="Duyuru başlığı..."
          />
        </div>

        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">İçerik</label>
          <textarea
            v-model="form.content"
            rows="6"
            required
            class="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-losev-blue focus:border-transparent outline-none transition-all resize-none"
            placeholder="Duyuru metni..."
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full py-4 bg-losev-blue text-white font-bold rounded-2xl shadow-lg shadow-losev-blue/20 active:scale-95 transition-all disabled:opacity-50"
      >
        <span v-if="loading">Yayınlanıyor...</span>
        <span v-else>Duyuruyu Paylaş</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '../../services/api'
import { useAuthStore } from '../../store/auth'
import { ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
const loading = ref(false)
const error = ref('')

const form = reactive({
  title: '',
  content: ''
})

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  try {
    await api.post('/announcements', form)
    const authStore = useAuthStore()
    if (authStore.userRole === 'ADMIN') {
      router.push('/admin/dashboard')
    } else {
      router.push('/teacher/dashboard')
    }
  } catch (err) {
    error.value = err.message || 'Duyuru yayınlanamadı.'
  } finally {
    loading.value = false
  }
}
</script>
