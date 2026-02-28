<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">E-posta Adresi</label>
      <div class="mt-1">
        <input
          id="email"
          v-model="email"
          type="email"
          required
          class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-losev-red focus:border-losev-red sm:text-sm"
          placeholder="orne@email.com"
        />
      </div>
    </div>

    <div>
      <label for="password" class="block text-sm font-medium text-gray-700">Şifre</label>
      <div class="mt-1">
        <input
          id="password"
          v-model="password"
          type="password"
          required
          class="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-losev-red focus:border-losev-red sm:text-sm"
          placeholder="••••••••"
        />
      </div>
    </div>

    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input id="remember-me" type="checkbox" class="h-4 w-4 text-losev-red focus:ring-losev-red border-gray-300 rounded" />
        <label for="remember-me" class="ml-2 block text-sm text-gray-900">Beni Hatırla</label>
      </div>
      <div class="text-sm">
        <a href="#" class="font-medium text-losev-red hover:text-red-700">Şifremi Unuttum</a>
      </div>
    </div>

    <div>
      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-losev-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-losev-red disabled:opacity-50 transition-colors"
      >
        <span v-if="loading">Giriş Yapılıyor...</span>
        <span v-else>Giriş Yap</span>
      </button>
    </div>

    <!-- Demo Accounts -->
    <div class="mt-6 border-t pt-4">
      <p class="text-xs text-gray-500 mb-2">Demo Girişi (Tıklayın):</p>
      <div class="flex flex-wrap gap-2">
        <button type="button" @click="fillDemo('student')" class="text-[10px] bg-gray-100 px-2 py-1 rounded">Öğrenci</button>
        <button type="button" @click="fillDemo('teacher')" class="text-[10px] bg-gray-100 px-2 py-1 rounded">Öğretmen</button>
        <button type="button" @click="fillDemo('admin')" class="text-[10px] bg-gray-100 px-2 py-1 rounded">Genel Merkez</button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../store/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

const handleSubmit = async () => {
  loading.value = true
  // Mock login logic
  setTimeout(() => {
    let role = 'STUDENT'
    if (email.value.includes('teacher')) role = 'TEACHER'
    if (email.value.includes('admin')) role = 'ADMIN'

    const user = {
      id: '1',
      firstName: email.value.split('@')[0],
      role: role
    }
    authStore.setUser(user, 'mock-jwt-token')

    if (role === 'TEACHER') router.push('/teacher/dashboard')
    else if (role === 'ADMIN') router.push('/admin/dashboard')
    else router.push('/student/dashboard')

    loading.value = false
  }, 800)
}

const fillDemo = (role) => {
  email.value = `${role}@losev.org.tr`
  password.value = '123456'
}
</script>
