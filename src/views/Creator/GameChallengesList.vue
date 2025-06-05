<template>
    <div class="md:w-3/4 w-full mx-auto justify-center md:items-center">
        <div class="w-full p-4">
            <h1 v-if="game?.name" class="text-3xl font-bold text-gray-600">
                {{ game.name }}
            </h1>
        </div>
        <div class="w-full p-4"></div>
        <div class="w-full p-4 rounded flex flex-col shadow md:relative">
            <button
                class="absolute top-4 right-4 flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <div class="w-full flex-1/3">
                <div class="w-full flex flex-col md:flex-row p-4">
                    <img v-if="game?.image && game.image !== ''" class="md:w-2/4 w-full aspect-[14/9]"
                        :src="game.image" />
                    <img v-else class="md:w-2/5 w-full aspect-[14/9]"
                        src="https://musee-possen.lu/wp-content/uploads/2020/08/placeholder.png" />
                    <div class="md:w-3/5 w-full flex-col p-4 ">
                        <h2 class="text-2xl font-bold text-gray-600 mb-2">Description</h2>
                        <div class="p-2">
                            <h3 class="text-sm font-medium text-gray-700">
                                {{ game?.description }}
                            </h3>
                        </div>
                    </div>
                </div>


            </div>
            <div class="w-full flex-2/3 p-4">
                <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-2">

                    <div class="flex flex-row bg-white shadow-sm rounded p-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-lime-100 text-lime-500">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 16 16"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="3"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M2 1a1 1 0 0 0-1 1v4.586a1 1 0 0 0 .293.707l7 7a1 1 0 0 0 1.414 0l4.586-4.586a1 1 0 0 0 0-1.414l-7-7A1 1 0 0 0 6.586 1H2zm4 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z">
                                    </path>
                                </g>
                            </svg>
                        </div>
                        <div class="flex flex-col flex-grow ml-4">
                            <div class="text-sm text-gray-500">Category</div>
                            <div class="font-bold text-lg">{{ game?.category_name }}</div>
                        </div>
                    </div>
                    <div class="flex flex-row bg-white shadow-sm rounded p-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                            <svg class="w-6 h-6" fill="currentColor" stroke="currentColor" viewBox="-63 65 128 128"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="30"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M38.7,87.6c-3.6,5.1-10.6,6.3-15.7,2.8s-6.3-10.6-2.8-15.7c3.6-5.1,10.6-6.3,15.7-2.8S42.3,82.5,38.7,87.6z M64.1,100.1 l-13.2,19c-1.5,2.3-4.6,2.8-6.9,1.3l-19-13.2L4.7,137.3L22,149.4c1.5,1,2.7,2.7,3,4.5l4.9,27.7c0.6,3.8-2,7.5-5.8,8.2 c-3.8,0.6-7.5-2-8.2-5.8l-4.4-24.9l-21.8-15.5c0,0-11.5,16.6-12.3,17.6s-1.5,2.4-2.8,3.1c-1.7,1-3.7,1.1-5.4,0.7l-27.2-7.3 c-3.7-1-5.9-4.8-4.9-8.6c1-3.7,4.8-5.9,8.6-4.9l22.3,5.9L3.6,98.4h-13.7l-11.7,16.8c-1.5,2.3-4.6,2.8-6.9,1.3 c-2.3-1.5-2.8-4.6-1.3-6.9l13.2-18.9c1-1.5,2.7-2.3,4.4-2.1h22.8c3.4,0,6.8,1,9.7,3.1l7.3,5.2l18,12.7L56,94.6 c1.5-2.3,4.6-2.8,6.9-1.3S65.7,98,64.1,100.1z">
                                    </path>
                                </g>
                            </svg>

                        </div>
                        <div class="flex flex-col flex-grow ml-4">
                            <div class="text-sm text-gray-500">Difficulty</div>
                            <div class="font-bold text-lg">{{ game?.difficulty_name }}</div>
                        </div>
                    </div>
                    <div class="flex flex-row bg-white shadow-sm rounded p-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-purple-100 text-purple-500">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="10.24"
                                viewBox="0 0 1024.00 1024.00" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="2"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M254.4 289.6c-10.4-20.8-15.2-43.2-15.2-67.2 0-85.6 69.6-155.2 155.2-155.2s155.2 69.6 155.2 155.2v4h-44v-4c0-61.6-49.6-111.2-111.2-111.2s-111.2 49.6-111.2 111.2c0 16.8 4 32.8 11.2 48l1.6 3.2-39.2 19.2-2.4-3.2z"
                                        fill="currentColor"></path>
                                    <path
                                        d="M674.4 913.6c-23.2 0-44.8-14.4-53.6-36.8-1.6-3.2-8.8-20.8-15.2-39.2 0-0.8 0-0.8-0.8-1.6-4 0-9.6 0.8-16.8 1.6-16 1.6-40.8 4-77.6 4-40.8 0-65.6-5.6-82.4-8.8-4-0.8-7.2-1.6-9.6-1.6 0 0.8-0.8 1.6-1.6 3.2-7.2 19.2-16 41.6-16 42.4-8 21.6-29.6 36.8-53.6 36.8-7.2 0-13.6-1.6-20-4l-65.6-24.8c-14.4-5.6-25.6-16-32-30.4-6.4-13.6-6.4-29.6-1.6-44 0-0.8 12-28.8 18.4-48 1.6-4.8 1.6-4.8-4-8l-1.6-0.8C200 721.6 132 652.8 128 557.6c-1.6-35.2 1.6-68 8-99.2-9.6-3.2-21.6-8.8-34.4-17.6-32-21.6-48.8-52.8-48.8-88.8 0-38.4 20.8-72.8 53.6-86.4 2.4-0.8 5.6-1.6 8.8-1.6 8.8 0 16.8 4.8 20 13.6 4.8 11.2 0 24-11.2 28.8-16.8 7.2-27.2 24.8-27.2 46.4 0 21.6 9.6 39.2 28.8 52 8 5.6 16.8 9.6 23.2 12 1.6-3.2 2.4-6.4 4-9.6 17.6-42.4 44-76.8 79.2-104 79.2-61.6 170.4-91.2 278.4-91.2 37.6 0 74.4 4 110.4 11.2 31.2-58.4 80.8-95.2 150.4-112.8 1.6-0.8 3.2-0.8 5.6-0.8 6.4 0 12 2.4 16 7.2 5.6 6.4 7.2 14.4 4 22.4-20.8 56-30.4 88-32 127.2 40 16.8 72 41.6 96.8 74.4 26.4 36 37.6 72 41.6 97.6 0.8 0 3.2 0.8 5.6 0.8h33.6c30.4 0 55.2 24.8 55.2 55.2v100c0 30.4-24.8 55.2-55.2 55.2h-33.6c-7.2 0-8.8 1.6-13.6 11.2-24.8 52-64 92.8-112 119.2-1.6 0.8-2.4 1.6-3.2 2.4 0 0.8 0.8 1.6 0.8 1.6l10.4 28c5.6 14.4 4.8 29.6-1.6 43.2-6.4 13.6-17.6 24.8-32 30.4l-65.6 24.8c-3.2 2.4-10.4 3.2-17.6 3.2z m-67.2-120.8c27.2 0 36 16.8 40.8 31.2 6.4 18.4 13.6 36 13.6 36.8v0.8c1.6 4.8 7.2 8.8 12.8 8.8 1.6 0 3.2 0 4.8-0.8l65.6-24.8c3.2-1.6 5.6-4 7.2-7.2 1.6-3.2 1.6-7.2 0-10.4l-10.4-27.2c-2.4-4-6.4-16-2.4-30.4 2.4-8 8.8-20 24.8-28.8 40.8-22.4 72.8-56 93.6-100 4.8-9.6 17.6-36 52.8-36h33.6c6.4 0 11.2-4.8 11.2-11.2V493.6c0-6.4-4.8-11.2-11.2-11.2h-33.6c-32 0-45.6-18.4-48.8-33.6-5.6-32.8-28-112.8-124.8-146.4-8.8-3.2-14.4-11.2-14.4-20-0.8-43.2 7.2-77.6 19.2-114.4-40.8 18.4-68.8 47.2-88 90.4-3.2 8-11.2 12.8-20 12.8-1.6 0-3.2 0-5.6-0.8C592 260 552 255.2 512 255.2c-98.4 0-180 27.2-251.2 82.4-60 46.4-91.2 124-87.2 218.4 3.2 78.4 61.6 136 96.8 164l0.8 0.8c20 15.2 26.4 34.4 19.2 56.8-6.4 20-16.8 45.6-19.2 50.4-0.8 3.2-0.8 6.4 0.8 9.6 1.6 3.2 4 5.6 7.2 7.2l65.6 24.8c1.6 0.8 3.2 0.8 4.8 0.8 5.6 0 10.4-3.2 12.8-8.8 0-0.8 8.8-23.2 16-41.6 4-9.6 12-32 38.4-32 7.2 0 13.6 1.6 22.4 3.2 15.2 3.2 37.6 8 73.6 8 33.6 0 56-2.4 72.8-4 8-1.6 15.2-2.4 21.6-2.4z"
                                        fill="currentColor"></path>
                                    <path
                                        d="M762.4 523.2c-24 0-43.2-19.2-43.2-43.2 0-24 19.2-43.2 43.2-43.2 24 0 43.2 19.2 43.2 43.2 0 24-19.2 43.2-43.2 43.2z"
                                        fill="currentColor"></path>
                                </g>
                            </svg>
                        </div>
                        <div class="flex flex-col flex-grow ml-4">
                            <div class="text-sm text-gray-500">Total points</div>
                            <div class="font-bold text-lg">{{ totalPoints }}</div>
                        </div>
                    </div>

                    <div class="flex flex-row bg-white shadow-sm rounded p-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                                </path>
                            </svg>
                        </div>
                        <div class="flex flex-col flex-grow ml-4">
                            <div class="text-sm text-gray-500">Players</div>
                            <div class="font-bold text-lg">{{ game?.players_num }}</div>
                        </div>
                    </div>
                    <div class="flex flex-row bg-white shadow-sm rounded p-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-pink-100 text-pink-500">
                            <svg class="w-6 h-6" viewBox="-0.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="currentColor">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <title>comments</title>
                                    <desc>Created with Sketch Beta.</desc>
                                    <defs> </defs>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"
                                        sketch:type="MSPage">
                                        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup"
                                            transform="translate(-259.000000, -257.000000)" fill="currentColor">
                                            <path
                                                d="M265.5,267 C266.329,267 267,267.672 267,268.5 C267,269.329 266.329,270 265.5,270 C264.671,270 264,269.329 264,268.5 C264,267.672 264.671,267 265.5,267 L265.5,267 Z M271.5,267 C272.329,267 273,267.672 273,268.5 C273,269.329 272.329,270 271.5,270 C270.671,270 270,269.329 270,268.5 C270,267.672 270.671,267 271.5,267 L271.5,267 Z M277.5,267 C278.329,267 279,267.672 279,268.5 C279,269.329 278.329,270 277.5,270 C276.671,270 276,269.329 276,268.5 C276,267.672 276.671,267 277.5,267 L277.5,267 Z M268.637,279.736 C269.414,279.863 271.181,280 272,280 C279.18,280 284,274.657 284,268.375 C284,262.093 277.977,257 272,257 C264.811,257 259,262.093 259,268.375 C259,272.015 260.387,275.104 263,277.329 L263,283 L268.637,279.736 L268.637,279.736 Z M285.949,266.139 L286,267 C286.008,267.817 286,267.742 286,268.5 C286,276.475 279.716,282 271,282 L268,282 C270.38,284.328 273.149,285.75 277,285.75 C277.819,285.75 278.618,285.676 279.395,285.549 L285,289 L285,283.329 C288.04,281.246 290,278.015 290,274.375 C290,271.131 288.439,268.211 285.949,266.139 L285.949,266.139 Z"
                                                id="comments" sketch:type="MSShapeGroup"> </path>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </div>
                        <div class="flex flex-col flex-grow ml-4">
                            <div class="text-sm text-gray-500">Comments</div>
                            <div class="font-bold text-lg">{{ commentsCount }}</div>
                        </div>
                    </div>
                    <div class="flex flex-row bg-white shadow-sm rounded p-4">
                        <div
                            class="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M18 2H6C4.34 2 3 3.33 3 4.97V15.88C3 17.52 4.34 18.85 6 18.85H6.76C7.56 18.85 8.32 19.16 8.88 19.72L10.59 21.41C11.37 22.18 12.64 22.18 13.42 21.41L15.13 19.72C15.69 19.16 16.46 18.85 17.25 18.85H18C19.66 18.85 21 17.52 21 15.88V4.97C21 3.33 19.66 2 18 2ZM12.28 14.96C12.13 15.01 11.88 15.01 11.72 14.96C10.42 14.51 7.5 12.66 7.5 9.51C7.51 8.12 8.62 7 10 7C10.82 7 11.54 7.39 12 8C12.46 7.39 13.18 7 14 7C15.38 7 16.5 8.12 16.5 9.51C16.49 12.66 13.58 14.51 12.28 14.96Z">
                                </path>
                            </svg>
                        </div>
                        <div class="flex flex-col flex-grow ml-4">
                            <div class="text-sm text-gray-500">Upvotes</div>
                            <div class="font-bold text-lg">{{ game?.upVotes }}</div>
                        </div>
                    </div>

                </div>



            </div>
        </div>

        <div class=" p-4 relative overflow-x-auto shadow-md sm:rounded-lg">
            <div class="w-full mb-2">
                <h2 class="text-2xl font-bold text-gray-600">Challenges</h2>
            </div>
            <button
                class="absolute top-4 right-4 flex p-2.5 bg-yellow-500 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            </button>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            Challenge name
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Time to complete
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Number
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Points
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="challenge in challenges"
                        class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {{ challenge.name }}
                        </th>
                        <td class="px-6 py-4">
                            {{ challenge.type }}
                        </td>
                        <td class="px-6 py-4">
                            {{ challenge.complete_time }}
                        </td>
                        <td class="px-6 py-4">
                            {{ challenge.number }}
                        </td>
                        <td class="px-6 py-4">
                            {{ challenge.points }}
                        </td>
                        <td class="px-6 py-4 grid grid-cols-2 gap-2">
                            <button><span
                                    class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</span></button>
                            <button><span href="#"
                                    class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</span></button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import { computed, onBeforeMount, watch } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';


// Get route and store
const route = useRoute()
const store = useStore()
const router = useRouter()


// Get the game from the route
const gameId = route.params.game_id

onBeforeMount(async () => {
    await store.dispatch('getGame', gameId)
    await store.dispatch('getChallengesByGame', gameId)
    await store.dispatch('getGameCommentsNum', gameId)
})


const challenges = computed(() => store.getters.stateChallenges)
const game = computed(() => store.getters.stateGame)
const userId = computed(() => store.getters.getUserId)
const userRole = computed(() => store.getters.getUserRole)
const commentsCount = computed(() => store.getters.getCommentsNum)

const totalPoints = computed(() => {
    return challenges.value?.reduce((acc, challenge) => acc + (challenge.points || 0), 0)
})



// Watch when game is loaded, then check permission
watch(game, (val) => {
    if (val && val.user_id !== userId.value && userRole.value !== 'Admin') {
        router.back();
    }
});

</script>