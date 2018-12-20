<template>
    <div>
        <!--    v-if="$route.name === 'permissionUserList'" -->
        <div>
            <el-row :gutter="20">
                <el-col :span="5">
                    <el-button  type="primary" size="small" icon="el-icon-circle-plus-outline">新建模块</el-button>
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
                        <!--<el-button @click="editUser(scope.row.id)" type="primary" title="编辑" icon="el-icon-edit-outline"></el-button>-->
                        <!--<el-button type="danger" title="删除" icon="el-icon-delete"></el-button>-->
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <!--<router-view v-if=" $route.name !== 'permissionUserList' "></router-view>-->

    </div>
</template>

<script>
    export default {
        name: "list",
        data(){
            return {
                tableData: []
            }
        },
        created(){
            // if(this.$route.name === 'permissionRoleList'){
                this.getList();
            // }
        },
        beforeRouteUpdate(to, from, next){
            // if(to.name === 'permissionRoleList') this.getList();
            // next();
        },
        methods: {

            getList(){
                this.$http.getList('session/info', {}, this.handleList);
            },

            handleList(res){
                this.tableData = res.result;
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
