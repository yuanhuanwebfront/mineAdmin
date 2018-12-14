<template>
    <div>
        <div v-if=" $route.name === 'permissionRoleList' ">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-button @click="addUser" type="primary" size="small" icon="el-icon-circle-plus-outline">新建用户</el-button>
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
                        <el-button @click="editUser(scope.row.id)" type="primary" title="编辑" icon="el-icon-edit-outline"></el-button>
                        <el-button type="danger" title="删除" icon="el-icon-delete"></el-button>
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
                this.$http.getList('role', {}, this.handleList);
            }
        },
        methods: {
            handleList(res){
                this.tableData = res.result
            },

            addUser(){
                this.$router.push({name: 'permissionUserNew'});
            },

            editUser(userId){
                this.$router.push({name: 'permissionUserEdit', params: {userId}});
            }
        }
    }
</script>

<style scoped>

</style>
