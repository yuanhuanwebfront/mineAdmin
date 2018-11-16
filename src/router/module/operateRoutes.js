let operateRoutes = [
    {
        name: 'bannerTagList',
        path: 'operate/bannerTagList',
        meta: {
            title: "banner标签列表"
        },
        component: () => import('../../page/operate/bannerTagList.vue')
    },

    {
        name: 'wechatBannerList',
        path: 'operate/wechatBannerList',
        meta: {
            title: "微信banner配置"
        },
        component: () => import('../../page/operate/wechatBannerList.vue'),
        children: [
            {
                name: 'wechatBannerAdd',
                path: 'wechatBannerAdd',
                meta: {
                    title: "添加微信banner"
                },
                component: () => import('../../page/operate/wechatBannerAdd.vue')
            }, {
                name: 'wechatBannerEdit',
                path: 'wechatBannerEdit/:id',
                meta: {
                    title: "编辑微信banner"
                },
                component: () => import('../../page/operate/wechatBannerAdd.vue')
            }]
    },

    {
        name: 'voucherList',
        path: 'operate/voucherList',
        meta: {
            title: '优惠券列表'
        },
        component: () => import('../../page/operate/voucherList.vue'),
        children: [
            {
                name: 'voucherNew',
                path: 'new',
                meta: {
                    title: "新增优惠券"
                },
                component: () => import('../../page/operate/voucherNew.vue')
            },{
                name: 'voucherEdit',
                path: 'edit/:id',
                meta: {
                    title: "编辑优惠券"
                },
                component: () => import('../../page/operate/voucherNew.vue')
            },{
                name: 'voucherRecord',
                path: 'voucherRecord',
                meta: {
                    title: "优惠券发送列表"
                },
                component: () => import('../../page/operate/voucherRecord.vue')
            }
        ]
    },
];

export default operateRoutes;
