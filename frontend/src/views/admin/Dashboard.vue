<template>
  <div class="space-y-6 pb-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Genel Merkez Paneli</h1>
        <p class="text-gray-500">LÖSEV Gönüllü Takip Sistemi</p>
      </div>
      <div class="bg-losev-blue p-3 rounded-2xl border border-losev-blue/20">
        <Globe class="w-8 h-8 text-white" />
      </div>
    </div>

    <!-- User Approvals CTA -->
    <router-link to="/admin/user-approvals" class="bg-losev-yellow p-6 rounded-3xl shadow-lg shadow-losev-yellow/20 flex items-center justify-between group active:scale-[0.98] transition-all">
      <div class="flex items-center gap-4">
        <div class="bg-white/20 p-3 rounded-2xl text-white">
          <UserPlus class="w-8 h-8" />
        </div>
        <div>
          <h2 class="text-white font-bold text-lg">Kullanıcı Onayları</h2>
          <p class="text-white/80 text-sm">Bekleyen {{ pendingUsersCount }} başvuru var</p>
        </div>
      </div>
      <ArrowRight class="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
    </router-link>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../services/api'
import {
  Globe,
  ArrowRight,
  UserPlus
} from 'lucide-vue-next'

const pendingUsersCount = ref(0)
const loading = ref(false)

const fetchPendingUsers = async () => {
  try {
    const pendingUsers = await api.get('/users/pending')
    pendingUsersCount.value = pendingUsers.length
  } catch (err) {
    console.error('Failed to fetch pending users:', err)
  }
}

onMounted(async () => {
  loading.value = true
  await Promise.all([fetchPendingUsers()])
  loading.value = false
})

</script>
