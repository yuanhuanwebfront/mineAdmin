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
        component: () => import('../../page/operate/wechatBannerList.vue')
    }
];

export default operateRoutes;
