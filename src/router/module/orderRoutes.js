const orderRoutes = [{
    name: 'orderDailyList',
    path: 'order/dailyList',
    meta: {
        title: "每日订单列表"
    },
    component: () => import('../../page/order/dailyList.vue')
}, {
    name: 'allOrderList',
    path: 'order/allOrderList',
    meta: {
        title: "训练营订单汇总"
    },
    component: () => import('../../page/order/allOrderList.vue')
}];

export default orderRoutes;
