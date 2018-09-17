import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import filter from './filter/filter';
import $http from './api/api';

Object.keys(filter).forEach(key => {
    Vue.filter(key, filter[key])
});

Vue.config.productionTip = false;
Vue.prototype.$http = $http;

import elementUi from 'element-ui';

import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import "./style/reset.css";

Vue.use(elementUi);

new Vue({
    el: '#app',
    store,
    router,
    components: {App},
    template: '<App/>'
});
