<template>
    <div class="access-box center">
        <div class="lock"></div>
        <p class="desc">你没有当前页面的访问权限</p>
    </div>
</template>

<script>
    export default {
        name: "no-access-page"
    }
</script>

<style scoped>
    .access-box {
        width: 100%;
        height: 100%;
        padding-top: 200px;
        background: #ececec;
    }

    .lock {
        width: 100%;
        height: 170px;
        background: url("http://qiniucdn.dailyyoga.com.cn/74/90/7490eb4dc5c0bb970a8f2553a7004ed8.png") no-repeat center center;
        background-size: 210px 170px;
    }
    .desc{
        font-size: 20px;
        margin-top: 40px;
    }
</style>
