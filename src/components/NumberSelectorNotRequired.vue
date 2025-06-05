<template>
<form class="w-full mx-auto">
    <div class="flex mb-4">
    <label for="time-input" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Seconds</label>
    <div class="relative w-full">
        <input 
        type="number" 
        id="time-input" 
        class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-thinkfast focus:border-thinkfast dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-thinkfast" 
        placeholder="Enter seconds" 
        v-model="seconds" 
        :min="min" 
        :max="max" 
        required 
        />
    </div>
    </div>

    <div class="relative">
    <input 
        id="seconds-range-input" 
        type="range" 
        v-model="seconds" 
        @input="emitSecondValue" 
        :min="min" 
        :max="max" 
        class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
    />
    <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">Min ({{ min }})</span>
    <span class="text-sm text-gray-500 dark:text-gray-400 absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 -bottom-6">{{ midpoint }}</span>
    <span class="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">Max ({{ max }})</span>
    </div>
</form>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
initial: {
    type: Number,
    default: 30
},
min: {
    type: Number,
    default: 30
},
max: {
    type: Number,
    default: 120
}
})

const emit = defineEmits(['second-value'])

const seconds = ref(props.initial)

// Emit updated value
watch(seconds, (newVal) => {
emit('second-value', newVal)
})

const emitSecondValue = () => {
emit('second-value', seconds.value)
}

// Computed midpoint
const midpoint = computed(() => Math.round((props.min + props.max) / 2))
</script>
  
  
  