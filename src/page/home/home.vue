<template>
    <div class="main-area">
        <el-container>
            <el-aside v-if="!$route.meta.hiddenBar">
                <sideBar></sideBar>
            </el-aside>
            <el-main :style="{'marginTop': $route.meta.hiddenBar ? '0' : '28px'}">
                <el-breadcrumb v-if="!$route.meta.hiddenBar" separator-class="el-icon-arrow-right" class="breadcrumb-area">
                    <el-breadcrumb-item v-for="item in breadcrumbList" :to="{path: item.path}">{{item.title}}</el-breadcrumb-item>
                </el-breadcrumb>
                <transition name="el-fade-in">
                    <router-view></router-view>
                </transition>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    import sideBar from '../../components/sidebar';
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
        background: #f3f3f3;
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
