<template>
<div class="max-w-2xl mx-auto space-y-6">
    <!-- New Comment Form -->
    <div class="bg-white p-4 rounded-lg shadow">
    <h2 class="text-lg font-semibold mb-2">Add a comment</h2>

    <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label for="comment" class="sr-only">Your comment</label>
            <textarea v-model="newComment" id="comment" rows="4" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required ></textarea>
        </div>
        <div class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
            <button @click="submitComment" type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                Post comment
            </button>
        </div>
    </div>
    </div>

    <!-- Comment List -->
    <div v-if="loading" class="text-center text-gray-500">Loading comments...</div>
    <div v-else-if="comments.length === 0" class="text-center text-gray-400">Be the first to comment</div>
    <div v-else>
    <CommentItem
        v-for="comment in comments"
        :key="comment.id"
        :comment="comment"
        :game-id="gameId"
        @reply="handleReply"
    />
    </div>
</div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import CommentItem from './CommentItem.vue'

const props = defineProps({
gameId: Number
})

const store = useStore()
const newComment = ref('')

const comments = computed(() => store.getters.getComments)
const loading = computed(() => store.getters.isLoading)

onMounted(() => {
store.dispatch('fetchComments', props.gameId)
})

const submitComment = async () => {
if (newComment.value.trim()) {
    await store.dispatch('addComment', {
    gameId: props.gameId,
    content: newComment.value
    })
    newComment.value = ''
}
}

const handleReply = async ({ content, parentId }) => {
await store.dispatch('addComment', {
    gameId: props.gameId,
    content,
    parentId
})
}
</script>
  