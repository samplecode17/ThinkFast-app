<template>
    <div class="w-full flex flex-col mx-auto justify-center p-4">
        <div class="w-full pb-4">
            <Following :creator-id="userId" />
        </div>

        <div class="flex items-ce py-4 md:py-8 overflow-x-auto whitespace-nowrap">
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


        <div class="mx-auto justify-center grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            <GameCard v-for="game in filteredGames" :key="game.id" :game-name="game.name" :creator-i-d="game.user_id"
                :up-votes="game.upVotes" :button-href="`/creator/game/${game.id}`" :image-link="game.image"
                button-name="Edit" class="break-inside-avoid mb-4" />
        </div>

    </div>
</template>
<script setup>
import Following from '@/components/following/Following.vue';
import { ref,computed, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import GameCard from '@/components/cards/GameCard.vue';

const route = useRoute()
const store = useStore()


const userId = route.params.user_id

onBeforeMount(async () => {
    await store.dispatch('activateNavBar')
    await store.dispatch('getMyGames', userId)
    await store.dispatch('getUserCategories', userId)
})

const games = computed(() => store.getters.stateMyGames)
const categories = computed(() => store.getters.stateUserCategories)

const selectedCategory = ref(null)

const filteredGames = computed(() => {
    if (!selectedCategory.value) return games.value
    return games.value.filter(
        (game) => game.category_id === selectedCategory.value
    )
})


const activeCategoryClass = 'text-white bg-thinkfast border border-gray-200 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-gray-400 dark:border-gray-200 dark:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-gray-600';

const inactiveCategoryClass = 'text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 dark:text-white dark:focus:ring-gray-800';


</script>