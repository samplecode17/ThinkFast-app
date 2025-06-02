<template>
<div>
    <div class=" justify-center">
        <Quiz
        v-if="current < questions.length"
        :key="current"
        :image="questions[current].image"
        :question="questions[current].question"
        :points="questions[current].points"
        :time="questions[current].time"
        :answers="questions[current].answers"
        @answered="handleAnswered"
        />
        <div v-else class="text-center mt-10 text-2xl font-bold">
            Finished Challenge.<br />
            Points: {{ totalScore }}
        </div>
    </div>
    <div class="p-8">
        <CommentThread :game-id="gameId" />
    </div>
    
    
</div>

</template>
<script setup>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import CommentThread from '@/components/comments/CommentThread.vue'
import Quiz from '@/components/challenge/Quiz.vue'
import { ref, computed } from 'vue'
const current = ref(0)
const totalScore = ref(0)

const route = useRoute()
const store = useStore()
const gameId = route.params.game_id | 2

const user_game = computed(() => store.getters.usergameExists)
const actualUser = computed(()=> store.getters.getUserId)

onBeforeMount( async () => {
    try{
        await store.dispatch('getGame', gameId)

        await store.dispatch('usergameExists', { userId: actualUser.value, gameId: gameId })
        await store.dispatch('getChallengesByGame', gameId)
        const data = {
                    user_id: actualUser.value,
                    game_id: gameId
                };
        if(user_game === false)
            await store.dispatch('createUserGame', data)
    }catch(e){
        alert("An error ocurred with the game")
    }
}
)

const userGame = computed(() => store.getters.stateUserGame)
const game = computed(() => store.getters.stateGame)
const challenges = computed(() => store.getters.stateChallenges)



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




async function handleAnswered(score) {
  totalScore.value += score
  current.value += 1

  if (current.value >= questions.value.length) {
    let recordScore = userGame.value.record_points
    if (recordScore < totalScore.value) {
      recordScore = totalScore.value
    }
    const resultData={
      record_points: recordScore,
      is_completed: true,

    }
    try{
      await store.dispatch('updateUserGame',{ userId: actualUser.value, gameId: gameId, form: resultData })
    }catch(e){

    }
    
  }
}

</script>