<template>
<div>
    <CommentThread :game-id="gameId" />
</div>

</template>
<script setup>
import { onBeforeMount } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import CommentThread from '@/components/comments/CommentThread.vue'

const route = useRoute()
const store = useStore()
const gameId = route.params.game_id | 2

onBeforeMount( async () => {
 await store.dispatch('getGame', gameId)
}
)

const game = store.getters.stateGame


</script>