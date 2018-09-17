const SIDEBAR_CONFIG = {

    state: {
        sidebarPath: "",
        showSideBar: true
    },

    getters: {

    },

    mutations: {
        changePath (newPath){
            state.sidebarPath = newPath;
        }
    },

    action: {

    }

};

export default SIDEBAR_CONFIG;
