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
            },{
                name: 'wechatBannerEdit',
                path: 'wechatBannerEdit/:id',
                meta: {
                    title: "编辑微信banner"
                },
                component: () => import('../../page/operate/wechatBannerAdd.vue')
            }]
    }
];

export default operateRoutes;
