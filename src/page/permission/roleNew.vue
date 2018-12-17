<template>
    <div class="form-content">
        <el-form ref="form" :model="sendParams" label-width="140px">

            <el-form-item label="角色名：">
                <el-input v-model="sendParams.role_name"></el-input>
            </el-form-item>

            <el-form-item label="角色描述：">
                <el-input v-model="sendParams.role_des"></el-input>
            </el-form-item>

            <el-form-item label="权限url：">
                <el-input v-model="sendParams.url"></el-input>
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
        name: "role-new",
        data(){
            return {
                sendParams: {
                    role_name: '',
                    role_des: '',
                    url: ''
                }
            }
        },
        created(){
            let roleId = this.$route.params.roleId;
            if(this.$route.params.roleId) this.getRoleInfo(roleId);
        },
        methods: {

            save(){
                let saveUrl = this.$route.params.roleId ? 'permission/save' : 'role/new';
                this.$http.commonReq('post', saveUrl, this.sendParams, res => {
                    this.$router.go(-1);
                })
            },

            getRoleInfo(roleId){
                this.$http.commonReq('post', 'role/edit', {role_id: roleId}, res => {
                    let result = res.result;
                    this.sendParams.role_name = result.role_name;
                    this.sendParams.role_id = result.role_id;
                    this.sendParams.role_des = result.role_des;
                    this.sendParams.url = result.role_per.join('&');
                })
            }
        }
    }
</script>

<style scoped>

</style>
