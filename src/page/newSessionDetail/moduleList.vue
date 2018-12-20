<template>
    <div>
        <!--     -->
        <div v-if="$route.name === 'newSessionDetailModuleList'">

            <el-row :gutter="20">
                <el-col :span="5">
                    <el-button @click="addModule" type="primary" size="small" icon="el-icon-circle-plus-outline">新建模块</el-button>
                </el-col>
            </el-row>

            <!--    表格      -->
            <el-table border class="myTable" :data="tableData"
                      stype="width: 100%" highlight-current-row>
                <el-table-column prop="id" label="模块Id" width="300"></el-table-column>
                <el-table-column prop="name" label="模块名称" width="300"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="300">
                    <template slot-scope="scope">
                        {{scope.row.createTime * 1000 | date('yyyy-MM-dd hh:mm:ss')}}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="editUser(scope.row.id)" type="primary" title="编辑" icon="el-icon-edit-outline"></el-button>
                        <el-button type="danger" title="删除" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>

            </el-table>

        </div>

        <router-view v-if=" $route.name !== 'newSessionDetailModuleList'"></router-view>

    </div>
</template>

<script>
    export default {
        name: "module-list",
        data(){
            return {
                tableData: []
            }
        },
        created(){
            if(this.$route.name === 'newSessionDetailModuleList'){
            this.getList();
            }
        },
        beforeRouteUpdate(to, from, next){
            if(to.name === 'newSessionDetailModuleList') this.getList();
            next();
        },
        methods: {

            getList(){
                this.$http.getList('session/info', {template_type: 1}, this.handleList);
            },

            handleList(res){
                this.tableData = res.result;
            },

            addModule(){
                this.$router.push({name: 'newSessionDetailModuleNew'});
            },

            editUser(moduleId){
                this.$router.push({name: 'newSessionDetailModuleEdit', params: {moduleId}});
            }
        }
    }
</script>

<style scoped>

</style>
