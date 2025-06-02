import apiClient from "@/services/appClient";

const state = {
    usergames: null,
    usergame: null,
    usergameExists: false,
};

const getters = {
    stateUserGames: state => state.usergames,
    stateUserGame: state => state.usergame,
    existsUsergame: state => state.usergameExists,
};

const actions = {
    async createUserGame(_, usergame) {
        await apiClient.post('usergames/', usergame);
        
    },
    async usergameExists({ dispatch, commit }, { userId, gameId }) {
        const { data } = await apiClient.get(`usergames/exists/user:${userId}/game:${gameId}`);
        if (data?.exists === true) {
            commit('setUserGameExists', true);
            await dispatch('getUserGame', { userId, gameId });
        } else {
            commit('setUserGameExists', false);
        }
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
        await dispatch('getUserGame', { userId, gameId });
    },

    async deleteUserGame({ commit }, { userId, gameId }) {
        await apiClient.delete(`usergames/user:${userId}/game:${gameId}`);
        commit('setUserGame', null);
    }
};

const mutations = {
    setUserGames(state, usergames) {
        state.usergames = usergames;
    },
    setUserGame(state, usergame) {
        state.usergame = usergame;
    },
    setUserGameExists(state, response) {
        state.usergameExists = response
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
