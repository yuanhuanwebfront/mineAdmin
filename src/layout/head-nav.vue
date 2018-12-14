<template>
    <div class="header-nav-container">
        <h2 class="pull-left">Daily Yoga</h2>
        <img class="pull-right" src="../assets/image/logo.png">
    </div>
</template>

<script>
    export default {
        name: "head-nav"
    }
</script>

<style lang="scss">
    .header-nav-container{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        z-index: 999;
        height: 70px;
        padding: 0 15px;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1);
        background: #fff;
        margin-bottom: 5px;
        h2{
            margin: 0;
            padding: 0;
            height: 70px;
            line-height: 70px;
            color: #5B9BD1;
            font-size: 30px;
        }
        img{
            margin-top: 15px;
            width: 40px;
            height: 40px;
        }
    }
</style>
