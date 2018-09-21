const SIDEBAR_CONFIG = {

    state: {
        sidebarPath: "",
        breadcrumb: [],
        showSideBar: true
    },

    getters: {
        getBreadCrumbList(state) {
            return state.breadcrumb.map(({meta, path}) => {
                return {
                    title: meta.title,
                    path: path || '/'
                }
            })
        }
    },

    mutations: {

        changePath(state, newPath) {
            state.sidebarPath = newPath;
        },

        changeBreadCrumb(state, newArr) {
            state.breadcrumb = newArr;
        }
    },

    action: {}

};

export default SIDEBAR_CONFIG;
