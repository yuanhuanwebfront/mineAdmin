<template>
    <div class="form-content">

        <el-form ref="form" label-width="160px">

            <!--    课程分类名称  -->
            <el-form-item label="课程分类名称：">
                <el-input v-model="sendParams.category_name"></el-input>
            </el-form-item>

            <!--    课程报名基数  -->
            <el-form-item label="课程报名基数：">
                <el-input v-model="sendParams.base_enroll_num"></el-input>
            </el-form-item>

            <!--    分类列表    -->
            <el-form-item label="分类列表：">
                <el-checkbox-group v-model="sendParams.types">
                    <el-checkbox v-for="(val, key) in typeList" :label="key" :key="val">{{val}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <!--    是否区分客服地区    -->
            <el-form-item label="是否区分客服地区：">
                <el-switch v-model="sendParams.isDivisionArea" active-text="是"
                           inactive-text="否" active-value="2" inactive-value="1"></el-switch>
            </el-form-item>

            <!--    客服地区列表    -->
            <el-form-item v-show="sendParams.isDivisionArea === '2'" label="客服地区列表：">
                <el-checkbox-group v-model="sendParams.channel_type_list">
                    <el-checkbox v-for="(val, key) in channelList" :label="key" :key="val">{{val}}</el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <!--    该配置默认文案     -->
            <el-form-item label="该配置默认文案：">
                <el-input v-model="sendParams.yomi_notice"></el-input>
            </el-form-item>

            <!--    客服微信     -->
            <el-form-item label="客服微信：">
                <el-input v-model="sendParams.service_wechat_id"></el-input>
            </el-form-item>

            <!--    小程序卡片消息图     -->
            <el-form-item label="小程序卡片消息图：">
                <img-upload @uploadSuccess="uploadImage($event, 'share_image')">
                    <img class="desc" :src="sendParams.share_image" width="100">
                </img-upload>
            </el-form-item>

            <el-form-item label="小程序分享朋友圈图：">
                <img-upload @uploadSuccess="uploadImage($event, 'share_background_image')">
                    <img class="desc" :src="sendParams.share_background_image" width="100">
                </img-upload>
            </el-form-item>

            <el-form-item class="margin-top-40">
                <el-button type="primary" @click="save">确定</el-button>
                <el-button type="danger" @click="cancel">取消</el-button>
            </el-form-item>


        </el-form>

    </div>

</template>

<script>

    import imgUpload from '../../components/imgUploader';

    export default {
        name: "categoryNew",
        data() {
            return {
                sendParams: {
                    category_name: '',
                    isDivisionArea: '1',
                    types: [],
                    share_image: '',
                    share_background_image: '',
                    channel_type_list: []
                },
                typeList: {},
                channelList: {}
            }
        },
        methods: {

            uploadImage(url, key) {
                this.sendParams[key] = url;
            },

            getConfigInfo() {
                let vm = this;
                this.$http.commonReq('get', 'o2_yogaSessionCategory/new', {session_type: 1}, res => {
                    vm.typeList = res.data.type_list;
                    vm.channelList = res.data.channel_list;
                })
            },

            getEditInfo(id) {
                let vm = this,
                    params = {id};
                this.$http.commonReq('get', 'O2_yogasessioncategory/info', params, res => {
                    vm.handleEditInfo(res.data);
                })
            },

            handleEditInfo(info) {

                let vm = this;

                info.type_list.forEach(item => {
                    vm.typeList[item.type] = item.desc;
                    if (item.is_check === 1) vm.sendParams.types.push(item.type + '');
                });

                info.channel_type_list.forEach(item => {
                    vm.channelList[item.type] = item.desc;
                    if (item.is_check === 1) vm.sendParams.channel_type_list.push(item.type + '');
                });

                this.sendParams.id = info.id;
                this.sendParams.share_image = info.share_image;
                this.sendParams.yomi_notice = info.yomi_notice;
                this.sendParams.base_enroll_num = info.base_enroll_num;
                this.sendParams.category_name = info.category_name;
                this.sendParams.service_wechat_id = info.service_wechat_id;
                this.sendParams.isDivisionArea = vm.sendParams.channel_type_list.length > 0 ? '2' : '1';
                this.sendParams.share_background_image = info.share_background_image;

            },

            save() {
                this.sendParams.product_type = 1;
                if(this.$route.params.id){
                    this.updateCategory(this.sendParams);
                }else{
                    this.createCategory(this.sendParams);
                }
            },

            cancel() {
                this.$router.back();
            },

            createCategory(params) {
                this.$http.create('o2_yogaSessionCategory', params, this.cancel);
            },

            updateCategory(params){
                this.$http.update('o2_yogaSessionCategory', params, this.cancel);
            }

        },
        created() {
            let routeParams = this.$route.params;
            if (routeParams.id) {
                this.getEditInfo(routeParams.id);
            } else {
                this.getConfigInfo();
            }

        },
        components: {
            imgUpload
        }
    }
</script>

<style scoped>

</style>
