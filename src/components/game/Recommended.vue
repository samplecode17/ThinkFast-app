<template>
    <!-- Scrollable container -->
    <div class="w-full h-[500px] overflow-y-auto pr-2">
        <!-- Games list -->
        <div v-if="filteredGames && filteredGames.length > 0" class="grid md:grid-cols-1 grid-rows-1 gap-4">
            <RecomendGameCard v-for="game in filteredGames" :key="game?.id" :game-name="game?.name"
                :creator-i-d="game?.user_id" :up-votes="game?.upVotes" :button-href="`/games/play/${game.id}`"
                :image-link="game?.image" button-name="Play" class="break-inside-avoid mb-4" />
        </div>


        <!-- Fallback if no other games -->
        <div v-else>
            <a href="`/games/list/All"
                class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    We don't have any more games in this category.
                </h5>
            </a>
        </div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount } from 'vue';
import { useStore } from 'vuex';
import RecomendGameCard from '../cards/RecomendGameCard.vue';

const props = defineProps({
    category_id: String,
    gameId: String,
});

const store = useStore();

onBeforeMount(async () => {
    await store.dispatch('activateNavBar');
    await store.dispatch('getRecommendedGames', props.category_id);
    await store.dispatch('getUsedCategories');
});

const games = computed(() => store.getters.stateGames);

// Filter out current game
const filteredGames = computed(() =>
    games.value?.filter((game) => game?.id !== props.gameId)
);
</script>