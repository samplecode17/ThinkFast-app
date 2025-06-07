import apiClient from "@/services/appClient";

const token = localStorage.getItem("token");
if (token) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
const state = {
  user: null,
  usersById: {},
  userId: null,
  userRole: null,
  isValidPassword: null,
  users:null,
  isAdmin:null,
  userEdit:null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  stateUser: (state) => state.user,
  getUserId: (state) => state.userId,
  getUserById: (state) => (id) => state.usersById[id] || null,
  getUserRole: (state) => (state.userRole),
  getValid: (state) => (state.isValidPassword),
  getIsAdmin: (state) => (state.userRole =='admin'),
  getAllUsers: (state) => (state.users),
  getUserEdit: (state) => (state.userEdit),
};

const actions = {
  async register({ dispatch }, form) {

    await apiClient.post("/users", form);
    const formData = new FormData();
    formData.append("username", form.username);
    formData.append("password", form.password);
    await dispatch("login", formData);
  },

  async login({ dispatch }, credentials) {
    try {
      const { data } = await apiClient.post("/auth/token", credentials);
      const token = data.token || data.access_token;

      localStorage.setItem("token", token);
      apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      await dispatch("Me");
    } catch (error) {
      localStorage.removeItem("token");
      delete apiClient.defaults.headers.common["Authorization"];
      throw error;
    }
  },

  async Me({ commit }) {
    try {
      const { data } = await apiClient.get("/auth/me");
      commit("setUser", data);
    } catch (error) {
      if (error.response?.status === 401) {
        commit("logout");
        localStorage.removeItem("token");
        delete apiClient.defaults.headers.common["Authorization"];
      }
    }
  },

  async getUser({ commit }, id) {
    try {
      const { data } = await apiClient.get(`/users/${id}`);
      commit("setUserById", data);
    } catch (error) {
      throw error;
    }
  },

  async getAllUsers({commit}){
    try{
      const {data} = await apiClient.get(`/users/admin`)
      commit('setUsers',data)
    }catch (error) {
      throw error;
    }
  },

  async editUser({ dispatch }, { userId, form }) {
    try {
      const { data } = await apiClient.put(`/users/${userId}`, form);
      await dispatch("Me")
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(_, id) {
    await apiClient.delete(`/users/${id}`);
  },
  async deleteUserAdmin({ dispatch }, id) {
    await apiClient.delete(`/users/${id}`);
    dispatch('getAllUsers')
  },

  async validatePassword(_, password){
    const { data } = await apiClient.post(`/auth/validate_password`, {password: password})
    return data
  },

  async logOut({ commit }) {
    commit("logout");
    localStorage.removeItem("token");
    delete apiClient.defaults.headers.common["Authorization"];
  },
  async createUserAdmin({ dispatch }, form) {

    await apiClient.post("/users", form);
    await dispatch('getAllUsers');
  },

  async editUserAdmin({ dispatch }, { userId, form }) {
    try {
      await apiClient.put(`/users/${userId}`, form);
      await dispatch("getUserAdmin", userId)
      await dispatch('getAllUsers')
    } catch (error) {
      throw error;
    }
  },

  async getUserAdmin({ commit }, id) {
    try {
      const { data } = await apiClient.get(`/users/admin/${id}`);
      commit("setUserEdit", data);
    } catch (error) {
      throw error;
    }
  },

  async toggleFollow({dispatch},userId){
    try{
      await apiClient.post(`/users/${userId}/follow`)
      await dispatch('getUser', userId)
    } catch (err) {
      console.error('Error following :', err)
    }
  }
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    state.userId = user.id;
    state.userRole = user.role;
  },
  setUsers(state,users){
    state.users = users;
  },
  setUserById(state, user) {
    state.usersById[user.id] = user;
  },
  setUserEdit(state,user){
    state.userEdit = user
  },
  logout(state) {
    state.user = null;
    state.userId = null;
    state.userRole = null;
    state.usersById = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
