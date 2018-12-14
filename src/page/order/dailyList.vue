<template>
    <div>

        <el-row :gutter="20">
            <el-col :span="5">
                <el-date-picker
                    v-model="searchParams.startDate"
                    type="date"
                    placeholder="选择开始日期">
                </el-date-picker>
            </el-col>
            <el-col :span="5">
                <el-date-picker
                    v-model="searchParams.endDate"
                    type="date"
                    placeholder="选择结束日期">
                </el-date-picker>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" icon="el-icon-search">搜索</el-button>
            </el-col>
            <el-col :span="3">
                <el-button @click="exportAllOrder" type="primary" icon="el-icon-download">导出全部</el-button>
            </el-col>
        </el-row>
        <!--    表格  -->
        <el-table border class="myTable" :data="tableData"
                  stype="width: 100%" highlight-current-row>
            <el-table-column prop="orderDate" label="日期" width="150"></el-table-column>
            <el-table-column prop="totalMoney" label="订单总收入" width="150"></el-table-column>
            <el-table-column prop="totalOrder" label="已支付订单数" width="150"></el-table-column>
            <el-table-column prop="totalNonPayOrder" label="未支付订单数" width="150"></el-table-column>
            <el-table-column prop="totalNonPayMoney" label="未支付订单金额" width="150"></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="exportNoPayList(scope.row.orderDate)" type="primary" size="mini"
                               icon="el-icon-download">导出未支付
                    </el-button>
                    <el-button @click="exportHasPayList(scope.row.orderDate)" type="primary" size="mini"
                               icon="el-icon-download">导出已支付
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

    </div>

</template>

<script>

    import {exportDataAsCsvFile} from '../../utils';

    export default {
        name: "dailyList",
        data() {
            return {
                tableData: [],
                pagination: {
                    total: 0,
                    pageSize: 10
                },
                searchParams: {
                    startDate: new Date(),
                    endDate: new Date()
                }
            }
        },
        created() {
            let filter = this.$options.filters.date,
                date = new Date(),
                start = new Date().getTime() - 15 * 24 * 60 * 60 * 1000;
            this.searchParams.startDate = filter(start, 'yyyy-MM-dd');
            this.searchParams.endDate = filter(date, 'yyyy-MM-dd');
            this.getList(1);
        },
        methods: {

            getList(page) {
                let params = {
                    page: page || 1,
                    page_size: 20,
                    session_type: 1,
                    ...this.searchParams
                };
                this.$http.commonReq('get', 'o2_yoga/dailyOrderStatist', params, this.handleList);
            },

            handleList(data) {
                let res = data.data,
                    list = [];
                Object.keys(res.result).forEach(key => {
                    res.result[key]['orderDate'] = key;
                    list.push(res.result[key]);
                });
                this.tableData = list;
            },

            exportList(params) {
                params.session_type = 1;
                this.$http.commonReq('post', 'o2_yoga/exportOrderStatist', params, exportDataAsCsvFile)
            },

            exportNoPayList(date) {
                let params = {
                    payType: 2,
                    startDate: date,
                    endDate: date
                };
                this.exportList(params);
            },

            exportHasPayList(date) {
                let params = {
                    startDate: date,
                    endDate: date
                };
                this.exportList(params);
            },

            exportAllOrder() {
                this.exportList({...this.searchParams});
            }

        }
    }
</script>

<style scoped>

</style>
