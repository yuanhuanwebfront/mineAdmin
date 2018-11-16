<template>
    <div>
        <div v-if="$route.name === 'voucherList'">
            <el-row :gutter="20">
                <el-col :span="3">
                    <el-button @click="addVoucher" type="primary" size="small" icon="el-icon-circle-plus-outline">创建优惠券</el-button>
                </el-col>
                <el-col :span="3">
                    <el-button @click="sendVoucher" type="primary" size="small" icon="el-icon-circle-plus-outline">发放优惠券</el-button>
                </el-col>
                <el-col :span="14" style="height: 3px;"></el-col>
                <el-col :span="3">
                    <el-button @click="voucherRecord" type="primary" size="small" icon="el-icon-tickets">优惠券发送记录</el-button>
                </el-col>
            </el-row>

            <el-table border class="myTable" :data="tableData"
                      stype="width: 100%" highlight-current-row>
                <el-table-column prop="id" label="编号" width="60"></el-table-column>
                <el-table-column prop="voucher_name" label="优惠券名称" width="120"></el-table-column>
                <el-table-column prop="voucher_decription" label="优惠券描述" width="150"></el-table-column>
                <el-table-column label="优惠券金额" width="80">
                    <template slot-scope="scope">
                        {{scope.row.discount | money}}
                    </template>
                </el-table-column>
                <el-table-column label="使用方式" width="150">
                    <template slot-scope="scope">
                        {{VOUCHER_USE_TYPE[scope.row.use_type]}}
                    </template>
                </el-table-column>
                <el-table-column prop="expiry_day" label="有效期限" width="80"></el-table-column>
                <el-table-column label="开始时间" width="160">
                    <template slot-scope="scope">
                        <span v-if="scope.row.use_type === 2">--</span>
                        <span v-if="scope.row.use_type === 1">{{scope.row.start_time * 1000 | date('yyyy-MM-dd hh:mm:ss')}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="结束时间" width="160">
                    <template slot-scope="scope">
                        <span v-if="scope.row.use_type === 2">--</span>
                        <span v-if="scope.row.use_type === 1">{{scope.row.end_time * 1000 | date('yyyy-MM-dd hh:mm:ss')}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="varcher_to_user.send_num" label="领取人数" width="60"></el-table-column>
                <el-table-column prop="varcher_to_user.used_num" label="使用人数" width="60"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="toEditPage(scope.row.id)" size="mini" icon="el-icon-edit-outline">编辑</el-button>
                    </template>
                </el-table-column>

            </el-table>

            <el-pagination background style="margin: 20px 0;" :page-sizes="[10, 20, 50, 100]"
                           :page-size="pagination.pageSize"
                           layout="total, prev, pager, next, jumper" @current-change="getList"
                           :total="pagination.total">
            </el-pagination>
        </div>

        <router-view v-if="$route.name !== 'voucherList'"></router-view>


    </div>

</template>

<script>
    import {VOUCHER_USE_TYPE} from '../../config/globalConfig';

    export default {
        name: "voucherList",
        data(){
            return {
                tableData: [],
                pagination: {
                    pageSize: 20,
                    total: 0
                },
                VOUCHER_USE_TYPE
            }
        },
        created(){
            this.getList(1);
        },
        beforeRouteUpdate(to, from, next){
            if(to.name === 'voucherList') this.getList(1);
            next();
        },
        methods: {

            sendVoucher(){

            },

            getList(page){
                let params = {
                    page: page,
                    page_size: 20,
                    session_type: 1
                };
                this.$http.getList('o2_yogaVoucher', params, this.handleList)
            },

            handleList(data){
                this.tableData = data.data.list;
                this.pagination.total = data.data.total;
            },

            addVoucher(){
                this.$router.push({name: 'voucherNew'})
            },

            toEditPage(id){
                this.$router.push({name: 'voucherEdit', params: {id}})
            },

            voucherRecord(){
                this.$router.push({name: 'voucherRecord'})
            }

        }
    }
</script>

<style scoped>

</style>
