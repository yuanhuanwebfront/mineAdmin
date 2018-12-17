import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import request from '../api/api';


import sessionRoutes from './module/sessionRoutes';
import otherRoutes from './module/otherRoutes';
import orderRoutes from './module/orderRoutes';
import operateRoutes from './module/operateRoutes';
import permissionRoutes from './module/permissionRoutes';

import sidebarConfig from '../config/sidebarConfig';

import {checkLogin} from '../utils';

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
            redirect: 'session/list',
            component: () => import('../page/home/home.vue'),
            children: [
                ...sessionRoutes,
                ...orderRoutes,
                ...otherRoutes,
                ...operateRoutes,
                ...permissionRoutes
            ]
        }
    ],
    scrollBehavior() {
        return {x: 0, y: 0};
    }
});

myRouter.beforeEach((to, from, next) => {


    let hasLogin = checkLogin();

    if (!hasLogin && to.name !== LOGIN_PAGE_NAME) {
        next({name: LOGIN_PAGE_NAME});
    } else if (!hasLogin && to.name === LOGIN_PAGE_NAME) {
        next();
    } else if (hasLogin && to.name === LOGIN_PAGE_NAME) {
        next({path: '/'});
    } else {
        checkHasPermission().then(() => {
            next();
        });
    }
});

myRouter.afterEach(to => {

    let _this = myRouter.app,
        matchArr = to.matched;

    document.title = to.meta.title;

    _this.$store.commit('changePath', getSideBarPath(matchArr));
    _this.$store.commit('changeBreadCrumb', to.matched);

});

//  确保跳转没有配置在sidebar的路由也可以正确打开菜单
function getSideBarPath(matchArr) {

    let matchPath = '';

    sidebarConfig.forEach(({childrenRoutes}) => {
        childrenRoutes.forEach(item => {
            let findRouter = matchArr.find(route => route.path === item.path);
            if (findRouter) matchPath = findRouter.path;
        })
    });

    return matchPath;

}

//  再每次进入路由时判断是否存在权限列表
function checkHasPermission() {

    return new Promise((resolve, reject) => {
        if (store.state.PERMISSION.permissionList.length === 0) {
            request.commonReq('get', 'user/me', {}, res => {
                store.dispatch('ACTION_PERMISSION_LIST', res.result.permission_list);
                resolve();
            })
        } else {
            resolve();
        }

    })
}

export default myRouter;
