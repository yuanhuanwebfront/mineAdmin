<template>

    <el-menu class="menu-area" :collapse="sideBarCollapse" background-color="#fcfcfc"
             :unique-opened="isUniqOpen" :default-active="activePath"
             text-color="#333" active-text-color="#8CA5FF" :router="isRouteUse">
        <el-submenu v-for="config in sidebarConfig" :index="config.mainIndex" v-if="config.showTab">
            <template slot="title">
                <i :class="config.iconName"></i>
                <span>{{config.mainTitle}}</span>
            </template>
            <el-menu-item-group>
                <!--    v-if="permissionList.indexOf(item.permissionInfo) !== -1"   -->
                <el-menu-item v-if="permissionList.indexOf(item.permissionInfo) !== -1"  :index="item.path" v-for="item in config.childrenRoutes">{{item.name}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>

</template>

<script>

    import sidebarConfig from '../config/sidebarConfig';

    export default {

        name: "sidebar",

        data() {
            return {
                sideBarCollapse: false,
                isUniqOpen: false,
                isRouteUse: true,
                sidebarConfig: [],
            }
        },

        mounted(){
            sidebarConfig.forEach(item => {
                item.showTab = !!item.childrenRoutes.map(route => route.permissionInfo)
                                .find(per => this.$store.state.PERMISSION.permissionList.indexOf(per) !== -1);
            });
            this.sidebarConfig = [...sidebarConfig];
        },

        methods: {

            toggleCollapse() {
                this.sideBarCollapse = !this.sideBarCollapse;
            }


        },

        computed: {

            activePath (){
                return this.$store.state.SIDEBAR.sidebarPath
            },

            permissionList(){
                return [...this.$store.state.PERMISSION.permissionList];
            }

        }

    }

</script>

<style lang="scss">
    @import '../style/common';

    .menu-area {
        box-sizing: border-box;
        max-width: 250px;
        margin: 10px 0 30px 10px !important;
        border-radius: 10px;
        box-shadow: 0 0 2px 2px #e5e5e5;
        .collapse {
            padding: 5px 0;
            text-align: center;
            background: $tipColor;
            color: #fff;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
        }
    }
</style>
