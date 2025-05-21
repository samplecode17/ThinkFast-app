import axios from "axios";

const state = {
    user: null,
};

const getters = {
    isAuthenticated: state => !!state.user,
    stateUser: state => state.user,
};


const actions = {
    async register({dispatch}, form) {
        let UserForm = new FormData();
        UserForm.append('first_name', form.first_name);
        UserForm.append('second_name', form.second_name);
        UserForm.append('username', form.username);
        UserForm.append('password', form.password);
        UserForm.append('email', form.email);
        UserForm.append('age',form.age);
        await axios.post('/users', form);
        await dispatch('login', UserForm);
    },
    async login({dispatch}, login) {
        await axios.post('/auth/token', login);
        await dispatch('Me');
    },
    async Me({commit}){
        let {data} = await axios.get('/auth/me');
        await commit('setUser', data);
    },

    // eslint-disable-next-line no-empty-pattern
    async deleteUser({}, id) {
        await axios.delete(`user/${id}`);
    },
    async logOut({commit}) {
        let user = null;
        commit('logout', user);
    }
};

const mutations = {
    setUser(state, username) {
      state.user = username;
    },
    logout(state, user){
      state.user = user;
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};