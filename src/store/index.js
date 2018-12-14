import Vue from 'vue';
import vuex from 'vuex';

import SIDEBAR from './module/sidebar';
import PERMISSION from './module/permission';


Vue.use(vuex);

export default new vuex.Store({
    modules: {
        SIDEBAR,
        PERMISSION
    }
})
