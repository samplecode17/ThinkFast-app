import apiClient from "@/services/appClient";

const state = {
    challenges: null,
    challenge: null,
    challengeId: null,
};

const getters = {
    stateChallenges: state => state.challenges,
    stateChallenge: state => state.challenge,
    getChallengeId: state => state.challengeId,
};

const actions = {
    async createChallenge({ commit }, challenge) {
        const { data } = await apiClient.post('/challenges/', challenge);
        commit('setChallenge', data);
    },
    async getChallenges({ commit }) {
        const { data } = await apiClient.get('/challenges/');
        commit('setChallenges', data);
    },

    async getChallengesByGame({ commit }, gameId) {
        const { data } = await apiClient.get(`/challenges/game/${gameId}`);
        commit('setChallenges', data);
    },

    async getChallenge({ commit }, challengeId) {
        const { data } = await apiClient.get(`/challenges/${challengeId}`);
        commit('setChallenge', data);
    },
    async updateChallenge({ dispatch }, id, form ) {
        await apiClient.put(`/challenges/${id}`, form);
        await dispatch('getChallenges');
    },

    async deleteChallenge({ dispatch }, id) {
        await apiClient.delete(`/challenges/${id}`);
        await dispatch('getChallenges');
    }
};

const mutations = {
    setChallenges(state, challenges) {
        state.challenges = challenges;
    },
    setChallenge(state, challenge) {
        state.challenge = challenge;
        state.challengeId = challenge.id;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
