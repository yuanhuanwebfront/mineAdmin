let otherRoutes = [{
    name: 'login',
    path: 'login',
    meta: {
        title: "登录",
        hiddenBar: true,
    },
    component: () => import('../../page/login/login.vue')
}];

export default otherRoutes;
