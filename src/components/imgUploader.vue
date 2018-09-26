<template>
    <div>
        <el-upload :action="actionUrl" :headers="actionHeader" :data="actionData" :on-success="uploadSuccess"
                   :before-upload="beforeUploadFile" :show-file-list="false">
            <el-button :loading="isUploading" list-type="picture" icon="el-icon-upload" size="small" type="primary">点击上传</el-button>
        </el-upload>
    </div>
</template>

<script>
    import Cookie from 'js-cookie';

    export default {
        name: "imgUploader",

        props: ['imgUrl'],

        data() {
            return {
                actionUrl: this.$http.uploadUrl,
                actionHeader: {
                    SADMIN: Cookie.get('SADMIN'),
                    UADMIN:Cookie.get('UADMIN')
                },
                actionData: {
                    author: 'rexhang'
                },
                isUploading: false
            }
        },

        methods: {

            beforeUploadFile(file){
                const IS_IMG = /image/.test(file.type);

                if(!IS_IMG){
                    this.$message.error('上传图片格式有误，请重新上传');
                    return false;
                }

                this.isUploading = true;
            },

            uploadSuccess(data){
                this.isUploading = false;
                this.$emit('uploadSuccess', data.data.imageName);
                this.$message.success('上传图片成功');
            }

        }
    }
</script>

<style scoped>

</style>
