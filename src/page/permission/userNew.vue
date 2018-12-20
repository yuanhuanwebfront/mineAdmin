<template>
    <div class="form-content">
        <el-form ref="form" :model="sendParams" label-width="140px">

            <el-form-item label="角色类型：">
                <el-select v-model="sendParams.role_id">
                    <el-option v-for="item in roleList" :label="item.role_name"
                               :value="item.role_id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="用户名：">
                <el-input v-model="sendParams.an_name"></el-input>
            </el-form-item>

            <el-form-item label="用户邮箱：">
                <el-input v-model="sendParams.an_email"></el-input>
            </el-form-item>

            <el-form-item label="登录密码：">
                <el-input type="password" v-model="sendParams.an_pwd">
                    <el-button slot="append" title="显示密码" icon="el-icon-view"></el-button>
                </el-input>
            </el-form-item>

            <el-form-item label="额外权限路径：">
                <el-input v-model="sendParams.extra_url"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="save">确定</el-button>
                <el-button type="danger" @click="$router.go(-1)">取消</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "user-new",
        data(){
            return {
                sendParams: {
                    an_name: "",
                    an_email: "",
                    an_pwd: "",
                    role_id: "",
                    extra_url: ""
                },
                roleList: []
            }
        },
        created(){
            let id = this.$route.params.userId;
            this.getRoleList();
            if(id){
                this.$http.commonReq('post', 'user/edit', {an_id: id}, res => {
                    let result = res.result;
                    this.sendParams.an_name = result.Username;
                    this.sendParams.an_id = id;
                    this.sendParams.an_email = result.Email;
                    this.sendParams.role_id = result.RoleId;
                    this.sendParams.an_pwd = result.Pwd;
                    this.sendParams.extra_url = result.ExtraPer.join('&');
                })
            }
        },
        methods: {
            save(){
                let url = 'user/' + (this.sendParams.an_id ? 'update' : 'new');

                this.$http.commonReq('post', url, this.sendParams, res => {
                    this.$router.push({name: 'permissionUserList'});
                })
            },
            getRoleList(){
                this.$http.getList('role', {}, res => {
                    this.roleList = res.result;
                })
            }
        }
    }
</script>

<style scoped>

</style>
