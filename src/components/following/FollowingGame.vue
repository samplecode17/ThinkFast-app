<template>
    <div class="w-full p-4">
        <span class="font-bold text-xl" style="font-family: 'Roboto', sans-serif;">
            {{ game.name }}
        </span>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full p-4 gap-3">
        <div class="flex items-center gap-5">
            <img class="w-10 h-10 rounded-full" :src="creator?.profile_image || 'https://via.placeholder.com/256'"
                alt="User avatar" />
            <div class="flex flex-col pl-1">
                <span class="font-bold leading-tight">{{ creator.username }}</span>
                <span class="text-sm text-gray-500 leading-tight">
                    {{ formattedFollowers }} followers
                </span>
            </div>
            <button type="button" @click="toggleFollow"
                class="px-5 py-2.5 text-base font-medium inline-flex items-center rounded-lg transition-all duration-300 w-full sm:w-auto justify-center"
                :class="[
                    creator.followed_by_me
                        ? 'bg-gray-500 text-white hover:bg-blue-500'
                        : 'bg-thinkfast hover:bg-red-500 text-white',
                    'focus:ring-blue-300 dark:focus:ring-blue-800'
                ]">
                <svg class="w-4 h-4 me-2 transition-colors duration-300"
                    :class="creator.followed_by_me ? 'fill-red-600' : 'fill-white'" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none">
                    <path
                        d="M1.24264 8.24264L8 15L14.7574 8.24264C15.553 7.44699 16 6.36786 16 5.24264V5.05234C16 2.8143 14.1857 1 11.9477 1C10.7166 1 9.55233 1.55959 8.78331 2.52086L8 3.5L7.21669 2.52086C6.44767 1.55959 5.28338 1 4.05234 1C1.8143 1 0 2.8143 0 5.05234V5.24264C0 6.36786 0.44699 7.44699 1.24264 8.24264Z" />
                </svg>
                <span>{{ creator.followed_by_me ? "Followed" : "Follow" }}</span>
            </button>
        </div>

        <div class="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 sm:ml-auto w-full sm:w-auto pl-3">
            <button @click="toggleUpvote"
                class="flex items-center gap-1 text-sm font-medium transition-all duration-200"
                :class="game.upVoted_by_me ? 'text-orange-500' : 'text-gray-500 hover:text-orange-400'">
                <svg class="w-8 h-8 transition-all duration-300"
                    :class="game.upVoted_by_me ? 'fill-orange-500' : 'fill-current'" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M18 2H6C4.34 2 3 3.33 3 4.97V15.88C3 17.52 4.34 18.85 6 18.85H6.76C7.56 18.85 8.32 19.16 8.88 19.72L10.59 21.41C11.37 22.18 12.64 22.18 13.42 21.41L15.13 19.72C15.69 19.16 16.46 18.85 17.25 18.85H18C19.66 18.85 21 17.52 21 15.88V4.97C21 3.33 19.66 2 18 2ZM16.68 10.5L15.51 14.06C15.36 14.65 14.73 15.13 14.09 15.13H12.24C11.92 15.13 11.47 15.02 11.27 14.82L9.8 13.67C9.77 14.31 9.48 14.58 8.77 14.58H8.29C7.55 14.58 7.25 14.29 7.25 13.59V8.82C7.25 8.12 7.55 7.83 8.29 7.83H8.78C9.52 7.83 9.82 8.12 9.82 8.82V9.18L11.76 6.3C11.96 5.99 12.47 5.77 12.9 5.94C13.37 6.1 13.67 6.62 13.57 7.08L13.33 8.64C13.3 8.77 13.33 8.91 13.42 9C13.5 9.09 13.62 9.15 13.75 9.15H15.7C16.08 9.15 16.4 9.3 16.59 9.57C16.77 9.83 16.8 10.16 16.68 10.5Z" />
                </svg>
                <span>{{ formattedUpvotes }}</span>
            </button>
        </div>

    </div>
</template>

<script setup>
import { onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
    creatorId: String
})

const store = useStore()

onBeforeMount(async () => {
    await store.dispatch('getUser', props.creatorId)
})

const creator = computed(() => store.getters.getUserById(props.creatorId))
const game = computed(() => store.getters.stateGame)

const formattedFollowers = computed(() => {
    const count = creator.value?.followers_count || 0
    if (count >= 1_000_000) return (count / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
    if (count >= 1_000) return (count / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
    return count.toString()
})

const formattedUpvotes = computed(() => {
    const count = game.value?.upVotes || 0
    if (count >= 1_000_000) return (count / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
    if (count >= 1_000) return (count / 1_000).toFixed(1).replace(/\.0$/, '') + 'K'
    return count.toString()
})

const toggleFollow = () => {
    store.dispatch('toggleFollow', props.creatorId)
}

const toggleUpvote = () => {
    store.dispatch('toggleUpVote', game.value.id)
}
</script>