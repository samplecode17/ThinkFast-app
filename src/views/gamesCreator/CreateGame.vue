<template>
    <div class="max-w-xl mx-auto p-6 bg-white shadow rounded">
      <h2 class="text-2xl font-bold mb-4">Crear Nuevo Juego</h2>
      
      <form @submit.prevent="submitGame">
        <div class="mb-4">
          <label for="name" class="block font-semibold mb-1">Nombre del Juego</label>
          <input v-model="form.name" id="name" type="text" required class="w-full  px-3 py-2 rounded" />
        </div>
  
        <div class="mb-4">
          <label for="description" class="block font-semibold mb-1">Descripción</label>
          <textarea v-model="form.description" id="description" required class="w-full  px-3 py-2 rounded"></textarea>
        </div>
  
        <div class="mb-4">
          <label for="difficulty" class="block font-semibold mb-1">Dificultad (ID)</label>
          <input v-model.number="form.difficulty_id" id="difficulty" type="number" min="0" class="w-full  px-3 py-2 rounded" />
        </div>
  
        <div class="mb-4">
          <label for="category" class="block font-semibold mb-1">Categoría (ID)</label>
          <input v-model.number="form.category_id" id="category" type="number" min="0" class="w-full  px-3 py-2 rounded" />
        </div>
  
        <ImageUploader />
  
        <div v-if="imageUrl" class="my-4">
          <p class="text-sm font-medium">URL Imagen:</p>
          <input v-model="form.image" readonly class="w-full  px-3 py-2 rounded bg-gray-100" />
        </div>
  
        <button type="submit" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Crear Juego
        </button>
      </form>
    </div>
</template>
<script setup>
  import { reactive, computed, watch } from 'vue'
  import { useStore } from 'vuex'
  import ImageUploader from '@/components/ImageUploader.vue'
  
  const store = useStore()

  const imageUrl = computed(() => store.getters['imagepost/uploadedImageUrl'])
  
  const form = reactive({
    name: '',
    description: '',
    difficulty_id: 0,
    category_id: 0,
    user_id:'',
    image: ''
  })
  
  watch(form.image, (url) => {
    if (url) form.image = url
  })
  
  const submitGame = async () => {
    if (!user.value) {
      alert("Debes estar autenticado para crear un juego.")
      return
    }
    form.user_id = user.value.id
    try {
      await store.dispatch('games/createGame', { ...form })
      alert("Juego creado exitosamente.")
      // opcional: redirigir o limpiar form
    } catch (error) {
      console.error(error)
      alert("Hubo un error al crear el juego.")
    }
  }
</script>

  