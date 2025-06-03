<template>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full p-4 gap-3">
        <div class="flex items-center gap-3">
            <img class="w-10 h-10 rounded-full" :src="creator?.profile_image || 'https://via.placeholder.com/256'"
                alt="User avatar" />
            <div class="flex flex-col">
                <span class="font-bold leading-tight">{{ creator.username }}</span>
                <span class="text-sm text-gray-500 leading-tight">
                    {{ formattedFollowers }} followers
                </span>
            </div>
        </div>

        <button type="button" @click="toggleFollow"
            class="px-5 py-2.5 text-base font-medium inline-flex items-center rounded-lg transition-all duration-300 w-full sm:w-auto justify-center sm:ml-auto"
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


</template>
<script setup>
import { onBeforeMount, computed } from 'vue'
import { useStore } from 'vuex'


const props = defineProps({
    creatorId: String,
})


onBeforeMount(
    async () => {
        await store.dispatch('getUser', props.creatorId)
    })

const store = useStore()
const creator = computed(() => store.getters.getUserById(props.creatorId))


const formattedFollowers = computed(() => {
    const count = creator.value?.followers_count || 0;
    if (count >= 1_000_000) return (count / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (count >= 1_000) return (count / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return count.toString();
});


const toggleFollow = () => {
    store.dispatch('toggleFollow', props.creatorId)
}



</script>