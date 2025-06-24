<template>
  <div class="flex flex-col md:flex-row sm:gap-4 md:p-5 md:px-40 sm:p-4">
    <!-- Main content -->
    <div class="w-full md:w-4/6 flex flex-col gap-4">
      <!-- Quiz box with fixed aspect ratio -->
      <div class="w-full p-2 aspect-[17/9] bg-white shadow-2xl rounded-xl flex items-center justify-center">
        <!-- Start screen -->
        <div v-if="quizState === 'start'" class="flex justify-center items-center w-full h-full">
          <button @click="startQuiz"
            class="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition">
            <span>Play</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" class="w-5 h-5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>

        </div>

        <!-- Quiz in progress -->
        <Quiz v-else-if="quizState === 'playing' && current < questions.length" :key="current"
          :image="questions[current]?.image" :question="questions[current]?.question" :points="questions[current]?.points"
          :time="questions[current]?.time" :answers="questions[current]?.answers" @answered="handleAnswered" />

        <!-- Finished screen -->
        <div v-else-if="quizState === 'finished'"
          class="flex flex-col items-center justify-center w-full h-full gap-4 text-center">
          <div class="text-2xl font-bold">Finished Challenge.<br />Points: {{ totalScore }}</div>
          <button @click="resetQuiz"
            class="flex items-center gap-2 bg-gray-300 hover:bg-yellow-400 text-black font-semibold py-2 px-5 rounded-lg transition">
            <span>Retry</span>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="black" class="w-5 h-5">
              <path
                d="M0 21.984v-8q0-2.464 1.76-4.224t4.256-1.76h8v-1.984q0-0.672 0.352-1.152t0.896-0.704 1.12-0.096 1.024 0.512l4 4q0.608 0.64 0.608 1.44t-0.608 1.408l-4 4q-0.448 0.448-1.056 0.544t-1.12-0.128-0.864-0.704-0.352-1.12v-2.016h-8q-0.832 0-1.44 0.608t-0.576 1.408v8q0 0.832 0.576 1.408t1.44 0.576h20q0.8 0 1.408-0.576t0.576-1.408v-8q0-0.832-0.576-1.408t-1.408-0.608h-0.384q0.704-1.984 0-4h0.384q2.464 0 4.224 1.76t1.76 4.224v8q0 2.496-1.76 4.256t-4.224 1.76h-20q-2.496 0-4.256-1.76t-1.76-4.256z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Additional sections -->
      <FollowingGame v-if="game?.user_id" :creator-id="game?.user_id" />
      <Description />
      <CommentThread :game-id="Number(gameId)" class="p-4" />
    </div>

    <!-- Recommended now on the right -->
    <div class="md:w-2/6 w-full mt-6 md:mt-0">
      <h2 class="text-2xl font-bold mb-4 text-gray-500">Recommended</h2>
      <Recommended v-if="game?.category_id" :category_id="game?.category_id"/>

    </div>
  </div>
</template>



<script setup>
import { onBeforeMount, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import CommentThread from '@/components/comments/CommentThread.vue'
import Quiz from '@/components/challenge/Quiz.vue'
import FollowingGame from '@/components/following/FollowingGame.vue'
import Description from '@/components/game/Description.vue'
import Recommended from '@/components/game/Recommended.vue'

// Get route and store
const route = useRoute()
const store = useStore()

// Game ID from route
const gameId = route.params.game_id 

// Track state of quiz: 'start', 'playing', 'finished'
const quizState = ref('start')

// Current question index
const current = ref(0)

// User's score
const totalScore = ref(0)

// Game, challenges and userGame from store
const game = computed(() => store.getters.stateGame)
const challenges = computed(() => store.getters.stateChallenges)
const userGame = computed(() => store.getters.stateUserGame)

// User data
const actualUser = computed(() => store.getters.getUserId)
const userGameExists = computed(() => store.getters.existsUsergame)

// Load game and challenges when component mounts
onBeforeMount(async () => {
  try {
    await store.dispatch('activateNavBar')
    await store.dispatch('getGame', gameId)
    await store.dispatch('usergameExists', { userId: actualUser.value, gameId })
    await store.dispatch('getChallengesByGame', gameId)

    const data = {
      user_id: actualUser.value,
      game_id: gameId
    }

    if (userGameExists.value == false) {
      await store.dispatch('createUserGame', data)
    }
  } catch (e) {
    alert("An error occurred with the game")
  }
})

// Map only 'quiz' type challenges to questions array
const questions = computed(() =>
  challenges.value
    .filter(c => c.type === 'quiz')
    .map(c => ({
      image: c.quiz.image,
      question: c.quiz.question,
      points: c.points,
      time: c.complete_time,
      answers: [
        { text: c.quiz.answer_1, correct: c.quiz.is_answer_1_correct },
        { text: c.quiz.answer_2, correct: c.quiz.is_answer_2_correct },
        { text: c.quiz.answer_3, correct: c.quiz.is_answer_3_correct },
        { text: c.quiz.answer_4, correct: c.quiz.is_answer_4_correct },
      ],
    }))
)

// Called when user clicks "Play" → start the quiz
function startQuiz() {
  quizState.value = 'playing'
  current.value = 0
  totalScore.value = 0
}

// Called after each answer → update score and move to next question
async function handleAnswered(score) {
  totalScore.value += score
  current.value += 1

  // If last question, finish the quiz
  if (current.value >= questions.value.length) {
    quizState.value = 'finished'

    let recordScore = userGame.value.record_points
    if (recordScore < totalScore.value) {
      recordScore = totalScore.value
    }

    const resultData = {
      record_points: recordScore,
      is_completed: true,
    }

    try {
      await store.dispatch('updateUserGame', {
        userId: actualUser.value,
        gameId,
        form: resultData,
      })
    } catch (e) {
      // Ignore any errors during save
    }
  }
}

// Called when user clicks "Retry" after finishing → reset everything
function resetQuiz() {
  quizState.value = 'start'
  current.value = 0
  totalScore.value = 0
}
</script>