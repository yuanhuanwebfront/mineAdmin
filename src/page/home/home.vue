<template>
    <div class="main-area" :style="{'margin-top': !$route.meta.hiddenBar ? '75px' : '0'}">
        <el-container>
            <el-aside v-if="!$route.meta.hiddenBar" style="width: 270px;">
                <sideBar></sideBar>
            </el-aside>
            <el-main style="box-sizing: border-box;" :style="{'padding': $route.meta.hiddenBar ? '0' : '15px 10px 0 20px'}">
                <el-breadcrumb v-if="!$route.meta.hiddenBar" separator-class="el-icon-arrow-right" class="breadcrumb-area">
                    <el-breadcrumb-item v-for="item in breadcrumbList" :to="{path: item.path}">{{item.title}}</el-breadcrumb-item>
                </el-breadcrumb>
                <transition name="fade">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import sideBar from '../../layout/sidebar';
    import {mapGetters} from 'vuex';

    export default {
        name: "home",
        components: {
            sideBar
        },
        data() {
            return {}
        },
        computed: {
            ...mapGetters({
                breadcrumbList: 'getBreadCrumbList'
            })
        }
    }
</script>

<style lang="scss">

    @import '../../style/common';

    .main-area{
        height: 100%;
        background: #fcfcfc;
    }
    .main-title{
        font-size: 24px;
        font-weight: 500;
        color: $tipColor;
    }
    .breadcrumb-area{
        margin-bottom: 20px;
    }

</style>
