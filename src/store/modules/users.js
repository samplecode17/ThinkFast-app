import apiClient from "@/services/appClient";

const token = localStorage.getItem("token");
if (token) {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const state = {
  user: null,
  userId: null,
};

const getters = {
  isAuthenticated: (state) => !!state.user,
  stateUser: (state) => state.user,
  getUserId: (state) => state.userId,
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
      if (error.response && error.response.status === 401) {
        commit("logout");
        localStorage.removeItem("token");
        delete apiClient.defaults.headers.common["Authorization"];
      }
    }
  },

  async editUser(_, userId, form){
    const formData = new FormData();
    formData.append("first_name", form.first_name);
    formData.append("second_name", form.second_name);
    formData.append("username", form.username);
    formData.append("password", form.password);
    formData.append("email", form.email);
    formData.append("age", form.age);
    try{
      const {data} = await apiClient.put(`/users/${userId}`, formData);
      commit("setUser", data);
    }catch(error){
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
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    state.userId = user.id
  },
  logout(state) {
    state.user = null;
    state.userId = null;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
