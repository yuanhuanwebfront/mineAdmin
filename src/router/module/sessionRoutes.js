const BASE_URL = '/admin/';

let sessionRoutes = [
    //  课程列表tab
    {
        name: 'sessionList',
        path: 'session/list',
        meta: {
            title: "课程列表",
            permission: BASE_URL + 'o2_yoga/list'
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

    //  课程分类tab
    {
        name: 'sessionCategoryList',
        path: 'session/categoryList',
        meta: {
            title: "课程分类列表"
        },
        component: () => import('../../page/session/category.vue'),
        children: [{
            name: 'sessionCategoryNew',
            path: 'New',
            meta: {
                title: "创建分类"
            },
            component: () => import('../../page/session/categoryNew.vue')
        },{
            name: 'sessionCategoryEdit',
            path: 'edit/:id',
            meta: {
                title: "编辑分类"
            },
            component: () => import('../../page/session/categoryNew.vue')
        }]
    },

    //  课程视频tab
    {
        name: 'sessionVideoList',
        path: 'session/videoList',
        meta: {
            title: "视频列表"
        },
        component: () => import('../../page/session/video.vue')
    },

    //  老师管理
    {
        name: 'sessionTeacherList',
        path: 'session/teacherList',
        meta: {
            title: '老师管理'
        },
        component: () => import('../../page/session/teacher.vue')
    }
];

export default sessionRoutes;
