<template>
  <form @submit.prevent="handleSubmit" class="space-y-4 mt-6">
    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="firstName" class="block text-sm font-medium text-gray-700">Ad</label>
        <input
          id="firstName"
          v-model="firstName"
          type="text"
          required
          class="mt-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-losev-red focus:border-losev-red sm:text-sm"
        />
      </div>
      <div>
        <label for="lastName" class="block text-sm font-medium text-gray-700">Soyad</label>
        <input
          id="lastName"
          v-model="lastName"
          type="text"
          required
          class="mt-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-losev-red focus:border-losev-red sm:text-sm"
        />
      </div>
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">E-posta Adresi</label>
      <input
        id="email"
        v-model="email"
        type="email"
        required
        class="mt-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-losev-red focus:border-losev-red sm:text-sm"
        placeholder="orne@email.com"
      />
    </div>

    <div>
      <label for="school" class="block text-sm font-medium text-gray-700">Okul Adı</label>
      <input
        id="school"
        v-model="school"
        type="text"
        required
        class="mt-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-losev-red focus:border-losev-red sm:text-sm"
        placeholder="LÖSEV Koleji"
      />
    </div>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <label for="city" class="block text-sm font-medium text-gray-700">İl</label>
        <select
          id="city"
          v-model="city"
          class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-losev-red focus:border-losev-red sm:text-sm"
        >
          <option value="Ankara">Ankara</option>
          <option value="Istanbul">İstanbul</option>
          <option value="Izmir">İzmir</option>
        </select>
      </div>
      <div>
        <label for="grade" class="block text-sm font-medium text-gray-700">Sınıf</label>
        <select
          id="grade"
          v-model="grade"
          class="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-losev-red focus:border-losev-red sm:text-sm"
        >
          <option v-for="n in 4" :key="n" :value="n+8">{{ n+8 }}. Sınıf</option>
          <option value="Lise1">Hazırlık</option>
        </select>
      </div>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Şifre</label>
      <input
        id="password"
        v-model="password"
        type="password"
        required
        class="mt-1 appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-losev-red focus:border-losev-red sm:text-sm"
        placeholder="••••••••"
      />
    </div>

    <div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-losev-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-losev-red disabled:opacity-50 transition-colors"
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

const router = useRouter()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const school = ref('')
const city = ref('Ankara')
const grade = ref('9')
const password = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  // Mock registration
  setTimeout(() => {
    router.push('/login')
    loading.value = false
  }, 1000)
}
</script>
