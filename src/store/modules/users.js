import apiClient from "@/services/appClient";

const token = localStorage.getItem("token");
if (token) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}
const state = {
  user: null,
  usersById: {},
  userId: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  stateUser: (state) => state.user,
  getUserId: (state) => state.userId,
  getUserById: (state) => (id) => state.usersById[id] || null,
};

const actions = {
  async register({ dispatch }, form) {
    const formData = new FormData();
    formData.append("first_name", form.first_name);
    formData.append("second_name", form.second_name);
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("email", form.email);
    formData.append("age", form.age);

    await apiClient.post("/users", formData);
    await dispatch("login", form);
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


  async editUser({ commit }, { userId, form }) {
    const formData = new FormData();
    formData.append("first_name", form.first_name);
    formData.append("second_name", form.second_name);
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("email", form.email);
    formData.append("age", form.age);

    try {
      const { data } = await apiClient.put(`/users/${userId}`, formData);
      commit("setUser", data);
      commit("setUserById", data);
    } catch (error) {
      throw error;
    }
  },

  async deleteUser(_, id) {
    await apiClient.delete(`/users/${id}`);
  },

  async logOut({ commit }) {
    commit("logout");
    localStorage.removeItem("token");
    delete apiClient.defaults.headers.common["Authorization"];
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
  },
  setUserById(state, user) {
    state.usersById[user.id] = user;
  },
  logout(state) {
    state.user = null;
    state.userId = null;
    state.usersById = {};
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
