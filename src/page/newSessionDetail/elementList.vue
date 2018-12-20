<template>
    <div>
        <div v-if="$route.name === 'newSessionDetailElementList'">

            <el-row :gutter="20">
                <el-col :span="5">
                    <el-button @click="addElement" type="primary" icon="el-icon-circle-plus-outline">新建元素</el-button>
                </el-col>
                <el-col :span="12">
                    <div class="space"></div>
                </el-col>
                <el-col :span="4">
                    <el-select v-model="searchParams.yoga_o2_session_model_style_id" placeholder="请选择元素类型">
                        <el-option v-for="item in styleList" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="3">
                    <el-button @click="searchList" type="primary" icon="el-icon-search">搜索</el-button>
                </el-col>
            </el-row>

            <!--    表格      -->
            <el-table border class="myTable" :data="tableData"
                      stype="width: 100%" highlight-current-row>
                <el-table-column prop="id" label="元素Id" width="300"></el-table-column>
                <el-table-column prop="name" label="元素名称" width="300"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="300">
                    <template slot-scope="scope">
                        {{scope.row.createTime * 1000 | date('yyyy-MM-dd hh:mm:ss')}}
                    </template>
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="editElement(scope.row.id)" type="primary" title="编辑" icon="el-icon-edit-outline"></el-button>
                        <el-button type="danger" title="删除" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>

            </el-table>

        </div>

        <router-view v-if=" $route.name !== 'newSessionDetailElementList'"></router-view>

    </div>
</template>

<script>
    export default {
        name: "element-list",
        data(){
            return {
                tableData: [],
                styleList: [],
                searchParams: {
                    yoga_o2_session_model_style_id: ''
                }
            }
        },
        created(){
            this.getStyleList();
        },
        methods: {
            //  获取样式列表
            getStyleList(){
                this.$http.getList('session/style', {template_type: 1}, this.handleStyleList);
            },
            handleStyleList({result}){
                this.styleList = [...result];
            },
            //  获取某个样式下对应元素列表
            searchList(){
                this.$http.getList('session/model', this.searchParams, this.handleElementList)
            },
            handleElementList({result}){
                this.tableData = [...result];
            },

            addElement(){
                this.$router.push({name: 'newSessionDetailElementNew'})
            },
            editElement(id){
                this.$router.push({
                    name: 'newSessionDetailElementEdit',
                    params: {id}
                })
            }
        }
    }
</script>

<style scoped>

</style>
