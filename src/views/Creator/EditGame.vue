<template>
    <div class="max-w-screen-full  mx-auto p-10 sm:p-6s rounded">
        <h2 class="text-2xl font-bold mb-4">Edit {{ game?.name }}</h2>

        <form @submit.prevent="submitGame">

            <div class="flex flex-col gap-4">
                <section class="flex flex-col md:flex-row gap-6 md:gap-10">
                    <!-- Left side -->
                    <div class="w-full md:w-1/2">
                        <div class="mb-4">
                            <label for="name" class="block font-semibold mb-1">Game name</label>
                            <input :placeholder="game?.name" v-model="form.name" id="name" type="text"
                                class="w-full px-3 py-2 border rounded" />
                        </div>

                        <div class="mb-4">
                            <label for="description" class="block font-semibold mb-1">Description</label>
                            <textarea :placeholder="game?.description" v-model="form.description" id="description"
                                class="w-full px-3 py-2 border rounded"></textarea>
                        </div>

                        <div class="mb-4">
                            <label class="block font-semibold mb-1">Difficulty</label>
                            <div class="flex items-start gap-4">
                                <div class="flex-1">
                                    <DifficultySelector @select="handleDifficultySelect" />
                                </div>
                                <div v-if="isAdmin" class="shrink-0 pt-2 ">
                                    <DifficultyCreatorButton />
                                </div>
                            </div>
                        </div>

                        <!-- Category Selector and Creator -->
                        <div class="mb-4">
                            <label class="block font-semibold mb-1">Category</label>
                            <div class="flex items-start gap-4">
                                <div class="flex-1">
                                    <CategorySelector @select="handleCategorySelect" />
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
                    <button type="submit"
                        class="mt-4 bg-cyan-900 text-white px-6 py-3 rounded hover:bg-blue-700 w-full md:w-auto">
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
import { useRoute, useRouter } from 'vue-router'
import ImageUploader from '@/components/ImageUploader.vue'
import CategoryCreatorButton from '@/components/category/CategoryCreatorButton.vue'
import CategorySelector from '@/components/category/CategorySelector.vue'
import DifficultyCreatorButton from '@/components/difficulty/DifficultyCreatorButton.vue'
import DifficultySelector from '@/components/difficulty/DifficultySelector.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

const gameId = route.params.game_id

onBeforeMount(async () => {
    await store.dispatch('activateNavBar')
    await store.dispatch('getGame', gameId)
})

const isAdmin = computed(()=>store.getters.getIsAdmin)
const game = computed(()=>store.getters.stateGame)
const userId = computed(() => store.getters.getUserId)
const userRole = computed(() => store.getters.getUserRole)
const imageUrl = computed(() => store.getters['imagepost/uploadedImageUrl'])



const form = reactive({
    name: game.value?.name,
    description: game.value?.description,
    difficulty_id: game.value?.difficulty_id,
    category_id: game.value?.category_id,
    image: game.value?.image
})

console.log(form)

// Update image when uploaded
watch(imageUrl, (url) => {
    if (url) {
        form.image = url
    } else {
        form.image = game.value?.image
    }
})


watch(game, (val) => {
    if (val && val.user_id !== userId.value && userRole.value !== 'Admin') {
        router.back();
    }
});

// Handle category selection
function handleCategorySelect(category) {
    form.category_id = category ? category.id : game.value?.category_id
}


function handleDifficultySelect(difficulty) {
    form.difficulty_id = difficulty ? difficulty.id : game.value?.difficulty_id
}

// Submit game
const submitGame = async () => {

    try {
        const data = { ...form }
        console.log(data)
        await store.dispatch('updateGame', { gameId: gameId, form: data })
        router.push(`/creator/game/${gameId}`)
    } catch (error) {
        console.error(error)
    }
}
</script>