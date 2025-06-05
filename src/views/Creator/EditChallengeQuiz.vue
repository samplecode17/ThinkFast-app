<template>
    <div class="max-w-screen-xl mx-auto p-4 sm:p-6 bg-white shadow rounded">
        <!-- Steps Header -->
        <ol
            class="flex items-center w-full p-3 mb-5 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-xs dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4 rtl:space-x-reverse">
            <li class="flex items-center" :class="currentStep === 1 ? 'text-thinkfast dark:text-blue-500' : ''">
                <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0"
                    :class="currentStep === 1 ? 'border-thinkfast dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'">
                    1
                </span>
                Challenge <span class="hidden sm:inline-flex sm:ms-2">Info</span>
                <svg class="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 12 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m7 9 4-4-4-4M1 9l4-4-4-4" />
                </svg>
            </li>
            <li class="flex items-center" :class="currentStep === 2 ? 'text-thinkfast dark:text-blue-500' : ''">
                <span class="flex items-center justify-center w-5 h-5 me-2 text-xs border rounded-full shrink-0"
                    :class="currentStep === 2 ? 'border-thinkfast dark:border-blue-500' : 'border-gray-500 dark:border-gray-400'">
                    2
                </span>
                Quizz <span class="hidden sm:inline-flex sm:ms-2">Info</span>
            </li>
        </ol>

        <h2 class="text-2xl font-bold mb-4">{{challenge_info?.name}}</h2>

        <!-- Step 1: Challenge Form -->
        <form v-if="currentStep === 1" @submit.prevent="handleStepOneSubmit">
            <div class="flex flex-col gap-4">
                <section class="flex flex-col md:flex-row gap-6 md:gap-10">
                    <div class="w-full md:w-1/2">
                        <div class="mb-4">
                            <label for="name" class="block font-semibold mb-1">Name</label>
                            <input v-model="challenge.name" id="name" type="text" :placeholder="challenge_info?.name"
                                @input="nameError = false" :class="[
                                    'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-thinkfast focus:border-thinkfast block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                                    nameError ? 'border-red-500' : 'border-gray-300'
                                ]" />
                        </div>
                        <div class="mb-4">
                            <label for="number-input" class="block font-semibold mb-1">Number</label>
                            <input v-model="challenge.number" type="number" id="number-input"
                                :placeholder="challenge_info?.number"
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-thinkfast focus:border-thinkfast block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </div>
                        <div class="mb-4">
                            <label for="image" class="block font-semibold mb-1">Points</label>
                            <NumberSelector v-if="challenge_info?.points" :min="100" :max="1000" :initial="challenge_info?.points"
                                @second-value="handlePoints" />
                        </div>
                    </div>
                    <div class="w-full md:w-1/2">
                        <div class="mb-4">
                            <label for="image" class="block font-semibold mb-1">Seconds for the challenge</label>
                            <NumberSelector v-if="challenge_info?.complete_time" :min="30" :max="120" :initial="challenge_info?.complete_time"
                                @second-value="handleCompleteTime" />
                        </div>
                    </div>
                </section>
                <div class="mb-2 flex justify-end">
                    <button type="submit"
                        class="mt-4 bg-cyan-900 text-white px-6 py-3 rounded hover:bg-blue-700 w-full md:w-auto">
                        Next step
                    </button>
                </div>
            </div>
        </form>

        <!-- Step 2: Quiz Form -->
        <form v-if="currentStep === 2" @submit.prevent="submitQuiz">
            <div class="flex flex-col gap-4">
                <section class="flex flex-col md:flex-row gap-6 md:gap-10">
                    <div class="w-full md:w-1/2">
                        <div class="mb-4">
                            <label for="question" class="block font-semibold mb-1">Question</label>
                            <input v-model="quiz.question" id="question" type="text"
                                :placeholder="challenge_info?.quiz?.question ? true : false"
                                @input="questionError = false" :class="[
                                    'bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-thinkfast focus:border-thinkfast block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
                                    questionError ? 'border-red-500' : 'border-gray-300'
                                ]" />
                        </div>
                        <div class="mb-4">
                            <div class="flex justify-between items-center w-full">
                                <label for="answer1" class="font-semibold mb-1">Answer 1</label>
                                <label class="font-semibold mb-1">Correct</label>
                            </div>

                            <div class="flex items-center justify-between">
                                <input :placeholder="challenge_info?.quiz?.answer_1" v-model="quiz.answer_1"
                                    id="answer1" type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-thinkfast focus:border-thinkfast block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <label class="inline-flex items-center ms-4 cursor-pointer">
                                    <input :placeholder="challenge_info?.quiz?.is_answer_1_correct ? true : false"
                                        type="radio" class="sr-only peer" name="correctAnswer"
                                        v-model="quiz.correctAnswer" :value="1" />
                                    <div
                                        class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-thinkfast peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-thinkfast dark:peer-checked:bg-blue-600">
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="answer2" class="block font-semibold mb-1">Answer 2</label>
                            <div class="flex items-center justify-between">
                                <input :placeholder="challenge_info?.quiz?.answer_2" v-model="quiz.answer_2"
                                    id="answer2" type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-thinkfast focus:border-thinkfast block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <label class="inline-flex items-center ms-4 cursor-pointer">
                                    <input :placeholder="challenge_info?.quiz?.is_answer_2_correct ? true : false"
                                        type="radio" class="sr-only peer" name="correctAnswer"
                                        v-model="quiz.correctAnswer" :value="2" />
                                    <div
                                        class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-thinkfast peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-thinkfast dark:peer-checked:bg-blue-600">
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="answer3" class="block font-semibold mb-1">Answer 3</label>
                            <div class="flex items-center justify-between">
                                <input :placeholder="challenge_info?.quiz?.answer_3" v-model="quiz.answer_3"
                                    id="answer3" type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-thinkfast focus:border-thinkfast block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <label class="inline-flex items-center ms-4 cursor-pointer">
                                    <input :placeholder="challenge_info?.quiz?.is_answer_3_correct ? true : false"
                                        type="radio" class="sr-only peer" name="correctAnswer"
                                        v-model="quiz.correctAnswer" :value="3" />
                                    <div
                                        class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-thinkfast peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-thinkfast dark:peer-checked:bg-blue-600">
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div class="mb-4">
                            <label for="answer4" class="block font-semibold mb-1">Answer 4</label>
                            <div class="flex items-center justify-between">
                                <input :placeholder="challenge_info?.quiz?.answer_4" v-model="quiz.answer_4"
                                    id="answer4" type="text"
                                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-thinkfast focus:border-thinkfast block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                <label class="inline-flex items-center ms-4 cursor-pointer">
                                    <input :placeholder="challenge_info?.quiz?.is_answer_4_correct" type="radio"
                                        class="sr-only peer" name="correctAnswer" v-model="quiz.correctAnswer"
                                        :value="4" />
                                    <div
                                        class="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-purple-300 dark:peer-focus:ring-thinkfast peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-thinkfast dark:peer-checked:bg-blue-600">
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="w-full md:w-1/2">
                        <div class="mb-4">
                            <label for="image" class="block font-semibold mb-1">Quiz image</label>
                            <ImageUploader />
                        </div>
                    </div>
                </section>
                <div class="mb-2 flex justify-between">
                    <button type="button" @click="goToStep(1)"
                        class="mt-4 bg-gray-300 text-gray-800 px-6 py-3 rounded hover:bg-gray-400 w-full md:w-auto">
                        Back
                    </button>
                    <button type="submit"
                        class="mt-4 bg-cyan-900 text-white px-6 py-3 rounded hover:bg-blue-700 w-full md:w-auto">
                        Edit Quiz
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, reactive, computed, watch, onBeforeMount, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import ImageUploader from '@/components/ImageUploader.vue'
import NumberSelector from '@/components/NumberSelector.vue'

const store = useStore()
const route = useRoute()
const router = useRouter()

// Get the game and challenge from the route
const gameId = route.params.game_id
const challengeId = route.params.challenge_id


onBeforeMount(async () => {
    await store.dispatch('activateNavBar')
    await store.dispatch('getGame', gameId)
    await store.dispatch('getChallenge', challengeId)
})

const challenge_info = computed(() => store.getters.stateChallenge)
challenge_info.value?.points

console.log(challenge_info.value?.quiz?.answer_4)

const currentStep = ref(1)
const nameError = ref(false)
const questionError = ref(false)
const userId = computed(() => store.getters.getUserId)
const userRole = computed(() => store.getters.getUserRole)
const game = computed(() => store.getters.stateGame)

const goToStep = (step) => (currentStep.value = step)

const imageUrl = computed(() => store.getters['imagepost/uploadedImageUrl'])

function handleCompleteTime(time) {
    challenge.complete_time = time
}

function handlePoints(points) {
    challenge.points = points
}

const quiz = reactive({
    challenge_id: challengeId,
    image: challenge_info.value?.quiz?.image,
    question: challenge_info.value?.quiz?.question,
    answer_1: challenge_info.value?.quiz?.answer_1,
    answer_2: challenge_info.value?.quiz?.answer_2,
    answer_3: challenge_info.value?.quiz?.answer_3,
    answer_4: challenge_info.value?.quiz?.answer_4,
    correctAnswer: challenge_info.value?.quiz?.is_answer_1_correct ? 1 :
        challenge_info.value?.quiz?.is_answer_2_correct ? 2 :
            challenge_info.value?.quiz?.is_answer_3_correct ? 3 :
                challenge_info.value?.quiz?.is_answer_4_correct ? 4 :
                    1
})

const challenge = reactive({
    name: challenge_info.value?.name,
    game_id: challenge_info.value?.game_id,
    points: challenge_info.value?.points,
    number: challenge_info.value?.number,
    complete_time: challenge_info.value?.complete_time,
    type: challenge_info.value?.type,
})

watch(imageUrl, (url) => {
    if (url) {
        quiz.image = url
    } else {
        quiz.image = challenge_info.value?.quiz?.image
    }
})

watch(game, (val) => {
    if (val && val.user_id !== userId.value && userRole.value !== 'Admin') {
        router.back();
    }
});


const handleStepOneSubmit = async () => {
    try {
        nameError.value = false
        challenge.game_id = store.getters.getGameId
        const updatedChallenge = { ...challenge }
        await store.dispatch('updateChallenge', { id: challengeId, form: updatedChallenge })
        goToStep(2)
    } catch (error) {
        console.error(error)
        if (error?.response?.status === 401) {
            nameError.value = true
        } else {
            alert("An error occurred while editing the challenge.")
        }
    }
}

const submitQuiz = async () => {
    try {
        questionError.value = false
        quiz.challenge_id = store.getters.getChallengeId

        if (quiz.answer_1 === '') {
            quiz.answer_1 = challenge_info.value?.quiz?.answer_1;
        }
        if (quiz.answer_2 === '') {
            quiz.answer_2 = challenge_info.value?.quiz?.answer_2;
        }
        if (quiz.answer_3 === '') {
            quiz.answer_3 = challenge_info.value?.quiz?.answer_3;
        }
        if (quiz.answer_4 === '') {
            quiz.answer_4 = challenge_info.value?.quiz?.answer_4;
        }
        quiz.is_answer_1_correct = quiz.correctAnswer === 1
        quiz.is_answer_2_correct = quiz.correctAnswer === 2
        quiz.is_answer_3_correct = quiz.correctAnswer === 3
        quiz.is_answer_4_correct = quiz.correctAnswer === 4

        const quizId = challenge_info.value.quiz.id
        const updatedQuiz = { ...quiz }
        await store.dispatch('updateQuiz', { id: quizId, form: updatedQuiz })
        router.push(`/creator/game/${gameId}`)
    } catch (error) {
        console.error(error)
        if (error?.response?.status === 401) {
            questionError.value = true
        } else {
            alert("An error occurred while creating the quiz.")
        }
    }

}
</script>