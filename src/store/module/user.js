const user = {
  state: {
    num: 1,
    age: 30
  },

  getters: {},

  mutations: {
    changeAge: (state, newAge) => {
      state.age = newAge;
    }
  },

  actions: {}
};

export default user;
