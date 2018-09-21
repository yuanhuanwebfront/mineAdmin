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
            <el-table-column prop="name" label="视频名称" width="160"></el-table-column>
            <el-table-column label="视频开始时间" width="120">
                <template slot-scope="scope">
                    {{scope.row.start_time * 1000 | date('yyyy-MM-dd')}}
                </template>
            </el-table-column>
            <el-table-column label="视频结束时间" width="120">
                <template slot-scope="scope">
                    {{scope.row.expire_time * 1000 | date('yyyy-MM-dd')}}
                </template>
            </el-table-column>
            <el-table-column prop="video_passwd" label="密码" width="100"></el-table-column>
            <el-table-column label="状态" width="80">
                <template slot-scope="scope">
                    {{transType[scope.row.status] || '已删除'}}
                </template>
            </el-table-column>
            <el-table-column label="视频链接" width="340">
                <template slot-scope="scope">
                    {{VIDEO_BASE + scope.row.id}}
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" title="编辑" icon="el-icon-edit"></el-button>
                    <el-button size="mini" type="danger" title="删除" icon="el-icon-delete"></el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination background style="margin: 20px 0;"
                       :page-size="pagination.pageSize"
                       layout="total, prev, pager, next, jumper" @current-change="getList"
                       :total="pagination.total">
        </el-pagination>

    </div>
</template>

<script>
    const VIDEO_BASE = process.env.NODE_ENV === 'development' ?
        'http://115.29.202.161:8090/front_end_all/o2/yogaVideo/index.html?id=' :
        'http://o2o.dailyyoga.com.cn/front_end_all/o2/yogaVideo/index.html?id=';

    export default {
        name: "videoList",
        data() {
            return {
                tableData: [],
                pagination: {
                    total: 0,
                    pageSize: 20
                },
                VIDEO_BASE,
                transType: {
                    0: '正常',
                    1: '处理中'
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
                    page_size: 20
                };
                this.$http.getList('O2_Yogavideo', params, this.handleList);
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
