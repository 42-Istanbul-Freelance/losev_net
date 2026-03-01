<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 mt-6">
    <div v-if="error" class="bg-blue-50 border border-blue-200 text-blue-600 px-4 py-3 rounded-xl text-sm font-medium">
      {{ error }}
    </div>

    <div>
      <label for="fullName" class="block text-sm font-medium text-gray-700">Ad Soyad</label>
      <input
        id="fullName"
        v-model="fullName"
        type="text"
        required
        class="mt-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-losev-blue focus:border-losev-blue sm:text-sm"
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">E-posta Adresi</label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        class="mt-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-losev-blue focus:border-losev-blue sm:text-sm"
        placeholder="orne@email.com"
      />
    </div>

    <div>
      <label for="role" class="block text-sm font-medium text-gray-700">Rolünüz</label>
      <select
        id="role"
        v-model="role"
        class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-losev-blue focus:border-losev-blue sm:text-sm"
      >
        <option value="STUDENT">Öğrenci</option>
        <option value="TEACHER">Öğretmen</option>
      </select>
    </div>

    <div v-if="role === 'STUDENT'" class="space-y-4">
      <div>
        <label for="school" class="block text-sm font-medium text-gray-700">Okul Adı</label>
        <input
          id="school"
          v-model="schoolName"
          type="text"
          required
          class="mt-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-losev-blue focus:border-losev-blue sm:text-sm"
          placeholder="LÖSEV Koleji"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="city" class="block text-sm font-medium text-gray-700">İl</label>
          <input
            id="city"
            v-model="city"
            type="text"
            required
            class="mt-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-losev-blue focus:border-losev-blue sm:text-sm"
            placeholder="Ankara"
          />
        </div>
        <div>
          <label for="grade" class="block text-sm font-medium text-gray-700">Sınıf</label>
          <select
            id="grade"
            v-model="grade"
            class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-losev-blue focus:border-losev-blue sm:text-sm"
          >
            <option v-for="n in 4" :key="n" :value="(n+8).toString()">{{ n+8 }}. Sınıf</option>
            <option value="Hazırlık">Hazırlık</option>
          </select>
        </div>
      </div>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Şifre</label>
      <input
        id="password"
        v-model="password"
        type="password"
        required
        class="mt-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-losev-blue focus:border-losev-blue sm:text-sm"
        placeholder="••••••••"
      />
    </div>

    <div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-losev-blue hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-losev-blue disabled:opacity-50 transition-colors"
      >
        <span v-if="loading">Kayıt Yapılıyor...</span>
        <span v-else>Hesap Oluştur</span>
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()

const fullName = ref('')
const email = ref('')
const role = ref('STUDENT')
const schoolName = ref('')
const city = ref('')
const grade = ref('9')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleSubmit = async () => {
  loading.value = true
  error.value = ''

  const payload = {
    fullName: fullName.value,
    email: email.value,
    role: role.value,
    password: password.value,
  }

  if (role.value === 'STUDENT') {
    payload.schoolName = schoolName.value
    payload.city = city.value
    payload.grade = grade.value
  }

  try {
    await authStore.register(payload)
    router.push('/login?registered=true')
  } catch (err) {
    error.value = err.message || 'Kayıt işlemi başarısız. Lütfen bilgilerinizi kontrol edin.'
  } finally {
    loading.value = false
  }
}
</script>
