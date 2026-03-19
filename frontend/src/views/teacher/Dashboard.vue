<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Öğretmen Paneli 👋</h1>
        <p class="text-gray-500">Okulunuzdaki gönüllülük faaliyetlerini buradan yönetebilirsiniz.</p>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="grid grid-cols-2 gap-4">
      <router-link to="/teacher/activity-create" class="bg-losev-blue text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg shadow-losev-blue/20 active:scale-95 transition-transform">
        <PlusCircle class="w-8 h-8" />
        <span class="font-bold text-sm">Etkinlik Oluştur</span>
      </router-link>
      <router-link to="/teacher/announcement-create" class="bg-white text-gray-700 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border border-gray-200 active:scale-95 transition-transform">
        <Megaphone class="w-8 h-8 text-losev-blue" />
        <span class="font-bold text-sm">Duyuru Paylaş</span>
      </router-link>
    </div>

    <!-- Approvals Alert -->
    <router-link to="/teacher/approvals" v-if="pendingCount > 0" class="block bg-orange-50 border border-orange-200 p-4 rounded-2xl">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="bg-orange-100 p-2 rounded-lg text-orange-600">
            <Bell class="w-5 h-5" />
          </div>
          <div>
            <p class="font-bold text-orange-900">Onay Bekleyen İşlemler</p>
            <p class="text-sm text-orange-700">{{ pendingCount }} yeni katılım veya kayıt onayı bekliyor.</p>
          </div>
        </div>
        <ChevronRight class="w-5 h-5 text-orange-400" />
      </div>
    </router-link>

    <!-- Announcements -->
    <div>
      <h2 class="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <Megaphone class="w-5 h-5 text-losev-blue" />
        Son Duyurular
      </h2>
      <div class="space-y-4">
        <div v-for="ann in announcements" :key="ann.id" class="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
          <div class="flex justify-between items-start mb-2">
            <h3 class="font-bold text-gray-900">{{ ann.title }}</h3>
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{{ new Date(ann.createdAt).toLocaleDateString('tr-TR') }}</span>
          </div>
          <p class="text-sm text-gray-600 line-clamp-2">{{ ann.content }}</p>
        </div>
        <p v-if="announcements.length === 0" class="text-center text-sm text-gray-400 py-8">Henüz duyuru bulunmuyor.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../services/api'
import {
  PlusCircle,
  Megaphone,
  Bell,
  ChevronRight
} from 'lucide-vue-next'

const announcements = ref([])
const pendingCount = ref(0)

onMounted(async () => {
  try {
    const [annData, pendingUsers, pendingParts] = await Promise.all([
      api.get('/announcements'),
      api.get('/users/pending'),
      api.get('/activities/pending-participants')
    ])
    announcements.value = annData
    pendingCount.value = pendingUsers.length + pendingParts.length
  } catch (err) {
    console.error('Data fetch error:', err)
  }
})
</script>
