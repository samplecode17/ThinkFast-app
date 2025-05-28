<template>
  <div class="max-w-xl mx-auto p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-4">Crear Nuevo Juego</h2>
    
    <form @submit.prevent="submitGame">
      <div class="mb-4">
        <label for="name" class="block font-semibold mb-1">Nombre del Juego</label>
        <input v-model="form.name" id="name" type="text" required class="w-full px-3 py-2 rounded" />
      </div>

      <div class="mb-4">
        <label for="description" class="block font-semibold mb-1">Descripción</label>
        <textarea v-model="form.description" id="description" required class="w-full px-3 py-2 rounded"></textarea>
      </div>

      <div class="mb-4">
        <label for="difficulty" class="block font-semibold mb-1">Dificultad (ID)</label>
        <input v-model.number="form.difficulty_id" id="difficulty" type="number" min="0" class="w-full px-3 py-2 rounded" />
      </div>

      <div class="mb-4">
        <label for="category" class="block font-semibold mb-1">Categoría (ID)</label>
        <input v-model.number="form.category_id" id="category" type="number" min="0" class="w-full px-3 py-2 rounded" />
      </div>

      <ImageUploader />

      <button type="submit" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Crear Juego
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, computed, watch, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import ImageUploader from '@/components/ImageUploader.vue'

const store = useStore()

onBeforeMount(async () => {
  await store.dispatch('activateNavBar')
})

const imageUrl = computed(() => store.getters['imagepost/uploadedImageUrl'])
const authenticated = store.getters.isAuthenticated

const form = reactive({
  name: '',
  description: '',
  difficulty_id: 0,
  category_id: 0,
  user_id: '',
  image: ''
})

watch(imageUrl, (url) => {
  if (url) {
    form.image = url
  }
})

const submitGame = async () => {
  if (!authenticated) {
    alert("Debes estar autenticado para crear un juego.")
    return
  }

  try {
    form.user_id = store.getters.getUserId
    console.log(form.user_id)
    console.log(form.image)
    await store.dispatch('createGame', { ...form })
    alert("Juego creado exitosamente.")
  } catch (error) {
    console.error(error)
    alert("Hubo un error al crear el juego.")
  }
}
</script>
