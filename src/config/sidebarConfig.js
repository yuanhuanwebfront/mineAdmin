const SESSION_INDEX = 'sessionManage';
const ORDER_INDEX = 'orderManage';


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

const orderRoutes = {
    mainTitle: '订单管理',
    mainIndex: ORDER_INDEX,
    iconName: 'el-icon-document',
    childrenRoutes: [{
        path: '/order/dailyList',
        name: '每日订单列表'
    },{
        path: '/order/allOrderList',
        name: '训练营订单汇总'
    }]
};

export default [sessionRoutes, orderRoutes];
