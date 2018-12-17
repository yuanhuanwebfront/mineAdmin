const PERMISSION = {

    state: {

        permissionList: []


    },


    getters: {


    },


    mutations: {

        setList(state, list){
            state.permissionList = [...list];
        }

    },

    actions: {

        "ACTION_PERMISSION_LIST"({commit}, list){
            commit('setList', list);
        }

    }


};

export default PERMISSION;
