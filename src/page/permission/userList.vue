<template>
    <div>
        <div v-if=" $route.name === 'permissionUserList' ">
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-button @click="addUser" type="primary" size="small" icon="el-icon-circle-plus-outline">新建用户</el-button>
                </el-col>
            </el-row>

            <!--    表格      -->
            <el-table border class="myTable" :data="tableData"
                      stype="width: 100%" highlight-current-row>
                <el-table-column prop="id" label="用户Id" width="300"></el-table-column>
                <el-table-column prop="name" label="用户名" width="300"></el-table-column>
                <el-table-column prop="email" label="邮箱" width="300"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="editUser(scope.row.id)" type="primary" title="编辑" icon="el-icon-edit-outline"></el-button>
                        <el-button @click="forbiddenUser(scope.row.id)" type="danger" title="禁用" class="icon iconfont el-icon-new-forbidden"></el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <router-view v-if=" $route.name !== 'permissionUserList' "></router-view>

    </div>
</template>

<script>
    export default {
        name: "user-list",
        data(){
            return {
                tableData: []
            }
        },
        beforeRouteUpdate(to, from, next){
            if(to.name === 'permissionUserList') this.$http.getList('user', {}, this.handleList);
            next();
        },
        created(){
            if(this.$route.name === 'permissionUserList'){
                this.$http.getList('user', {}, this.handleList);
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
            },

            forbiddenUser(an_id){
                this.$http.commonReq('post', 'user/forbidden', {an_id}, res => {
                    this.$message({
                        message: '禁用成功',
                        type: 'success'
                    })
                })
            }

        }
    }
</script>

<style scoped>

</style>
