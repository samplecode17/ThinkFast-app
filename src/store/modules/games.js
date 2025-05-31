import apiClient from "@/services/appClient";

const state = {
    games: null,
    game: null,
    gameId: null,
};

const getters = {
    stateGames: state => state.games,
    stateGame: state => state.game,
    getGameId: state => state.gameId,
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

    async updateGame({ dispatch }, userId, form) {
        await apiClient.put(`/games/${userId}`, form);
        await dispatch('getGames');
    },

    async deleteGame({ dispatch }, userId) {
        await apiClient.delete(`/games/${userId}`);
        await dispatch('getGames');
    }
};

const mutations = {
    setGames(state, games) {
        state.games = games;
    },
    setGame(state, game) {
        state.game = game;
        state.gameId = game.id
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
