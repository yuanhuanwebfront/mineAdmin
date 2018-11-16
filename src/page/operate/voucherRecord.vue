<template>
    <div>
        <el-table border class="myTable" :data="tableData"
                  stype="width: 100%" highlight-current-row>
            <el-table-column prop="uids" label="用户Id" width="150"></el-table-column>
            <el-table-column prop="id" label="优惠码ID" width="150"></el-table-column>
            <el-table-column prop="send_type" label="发送类型" width="150"></el-table-column>
            <el-table-column label="创建时间" width="170">
                <template slot-scope="scope">
                    {{scope.row.create_time * 1000 | date('yyyy-MM-dd hh:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column label="更新时间" width="170">
                <template slot-scope="scope">
                    {{scope.row.update_time * 1000 | date('yyyy-MM-dd hh:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column label="已发送数量 / 群组用户数量">
                <template slot-scope="scope">
                    {{scope.row.already_sent + ' / ' + scope.row.total_count}}
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
        name: "voucher-record",
        data() {
            return {
                tableData: [],
                pagination: {
                    pageSize: 20,
                    total: 0
                },
            }
        },

        created() {
            this.getList(1);
        },

        methods: {
            getList(page) {
                let params = {
                    page: page,
                    page_size: 20,
                    session_type: 1
                };
                this.$http.getList('o2_yogaVoucherRecord', params, this.handleList)
            },

            handleList(data) {
                this.tableData = data.data.list;
                this.pagination.total = data.data.total;
            }
        }


    }
</script>

<style scoped>

</style>
