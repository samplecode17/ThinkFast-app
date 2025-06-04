<template>
<div>
  
    
    <div class="shadow p-1">
        <!-- Search form -->
    <form @submit.prevent class="max-w-md mx-auto my-2  ">   
    <label for="search-games" class="sr-only">Search games</label>
    <div class="relative ">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
        </svg>
        </div>
        <input 
        type="search" 
        id="search-games" 
        v-model="searchTerm"
        class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-cyan-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="Search games..." 
        autocomplete="off"
        />
        <button 
        type="submit" 
        class="text-white absolute end-2.5 bottom-2.5 bg-thinkfast hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-thinkfast dark:focus:ring-gray-600"
        >Search</button>
    </div>
    </form>
    </div>

    <!-- Categories buttons -->
    <div class="flex items-center justify-start py-4 md:py-8 md:justify-center overflow-x-auto">
    <button
        @click="selectedCategory = null"
        :class="[
            'rounded-full px-5 py-2.5 text-base font-medium me-3 mb-3 inline-block',
            selectedCategory === null ? activeCategoryClass : inactiveCategoryClass,
        ]"
    >
        All categories
    </button>
    <button
        v-for="category in categories"
        :key="category.id"
        @click="selectedCategory = category.id"
        :class="[
            'rounded-full px-5 py-2.5 text-base font-medium me-3 mb-3 inline-block',
            selectedCategory === category.id ? activeCategoryClass : inactiveCategoryClass,
        ]"
    >
        {{ category.name }}
    </button>
    </div>

    <!-- Games list -->
    <div class="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
    <GameCard
        v-for="game in filteredGames"
        :key="game.id"
        :game-name="game.name"
        :creator-i-d="game.user_id"
        :up-votes="game.upVotes"
        :button-href="`/edit/${game.id}`"
        :image-link="game.image"
        button-name="Play"
        class="break-inside-avoid mb-4"
    /> 
    </div>
</div>
</template>
  
<script setup>
import { ref, computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import GameCard from '@/components/cards/GameCard.vue';

const store = useStore();

const selectedCategory = ref(null);
const searchTerm = ref(''); 

onBeforeMount(async () => {
  await store.dispatch('activateNavBar')
  await store.dispatch('getAllGames');
  await store.dispatch('getUsedCategories');
});

const games = computed(() => store.getters.stateGames);
const categories = computed(() => store.getters.stateUsedCategories);

const filteredGames = computed(() => {
  let filtered = games.value;

  if (selectedCategory.value) {
    filtered = filtered.filter(game => game.category_id === selectedCategory.value);
  }


  if (searchTerm.value.trim() !== '') {
    const search = searchTerm.value.toLowerCase();
    filtered = filtered.filter(game => game.name.toLowerCase().includes(search));
  }

  return filtered;
});

const activeCategoryClass = 'text-white bg-thinkfast border border-gray-200 hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-gray-400 dark:border-gray-200 dark:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-gray-600';

const inactiveCategoryClass = 'text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 dark:text-white dark:focus:ring-gray-800';

</script>