const BASE_URL = '/admin/';

const permissionRoutes = [{
    name: 'permissionRoleList',
    path: 'permission/roleList',
    meta: {
        title: "角色列表",
        permission: BASE_URL + 'role/list'
    },
    component: () => import('../../page/permission/roleList.vue'),
    children: [{
        name: 'permissionRoleNew',
        path: 'permission/roleNew',
        meta: {
            title: "新建角色",
            permission: BASE_URL + 'role/new'
        },
        component: () => import('../../page/permission/roleNew.vue')
    }, {
        name: 'permissionRoleEdit',
        path: 'permission/roleEdit/:roleId',
        meta: {
            title: "编辑角色",
            permission: BASE_URL + 'role/edit'
        },
        component: () => import('../../page/permission/roleNew.vue')
    }]
}, {
    name: 'permissionUserList',
    path: 'permission/userList',
    meta: {
        title: "用户列表",
        permission: BASE_URL + 'user/list'
    },
    component: () => import('../../page/permission/userList.vue'),
    children: [{
        name: 'permissionUserNew',
        path: 'permission/userNew',
        meta: {
            title: "新建用户",
            permission: BASE_URL + 'user/new'
        },
        component: () => import('../../page/permission/userNew.vue')
    }, {
        name: 'permissionUserEdit',
        path: 'permission/userEdit/:userId',
        meta: {
            title: "编辑用户",
            permission: BASE_URL + 'user/edit'
        },
        component: () => import('../../page/permission/userNew.vue')
    }]
}];

export default permissionRoutes;
