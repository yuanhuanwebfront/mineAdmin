import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import request from '../api/api';

import sessionRoutes from './module/sessionRoutes';
import otherRoutes from './module/otherRoutes';
import orderRoutes from './module/orderRoutes';
import operateRoutes from './module/operateRoutes';
import permissionRoutes from './module/permissionRoutes';
import newSessionDetailRoutes from './module/newSessionDetailRoutes';

import sidebarConfig from '../config/sidebarConfig';

import {checkLogin} from '../utils';

const LOGIN_PAGE_NAME = 'login';
const NO_ACCESS_PAGE_NAME = 'noAccess';

Vue.use(Router);

let myRouter = new Router({
    routes: [
        {
            path: '/',
            name: 'home',
            meta: {
                title: '首页',
                isHome: true
            },
            component: () => import('../page/home/home.vue'),
            children: [
                ...sessionRoutes,
                ...orderRoutes,
                ...otherRoutes,
                ...operateRoutes,
                ...permissionRoutes,
                ...newSessionDetailRoutes
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
        checkHasPermission().then(() => {
            next({path: '/'});
        });
    } else if(hasLogin && to.name === NO_ACCESS_PAGE_NAME){
        next();
    }else {
        checkHasPermission().then(() => {
            let hasPermission = checkPermissionIsAllow(to);
            next();
            if(hasPermission){
                next();
            }else{
                next({path: '/noAccess'});
            }
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

//  每次进入路由时判断是否存在权限列表
function checkHasPermission() {

    return new Promise((resolve, reject) => {
        if (store.state.PERMISSION.permissionList.length === 0) {
            request.commonReq('get', 'user/me', {}, res => {
                store.dispatch('ACTION_PERMISSION_LIST', res.result.permission_list);
                store.dispatch('ACTION_SET_USERNAME', res.result.name);
                resolve();
            })
        } else {
            resolve();
        }

    })
}

//  每次进入路由之前权限列表中是否存在该权限
function checkPermissionIsAllow(to){
    return store.state.PERMISSION.permissionList.indexOf(to.meta.permission) !== -1 || to.meta.isHome;
    // return true;
}

export default myRouter;
