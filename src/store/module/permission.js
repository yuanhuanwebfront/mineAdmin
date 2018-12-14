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

        actionList({commit}, list){
            commit('setList', list);
        }

    }


};

export default PERMISSION;
