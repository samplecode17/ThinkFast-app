<template>
    <div class="w-full  mx-auto p-4 pt-0">
        <button @click="showComments = !showComments"
            class="flex items-center justify-between w-full px-4 py-2 font-semibold text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition">
            <span>{{ showComments ? 'Hide Comments' : 'Show Comments' }}</span>
            <svg :class="{ 'rotate-180': showComments }" class="w-5 h-5 mr-2 transition-transform duration-300"
                fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
        </button>
        <div v-show="showComments" class="w-full pl-4 mx-auto space-y-6">
            <!-- New Comment Form -->
            <div class="bg-white p-4">
                <h2 class="text-lg font-semibold mb-2">Add a comment</h2>

                <div
                    class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                    <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                        <label for="comment" class="sr-only">Your comment</label>
                        <textarea v-model="newComment" id="comment" rows="4"
                            class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                            placeholder="Write a comment..." required></textarea>
                    </div>
                    <div
                        class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600 border-gray-200">
                        <button @click="submitComment" type="submit"
                            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            Post comment
                        </button>
                    </div>
                </div>
                <button v-if="showComments" @click="showComments = !showComments"
                    class="hover:text-blue-600 transition">
                    Hide comments
                </button>
            </div>

            <!-- Comment List -->
            <div v-if="loading" class="text-center text-gray-500">Loading comments...</div>
            <div v-else-if="comments.length === 0" class="text-center text-gray-400">Be the first to comment</div>
            <div v-else>
                <div>
                    <CommentItem v-for="comment in comments" :key="comment.id" :comment="comment" :game-id="gameId"
                        @reply="handleReply" />
                </div>

            </div>
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
const showComments = ref(false)

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