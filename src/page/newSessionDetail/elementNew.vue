<template>
    <div class="form-content">

        <el-form ref="form" label-width="160px">

            <!--    课程分类名称  -->
            <el-form-item label="元素名称：">
                <el-input v-model="sendParams.name"></el-input>
            </el-form-item>

            <el-form-item label="元素类型：">
                <el-select @change="resetContent" v-model="sendParams.yoga_o2_session_model_style_id" placeholder="请选择元素类型">
                    <el-option v-for="item in styleList" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="是否显示为导航：">
                <el-switch v-model="sendParams.navigation_display" active-text="是" inactive-text="否"
                           active-value="1" inactive-value="2"></el-switch>
            </el-form-item>

            <el-form-item label="显示方向：">
                <template>
                    <el-radio v-model="sendParams.direction" label="horizontal">水平</el-radio>
                    <el-radio v-model="sendParams.direction" label="vertical">垂直</el-radio>
                </template>
            </el-form-item>

            <el-form-item label="内容：">
                <el-row v-for="(item, idx) in sendParams.content" style="padding-bottom: 5px;" class="margin-bottom-20 border-bottom">

                    <template v-if="sendParams.yoga_o2_session_model_style_id != 3">
                        <el-col :span="20">
                            <upload-file :url="sendParams.content[idx]" @upload-success="setContentImg($event, idx)"></upload-file>
                        </el-col>
                    </template>

                    <template v-if="sendParams.yoga_o2_session_model_style_id == 3">
                        <el-col :span="5">
                            <el-input placeholder="请输入课程标题" v-model="item.title"></el-input>
                        </el-col>
                        <el-col class="space" :span="1"></el-col>
                        <el-col :span="5">
                            <el-input placeholder="请输入课程副标题" v-model="item.subtitle"></el-input>
                        </el-col>
                        <el-col class="space" :span="1"></el-col>
                        <el-col :span="8">
                            <el-input placeholder="请输入课程简介" type="textarea" v-model="item.desc"></el-input>
                        </el-col>
                        <el-col class="space" :span="1"></el-col>
                    </template>

                    <el-col :span="2">
                        <el-button type="danger" @click="deleteElement(idx)" icon="el-icon-delete"></el-button>
                    </el-col>

                </el-row>
                <el-button @click="addElement" type="primary" icon="el-icon-plus" size="small">添加内容</el-button>
            </el-form-item>


            <el-form-item class="margin-top-40">
                <el-button type="primary" @click="save">确定</el-button>
                <el-button type="danger" @click="cancel">取消</el-button>
            </el-form-item>


        </el-form>

    </div>
</template>

<script>
    import uploadFile from '@/components/uploadFile/index';

    export default {

        name: "element-new",

        components: {
            uploadFile
        },

        data() {
            return {
                sendParams: {
                    name: '',
                    status: '1',
                    yoga_o2_session_model_style_id: '',
                    navigation_display: '2',
                    direction: '',
                    content: []
                },
                styleList: []
            }
        },

        created() {
            this.getStyleList();
            if(this.$route.params.id){this.getElementInfo(this.$route.params.id)}
        },

        methods: {
            getStyleList() {
                this.$http.getList('session/style', {template_type: 1}, this.handleStyleList);
            },
            handleStyleList({result}) {
                this.styleList = [...result];
            },
            getElementInfo(id){
                this.$http.commonReq('get', 'session/model/get', {yoga_o2_session_model_info_id: id}, this.handleElementInfo);
            },
            handleElementInfo({result}){
                this.sendParams.name = result.name;
                this.sendParams.navigation_display = result.navigation_display + '';
                this.sendParams.yoga_o2_session_model_style_id = result.yoga_o2_session_model_style_id;
                this.sendParams.direction = result.direction;
                this.sendParams.content = result.content;
            },
            /*      当元素类型选择为课程编排时，添加的元素为输入框     */
            addElement(){
                if(this.sendParams.yoga_o2_session_model_style_id === ''){
                    this.$message.error('请先选择元素类型');
                    return;
                }

                let pushInfo = this.sendParams.yoga_o2_session_model_style_id == 3
                    ? {title: '', subtitle: '', desc: ''} : '';

                this.sendParams.content.push(pushInfo);
            },
            deleteElement(idx){
                this.sendParams.content.splice(idx, 1);
            },
            resetContent(){
                this.sendParams.content = [];
            },

            setContentImg(imgUrl, idx){
                this.$set(this.sendParams.content, idx, imgUrl);
            },

            save(){
                let params = JSON.parse(JSON.stringify(this.sendParams));
                params.content = JSON.stringify(params.content);
                this.$http.commonReq('post', 'session/model/save', params, res => {
                    this.cancel();
                })
            },
            cancel(){
                this.$router.replace({name: 'newSessionDetailElementList'})
            }
        }

    }
</script>

<style scoped>

</style>
