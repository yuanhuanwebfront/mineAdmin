let sessionRoutes = [
    {
        name: 'sessionList',
        path: 'session/list',
        meta: {
            title: "课程列表"
        },
        component: () => import('../../page/session/list.vue'),
        children: [{
            name: 'sessionNew',
            path: 'sessionNew',
            meta: {
                title: "创建课程"
            },
            component: () => import('../../page/session/sessionNew.vue')
        },{
            name: 'sessionEdit',
            path: 'sessionEdit/:id',
            meta: {
                title: "编辑课程"
            },
            component: () => import('../../page/session/sessionNew.vue')
        }]
    },
    {
        name: 'sessionCategoryList',
        path: 'session/categoryList',
        meta: {
            title: "课程分类列表"
        },
        component: () => import('../../page/session/category.vue')
    },
    {
        name: 'sessionVideoList',
        path: 'session/videoList',
        meta: {
            title: "视频列表"
        },
        component: () => import('../../page/session/video.vue')
    }
];

export default sessionRoutes;
