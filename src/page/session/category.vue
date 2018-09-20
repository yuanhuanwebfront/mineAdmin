<template>
    <div v-cloak>
        <!--    头部  -->
        <el-row :gutter="20">
            <el-col :span="3">
                <el-button type="primary" size="small" icon="el-icon-plus">创建课程分类</el-button>
            </el-col>
        </el-row>

        <!--    表格  -->
        <el-table border class="myTable" :data="tableData"
                  stype="width: 100%" highlight-current-row>
            <el-table-column prop="id" label="编号" width="80"></el-table-column>
            <el-table-column prop="category_name" label="分类名称" width="200"></el-table-column>
            <el-table-column prop="base_enroll_num" label="报名基数" width="100"></el-table-column>
            <el-table-column prop="service_wechat_id" label="客服微信" width="100"></el-table-column>
            <el-table-column label="状态" width="80">
                <template class="danger" slot-scope="scope">
                    {{scope.row.status === 1 ? '正常' : '删除'}}
                </template>
            </el-table-column>
            <el-table-column label="创建时间" width="200">
                <template slot-scope="scope">
                    {{scope.row.create_time * 1000 | date('yyyy-MM-dd hh:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column label="更新时间" width="200">
                <template slot-scope="scope">
                    {{scope.row.update_time * 1000 | date('yyyy-MM-dd hh:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" title="编辑" icon="el-icon-edit"></el-button>
                    <el-button size="mini" type="danger" title="删除" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination background style="margin: 20px 0;" :page-sizes="[10, 20, 50, 100]"
                       :page-size="pagination.pageSize"
                       layout="total, prev, pager, next, jumper" @current-change="getList"
                       :total="pagination.total">
        </el-pagination>

    </div>
</template>

<script>
    export default {
        name: "category",
        data() {
            return {
                tableData: [],
                pagination: {
                    total: 0,
                    pageSize: 10
                }
            }
        },
        created() {
            this.getList(1);
        },
        methods: {
            getList(page) {
                let params = {
                    page: page || 1,
                    session_type: 1
                };
                this.$http.getList('o2_yogaSessionCategory', params, this.handleList);
            },

            handleList(data) {
                let res = data.data;
                this.pagination.total = res.total;
                this.tableData = res.list;
            }
        }
    }
</script>

<style scoped>

</style>
