<template>
  <div>
    <h2>{{userAge}}</h2>
    <button @click="changeAge(2)">aaddsad</button>
  </div>
</template>

<script>
  export default {
    name: "home",
    computed: {
      userAge (){
        return this.$store.state.user.age || '0'
      }
    },
    methods: {
      changeAge (age){
        this.$store.commit('changeAge', age);
      }
    }
  }
</script>

<style scoped>

</style>
