<template>
    <div class="upload-file">
        <el-row>
            <el-col :span="4">
                <div class="upload-btn-box">
                    <el-button type="primary" size="small">
                        <i class=" el-icon-upload el-icon--right "></i>{{type==='image'? '上传图片':'上传视频'}}
                    </el-button>
                    <input class="id-upload-file" :class="type" type="file" @change="changeFile($event)">
                </div>
            </el-col>
            <el-col :span="4" v-show="loadPercentage !==0">
                <el-progress :percentage="loadPercentage"></el-progress>
            </el-col>
            <el-col :span="6" v-show="type==='image' && fileUrlCom">
                <div class="result-box">
                    <img :src="fileUrlCom" alt=" ">
                    <el-button @click="deleteUrl" type="danger" icon="el-icon-delete" circle></el-button>
                </div>
            </el-col>
            <el-col :span="6" v-show="type==='video' && fileUrlCom">
                <div class="result-box">
                    <video controls="controls" :src="fileUrlCom"></video>
                    <el-button @click="deleteUrl" type="danger" icon="el-icon-delete" circle></el-button>
                    <el-input size="mini" v-model.number="videoTime" placeholder="请输入视频时长(秒)"
                              @blur="blurVideoTime"></el-input>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    import * as qiniu from "qiniu-js";

    const putExtraImage = {
        fname: "",
        params: {},
        mimeType: [
            "image/png",
            "image/jpeg",
            "image/gif",
            "image/jpeg",
            "image/bmp"
        ]
    };

    const putExtraVideo = {
        fname: "",
        params: {},
        mimeType: ["video/mp4"]
    };

    import {
        uploadToken,
        uploadFolder,
        uploadImagesUrl,
        uploadVideoUrl,
        uploadImagesType,
        uploadVideoType
    } from "@/api/qiniuToken";

    export default {
        name: "upload-file",
        data() {
            return {
                bucket: this.type === "image" ? uploadImagesType : uploadVideoType,
                fileUrlBase: this.type === "image" ? uploadImagesUrl : uploadVideoUrl,
                loadPercentage: 0,
                fileUrl: this.url,
                putExtra: this.type === "image" ? putExtraImage : putExtraVideo,
                observable: undefined,
                videoTime: this.time,
                hasDel: false
            };
        },
        props: {
            type: {
                type: String,
                default: "image"
            },
            url: {
                type: String
            },
            time: {
                type: Number,
                default: 0
            }
        },
        watch: {
            url(curVal, oldVal) {
                this.fileUrl = curVal;
            },
            time(curVal, oldVal) {
                this.videoTime = curVal;
            }
        },
        methods: {
            //  api     https://developer.qiniu.com/kodo/sdk/1283/javascript
            changeFile(e) {
                let vm = this;

                let file = e.target.files[0],
                    //  配置
                    config = {
                        useCdnDomain: true,
                    },
                    //  上传错误后楚发
                    error = function (err) {
                        console.log(err);
                    },
                    //  接收上传完成的信息
                    complete = function (res) {
                        vm.fileUrl = vm.fileUrlBase + res.key;
                        setTimeout(function () {
                            vm.loadPercentage = 0;
                        }, 2000);
                        vm.$emit("upload-success", vm.fileUrl);
                    },
                    //  接收上传进度信息
                    next = function (res) {
                        vm.loadPercentage = parseInt(res.total.percent);
                    },
                    //  上传过程中监听的三个函数
                    subObject = {
                        next: next,
                        error: error,
                        complete: complete
                    };

                if (file) {
                    const key = uploadFolder + new Date().getTime();
                    uploadToken({
                        bucket: this.bucket
                    }).then(({data}) => {
                        return data.result.uptoken;
                    }).then(token => {
                        this.observable = qiniu.upload(
                            file,
                            key,
                            token,
                            this.putExtra,
                            config
                        );
                        this.observable.subscribe(subObject);
                    });
                }
            },
            deleteUrl() {
                this.videoTime = undefined;
                this.fileUrl = undefined;
                this.hasDel = true;
            },
            blurVideoTime() {
                this.$emit("upload-success", this.fileUrl);
            }
        },
        computed: {
            fileUrlCom() {
                return this.hasDel ? this.fileUrl : this.fileUrl || this.url;
            }
        }
    };
</script>

<style scoped>
    .upload-file img,
    .upload-file video {
        display: block;
        width: 100px;
        margin-top: 10px;
    }

    .upload-file video {
        width: 300px;
    }

    .upload-file lable {
        display: block;
    }

    .upload-btn-box {
        display: inline-block;
        position: relative;
    }

    .upload-btn-box .id-upload-file {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
    }

    .load-percentage-box {
        width: 320px;
    }

    .upload-file .el-input input {
        margin-top: 15px;
    }

    .upload-file .result-box {
        display: inline-block;
        position: relative;
    }

    .upload-file .el-button.is-circle {
        position: absolute;
        top: 15px;
        right: 5px;
        padding: 5px;
    }
</style>
