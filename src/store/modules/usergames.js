import apiClient from "@/services/appClient";

const state = {
    usergames: null,
    usergame: null
};

const getters = {
    stateUserGames: state => state.usergames,
    stateUserGame: state => state.usergame,
};

const actions = {
    async createUserGame({ dispatch }, usergame) {
        await apiClient.post('usergames/', usergame);
        // Podrías hacer dispatch a otra acción si necesitas refrescar una lista
    },

    async getUserGame({ commit }, { userId, gameId }) {
        const { data } = await apiClient.get(`usergames/user:${userId}/game:${gameId}`);
        commit('setUserGame', data);
    },

    async getUserGamesByUser({ commit }, userId) {
        const { data } = await apiClient.get(`usergames/user:${userId}`);
        commit('setUserGames', data);
    },

    async getUserGamesByGame({ commit }, gameId) {
        const { data } = await apiClient.get(`usergames/game:${gameId}`);
        commit('setUserGames', data);
    },

    async updateUserGame({ dispatch }, { userId, gameId, form }) {
        await apiClient.put(`usergames/user:${userId}/game:${gameId}`, form);
        // Opcional: volver a obtener la lista
        await dispatch('getUserGame', { userId, gameId });
    },

    async deleteUserGame({ commit }, { userId, gameId }) {
        await apiClient.delete(`usergames/user:${userId}/game:${gameId}`);
        commit('setUserGame', null); // limpia la entidad específica
    }
};

const mutations = {
    setUserGames(state, usergames) {
        state.usergames = usergames;
    },
    setUserGame(state, usergame) {
        state.usergame = usergame;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
