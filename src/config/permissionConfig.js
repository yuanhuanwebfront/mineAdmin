const BASE_URL = '/admin/';

const PERMISSION_LIST = {
    title: '权限管理模块',
    list: [{
        name: '角色列表',
        url: BASE_URL + 'role/list'
    },{
        name: '新建角色',
        url: BASE_URL + 'role/new'
    },{
        name: '查看角色',
        url: BASE_URL + 'role/edit'
    },{
        name: '更新角色',
        url: BASE_URL + 'permission/save'
    },{
        name: '用户列表',
        url: BASE_URL + 'user/list'
    },{
        name: '新建用户',
        url: BASE_URL + 'user/new'
    },{
        name: '查看用户',
        url: BASE_URL + 'user/edit'
    },{
        name: '更新用户',
        url: BASE_URL + 'user/update'
    },{
        name: '禁止用户登录',
        url: BASE_URL + 'user/forbidden'
    }]
};

const NEW_SESSION_LIST = {
    title: '新课程详情模块',
    list: [{
        name: '课程列表',
        url: BASE_URL + 'session/list'
    },{
        name: '模块列表',
        url: BASE_URL + 'session/info/list'
    },{
        name: '新增模块',
        url: BASE_URL + 'session/info/save'
    },{
        name: '模块元素列表',
        url: BASE_URL + 'session/style/list'
    },{
        name: '查看模块信息',
        url: BASE_URL + 'session/info/get'
    },{
        name: '更新模块信息',
        url: BASE_URL + 'session/info/set'
    },{
        name: '获取模块元素列表',
        url: BASE_URL + 'session/model/list'
    },{
        name: '新增模块元素',
        url: BASE_URL + 'session/model/save'
    },{
        name: '查看元素详情',
        url: BASE_URL + 'session/model/get'
    },{
        name: '更新元素详情',
        url: BASE_URL + 'session/model/set'
    }]
};

const COMMON_LIST = {
    title: '通用模块',
    list: [{
        name: '获取七牛token',
        url: BASE_URL + 'comm/qiniu/simple'
    }]
};

export default [PERMISSION_LIST, NEW_SESSION_LIST, COMMON_LIST]

