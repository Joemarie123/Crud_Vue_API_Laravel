import { createStore } from "vuex";
/* import postsModule from './posts'; */
import usersModule from './users';
/* import gradesModule from './grades'; */

const store = createStore({
  modules: {
  /*   posts: postsModule, */
    users: usersModule,
  /*   grades: gradesModule */
  }
});


export default store;