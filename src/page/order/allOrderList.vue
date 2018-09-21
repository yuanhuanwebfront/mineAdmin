<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="5">
                <el-date-picker
                    v-model="searchParams.startDate"
                    type="date"
                    placeholder="选择结束日期">
                </el-date-picker>
            </el-col>
            <el-col :span="5">
                <el-date-picker
                    v-model="searchParams.startDate"
                    type="date"
                    placeholder="选择结束日期">
                </el-date-picker>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "allOrderList",
        data(){
            return {
                searchParams: {

                }
            }
        }
    }
</script>

<style scoped>

</style>
