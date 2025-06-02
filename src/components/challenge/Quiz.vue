<template>
    <div class="w-full quiz" v-if="!answered">
        <!-- Image container square with fixed aspect ratio -->
        <div class="w-full max-w-md mx-auto rounded-lg border border-gray-300 overflow-hidden aspect-[11/9] mb-4">
            <img :src="image" alt="Quiz image" class="w-full h-full object-cover" />
        </div>

        <h2 class="text-xl font-bold mb-4 text-center">{{ question }}</h2>

        <div class="grid md:grid-cols-2 grid-cols-1 gap-4 px-7">
            <button v-for="(ans, index) in answers" :key="index"
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

// Start countdown
onMounted(() => {
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

    console.log({
        correct: ans.correct,
        basePoints: props.points,
        timeAllowed: props.time,
        wastedTime,
        calculatedScore: Math.round(score),
    })

    emit('answered', Math.round(score))
}
</script>

<style scoped>
.quiz {
    max-width: 600px;
    margin: auto;
}
</style>