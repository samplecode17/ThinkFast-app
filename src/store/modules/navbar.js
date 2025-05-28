

const state = {
    navbar: false
};

const getters = {
    stateNavBar: state => state.navbar,
};

const actions = {
    async activateNavBar({ commit }) {
        const data = true
        commit('setNavBar', data);
    },
    async deactivateNavBar({ commit }) {
        const data = false
        commit('setNavBar', data);
    },

};

const mutations = {
    setNavBar(state, data) {
        state.navbar = data;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
