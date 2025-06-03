<template>
  <div>
    <div class="flex justify-end p-4">
      <button @click="handleCreate"
        class=" text-white bg-thinkfast hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Create
      </button>
    </div>

    <div class="flex items-center justify-center py-4 md:py-8 overflow-x-auto whitespace-nowrap">
      <button @click="selectedCategory = null" :class="[
        'rounded-full px-5 py-2.5 text-base font-medium me-3 mb-3 inline-block',
        selectedCategory === null ? activeCategoryClass : inactiveCategoryClass,
      ]">
        All categories
      </button>
      <button v-for="category in categories" :key="category.id" @click="selectedCategory = category.id" :class="[
        'rounded-full px-5 py-2.5 text-base font-medium me-3 mb-3 inline-block',
        selectedCategory === category.id ? activeCategoryClass : inactiveCategoryClass,
      ]">
        {{ category.name }}
      </button>
    </div>


    <div class="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <GameCard v-for="game in filteredGames" :key="game.id" :game-name="game.name" :creator-i-d="game.user_id"
        :up-votes="game.upVotes" :button-href="`/edit/${game.id}`" :image-link="game.image" button-name="Edit"
        class="break-inside-avoid mb-4" />
    </div>
  </div>
</template>
<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import GameCard from '@/components/cards/GameCard.vue';
import { useRouter } from 'vue-router';


const store = useStore()
const router = useRouter()

const selectedCategory = ref(null)

onBeforeMount(
  async () => {
    await store.dispatch('activateNavBar')
    const userId = store.getters.getUserId
    await store.dispatch('getMyGames', userId)
    await store.dispatch('getUserCategories', userId)
  })


const games = computed(() => store.getters.stateMyGames)
const categories = computed(() => store.getters.stateUserCategories)

const filteredGames = computed(() => {
  if (!selectedCategory.value) return games.value
  return games.value.filter(
    (game) => game.category_id === selectedCategory.value
  )
})

const handleCreate = async () => {
  await store.dispatch('logOut');
  router.push('creator/games/create')
};
const activeCategoryClass = 'text-white bg-thinkfast border border-gray-200 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-gray-400 dark:border-gray-200 dark:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-gray-600';

const inactiveCategoryClass = 'text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 dark:text-white dark:focus:ring-gray-800';
</script>