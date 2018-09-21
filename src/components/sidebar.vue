<template>

    <el-menu class="menu-area" :collapse="sideBarCollapse"
             :unique-opened="isUniqOpen" :default-active="activePath"
             text-color="#333333" active-text-color="#04A9FB" :router="isRouteUse">
        <el-submenu v-for="config in sidebarConfig" index="1">
            <template slot="title">
                <i :class="config.iconName"></i>
                <span>{{config.mainTitle}}</span>
            </template>
            <el-menu-item-group>
                <el-menu-item :index="item.path" v-for="item in config.childrenRoutes">{{item.name}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>

</template>

<script>

    import routesConfig from '../config/sidebarConfig';

    export default {

        name: "sidebar",

        data() {
            return {
                sideBarCollapse: false,
                isUniqOpen: true,
                isRouteUse: true,
                sidebarConfig: routesConfig
            }
        },

        methods: {

            toggleCollapse() {
                this.sideBarCollapse = !this.sideBarCollapse;
            }
        },

        computed: {
            activePath (){
                return this.$store.state.SIDEBAR.sidebarPath
            }
        }

    }

</script>

<style lang="scss">
    @import '../style/common';

    .menu-area {
        max-width: 250px;
        margin: 30px 0 30px 10px;
        border-radius: 5px;
        box-shadow: 0 0 2px 2px #e5e5e5;
        .collapse {
            padding: 5px 0;
            text-align: center;
            background: $tipColor;
            color: #fff;
            border-top-left-radius: 5px;
            border-top-right-radius: 5px;
        }
    }
</style>
