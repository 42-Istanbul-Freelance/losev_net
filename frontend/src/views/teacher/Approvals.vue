<template>
  <div class="space-y-6">
    <div class="flex items-center gap-4">
      <button @click="$router.back()" class="p-2 hover:bg-gray-100 rounded-full transition-colors">
        <ArrowLeft class="w-6 h-6 text-gray-600" />
      </button>
      <h1 class="text-2xl font-bold text-gray-900">Onay Bekleyenler</h1>
    </div>

    <div v-if="pendingActivities.length > 0" class="space-y-4">
      <div
        v-for="activity in pendingActivities"
        :key="activity.id"
        class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col gap-4 overflow-hidden relative"
      >
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-losev-red/10 text-losev-red flex items-center justify-center font-bold">
              {{ activity.studentName[0] }}
            </div>
            <div>
              <p class="font-bold text-sm text-gray-900">{{ activity.studentName }}</p>
              <p class="text-[10px] text-gray-400 font-medium">{{ activity.grade }} - {{ activity.school }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs font-bold text-gray-400">{{ activity.date }}</p>
            <div class="mt-1 flex items-center gap-1 text-losev-red bg-losev-red/5 px-2 py-0.5 rounded-lg w-fit ml-auto">
              <Clock class="w-3 h-3" />
              <span class="text-[10px] font-bold">{{ activity.hours }} Saat</span>
            </div>
          </div>
        </div>

        <div class="border-y border-gray-50 py-4">
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{{ activity.typeLabel }}</p>
          <p class="text-sm text-gray-600 leading-relaxed">{{ activity.description }}</p>
          <div v-if="activity.hasImage" class="mt-3 bg-gray-50 rounded-2xl p-4 flex items-center gap-3 border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
            <div class="bg-white p-2 rounded-xl text-blue-500 shadow-sm">
              <ImageIcon class="w-5 h-5" />
            </div>
            <p class="text-xs font-bold text-blue-600">Ekli Dosyayı Görüntüle (1)</p>
          </div>
        </div>

        <div class="flex gap-3">
          <button
            @click="handleApprove(activity.id)"
            class="flex-1 py-3 bg-green-500 text-white font-bold rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 active:scale-95 transition-all"
          >
            <Check class="w-5 h-5" />
            Onayla
          </button>
          <button
            @click="handleReject(activity.id)"
            class="flex-1 py-3 bg-white border border-red-200 text-red-500 font-bold rounded-2xl flex items-center justify-center gap-2 active:bg-red-50 transition-all"
          >
            <X class="w-5 h-5" />
            Düzenleme İste
          </button>
        </div>
      </div>
    </div>

    <div v-else class="bg-white border-2 border-dashed border-gray-200 rounded-3xl py-12 px-6 text-center shadow-sm">
      <div class="bg-green-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-100">
        <CheckCircle class="w-8 h-8 text-green-500" />
      </div>
      <h3 class="font-bold text-gray-900 mb-1">Harika! Bekleyen İşin Kalmadı.</h3>
      <p class="text-gray-500 text-sm">Tüm öğrenci faaliyetleri değerlendirildi.</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  ArrowLeft,
  Clock,
  Image as ImageIcon,
  Check,
  X,
  CheckCircle
} from 'lucide-vue-next'

const pendingActivities = ref([
  {
    id: 1,
    studentName: 'Ahmet Yılmaz',
    grade: '10-B',
    school: 'LÖSEV Koleji',
    date: '24.02.2024',
    type: 'SEMINER',
    typeLabel: 'LÖSEV Farkındalık Semineri',
    hours: 2,
    description: 'Seminer sırasında katılımcılara bilgilendirme broşürleri dağıttım ve soruları yanıtladım.',
    hasImage: true
  },
  {
    id: 2,
    studentName: 'Elif Şahin',
    grade: '9-A',
    school: 'Ankara Ortaokulu',
    date: '22.02.2024',
    type: 'STANT',
    typeLabel: 'LÖSEV Kermes Standı',
    hours: 5,
    description: 'Okulumuzda kurulan kermes standında gönüllü olarak görev aldım.',
    hasImage: false
  }
])

const handleApprove = (id) => {
  pendingActivities.value = pendingActivities.value.filter(a => a.id !== id)
  alert('Faaliyet onaylandı!')
}

const handleReject = (id) => {
  const note = prompt('Düzenleme isteği için not ekleyin:')
  if (note !== null) {
    pendingActivities.value = pendingActivities.value.filter(a => a.id !== id)
    alert('Düzenleme isteği gönderildi.')
  }
}
</script>
