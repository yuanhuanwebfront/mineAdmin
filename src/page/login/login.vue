<template>
    <div class="login-area">
        <div class="login-box">

            <div class="input-area flex">
                <label>用户名：</label>
                <el-input v-model="userInfo.username" size="medium" placeholder="请输入用户名" prefix-icon="el-icon-date"></el-input>
            </div>

            <div class="input-area flex">
                <label>密码：</label>
                <el-input v-model="userInfo.password" size="medium" type="password" placeholder="请输入密码" prefix-icon="el-icon-date"></el-input>
            </div>

            <el-button class="login-btn" type="primary" @click="login">登录</el-button>

        </div>
    </div>
</template>

<script>
    import Cookie from 'js-cookie';

    export default {
        name: "login",
        data(){
            return {
                userInfo: {
                    username: 'admin',
                    password: 'wtfhhuaectk'
                }
            }
        },
        methods: {
            login(){
                this.$http.login(this.userInfo, this.loginSuccess)
            },
            loginSuccess(data){
                Cookie.set('SADMIN', data.data.s_admin);
                Cookie.set('UADMIN', data.data.u_admin);
                this.$router.push('/');
            }
        }
    }
</script>

<style lang="scss">
    @import "../../style/common";

    .login-area {
        position: relative;
        background: $bgColor;
        height: 100%;
        .login-box {
            padding: 20px;
            border-radius: 10px;
            background: $mainColor;
            @include abCenter(400px, 240px);
            label {
                width: 70px;
                text-align: right;
                color: #666;
            }
            .input-area {
                margin-top: 30px;
            }
            .login-btn {
                display: block;
                width: 240px;
                margin: 30px auto;
            }
        }
    }
</style>
