import axios from "axios";

const state = {
    quiz: null
};

const getters = {
    stateQuiz: state => state.quiz,
};

const actions = {
    async createQuiz({ commit }, quiz) {
        const { data } = await axios.post('quiz/', quiz);
        commit('setQuiz', data);
    },

    async getQuiz({ commit }, quizId) {
        const { data } = await axios.get(`quiz/${quizId}`);
        commit('setQuiz', data);
    },

    async updateQuiz({ commit }, { id, form }) {
        const { data } = await axios.put(`quiz/${id}`, form);
        commit('setQuiz', data);
    },

    async deleteQuiz({ commit }, id) {
        await axios.delete(`quiz/${id}`);
        commit('setQuiz', null); // Limpia el estado tras eliminar
    }
};

const mutations = {
    setQuiz(state, quiz) {
        state.quiz = quiz;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
