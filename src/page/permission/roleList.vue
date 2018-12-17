<template>
    <div>
        <div v-if=" $route.name === 'permissionRoleList' ">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-button @click="addRole" type="primary"
                               size="small" icon="el-icon-circle-plus-outline">新建角色</el-button>
                </el-col>
            </el-row>

            <!--    表格      -->
            <el-table border class="myTable" :data="tableData"
                      stype="width: 100%" highlight-current-row>
                <el-table-column prop="role_id" label="角色Id" width="300"></el-table-column>
                <el-table-column prop="role_name" label="角色名" width="300"></el-table-column>
                <el-table-column prop="role_des" label="角色描述" width="300"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" @click="editUser(scope.row.role_id)" type="primary" title="编辑" icon="el-icon-edit-outline">编辑</el-button>
                        <el-button size="small" type="danger" title="删除" icon="el-icon-delete">删除</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <router-view v-if=" $route.name !== 'permissionRoleList' "></router-view>
    </div>

</template>

<script>
    export default {
        name: "role-list",
        data(){
            return {
                tableData: []
            }
        },
        created(){
            if(this.$route.name === 'permissionRoleList'){
                this.getList();
            }
        },
        beforeRouteUpdate(to, from, next){
            if(to.name === 'permissionRoleList') this.getList();
            next();
        },
        methods: {

            getList(){
                this.$http.getList('role', {}, this.handleList);
            },

            handleList(res){
                this.tableData = res.result
            },

            addRole(){
                this.$router.push({name: 'permissionRoleNew'});
            },

            editUser(roleId){
                this.$router.push({name: 'permissionRoleEdit', params: {roleId}});
            }
        }
    }
</script>

<style scoped>

</style>
