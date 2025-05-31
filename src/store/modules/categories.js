import apiClient from "@/services/appClient";

const state = {
    categories: null,
    category: null
};

const getters = {
    stateCategories: state => state.categories,
    stateCategory: state => state.category,
};

const actions = {
    async createCategory({ dispatch, commit }, category ) {
        await apiClient.post('/categories/', category);
        await dispatch('getCategories');
    },
    async getCategories({ commit }) {
        const { data } = await apiClient.get(`/categories/`);
        commit('setCategories', data);
    },

    async getCategory({ commit }, categoryId) {
        const { data } = await apiClient.get(`/categories/${categoryId}`);
        commit('setCategory', data);
    },

    async updateCategory({ dispatch }, categoryId, form) {
        await apiClient.put(`/categories/${categoryId}`, form);
        await dispatch('getCategories');
    },

    async deleteCategory({ dispatch }, categoryId) {
        await apiClient.delete(`/categories/${categoryId}`);
        await dispatch('getCategories');
    }
};

const mutations = {
    setCategories(state, categories) {
        state.categories = categories;
    },
    setCategory(state, category) {
        state.category = category;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
