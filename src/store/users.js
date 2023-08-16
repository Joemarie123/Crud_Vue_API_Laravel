import axios from 'axios';

/* axios.defaults.baseURL = process.env.VUE_APP_API_URL; */

const state = () => ({
  users: [],
  auth: {},
 
})

const getters = {
  getUsers(state) {
    return state.users;
  },
  getAuth(state){
    return state.auth;
  }
}

const mutations = {
  setUsers(state, payload){
    state.users = payload;
  },

  setAuth(state, payload){
    state.auth = payload;
  },

  
}

const actions = {
  
  async fetchUsers({commit}){
   let res = await axios.get(`http://127.0.0.1:8000/api/employees`); 
 /*  let res = await axios.get(`${process.env.VUE_APP_API_URL}/employees`);  */
   /*  let res = await axios.get(`/employees.php`); */
    commit('setUsers', res.data);
  },

  
  async registration({commit}, payload){
    let res = await axios.post('http://127.0.0.1:8000/api/save', payload);
    localStorage.setItem('auth', JSON.stringify(res.data.user[0]));
    commit('setUsers', res.data.user[0]);
  },


  async deleteItem({ commit }, id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/delete/${id}`); // Replace with your API endpoint
      commit('setAuth', id);
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }, 
  

  async updateUser({ commit, dispatch }, updatedData) {
    try {
      const { id, name, address, mobile } = updatedData;
      await axios.post(`http://127.0.0.1:8000/api/update/${id}`, {
        name,
        address,
        mobile,
      });
      commit('setAuth', id);
      dispatch('fetchUsers');

    } catch (error) {
      console.error('Error updating user:', error);
    }
  },


}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}