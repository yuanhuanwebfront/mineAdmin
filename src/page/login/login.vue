<template>
    <div class="login-area">
        <div class="login-box">

            <div class="input-area flex">
                <label>用户名：</label>
                <el-input v-model="userInfo.an_name" size="medium" placeholder="请输入用户名" prefix-icon="el-icon-date"></el-input>
            </div>

            <div class="input-area flex">
                <label>密码：</label>
                <el-input v-model="userInfo.an_pwd" size="medium" type="password" placeholder="请输入密码" prefix-icon="el-icon-date"></el-input>
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
                    an_name: 'test1',
                    an_pwd: '123'
                }
            }
        },
        methods: {
            login(){
                this.$http.login(this.userInfo, this.loginSuccess)
            },
            loginSuccess(data){
                Cookie.set('access_token', data.result.token);
                this.$store.dispatch('actionList', data.result.permission_list);
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
                .el-input{
                	width: 300px;
                }
            }
            .login-btn {
                display: block;
                width: 240px;
                margin: 30px auto;
                font-size: 16px;
            }
        }
    }
</style>
