<template>
    <div class="form-content">

        <el-form ref="form" label-width="160px">

            <!--    课程分类名称  -->
            <el-form-item label="模块名称：">
                <el-input v-model="sendParams.name"></el-input>
            </el-form-item>

            <!--    元素列表    -->
            <el-form-item label="元素列表：">

                <el-row class="margin-bottom-20" v-for="(item, idx) in sendParams.yoga_o2_session_model_info_ids">

                    <!--    选择元素类型  -->
                    <el-col :span="6">
                        <el-select v-model="item.type" @change="getElementModuleList(item)" placeholder="请选择元素类型">
                            <el-option v-for="info in styleList" :value="info.id" :label="info.name"></el-option>
                        </el-select>
                    </el-col>

                    <!--    选择元素      -->
                    <el-col :span="6">
                        <el-select v-model="item.id" placeholder="请选择元素">
                            <el-option v-for="ele in elementInfo[item.type]" :value="ele.id" :label="ele.name"></el-option>
                        </el-select>
                    </el-col>

                    <!--    选择排序      -->
                    <el-col :span="6">
                        <el-input-number :min="0" v-model="item.sort" placeholder="请输入排序"></el-input-number>
                    </el-col>

                    <el-col :span="6">
                        <el-button type="danger" icon="el-icon-delete" @click="deleteElement(idx)"></el-button>
                    </el-col>

                </el-row>
                <el-button size="small" type="primary" icon="el-icon-plus" @click="addElement">添加元素</el-button>
            </el-form-item>

            <el-form-item class="margin-top-40">
                <el-button type="primary" @click="save">确定</el-button>
                <el-button type="danger" @click="cancel">取消</el-button>
            </el-form-item>


        </el-form>

    </div>
</template>

<script>
    export default {
        name: "module-new",

        data(){
            return {
                sendParams: {
                    name: '',
                    template_type: '1',
                    status: '1',
                    yoga_o2_session_model_info_ids: []
                },
                styleList: [],
                elementInfo: {}
            }
        },

        created(){
            this.getElementList();
            if(this.$route.params.moduleId){
                this.getModuleInfo(this.$route.params.moduleId);
            }
        },

        methods: {

            getElementList(){
                this.$http.getList('session/style', {template_type: 1}, this.handleElementList)
            },

            handleElementList({result}){
                this.styleList = [...result];
            },

            getElementModuleList(item){
                let vm = this;
                item.id = '';
                if(!vm.elementInfo[item.type]){
                    this.$http.getList('session/model', {yoga_o2_session_model_style_id: item.type}, ({result}) => {
                        vm.$set(vm.elementInfo, item.type, [...result]);
                    })
                }
            },

            getModuleInfo(moduleId){
                this.$http.commonReq('get', 'session/info/get', {yoga_o2_session_model_template_id: moduleId}, this.handleModuleInfo)
            },

            handleModuleInfo({result}){

                this.sendParams.name = result.name;
                this.sendParams.yoga_o2_session_model_info_ids = result.list.map(item => {

                    this.getElementModuleList({type: item.yoga_o2_session_model_style_id});

                    return {
                        type: item.yoga_o2_session_model_style_id,
                        id: item.yoga_o2_session_model_info_id,
                        sort: item.sort_order
                    }

                })

            },

            addElement(){
                this.sendParams.yoga_o2_session_model_info_ids.push({
                    id: '',
                    sort: '',
                    type: ''
                });
            },

            deleteElement(index){
                this.sendParams.yoga_o2_session_model_info_ids.splice(index, 1);
            },

            save(){
                let params = {...this.sendParams},
                    url = this.$route.params.moduleId ? 'session/info/set' : 'session/info/save';

                params.yoga_o2_session_model_info_ids = JSON.stringify(params.yoga_o2_session_model_info_ids);
                if(this.$route.params.moduleId) params.id = this.$route.params.moduleId;
                this.$http.commonReq('post', url, params, res => {
                    this.cancel();
                })
            },

            cancel(){
                this.$router.replace({name: 'newSessionDetailModuleList'});
            }
        }
    }
</script>

<style scoped>

</style>
