import imgbbAxios from "@/services/imageStorage"
const API_KEY = import.meta.env.VITE_IMGBB_API_KEY

const state = {
  imageUrl: null,
  uploading: false
}

const getters = {
  uploadedImageUrl: state => state.imageUrl,
  isUploading: state => state.uploading
}

const actions = {
  async uploadImage({ commit }, file) {
    const formData = new FormData()
    formData.append('image', file)

    commit('setUploading', true)

    try {
      const { data } = await imgbbAxios.post(
        `upload?key=${API_KEY}`,
        formData,
        {withCredentials: false}
      )

      commit('setImageUrl', data.data.url)
    } catch (err) {
      console.log('Image upload failed:', err)
      commit('setImageUrl', null)
    } finally {
      commit('setUploading', false)
    }
  },
  async deleteImagePreview({ commit }) {
    commit('setImageUrl', null)
    commit('setUploading', false)
  }
}

const mutations = {
  setImageUrl(state, url) {
    state.imageUrl = url
  },
  setUploading(state, status) {
    state.uploading = status
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
