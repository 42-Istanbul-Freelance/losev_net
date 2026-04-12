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

    <!-- Quick Actions -->
    <div class="grid grid-cols-2 gap-4">
      <router-link to="/admin/activity-create" class="bg-losev-blue text-white p-4 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-lg shadow-losev-blue/20 active:scale-95 transition-transform">
        <PlusCircle class="w-8 h-8" />
        <span class="font-bold text-sm">Etkinlik Oluştur</span>
      </router-link>
      <router-link to="/admin/announcement-create" class="bg-white text-gray-700 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 border border-gray-200 active:scale-95 transition-transform">
        <Megaphone class="w-8 h-8 text-losev-blue" />
        <span class="font-bold text-sm">Duyuru Paylaş</span>
      </router-link>
    </div>

    <!-- Approvals Summary -->
    <div class="space-y-4">
      <h2 class="font-bold text-gray-900 flex items-center gap-2">
        <CheckCircle class="w-5 h-5 text-losev-blue" />
        Onay Bekleyen İşlemler
      </h2>

      <div class="grid gap-4">
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

        <!-- Participation Approvals CTA -->
        <router-link to="/admin/participation-approvals" class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group active:scale-[0.98] transition-all">
          <div class="flex items-center gap-4">
            <div class="bg-losev-blue/10 p-3 rounded-2xl text-losev-blue">
              <ClipboardCheck class="w-8 h-8" />
            </div>
            <div>
              <h2 class="text-gray-900 font-bold text-lg">Katılım Onayları</h2>
              <p class="text-gray-500 text-sm">Bekleyen {{ pendingParticipationsCount }} katılım bildirimi</p>
            </div>
          </div>
          <ArrowRight class="w-6 h-6 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from '../../services/api'
import {
  Globe,
  ArrowRight,
  UserPlus,
  PlusCircle,
  Megaphone,
  CheckCircle,
  ClipboardCheck
} from 'lucide-vue-next'

const pendingUsersCount = ref(0)
const pendingParticipationsCount = ref(0)
const loading = ref(false)

const fetchPendingCounts = async () => {
  try {
    const [users, participations] = await Promise.all([
      api.get('/users/pending'),
      api.get('/activities/pending-participants')
    ])
    pendingUsersCount.value = users.length
    pendingParticipationsCount.value = participations.length
  } catch (err) {
    console.error('Failed to fetch pending data:', err)
  }
}

onMounted(async () => {
  loading.value = true
  await fetchPendingCounts()
  loading.value = false
})

</script>
