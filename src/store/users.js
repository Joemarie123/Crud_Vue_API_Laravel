import axios from 'axios';

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

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
  }
}

const actions = {

  async fetchUsers({commit}){
    let res = await axios.get(`http://127.0.0.1:8000/api/employees`);
    commit('setUsers', res.data);
  },
 


  async registration({commit}, payload){
    let res = await axios.post('http://127.0.0.1:8000/api/save', payload);
   /*  let res = await axios.post(`${process.env.VUE_APP_API_URL}/save`, payload); */
    localStorage.setItem('auth', JSON.stringify(res.data.user[0]));
    commit('setAuth', res.data.user[0]);
  },


/*   async deleteemployee({}, payload) {
    let form = new FormData();
    form.append('id', payload);
    let res = await axios.post('http://127.0.0.1:8000/api/delete', form);

    return res.data;
  },
 */
    
/*   async deleteGrade({}, payload) {
    let form = new FormData();
    form.append('id', payload);
    let res = await axios.post('http://127.0.0.1:8000/api/delete/1', form);

    return res.data;
  },
 */

  async deleteGrade({}, payload) {
    try {
      let form = new FormData();
      form.append('id', payload); // Assuming payload is the grade ID to delete

      let res = await axios.post('http://127.0.0.1:8000/api/delete/${employee.id}', form);

      return res.data;
    } catch (error) {
      // Handle error if needed
      console.error(error);
      throw error;
    }
  },


/*   async login({commit}, payload){
    let res = await axios.post('/login.php', payload);

    if (res.data.users.length == 0)
      return res.data.users.length;

    localStorage.setItem('auth', JSON.stringify(res.data.users[0]));
    commit("setAuth", res.data.users[0]);

    return 1;
  } */


}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}