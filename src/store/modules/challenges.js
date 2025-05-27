import axios from "axios";

const state = {
    challenges: null,
    challenge: null
};

const getters = {
    stateChallenges: state => state.challenges,
    stateChallenge: state => state.challenge,
};

const actions = {
    async createChallenge(challenge) {
        await axios.post('challenges/', challenge);
    },

    async getChallenges({ commit }) {
        const { data } = await axios.get('challenges/');
        commit('setChallenges', data);
    },

    async getChallengesByGame({ commit }, gameId) {
        const { data } = await axios.get(`challenges/game/${gameId}`);
        commit('setChallenges', data);
    },

    async getChallenge({ commit }, challengeId) {
        const { data } = await axios.get(`challenges/${challengeId}`);
        commit('setChallenge', data);
    },

    async updateChallenge({ dispatch }, { id, form }) {
        await axios.put(`challenges/${id}`, form);
        await dispatch('getChallenges');
    },

    async deleteChallenge({ dispatch }, id) {
        await axios.delete(`challenges/${id}`);
        await dispatch('getChallenges');
    }
};

const mutations = {
    setChallenges(state, challenges) {
        state.challenges = challenges;
    },
    setChallenge(state, challenge) {
        state.challenge = challenge;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
