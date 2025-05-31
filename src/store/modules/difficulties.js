import apiClient from "@/services/appClient";

const state = {
    difficulties: null,
    difficulty: null
};

const getters = {
    stateDifficulties: state => state.difficulties,
    stateDifficulty: state => state.difficulty,
};

const actions = {
    async createDifficulty({ dispatch, commit }, difficulty ) {
        await apiClient.post('/difficulties/', difficulty);
        await dispatch('getDifficulties');
    },
    async getDifficulties({ commit }) {
        const { data } = await apiClient.get(`/difficulties/`);
        commit('setDifficulties', data);
    },

    async getDifficulty({ commit }, difficultyId) {
        const { data } = await apiClient.get(`/difficulties/${difficultyId}`);
        commit('setDifficulty', data);
    },

    async updateDifficulty({ dispatch }, {difficultyId, form}) {
        await apiClient.put(`/difficulties/${difficultyId}`, form);
        await dispatch('getDifficulties');
    },

    async deleteDifficulty({ dispatch }, difficultyId) {
        await apiClient.delete(`/difficulties/${difficultyId}`);
        await dispatch('getDifficulties');
    }
};

const mutations = {
    setDifficulties(state, difficulties) {
        state.difficulties = difficulties;
    },
    setDifficulty(state, difficulty) {
        state.difficulty = difficulty;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
