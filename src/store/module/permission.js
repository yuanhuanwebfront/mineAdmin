const PERMISSION = {

    state: {
        permissionList: [],
        userName: ""
    },


    getters: {


    },


    mutations: {

        setList(state, list){
            state.permissionList = [...list];
        },

        setUserName(state, name){
            state.userName = name;
        }

    },

    actions: {

        "ACTION_PERMISSION_LIST"({commit}, list){
            commit('setList', list);
        },

        "ACTION_SET_USERNAME" ({commit}, name){
            commit('setUserName', name);
        }

    }


};

export default PERMISSION;
