<template>
    <div v-cloak>

        <div v-if="$route.name === 'sessionList'">
            <!--    头部  -->
            <el-row :gutter="20">
                <el-col :span="3">
                    <el-button @click="createSession" type="primary" icon="el-icon-plus">创建课程</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" icon="el-icon-plus">创建课程H5</el-button>
                </el-col>
            </el-row>

            <!--    表格  -->
            <el-table border class="myTable" :data="tableData"
                      stype="width: 100%" highlight-current-row>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form label-position="left" inline>
                            <el-form-item label="课程渠道:">
                                <span>{{props.row.channel_desc}}</span>
                            </el-form-item>
                            <el-form-item label="课程费用:">
                                <span>{{props.row.price}}</span>
                            </el-form-item>
                            <el-form-item label="投放渠道:">
                                <span>{{props.row.o2Session_to_channel_type_desc}}</span>
                            </el-form-item>
                            <el-form-item label="地址:">
                                <span>{{props.row.address}}</span>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="编号" width="80"></el-table-column>
                <el-table-column prop="sort_order" label="排序" width="60"></el-table-column>
                <el-table-column prop="session_name" label="课程名称" width="180"></el-table-column>
                <el-table-column label="开课时间" width="150">
                    <template slot-scope="scope">
                        {{scope.row.session_start_time * 1000 | date('yyyy-MM-dd hh:mm:ss')}}
                    </template>
                </el-table-column>
                <el-table-column label="封面图(phone)" width="120">
                    <template slot-scope="scope">
                        <img :src="scope.row.image_phone" width="100">
                    </template>
                </el-table-column>
                <el-table-column label="封面图(pad)" width="120">
                    <template slot-scope="scope">
                        <img :src="scope.row.image_pad" width="100">
                    </template>
                </el-table-column>
                <el-table-column label="报名/最大人数" width="120">
                    <template slot-scope="scope">
                        {{scope.row.member_count + '/' + scope.row.max_member}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" title="编辑" icon="el-icon-edit"></el-button>
                        <el-button v-if="scope.row.status === 2" size="mini" type="primary">上线</el-button>
                        <el-button v-if="scope.row.status === 1" size="mini" type="danger">下线</el-button>
                        <el-button v-if="scope.row.display_status === 2" size="mini" type="primary">显示</el-button>
                        <el-button v-if="scope.row.display_status === 1" size="mini" type="danger">不显示</el-button>
                        <el-dropdown style="margin-left: 15px;" trigger="click">
                            <el-button size="small" type="text" class="el-dropdown-link">
                                更多<i class="el-icon-arrow-down el-icon--right"></i>
                            </el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item>订单列表</el-dropdown-item>
                                <el-dropdown-item v-show="scope.row.status_enroll !== 0" @click.native="setSessionFull(scope.row.id)">设置报名已满</el-dropdown-item>
                                <el-dropdown-item v-show="scope.row.status_enroll === 0" disabled @click.native="setSessionFull(scope.row.id)">
                                    <span class="danger">报名已满</span>
                                </el-dropdown-item>

                                <el-dropdown-item>报名列表</el-dropdown-item>
                                <el-dropdown-item>预上线配置</el-dropdown-item>
                                <el-dropdown-item>编辑课程h5</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination background style="margin: 20px 0;" :page-sizes="[10, 20, 50, 100]"
                           :page-size="pagination.pageSize"
                           layout="total, prev, pager, next, jumper" @current-change="getList"
                           :total="pagination.total">
            </el-pagination>

        </div>

        <div v-if="$route.name !== 'sessionList'">
            <router-view></router-view>
        </div>


    </div>
</template>

<script>
    export default {
        name: "list",
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
                this.$http.getList('o2_yoga', params, this.handleList);
            },

            createSession(){
                this.$router.push({name: 'sessionNew'});
            },

            handleList(data) {
                let res = data.data;
                this.pagination.total = res.total;
                this.tableData = res.list;
            },

            setSessionFull(id){
                let vm = this;
                this.$confirm('确认设置该课程报名已满吗？', '提示').then(() => {
                    vm.$http.commonReq('post', 'o2_yoga/fullEnroll', {id}, () => {
                        this.getList(1);
                    })
                })
            }
        }
    }
</script>

<style scoped>
</style>
