import apiClient from "@/services/appClient";

const state = {
    comments: [],
    loading: false,
    error: null,
    commentsCount: 0,
  }
  
const getters = {
    getComments: (state) => state.comments,
    isLoading: (state) => state.loading,
    getCommentsNum: (state) => state.commentsCount
}
  
const actions = {
    async fetchComments({ commit }, gameId) {
        commit('setLoading', true)
        try {
            const res = await apiClient.get(`/games/${gameId}/comments`)
            commit('setComments', res.data)
        } catch (err) {
            commit('setError', err)
        } finally {
            commit('setLoading', false)
        }
    },

    async addComment({ dispatch }, { gameId, content, parentId = null }) {
        try {
            await apiClient.post(`/games/${gameId}/comments`, {
            content,
            parent_id: parentId
        })
            await dispatch('fetchComments', gameId)
        } catch (err) {
            console.error('Error adding comment:', err)
        }
    },

    async getGameCommentsNum({commit}, gameId){
        try{
            const res = await apiClient.get(`/games/${gameId}/comments/count`)
            commit('setCommentsCount', res.data)
        } catch (err) {
            commit('setError', err)}
    },

    async toggleLike({ dispatch }, { commentId, gameId }) {
        try {
            await apiClient.post(`/comments/${commentId}/like`)
            await dispatch('fetchComments', gameId)
        } catch (err) {
            console.error('Error toggling like:', err)
        }
    }
}
  
  const mutations = {
    setComments(state, comments) {
      state.comments = comments
    },
    setLoading(state, value) {
      state.loading = value
    },
    setError(state, error) {
      state.error = error
    },
    setCommentsCount(state, count) {
        state.commentsCount = count.comment_num
    }
  }
  
  export default {
    state,
    getters,
    actions,
    mutations
  }
  