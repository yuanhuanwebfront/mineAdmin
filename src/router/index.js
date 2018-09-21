import Vue from 'vue';
import Router from 'vue-router';

import sessionRoutes from './module/sessionRouter';
import otherRoutes from './module/otherRoutes';
import orderRoutes from './module/orderRoutes';

import utils from '../utils';

const LOGIN_PAGE_NAME = 'login';

Vue.use(Router);

let myRouter = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                title: '首页'
            },
            component: () => import('../page/home/home.vue'),
            children: [
                ...sessionRoutes,
                ...orderRoutes,
                ...otherRoutes
            ]
        }
    ],
    scrollBehavior() {
        return {x: 0, y: 0};
    }
});

myRouter.beforeEach((to, from, next) => {
    let hasLogin = utils.checkLogin();

    if (!hasLogin && to.name !== LOGIN_PAGE_NAME) {
        next({name: LOGIN_PAGE_NAME});
    } else if(!hasLogin && to.name === LOGIN_PAGE_NAME){
        next()
    }else if(hasLogin && to.name === LOGIN_PAGE_NAME){
        next({path: '/'})
    }else{
        next();
    }
});

myRouter.afterEach(to => {
    let _this = myRouter.app;
    document.title = to.meta.title;
    _this.$store.commit('changePath', to.path);
    _this.$store.commit('changeBreadCrumb', to.matched);
});

export default myRouter;
