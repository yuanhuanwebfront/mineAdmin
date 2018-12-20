const BASE_URL = '/admin/';

const newSessionDetailRoutes = [{
    name: 'newSessionDetailList',
    path: 'newSessionDetail/list',
    meta: {
        title: "课程详情列表",
        permission: BASE_URL + 'session/list'
    },
    component: () => import('../../page/newSessionDetail/list.vue')
},{
    name: 'newSessionDetailModuleList',
    path: 'newSessionDetail/moduleList',
    meta: {
        title: "模块列表",
        permission: BASE_URL + 'session/info/list'
    },
    component: () => import('../../page/newSessionDetail/moduleList.vue'),
    children:[{
        name: 'newSessionDetailModuleNew',
        path: 'newSessionDetail/moduleNew',
        meta: {
            title: "新增模块",
            permission: BASE_URL + 'session/info/save'
        },
        component: () => import('../../page/newSessionDetail/moduleNew.vue'),
    },{
        name: 'newSessionDetailModuleEdit',
        path: 'newSessionDetail/moduleEdit/:moduleId',
        meta: {
            title: "编辑模块",
            permission: BASE_URL + 'session/info/get'
        },
        component: () => import('../../page/newSessionDetail/moduleNew.vue'),
    }]
},{
    name: 'newSessionDetailElementList',
    path: 'newSessionDetail/elementList',
    meta: {
        title: "元素列表",
        permission: BASE_URL + 'session/model/list'
    },
    component: () => import('../../page/newSessionDetail/elementList.vue'),
    children: [{
        name: 'newSessionDetailElementNew',
        path: 'newSessionDetail/elementNew',
        meta: {
            title: "新增元素",
            permission: BASE_URL + 'session/model/save'
        },
        component: () => import('../../page/newSessionDetail/elementNew.vue')
    },{
        name: 'newSessionDetailElementEdit',
        path: 'newSessionDetail/elementEdit/:id',
        meta: {
            title: "编辑元素",
            permission: BASE_URL + 'session/model/get'
        },
        component: () => import('../../page/newSessionDetail/elementNew.vue')
    }]
}];

export default newSessionDetailRoutes;
