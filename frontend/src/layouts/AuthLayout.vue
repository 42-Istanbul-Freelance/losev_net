<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-20 w-auto" src="https://www.losev.org.tr/frontend/images/logo.png" alt="LÖSEV Logo" />
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        İnci Takip Sistemi
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        LÖSEV İnci Gönüllülük Takip Platformu
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
      <div class="bg-white py-8 px-4 shadow-xl rounded-2xl sm:px-10 border border-gray-100">
        <div class="flex mb-8 bg-gray-100 p-1 rounded-xl">
          <button
            @click="$router.push('/login')"
            class="flex-1 py-2 text-sm font-medium rounded-lg transition-all"
            :class="[$route.path === '/login' ? 'bg-white shadow text-losev-red' : 'text-gray-500']"
          >
            Giriş Yap
          </button>
          <button
            @click="$router.push('/register')"
            class="flex-1 py-2 text-sm font-medium rounded-lg transition-all"
            :class="[$route.path === '/register' ? 'bg-white shadow text-losev-red' : 'text-gray-500']"
          >
            Kayıt Ol
          </button>
        </div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
</script>
