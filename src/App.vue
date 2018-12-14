<template>
    <div id="app">
        <head-nav v-if="!$route.meta.hiddenBar"></head-nav>
        <router-view/>
    </div>
</template>

<script>
    import headNav from './layout/head-nav';
    export default {
        name: 'App',
        components: {
            headNav
        }
    }
</script>

<style>
</style>
