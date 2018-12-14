const permissionRoutes = [{
    name: 'permissionRoleList',
    path: 'permission/roleList',
    meta: {
        title: "角色列表"
    },
    component: () => import('../../page/permission/roleList.vue')
},{
    name: 'permissionUserList',
    path: 'permission/userList',
    meta: {
        title: "用户列表"
    },
    component: () => import('../../page/permission/userList.vue'),
    children:[{
        name: 'permissionUserNew',
        path: 'permission/userNew',
        meta: {
            title: "新建用户"
        },
        component: () => import('../../page/permission/userNew.vue')
    },{
        name: 'permissionUserEdit',
        path: 'permission/userEdit/:userId',
        meta: {
            title: "编辑用户"
        },
        component: () => import('../../page/permission/userNew.vue')
    }]
}];

export default permissionRoutes;
