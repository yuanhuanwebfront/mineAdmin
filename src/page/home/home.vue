<template>
    <div class="main-area">
        <el-container>
            <el-aside v-if="!$route.meta.hiddenBar">
                <sideBar></sideBar>
            </el-aside>
            <el-main :style="{'marginTop': $route.meta.hiddenBar ? '0' : '20px'}">
                <transition name="el-fade-in">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import sideBar from '../../components/sidebar';

    export default {
        name: "home",
        components: {
            sideBar
        },
        data() {
            return {}
        }
    }
</script>

<style lang="scss">

    .main-area{
        height: 100%;
        background: #f3f3f3;
    }

</style>
