let otherRoutes = [{
    name: 'login',
    path: 'login',
    meta: {
        title: "登录",
        hiddenBar: true,
    },
    component: () => import('../../page/login/login.vue')
},{
    name: 'noAccess',
    path: 'noAccess',
    meta: {
        title: "你没有该权限",
        hiddenBar: true,
    },
    component: () => import('../../page/error/noAccessPage.vue')
}];

export default otherRoutes;
