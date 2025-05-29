<template>
  <div class="max-w-screen-xl mx-auto p-4 sm:p-6 bg-white shadow rounded">
    <h2 class="text-2xl font-bold mb-4">New game</h2>

    <form @submit.prevent="submitGame">
      
      <div class="flex flex-col gap-4">
        <section class="flex flex-col md:flex-row gap-6 md:gap-10">
        <!-- Left side -->
          <div class="w-full md:w-1/2">
            <div class="mb-4">
              <label for="name" class="block font-semibold mb-1">Game name</label>
              <input v-model="form.name" id="name" type="text" required class="w-full px-3 py-2 border rounded" />
            </div>

            <div class="mb-4">
              <label for="description" class="block font-semibold mb-1">Description</label>
              <textarea v-model="form.description" id="description" required class="w-full px-3 py-2 border rounded"></textarea>
            </div>

            <div class="mb-4">
              <label class="block font-semibold mb-1">Difficulty</label>
              <div class="flex items-start gap-4" >
                <div class="flex-1">
                  <DifficultySelector @select="handleDifficultySelect"/>
                </div>
                <div class="shrink-0 pt-2 ">
                  <DifficultyCreatorButton />
                </div>
              </div>
            </div>

            <!-- Category Selector and Creator -->
            <div class="mb-4">
              <label class="block font-semibold mb-1">Category</label>
              <div class="flex items-start gap-4" >
                <div class="flex-1">
                  <CategorySelector @select="handleCategorySelect"/>
                </div>
                <div class="shrink-0 pt-2 ">
                  <CategoryCreatorButton />
                </div>
              </div>
            </div>
          </div>

          <!-- Right side -->
          <div class="w-full md:w-1/2 ">
            <div class="mb-4">
              <label for="image" class="block font-semibold mb-1">Game image</label>
              <ImageUploader />
            </div>
          </div>
        </section>
        <div class="mb-2 flex justify-end">
          <button type="submit" class="mt-4 bg-cyan-900 text-white px-6 py-3 rounded hover:bg-blue-700 w-full md:w-auto">
            Create Game
          </button>
        </div>
      </div>
      
    </form>
  </div>
</template>

<script setup>
import { reactive, computed, watch, onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import ImageUploader from '@/components/ImageUploader.vue'
import CategoryCreatorButton from '@/components/category/CategoryCreatorButton.vue'
import CategorySelector from '@/components/category/CategorySelector.vue'
import DifficultyCreatorButton from '@/components/difficulty/DifficultyCreatorButton.vue'
import DifficultySelector from '@/components/difficulty/DifficultySelector.vue'

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

// Update image when uploaded
watch(imageUrl, (url) => {
  if (url) {
    form.image = url
  }
})

// Handle category selection
function handleCategorySelect(category) {
  form.category_id = category.id
}

function handleDifficultySelect(difficulty) {
  form.difficulty_id = difficulty.id
}

// Submit game
const submitGame = async () => {
  if (!authenticated) {
    alert("You must be authenticated to create a game.")
    return
  }

  try {
    form.user_id = store.getters.getUserId
    await store.dispatch('createGame', { ...form })
    alert("Game created successfully.")
  } catch (error) {
    console.error(error)
    alert("An error occurred while creating the game.")
  }
}
</script>
