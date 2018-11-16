<template>
    <div class="form-content">
        <el-form ref="form" :model="sendParams" label-width="140px">

            <el-form-item label="优惠券名称" prop="name">
                <el-input size="small" v-model="sendParams.voucher_name"></el-input>
            </el-form-item>

            <el-form-item label="优惠券说明" prop="name">
                <el-input size="small" v-model="sendParams.voucher_decription"></el-input>
            </el-form-item>

            <el-form-item label="优惠券金额" prop="name">
                <el-input size="small" v-model="sendParams.discount"></el-input>
            </el-form-item>

            <el-form-item label="减免（满额）" prop="name">
                <el-input size="small" v-model="sendParams.total"></el-input>
            </el-form-item>

            <el-form-item label="跳转类型" prop="use_type">
                <el-select v-model="sendParams.use_type">
                    <el-option size="small" v-for="(val, key) in configInfo.use_type" :label="val"
                               :value="key"></el-option>
                </el-select>
            </el-form-item>

            <template v-if="sendParams.use_type == 1">
                <el-form-item label="开始时间" prop="start_time">
                    <el-date-picker format="yyyy-MM-dd HH:mm:ss" v-model="sendParams.start_time" type="datetime"
                                    placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="结束时间" prop="end_time">
                    <el-date-picker format="yyyy-MM-dd HH:mm:ss" v-model="sendParams.end_time" type="datetime"
                                    placeholder="选择开始时间">
                    </el-date-picker>
                </el-form-item>
            </template>

            <el-form-item label="有效期限" prop="expiry_day" v-if="sendParams.use_type == 2">
                <el-input v-model="sendParams.expiry_day" type="number"></el-input>
            </el-form-item>

            <el-form-item label="课程分类" prop="deviceInfo">

                <el-checkbox-group v-model="sendParams.category_ids" size="small">
                    <el-checkbox v-for="item in categoryList" :label="item.id" :key="item.category_name">
                        {{item.category_name}}
                    </el-checkbox>
                </el-checkbox-group>

            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="save">确定</el-button>
                <el-button type="danger" @click="cancel">取消</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
    import {VOUCHER_USE_TYPE} from '../../config/globalConfig';

    export default {
        name: "voucher-new",
        data() {
            return {
                sendParams: {
                    product_type: 1,
                    total: "",
                    discount: "",
                    voucher_name: "",
                    voucher_decription: "",
                    start_time: "",
                    use_type: "",
                    end_time: "",
                    expiry_day: "",
                    category_ids: []
                },
                configInfo: {
                    use_type: VOUCHER_USE_TYPE
                },
                categoryList: []
            }
        },
        created() {
            let vm = this,
                params = {
                    product_type: 1
                };
            if (this.$route.params.id) {
                params.id = this.$route.params.id;
                this.$http.getEdit('o2_yogaVoucher', params, this.handleEditInfo);
            } else {
                this.$http.getList('o2_yogaSessionCategory', params, data => {
                    vm.categoryList = data.data.list;
                })
            }

        },

        methods: {

            handleEditInfo(data) {
                let result = data.data.voucher;
                this.categoryList = data.data.category_list;
                this.sendParams = {
                    id: result.id,
                    total: result.total,
                    product_type: 1,
                    discount: result.discount,
                    voucher_name: result.voucher_name,
                    voucher_decription: result.voucher_decription,
                    start_time: result.start_time * 1000,
                    end_time: result.end_time * 1000,
                    use_type: result.use_type + "",
                    expiry_day: result.expiry_day,
                    category_ids: data.data.category_list.filter(item => item.is_check).map(info => info.id)
                }
            },

            cancel(){
                this.$router.go(-1);
            },

            save(){

                let params = {...this.sendParams},
                    saveMethod = this.$route.params.id ? 'update' : 'create';

                params.start_time = this.$options.filters.date(params.start_time, 'yyyy-MM-dd');
                params.end_time = this.$options.filters.date(params.end_time, 'yyyy-MM-dd');

                this.$http[saveMethod]('o2_yogaVoucher', params, this.cancel);

            }
        }
    }
</script>

<style scoped>

</style>
