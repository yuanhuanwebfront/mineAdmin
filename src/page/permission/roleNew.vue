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
                <el-row v-for="item in allRoutesInfo" :key="item.title" class="permission-module">
                    <el-tag>{{item.title}}</el-tag>
                    <el-checkbox-group v-model="item.checkList">
                        <el-checkbox :key="route.url" v-for="route in item.list" :label="route.url">{{route.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-row>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="save">确定</el-button>
                <el-button type="danger" @click="$router.go(-1)">取消</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>

    import module from '@/config/permissionConfig';

    let allRoutesInfo = [...module];

    allRoutesInfo.forEach(item => {
        item.checkList = [];
    });

    function transformUrl(routesInfo){
        let strArr = [];
        routesInfo.forEach(route => {
            strArr = [...route.checkList, ...strArr]
        });
        return strArr;
    }

    export default {
        name: "role-new",
        data(){
            return {
                sendParams: {
                    role_name: '',
                    role_des: '',
                    url: ''
                },
                allRoutesInfo: JSON.parse(JSON.stringify(allRoutesInfo))
            }
        },
        created(){
            console.log(this.allRoutesInfo);
            let roleId = this.$route.params.roleId;
            if(this.$route.params.roleId) this.getRoleInfo(roleId);
        },
        methods: {

            save(){
                this.sendParams.url = transformUrl(this.allRoutesInfo).join('&');
                let saveUrl = this.$route.params.roleId ? 'permission/save' : 'role/new';
                this.$http.commonReq('post', saveUrl, this.sendParams, res => {
                    this.$router.go(-1);
                })
            },

            reflectRoleToList(roleList){
                roleList.forEach(roleUrl => {
                    this.allRoutesInfo.forEach(info => {
                        if(info.list.find(route => route.url === roleUrl)){
                            info.checkList.push(roleUrl);
                        }
                    })
                });
            },

            getRoleInfo(roleId){
                this.$http.commonReq('post', 'role/edit', {role_id: roleId}, res => {
                    let result = res.result;
                    this.sendParams.role_name = result.role_name;
                    this.sendParams.role_id = result.role_id;
                    this.sendParams.role_des = result.role_des;
                    //  将后台传过来的权限列表一一映射到checkList中
                    this.reflectRoleToList(result.role_per);
                })
            }
        }
    }

</script>

<style scoped>
    .permission-module{
        padding: 20px;
        margin-bottom: 20px;
        border: 1px solid #d3d3d3;
    }
</style>
