<template>
    <div>

        <el-row :gutter="20">
            <el-col :span="5">
                <el-button @click="addTag" type="primary" size="small" icon="el-icon-circle-plus-outline">新增标签</el-button>
            </el-col>
        </el-row>

        <!--    表格      -->
        <el-table border class="myTable" :data="tableData"
                  stype="width: 100%" highlight-current-row>
            <el-table-column prop="id" label="标签ID" width="300"></el-table-column>
            <el-table-column prop="tag_name" label="标签名称" width="300"></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit-outline">编辑</el-button>
                    <el-button @click="deleteInfo(scope.row)" type="danger" size="mini" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>

        </el-table>

        <el-pagination background style="margin: 20px 0;" :page-sizes="[10, 20, 50, 100]"
                       :page-size="pagination.pageSize"
                       layout="total, prev, pager, next, jumper" @current-change="getList"
                       :total="pagination.total">
        </el-pagination>

        <!--    新增弹窗  -->
        <el-dialog title="新增标签" :visible="showDialog">
            <el-form>
                <el-form-item label="标签名称：">
                    <el-input v-model="addParams.tag_name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="showDialog = false">取消</el-button>
                <el-button type="primary" @click="saveAddInfo">确定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>

    import {Message} from 'element-ui';

    export default {
        name: "bannerTagList",
        data(){
            return{
                tableData: [],
                showDialog: false,
                addParams: {
                    tag_name: "",
                    session_type: 1
                },
                pagination: {
                    pageSize: 20,
                    total: 0
                }
            }
        },
        created(){
            this.getList(1);
        },
        methods: {
            getList(page){
                let params = {
                    page: page,
                    session_type: 1
                };
                this.$http.getList('O2_YogaSessionTag', params, this.handleList)
            },

            handleList(data){
                this.tableData = data.data.list;
                this.pagination.total = data.data.total;
            },

            addTag(){
                this.showDialog = true;
            },

            saveAddInfo(){
                let vm = this;
                this.$http.create('O2_YogaSessionTag', this.addParams, () =>{
                    Message.success('创建成功');
                    vm.showDialog = false;
                    vm.addParams.tag_name = '';
                    vm.getList(1);
                })
            },

            deleteInfo({id}){
                let vm = this;
                vm.$confirm('确认删除该标签吗？', '提示', {type: 'error'}).then(() => {
                    this.$http.delete('O2_YogaSessionTag', {id}, () =>{
                        Message.success('删除成功');
                        vm.getList(1);
                    })
                })
            }
        }
    }

</script>

<style scoped>

</style>
