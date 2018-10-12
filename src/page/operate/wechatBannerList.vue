<template>
    <div>

        <div v-if="$route.name === 'wechatBannerList'">
            <el-row class="margin-bottom-20">
                <el-col :span="24">
                    <el-button @click="addBanner" type="primary" icon="el-icon-circle-plus-outline">添加banner</el-button>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="4">
                    <el-select clearable v-model="searchParams.deviceInfo" size="small" placeholder="请选择设备类型">
                        <el-option v-for="(val, key) in deviceInfo" :key="key" :label="val" :value="key"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select clearable v-model="searchParams.screenType" size="small" placeholder="请选择屏幕类型">
                        <el-option v-for="(val, key) in screenType" :key="key" :label="val" :value="key"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-select clearable v-model="searchParams.status" size="small" placeholder="请选择状态">
                        <el-option v-for="(val, key) in statusInfo" :key="key" :label="val" :value="key"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" icon="el-icon-search" size="small" @click="search">搜索</el-button>
                </el-col>
            </el-row>

            <el-table border class="myTable" :data="tableData"
                      stype="width: 100%" highlight-current-row>
                <el-table-column prop="Id" label="编号" width="80"></el-table-column>
                <el-table-column prop="Order" label="排序" width="60"></el-table-column>
                <el-table-column label="图片" width="170">
                    <template slot-scope="scope">
                        <img :src="scope.row.Image" width="150" height="50">
                    </template>
                </el-table-column>
                <el-table-column prop="SourceType" label="跳转类型" width="80"></el-table-column>
                <el-table-column prop="Content" label="跳转内容" width="250"></el-table-column>
                <el-table-column label="设备信息" width="130">
                    <template slot-scope="scope">
                        {{scope.row.DeviceInfo}} ( {{scope.row.ScreenType}} )
                    </template>
                </el-table-column>
                <el-table-column prop="begin_time" label="开始时间" width="130"></el-table-column>
                <el-table-column prop="end_time" label="结束时间" width="130"></el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="editInfo(scope.row)" type="primary" size="mini" icon="el-icon-edit-outline"></el-button>
                        <el-button @click="deleteInfo(scope.row)" type="danger" size="mini" icon="el-icon-delete"></el-button>
                    </template>
                </el-table-column>

            </el-table>
        </div>

        <div v-if="$route.name === 'wechatBannerAdd' || $route.name === 'wechatBannerEdit'">
            <router-view></router-view>
        </div>


    </div>
</template>

<script>
    export default {
        name: "wechatBannerList",

        data (){
            return {
                searchParams: {
                    app_source: 2,
                    page: 1,
                    page_size: 20,
                    pageType: 9,
                    deviceInfo: '',
                    screenType: '',
                    status: ''
                },
                isFirstRequest: true,
                deviceInfo: {},
                statusInfo: {},
                screenType: {},
                tableData: []
            }
        },

        beforeRouteUpdate(to, from, next){
            if(to.name === 'wechatBannerList'){
                this.getList(1);
            }
            next();
        },

        created(){
            this.getList(1)
        },

        methods: {

            getList(page){
                let vm = this;
                vm.searchParams.page = page  || 1;
                vm.$http.commonReq('get', 'top/webchatList', vm.searchParams, data => {
                    vm.handleList(data);
                })
            },

            search(){
                this.getList(1);
            },

            handleList(data){
                let result = data.data;

                if(this.isFirstRequest){
                    this.deviceInfo = result.deviceInfo;
                    this.statusInfo = result.status;
                    this.screenType = result.ScreenType;
                    this.isFirstRequest = false;
                }
                this.tableData = result.list;

            },

            deleteInfo({Id}){
                let vm = this;

                vm.$confirm('确认删除该banner吗？', '提示', {type: 'error'}).then(() => {
                    let params = {top_id: Id};
                    vm.$http.commonReq('post', 'top/deleteTop', params, () => {
                        vm.getList(1);
                    })
                })
            },

            editInfo({Id}){
                this.$router.push({name: 'wechatBannerEdit', params: {id: Id}});
            },

            addBanner(){
                this.$router.push({name: 'wechatBannerAdd'});
            }
        }
    }
</script>

<style scoped>

</style>
