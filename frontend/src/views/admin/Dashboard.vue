<template>
  <div class="space-y-6 pb-8">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Genel Merkez Paneli</h1>
        <p class="text-gray-500">Türkiye Geneli Etki Analizi</p>
      </div>
      <div class="bg-losev-red p-3 rounded-2xl border border-losev-red/20">
        <Globe class="w-8 h-8 text-white" />
      </div>
    </div>

    <!-- Impact Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
        <div class="bg-blue-100 p-4 rounded-2xl text-blue-600">
          <Clock class="w-8 h-8" />
        </div>
        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Toplam Gönüllülük Saati</p>
          <p class="text-3xl font-black text-gray-900">1,248,500+</p>
          <div class="mt-1 flex items-center gap-1 text-[10px] text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded-full w-fit">
            <TrendingUp class="w-3 h-3" />
            +8.2% (Bu Ay)
          </div>
        </div>
      </div>

      <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
        <div class="bg-purple-100 p-4 rounded-2xl text-purple-600">
          <Users class="w-8 h-8" />
        </div>
        <div>
          <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Aktif İnci Öğrenciler</p>
          <p class="text-3xl font-black text-gray-900">42,850+</p>
          <div class="mt-1 flex items-center gap-1 text-[10px] text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded-full w-fit">
            <MapPin class="w-3 h-3" />
            81 İl
          </div>
        </div>
      </div>
    </div>

    <!-- Map Preview Placeholder -->
    <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
      <div class="flex items-center justify-between mb-6">
        <h3 class="font-bold text-gray-900 flex items-center gap-2">
          <Map class="w-5 h-5 text-losev-red" />
          Türkiye Etki Haritası
        </h3>
        <select class="text-xs font-bold border-none bg-gray-50 rounded-xl px-3 py-1.5 focus:ring-0">
          <option>Tüm Zamanlar</option>
          <option>Son 30 Gün</option>
        </select>
      </div>
      <div class="aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-100 flex items-center justify-center flex-col gap-3 group hover:border-losev-red transition-colors cursor-pointer">
        <Globe class="w-12 h-12 text-gray-300 group-hover:text-losev-red transition-colors" />
        <p class="text-gray-400 font-medium text-sm group-hover:text-losev-red transition-colors">Haritayı Etkinleştir</p>
      </div>
      <div class="mt-6 flex justify-between items-center text-center">
        <div v-for="city in topCities" :key="city.name" class="flex-1">
          <p class="text-xs font-bold text-gray-400 mb-1 uppercase tracking-widest">{{ city.name }}</p>
          <p class="text-lg font-black text-gray-900">{{ city.hours }}s</p>
          <div class="h-1 bg-gray-100 rounded-full mt-2 mx-4 overflow-hidden">
             <div class="bg-losev-red h-full rounded-full" :style="{ width: city.percent + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Rankings Preview -->
    <div class="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="p-6 border-b border-gray-50 flex items-center justify-between">
        <h3 class="font-bold text-gray-900">Lider Okullar</h3>
        <router-link to="/admin/rankings" class="text-losev-red text-xs font-bold flex items-center gap-1">
          Tümünü Gör
          <ArrowRight class="w-3 h-3" />
        </router-link>
      </div>
      <div class="divide-y divide-gray-50">
        <div v-for="(school, index) in topSchools" :key="index" class="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
          <div class="flex items-center gap-4">
            <span class="text-sm font-black text-gray-300 w-4">{{ index + 1 }}</span>
            <div>
              <p class="font-bold text-sm text-gray-900">{{ school.name }}</p>
              <p class="text-[10px] text-gray-400 font-medium">{{ school.city }} - {{ school.volunteers }} Gönüllü</p>
            </div>
          </div>
          <p class="font-black text-losev-red text-sm">{{ school.hours }}s</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Globe,
  Clock,
  Users,
  TrendingUp,
  MapPin,
  Map,
  ArrowRight
} from 'lucide-vue-next'

const topCities = [
  { name: 'Ankara', hours: '450k', percent: 90 },
  { name: 'İstanbul', hours: '380k', percent: 75 },
  { name: 'İzmir', hours: '210k', percent: 45 },
]

const topSchools = [
  { name: 'Ankara LÖSEV Koleji', city: 'Ankara', volunteers: 850, hours: 24500 },
  { name: 'İstanbul Fen Lisesi', city: 'İstanbul', volunteers: 420, hours: 18200 },
  { name: 'Bornova Anadolu Lisesi', city: 'İzmir', volunteers: 310, hours: 15400 },
]
</script>
