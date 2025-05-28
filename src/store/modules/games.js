import apiClient from "@/services/appClient";

const state = {
    games: null,
    game: null
};

const getters = {
    stateGames: state => state.games,
    stateGame: state => state.game,
};

const actions = {
    async createGame({ commit }, game) {
        await apiClient.post('/games/', game);
    },
    async getMyGames({ commit }, userId) {
        const { data } = await apiClient.get(`/games/my-games/${userId}`);
        commit('setGames', data);
    },

    async getGame({ commit }, gameId) {
        const { data } = await apiClient.get(`/games/${gameId}`);
        commit('setGame', data);
    },

    async updateGame({ dispatch }, { id, form }) {
        await apiClient.put(`/games/${id}`, form);
        await dispatch('getGames');
    },

    async deleteGame({ dispatch }, id) {
        await apiClient.delete(`/games/${id}`);
        await dispatch('getGames');
    }
};

const mutations = {
    setGames(state, games) {
        state.games = games;
    },
    setGame(state, game) {
        state.game = game;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
