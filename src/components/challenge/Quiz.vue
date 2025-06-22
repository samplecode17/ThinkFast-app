<template>
    <div class="w-6/9 m-auto justify-center h-auto rounded px-10" v-if="!answered">
        <!-- Image container square with fixed aspect ratio -->
        <div class="w-2/3 mx-auto rounded-lg border border-gray-300 overflow-hidden aspect-[13/9] mb-4">
            <img :src="image" alt="Quiz image" class="w-full h-full object-cover" />
        </div>

        <h2 class="text-xl font-bold mb-4 text-center">{{ question }}</h2>

        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 px-7">
            <button v-for="(ans, index) in randomizedAnswers" :key="index"
                class="bg-blue-500 text-white py-2 px-3 rounded hover:bg-blue-700" @click="selectAnswer(ans)">
                {{ ans.text }}
            </button>

        </div>

        <div class="mt-4 text-gray-600 text-center">⏱️ Time left: {{ timeLeft }}s</div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
    image: String,           // Image URL
    question: String,        // Question text
    points: Number,          // Base points
    time: Number,            // Allowed time (seconds)
    answers: Array           // Array of answers [{ text, correct }]
})

const emit = defineEmits(['answered'])

const startTime = ref(0)
const timeLeft = ref(props.time)
const timer = ref(null)
const answered = ref(false)

const randomizedAnswers = ref([])

// Fisher-Yates shuffle algorithm to randomize array
function shuffleArray(array) {
    let arr = array.slice()
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
            ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

onMounted(() => {
    // Randomize answers on mount
    randomizedAnswers.value = shuffleArray(props.answers)

    startTime.value = Date.now()

    timer.value = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime.value) / 1000)
        timeLeft.value = props.time - elapsed

        if (timeLeft.value <= 0) {
            clearInterval(timer.value)
            answered.value = true
            emit('answered', 0)
        }
    }, 500)
})

onBeforeUnmount(() => {
    clearInterval(timer.value)
})

function selectAnswer(ans) {
    if (answered.value) return

    answered.value = true
    clearInterval(timer.value)

    const endTime = Date.now()
    const wastedTime = (endTime - startTime.value) / 1000

    let score = 0
    if (ans.correct) {
        score = props.points + (props.time - wastedTime) * 40
    }

    emit('answered', Math.round(score))
}
</script>


