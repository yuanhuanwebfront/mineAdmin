<template>
    <div class="header-nav-container" @command="handleCommand">
        <h2 class="pull-left">Daily Yoga</h2>
        <el-dropdown class="pull-right">
            <img class="el-dropdown-link" src="../assets/image/logo.png">
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="loginOut">退出账号</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <p class="pull-right user">{{userName}}</p>
    </div>
</template>

<script>
    import Cookie from 'js-cookie';

    export default {
        name: "head-nav",
        methods: {
            handleCommand(command){
                console.log(command);
            },

            loginOut(){
                let vm = this;
                this.$confirm('确定退出当前账号吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    Cookie.remove('access_token');
                    vm.$store.commit('setList', []);
                    window.location.reload();
                })
            }
        },
        computed: {
            userName(){
                return this.$store.state.PERMISSION.userName;
            }
        }
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
        p.user{
            color: #666;
            height: 40px;
            line-height: 40px;
            padding-right: 15px;
        }
    }
</style>
