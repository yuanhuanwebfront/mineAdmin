import Vue from 'vue';
import vuex from 'vuex';

import SIDEBAR from './module/sidebar';


Vue.use(vuex);

export default new vuex.Store({
    modules: {
        SIDEBAR
    }
})
