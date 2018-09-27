<template>
    <div class="form-content">
        <el-form ref="form" label-width="200px">

            <!--    投放渠道    channel_type    -->
            <el-form-item label="投放渠道：">
                <el-select v-model="sendParams.channel_type">
                    <el-option v-for="(val, key) in globalConfig.channelList" :key="key" :label="val"
                               :value="key"></el-option>
                </el-select>
            </el-form-item>

            <!--    课程分类    category_id -->
            <el-form-item label="课程分类：">
                <el-select v-model="sendParams.category_id">
                    <el-option v-for="item in globalConfig.categoryList" :key="item.id" :label="item.category_name"
                               :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <!--    投放渠道为yoga内部显示的元素    -->
            <div v-show="sendParams.channel_type === '1'">
                <!--    课程投放渠道  app_source_array    -->
                <el-form-item label="课程投放渠道：">
                    <el-checkbox-group v-model="sendParams.app_source_array">
                        <el-checkbox v-for="(val, key) in globalConfig.appSource" :label="val" :key="key">{{val}}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <!--    优惠券与瑜币共用    mutex_type  -->
                <el-form-item label="优惠券与瑜币共用：">
                    <el-switch v-model="sendParams.mutex_type" :width="50" active-text="可共用"
                               inactive-text="不可共用"></el-switch>
                </el-form-item>

                <!--    课程标签    tag_ids -->
                <el-form-item label="课程标签：">
                    <el-checkbox v-for="item in globalConfig.tagList" :label="item.tag_name" :key="item.id">{{item.tag_name}}</el-checkbox>
                </el-form-item>

                <!--    课程封面图(phone)   image_phone  -->
                <el-form-item label="老用户课程封面图(phone)：">
                    <img-upload @uploadSuccess="uploadImage($event, 'image_phone')">
                        <img class="desc" :src="sendParams.image_phone" width="100">
                    </img-upload>
                </el-form-item>

                <!--    新用户课程封面图(phone)   image_phone_for_newuser   -->
                <el-form-item label="新用户课程封面图(phone)：">
                    <img-upload @uploadSuccess="uploadImage($event, 'image_phone_for_newuser')">
                        <img class="desc" :src="sendParams.image_phone_for_newuser" width="100">
                    </img-upload>
                </el-form-item>

                <!--    老用户课程封面图(pad)   image_pad   -->
                <el-form-item label="老用户课程封面图(pad)：">
                    <img-upload @uploadSuccess="uploadImage($event, 'image_pad')">
                        <img class="desc" :src="sendParams.image_pad" width="100">
                    </img-upload>
                </el-form-item>

                <!--    新用户课程封面图(pad)   image_pad_for_newuser   -->
                <el-form-item label="新用户课程封面图(pad)：">
                    <img-upload @uploadSuccess="uploadImage($event, 'image_pad_for_newuser')">
                        <img class="desc" :src="sendParams.image_pad_for_newuser" width="100">
                    </img-upload>
                </el-form-item>

            </div>


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
                <el-switch v-model="sendParams.is_online" :width="50" active-c olor="#13ce66" inactive-color="#ff4949"
                           active-text="在线" inactive-text="不在线"></el-switch>
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
    import imgUpload from '../../components/imgUploader';

    export default {
        name: "sessionNew",

        data() {
            return {
                sendParams: {
                    app_source_array: [],
                    image_pad: '',
                    image_phone: '',
                    image_pad_for_newuser: '',
                    image_phone_for_newuser: '',
                },
                globalConfig: {
                    channelList: {},
                    appSource: {},
                    categoryList: [],
                    tagList: []
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

            },

            uploadImage(img, paramsKey){
                this.sendParams[paramsKey] = img;
            }

        },

        components: {
            imgUpload
        }
    }
</script>

<style scoped>

</style>
