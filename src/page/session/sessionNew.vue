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
            <el-form-item label="价格(￥)：">
                <el-input v-model="sendParams.price" type="number"></el-input>
            </el-form-item>

            <!--    底部按钮文案    confirm_button -->
            <el-form-item label="底部按钮文案：">
                <el-input v-model="sendParams.confirm_button"></el-input>
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

                <!--    大礼包Id   gift_id -->
                <el-form-item label="大礼包Id：">
                    <el-input v-model="sendParams.gift_id"></el-input>
                </el-form-item>

                <!--    资源类型    source_type -->
                <el-form-item label="资源类型：">
                    <el-radio-group v-model="sendParams.source_type">
                        <el-radio v-for="(val, key) in sourceType" :label="key">{{val}}</el-radio>
                    </el-radio-group>
                </el-form-item>

                <!--    资源Id    source_id -->
                <el-form-item label="资源Id：">
                    <el-input v-model="sendParams.source_id"></el-input>
                </el-form-item>

                <!--    地址    address -->
                <el-form-item label="地址：">
                    <el-input v-model="sendParams.address"></el-input>
                </el-form-item>

                <!--    最大人数    max_member  -->
                <el-form-item label="最大人数：">
                    <el-input v-model="sendParams.max_member"></el-input>
                </el-form-item>

                <!--    报名人数基数    max_member  -->
                <el-form-item label="报名人数基数：">
                    <el-input v-model="sendParams.base_enroll_num"></el-input>
                </el-form-item>

                <!--    报名开始时间  enroll_start_time   -->
                <el-form-item label="报名开始时间：">
                    <el-date-picker v-model="sendParams.enroll_start_time" value-format="yyyy-MM-dd HH:mm:ss"
                                    type="datetime" placeholder="选择报名开始时间"></el-date-picker>
                </el-form-item>

                <!--    Yo币最大抵扣金额(元)    max_pay_points  -->
                <el-form-item label="Yo币最大抵扣金额(元)：">
                    <el-input v-model="sendParams.max_pay_points"></el-input>
                </el-form-item>

                <!--    小组成员上限    team_member_limit  -->
                <el-form-item label="小组成员上限：">
                    <el-input v-model="sendParams.team_member_limit"></el-input>
                </el-form-item>

                <!--    老用户带评价课程链接(h5)  session_content     -->
                <el-form-item label="老用户带评价课程链接(h5)：">
                    <el-tooltip placement="bottom-end" content="http://115.29.202.161:8090/front_end_all/o2/o2Course/#/courseDetail?o2type=2&dy=1&id=88&session_id=126， 编辑时请替换sessio_id为当前课程编号">
                        <el-input v-model="sendParams.session_content"></el-input>
                    </el-tooltip>
                </el-form-item>

                <!--    新用户带评价课程链接(h5)  session_content_for_newuser     -->
                <el-form-item label="新用户带评价课程链接(h5)：">
                    <el-tooltip placement="bottom-end" content="http://115.29.202.161:8090/front_end_all/o2/o2Course/#/courseDetail?o2type=2&dy=1&id=88&session_id=126， 编辑时请替换sessio_id为当前课程编号">
                        <el-input v-model="sendParams.session_content_for_newuser"></el-input>
                    </el-tooltip>
                </el-form-item>

                <!--    课程时长    collegeDay  -->
                <el-form-item label="课程时长：">
                    <el-input v-model="sendParams.collegeDay"></el-input>
                </el-form-item>

                <!--    课程类型    session_content_type    -->
                <el-form-item label="课程类型：">
                    <el-radio-group v-model="sendParams.session_content_type">
                        <el-radio v-for="(val, key) in SESSION_CONTENT_TYPE" :label="key">{{val}}</el-radio>
                    </el-radio-group>
                </el-form-item>

                <!--    不带评价课程链接(h5)    session_content_old -->
                <el-form-item label="不带评价课程链接(h5)：">
                    <el-input v-model="sendParams.session_content_old"></el-input>
                </el-form-item>

                <!--    课程老师    o2_coach_id     -->
                <el-form-item label="课程老师：">
                    <el-select v-model="sendParams.o2_coach_id">
                        <el-option v-for="item in globalConfig.coachList[1]" :key="item.id" :label="item.coach_name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <!--    班主任      o2_director_id  -->
                <el-form-item label="班主任：">
                    <el-select v-model="sendParams.o2_director_id">
                        <el-option v-for="item in globalConfig.coachList[2]" :key="item.id" :label="item.coach_name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>

                <!--    装备图片所指有赞链接  equipment_link_url  -->
                <el-form-item label="装备图片所指有赞链接：">
                    <el-input v-model="sendParams.equipment_link_url"></el-input>
                </el-form-item>

                <!--    结伴延长解散天数  partner_continue_time  -->
                <el-form-item label="结伴延长解散天数：">
                    <el-input v-model="sendParams.partner_continue_time"></el-input>
                </el-form-item>

                <!--    首次完成计划调查问卷链接  question_link  -->
                <el-form-item label="首次完成计划调查问卷链接：">
                    <el-input v-model="sendParams.question_link"></el-input>
                </el-form-item>

                <!--    报名成功后推送标题  pushInfo.enroll.push_title  -->
                <el-form-item label="报名成功后推送标题：">
                    <el-input v-model="sendParams.pushInfo.enroll.push_title"></el-input>
                </el-form-item>

                <!--    报名成功后推送内容  pushInfo.enroll.push_content  -->
                <el-form-item label="报名成功后推送内容：">
                    <el-input v-model="sendParams.pushInfo.enroll.push_content"></el-input>
                </el-form-item>

                <!--    报名成功后推送链接类型  pushInfo.enroll.push_link_type  -->
                <el-form-item label="报名成功后推送链接类型：">
                    <el-select v-model="sendParams.pushInfo.enroll.push_link_type">
                        <el-option v-for="(val, key) in globalConfig.sourceList" :key="key" :label="val"
                                   :value="key"></el-option>
                    </el-select>
                </el-form-item>

                <!--    报名成功后推送链接内容  pushInfo.enroll.push_link_content  -->
                <el-form-item label="报名成功后推送链接内容：">
                    <el-input v-model="sendParams.pushInfo.enroll.push_link_content"></el-input>
                </el-form-item>

                <!--    群聊解散后用户反馈推送标题  pushInfo.feedback.push_title  -->
                <el-form-item label="群聊解散反馈推送标题：">
                    <el-input v-model="sendParams.pushInfo.feedback.push_title"></el-input>
                </el-form-item>

                <!--    群聊解散后用户反馈推送内容  pushInfo.feedback.push_content  -->
                <el-form-item label="群聊解散反馈推送内容：">
                    <el-input v-model="sendParams.pushInfo.feedback.push_content"></el-input>
                </el-form-item>

                <!--    群聊解散后用户反馈推送链接类型  pushInfo.feedback.push_link_type  -->
                <el-form-item label="群聊解散反馈推送链接类型：">
                    <el-select v-model="sendParams.pushInfo.feedback.push_link_type">
                        <el-option v-for="(val, key) in globalConfig.sourceList" :key="key" :label="val"
                                   :value="key"></el-option>
                    </el-select>
                </el-form-item>

                <!--    群聊解散后用户反馈推送链接内容  pushInfo.feedback.push_link_content  -->
                <el-form-item label="群聊解散反馈推送链接内容：">
                    <el-input v-model="sendParams.pushInfo.feedback.push_link_content"></el-input>
                </el-form-item>


                <!--  TODO  **************************  image upload area   **********************    -->

                <!--    上课须知图片   session_notice  -->
                <el-form-item label="上课须知图片：">
                    <img-upload @uploadSuccess="uploadImage($event, 'session_notice')">
                        <img class="desc" :src="sendParams.session_notice" width="100">
                    </img-upload>
                </el-form-item>

                <!--    报名后配图    after_apply_image_pad  -->
                <el-form-item label="报名后配图：">
                    <img-upload @uploadSuccess="uploadImage($event, 'after_apply_image_pad')">
                        <img class="desc" :src="sendParams.after_apply_image_pad" width="100">
                    </img-upload>
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

                <!--    课程所需装备图(phone)   equipment_image_phone   -->
                <el-form-item label="课程所需装备图(phone)：">
                    <img-upload @uploadSuccess="uploadImage($event, 'equipment_image_phone')">
                        <img class="desc" :src="sendParams.equipment_image_phone" width="100">
                    </img-upload>
                </el-form-item>

                <!--    课程所需装备图(pad)   equipment_image_pad   -->
                <el-form-item label="课程所需装备图(pad)：">
                    <img-upload @uploadSuccess="uploadImage($event, 'equipment_image_pad')">
                        <img class="desc" :src="sendParams.equipment_image_pad" width="100">
                    </img-upload>
                </el-form-item>

            </div>

        </el-form>
    </div>
</template>

<script>
    import imgUpload from '../../components/imgUploader';
    import {SOURCE_TYPE, SESSION_CONTENT_TYPE} from '../../config/globalConfig';

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
                    pushInfo: {
                        enroll: {},
                        feedback: {}
                    }
                },
                globalConfig: {
                    channelList: {},
                    appSource: {},
                    categoryList: [],
                    tagList: [],
                    coachList: [],
                    sourceList: {}
                },
                sourceType: SOURCE_TYPE,
                SESSION_CONTENT_TYPE
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
