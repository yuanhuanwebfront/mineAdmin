<template>
    <div class="form-content">
        <el-form ref="form" label-width="140px">
            <!--    投放渠道    channel_type    -->
            <el-form-item label="投放渠道：">
                <el-select v-model="sendParams.channel_type">
                    <el-option v-for="(val, key) in globalConfig.channelList" :key="key" :label="val" :value="key"></el-option>
                </el-select>
            </el-form-item>

            <!--    课程分类    category_id -->
            <el-form-item label="课程分类：">
                <el-select v-model="sendParams.category_id">
                    <el-option v-for="item in globalConfig.categoryList" :key="item.id" :label="item.category_name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <!--    课程名称    session_name -->
            <el-form-item label="课程名称：">
                <el-input v-model="sendParams.session_name"></el-input>
            </el-form-item>

            <!--    课程期数    periods -->
            <el-form-item label="课程期数：">
                <el-input v-model="sendParams.periods"></el-input>
            </el-form-item>

            <!--    结伴任务Id    task_id -->
            <el-form-item label="结伴任务Id：">
                <el-input v-model="sendParams.task_id"></el-input>
            </el-form-item>

            <!--    是否在线    is_online -->
            <el-form-item label="是否在线：">
                <el-input v-model="sendParams.is_online"></el-input>
            </el-form-item>

            <!--    价格    price -->
            <el-form-item label="价格：">
                <el-input v-model="sendParams.price" type="number"></el-input>
            </el-form-item>

            <!--    底部按钮文案    confirm_button -->
            <el-form-item label="底部按钮文案：">
                <el-input v-model="sendParams.confirm_button"></el-input>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    export default {
        name: "sessionNew",

        data() {
            return {
                sendParams: {},
                globalConfig: {
                    channelList: {},
                    appSource: {},
                    categoryList: []
                }
            }
        },

        created() {
            this.getConfig();
        },

        methods: {

            getConfig() {

                let vm = this,
                    params = {
                    session_type: 1,
                    product_type: 1
                };
                //  获取渠道信息和课程分类列表和app或者小程序渠道
                this.$http.getList('o2_yogaSessionCategory', params, data => {
                    let result = data.data;
                    vm.globalConfig.appSource = result.app_source_on_side;
                    vm.globalConfig.channelList = result.channel_list;
                    vm.globalConfig.categoryList = result.list;
                });

                //  获取课程标签列表
                this.$http.getList('O2_YogaSessionTag', params, data => {
                    vm.globalConfig.tagList = data.data.list;
                });

                //  获取教练列表
                this.$http.commonReq('get', 'O2_YogaCoach/allCoach', params, data => {
                    vm.globalConfig.coachList = data.data;
                });

                //  获取链接类型配置
                this.$http.commonReq('get', 'O2_PartnerTeam/getSourceType', params, data => {
                    vm.globalConfig.sourceList = data.data;
                });

            }

        }
    }
</script>

<style scoped>

</style>
