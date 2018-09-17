import Vue from 'vue';
import Router from 'vue-router';

import sessionRoutes from './module/sessionRouter';
import otherRoutes from './module/otherRoutes';

import utils from '../utils';

const LOGIN_PAGE_NAME = 'login';

Vue.use(Router);

let myRouter = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/session/list',
            component: () => import('../page/home/home.vue'),
            children: [
                ...sessionRoutes,
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
        next({path: './'})
    }else{
        next();
    }
});



export default myRouter;
