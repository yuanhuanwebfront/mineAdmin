import Vue from 'vue';
import vuex from 'vuex';

import user from './module/user';

Vue.use(vuex);

console.log(user);

export default new vuex.Store({
  modules: {
    user
  }
})
