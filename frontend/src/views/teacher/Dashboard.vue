<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Öğretmen Paneli</h1>
        <p class="text-gray-500">Ankara LÖSEV Koleji İstatistikleri</p>
      </div>
      <div class="bg-blue-100 p-3 rounded-2xl border border-blue-200">
        <Users class="w-8 h-8 text-blue-600" />
      </div>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Toplam Gönüllü</p>
        <p class="text-2xl font-black text-gray-900">156</p>
        <div class="mt-2 flex items-center gap-1 text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full w-fit">
          <TrendingUp class="w-3 h-3" />
          +12%
        </div>
      </div>
      <div class="bg-white p-5 rounded-3xl shadow-sm border border-gray-100">
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Toplam Saat</p>
        <p class="text-2xl font-black text-gray-900">2,480</p>
        <div class="mt-2 flex items-center gap-1 text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full w-fit">
          <Clock class="w-3 h-3" />
          Okul Geneli
        </div>
      </div>
    </div>

    <!-- Approval Call to Action -->
    <router-link to="/teacher/approvals" class="bg-losev-red p-6 rounded-3xl shadow-lg shadow-losev-red/20 flex items-center justify-between group active:scale-[0.98] transition-all">
      <div class="flex items-center gap-4">
        <div class="bg-white/20 p-3 rounded-2xl text-white">
          <CheckCircle class="w-8 h-8" />
        </div>
        <div>
          <h2 class="text-white font-bold text-lg">Onay Bekleyenler</h2>
          <p class="text-white/80 text-sm">Bekleyen 8 faaliyet var</p>
        </div>
      </div>
      <ArrowRight class="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" />
    </router-link>

    <!-- Student List Preview -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-50 flex items-center justify-between">
        <h3 class="font-bold text-gray-900">En Aktif İnci Öğrenciler</h3>
        <router-link to="#" class="text-losev-red text-xs font-bold">Tümünü Gör</router-link>
      </div>
      <div class="divide-y divide-gray-50">
        <div v-for="(student, index) in activeStudents" :key="index" class="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 border border-white shadow-sm">
              {{ student.name[0] }}
            </div>
            <div>
              <p class="font-bold text-sm text-gray-900">{{ student.name }}</p>
              <p class="text-[10px] text-gray-400 font-medium">{{ student.grade }} - {{ student.school }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="font-black text-losev-red text-sm">{{ student.hours }}s</p>
            <p class="text-[10px] text-gray-400 font-bold uppercase">{{ student.badge }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Users,
  Clock,
  TrendingUp,
  CheckCircle,
  ArrowRight
} from 'lucide-vue-next'

const activeStudents = [
  { name: 'Mehmet Aksoy', grade: '10-B', school: 'LÖSEV Koleji', hours: 124, badge: 'Altın İnci' },
  { name: 'Zeynep Kaya', grade: '9-A', school: 'LÖSEV Koleji', hours: 82, badge: 'Gümüş İnci' },
  { name: 'Ali Yılmaz', grade: '11-C', school: 'LÖSEV Koleji', hours: 56, badge: 'Gümüş İnci' },
  { name: 'Selin Demir', grade: '10-A', school: 'LÖSEV Koleji', hours: 42, badge: 'Bronz İnci' },
]
</script>
