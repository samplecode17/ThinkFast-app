<template>
    <div class="w-full  mx-auto p-4">
        <button @click="toggleDescription"
            class="flex items-center justify-between w-full px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition">
            <span>{{ isOpen ? 'Show less' : 'Show description' }}</span>
            <svg :class="{ 'rotate-180': isOpen }" class="w-5 h-5 text-gray-600 transition-transform duration-300"
                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
        </button>

        <transition name="fade">
            <p v-if="isOpen" class="mt-3 px-5 text-gray-600 whitespace-pre-line">
                {{ game.description }}
            </p>
        </transition>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const game = computed(() => store.getters.stateGame)

const isOpen = ref(false)
const toggleDescription = () => {
    isOpen.value = !isOpen.value
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>