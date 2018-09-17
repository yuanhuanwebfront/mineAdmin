const SESSION_INDEX = 'sessionManage';


const sessionRoutes = {
    mainTitle: '课程管理',
    mainIndex: SESSION_INDEX,
    iconName: 'el-icon-tickets',
    childrenRoutes: [{
        path: '/session/list',
        name: '课程列表'
    },{
        path: '/session/categoryList',
        name: '课程分类'
    },{
        path: '/session/videoList',
        name: '视频列表'
    }]
};

export default [sessionRoutes];
