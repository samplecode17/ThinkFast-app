<template>
<div class="pl-4 mt-4">
    <div class="bg-white p-4 rounded-lg ">
    <div class="flex justify-between items-center">
        <div class="flex justify-between items-center">
            <img
                    class="size-8 rounded-full"
                    :src="comment?.user_image"
                    alt="User avatar"
            />
            <div class=" pl-2 text-sm text-gray-700 font-semibold">{{ comment.username }}</div>
        </div>
        <div class="text-xs text-gray-500">{{ formatDate(comment.created_at) }}</div>
    </div>

    <p class="text-gray-800 mt-2">{{ comment.content }}</p>

    <div class="flex gap-4 items-center mt-3 text-sm text-gray-600">
        <button @click="toggleLike" class="hover:text-red-500 transition">
        ❤️ {{ comment.like_count }}
        <span v-if="comment.liked_by_me" class="font-semibold">(You like this)</span>
        </button>
        <button @click="showReply = !showReply" class="hover:text-blue-600 transition">
        Reply
        </button>
    </div>

    <div v-if="showReply" class="mt-3">
        <textarea
        v-model="replyText"
        placeholder="Write your reply..."
        class="w-full p-2 border border-gray-300 rounded-lg resize-none"
        ></textarea>
        <div class="mt-2 flex justify-end">
        <button
            @click="submitReply"
            class="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
        >
            Submit
        </button>
        </div>
    </div>

    <!-- Show/Hide replies toggle -->
    <div v-if="comment.replies && comment.replies.length" class="mt-2 ml-2 text-sm">
        <button
        @click="showReplies = !showReplies"
        class="text-blue-600 hover:underline"
        >
        {{ showReplies ? 'Hide replies' : `View ${comment.replies.length} repl${comment.replies.length === 1 ? 'y' : 'ies'}` }}
        </button>
    </div>

    <!-- Nested replies -->
    <div v-if="showReplies && comment.replies && comment.replies.length" class="mt-4 space-y-4">
        <CommentItem
        v-for="reply in comment.replies"
        :key="reply.id"
        :comment="reply"
        :game-id="gameId"
        @reply="$emit('reply', $event)"
        />
    </div>
    </div>
</div>
</template>

<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
comment: Object,
gameId: Number
})
const emit = defineEmits(['reply'])

const store = useStore()
const showReply = ref(false)
const replyText = ref('')
const showReplies = ref(false) // Replies are hidden initially

const toggleLike = () => {
store.dispatch('toggleLike', {
    commentId: props.comment.id,
    gameId: props.gameId
})
}

const submitReply = () => {
if (replyText.value.trim()) {
    emit('reply', {
    content: replyText.value,
    parentId: props.comment.id
    })
    replyText.value = ''
    showReply.value = false
    showReplies.value = true // Show replies after posting one
}
}

const formatDate = (dateStr) => {
return new Date(dateStr).toLocaleString()
}
</script>
