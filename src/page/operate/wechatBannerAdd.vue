<template>
    <div class="form-content">
        <el-form ref="form" :model="sendParams" label-width="100px">

            <el-form-item label="投放端: " prop="app_source">
                <el-select v-model="sendParams.app_source">
                    <el-option size="small" v-for="(val, key) in configInfo.app_source" :label="val" :value="key"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="设备类型: " prop="deviceInfo">

                <el-checkbox-group v-model="sendParams.deviceInfo" size="small" v-if="$route.name !== 'wechatBannerEdit' ">
                    <el-checkbox v-for="(val, key) in configInfo.deviceInfo" :label="key" :key="val">{{val}}</el-checkbox>
                </el-checkbox-group>

                <el-radio-group v-model="sendParams.deviceInfo" v-if="$route.name === 'wechatBannerEdit'">
                    <el-radio :label="key" v-for="(val, key) in configInfo.deviceInfo">{{val}}</el-radio>
                </el-radio-group>

            </el-form-item>

            <el-form-item label="跳转类型: " prop="sourceType">
                <el-select v-model="sendParams.sourceType">
                    <el-option size="small" v-for="(val, key) in configInfo.sourceType" :label="val" :value="key"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="跳转内容: " prop="content">
                <el-input size="small" v-model="sendParams.content"></el-input>
            </el-form-item>

            <el-form-item label="排序: " prop="order">
                <el-input size="small" v-model="sendParams.order"></el-input>
            </el-form-item>

            <el-form-item label="上传图片: " prop="image">
                <img-upload @uploadSuccess="uploadImage">
                    <img class="desc" :src="sendParams.image" width="150">
                </img-upload>
            </el-form-item>

            <el-form-item label="开始时间: " prop="begin_time">
                <el-date-picker v-model="sendParams.begin_time" type="datetime" placeholder="选择开始时间"></el-date-picker>
            </el-form-item>

            <el-form-item label="结束时间: " prop="end_time">
                <el-date-picker v-model="sendParams.end_time" type="datetime" placeholder="选择开始时间"></el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="createBanner">确定</el-button>
                <el-button type="danger" @click="cancel">取消</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>

    import imgUpload from '../../components/imgUploader';

    export default {
        name: "wechatBannerAdd",

        data(){
            return {
                configInfo: {},
                isEdit: this.$route.name === 'wechatBannerEdit',
                sendParams: {
                    pageType: 9,
                    app_source: "",
                    image: "",
                    deviceInfo: [],
                    sourceType: "",
                    content: "",
                    order: "",
                    begin_time: "",
                    end_time: ""
                }
            }
        },

        created(){
            if(this.$route.name === 'wechatBannerEdit'){
                this.getEditConfig();
            }else{
                this.getCreateConfig();
            }

        },

        methods: {
            getCreateConfig(){
                this.$http.commonReq('get', 'top/webchatCreate', {}, this.handleConfig)
            },

            getEditConfig(){
                let params = {top_id: this.$route.params.id};
                this.$http.commonReq('get', 'top/webchatEdit', params, this.handleConfig)
            },

            handleConfig(data){
                this.configInfo = data.data;
                //  编辑接口的数据处理
                if(data.data.row){
                    let info = data.data.row;
                    this.sendParams = {
                        pageType: 9,
                        app_source: info.app_source + '',
                        image: info.image,
                        deviceInfo: info.deviceInfo + '',
                        sourceType: info.sourceType + '',
                        content: info.content,
                        order: info.order,
                        begin_time: this.$options.filters.date(info.begin_time * 1000, 'yyyy-MM-dd'),
                        end_time: this.$options.filters.date(info.end_time * 1000, 'yyyy-MM-dd')
                    }
                }
            },

            uploadImage(imgUrl){
                this.sendParams.image = imgUrl;
            },

            createBanner(){
                this.sendParams.begin_time = this.$options.filters.date(this.sendParams.begin_time, 'yyyy-MM-dd hh:mm:ss');
                this.sendParams.end_time = this.$options.filters.date(this.sendParams.end_time, 'yyyy-MM-dd hh:mm:ss');
                if(this.isEdit){
                    this.sendParams.top_id = this.$route.params.id;
                    this.$http.commonReq('post', 'top/webchatUpdata', this.sendParams, this.cancel);
                }else{
                    this.$http.commonReq('post', 'top/webchatNew', this.sendParams, this.cancel);
                }

            },

            cancel(){
                this.$router.push({name: 'wechatBannerList'})
            }
        },

        components: {
            imgUpload
        }
    }
</script>

<style scoped>

</style>
