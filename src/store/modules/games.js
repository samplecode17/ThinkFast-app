import apiClient from "@/services/appClient";

const state = {
    games: null,
    myGames: null,
    game: null,
    gameId: null,
};

const getters = {
    stateGames: state => state.games,
    stateGame: state => state.game,
    stateMyGames: state => state.myGames,
    getGameId: state => state.gameId,
};

const actions = {
    async createGame({ commit }, game) {
        await apiClient.post('/games/', game);
    },
    async getMyGames({ commit }, userId) {
        const { data } = await apiClient.get(`/games/my-games/${userId}`);
        commit('setMyGames', data);
    },
    async getAllGames({ commit }) {
        const { data } = await apiClient.get(`/games/`);
        commit('setGames', data);
    },
    async getRecommendedGames({ commit }, categoryId) {
        const { data } = await apiClient.get(`/games/recommended/${categoryId}`);
        commit('setGames', data);
    },

    async getGame({ commit }, gameId) {
        const { data } = await apiClient.get(`/games/${gameId}`);
        commit('setGame', data);
    },

    async updateGame({ dispatch }, {gameId, form}) {
        await apiClient.put(`/games/${gameId}`, form);
        await dispatch('getGames');
    },

    async deleteGame({ dispatch }, gameId) {
        await apiClient.delete(`/games/${gameId}`);
        await dispatch('getGames');
    },
    async toggleUpVote({dispatch},gameId){
        try{
          await apiClient.post(`/games/${gameId}/upVote`)
          await dispatch('getGame', gameId)
        } catch (err) {
          console.error('Error upVoting :', err)
        }
    }
};

const mutations = {
    setGames(state, games) {
        state.games = games;
    },
    setGame(state, game) {
        state.game = game;
        state.gameId = game.id;
    },
    setMyGames(state, games) {
        state.myGames = games;
    } 
};

export default {
    state,
    getters,
    actions,
    mutations
};
