<template>
    <div
        class="w-full bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
            <div class="aspect-[19/9] w-full overflow-hidden rounded-t-lg p-4">
                <img class="w-full h-full object-cover" :src="imageLink || defaultImage" alt="product image" />
            </div>
        </a>
        <div class="px-5 pb-2">
            <a href="#">
                <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {{ gameName }}
                </h5>
            </a>
            <div class="flex items-center mt-2.5 mb-2">
                <span
                    class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                    {{ upVotes }} upvotes
                </span>
            </div>
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <img class="size-8 rounded-full" :src="creator?.profile_image || 'https://via.placeholder.com/256'"
                        alt="User avatar" />
                    <span class="text-base font-semibold text-gray-900 dark:text-white">
                        {{ creator?.username || 'Anonymous' }}
                    </span>
                </div>
                <a :href="buttonHref"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    {{ buttonName }}
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onBeforeMount(async () => {
    await store.dispatch('getUser', props.creatorID)
})

const props = defineProps({
    gameName: {
        type: String,
        default: 'Game name',
    },
    upVotes: {
        type: Number,
        default: '0',
    },
    creatorID: {
        type: String,
        required: true,
    },
    imageLink: {
        type: String,
        default:
            'https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2022/11/pikachu-pokemon-escarlata-purpura-2888180.jpg?tf=1200x900',
    },
    buttonName: {
        type: String,
        default: 'Edit',
    },
    buttonHref: {
        type: String,
        default: '#',
    },
})

const defaultImage =
    'https://i.ibb.co/23Z7gxst/Gemini-Generated-Image-emgg57emgg57emgg.png'


const creator = computed(() => store.getters.getUserById(props.creatorID))

console.log(creator)
</script>