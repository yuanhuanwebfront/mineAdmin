<template>
    <div>

        <el-row :gutter="20">
            <el-col :span="5">
                <el-date-picker v-model="searchParams.start" type="date" placeholder="选择结束日期"></el-date-picker>
            </el-col>
            <el-col :span="5">
                <el-date-picker v-model="searchParams.end" type="date" placeholder="选择结束日期"></el-date-picker>
            </el-col>
            <el-col :span="5">
                <el-button type="primary" icon="el-icon-search" @click="getList">搜索</el-button>
            </el-col>
            <el-col :span="7">
                <el-radio-group v-model="chartType">
                    <el-radio label="bar">柱状图</el-radio>
                    <el-radio label="pie">饼状图</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>

        <div class="chart" id="pie">

            <pieChart chart-id="myChart" width="400px" height="300px" v-show="chartType === 'pie'"
                      :chart-title="chartConfig.title" :chart-data="chartData"></pieChart>
            <!--<barChart chart-id="myChartBar" width="400px" height="300px" v-show="chartType === 'bar'"-->
                      <!--:chart-title="chartConfig.title" :chart-data="chartData"></barChart>-->

        </div>


    </div>
</template>

<script>
    import pieChart from '../../components/chart/pie';
    import barChart from '../../components/chart/bar';

    export default {
        name: "orderSource",
        data() {
            return {
                searchParams: {
                    start: '',
                    end: '',
                    session_type: 1
                },
                chartInstance: null,
                chartConfig: {
                    title: {
                        text: '课程购买来源',
                        x: 'center',
                        top: 0
                    }
                },
                chartData: [],
                chartType: 'pie'
            }
        },
        created() {
            this.getList();
        },
        methods: {

            getList() {
                let filter = this.$options.filters.date;
                if (this.searchParams.start) this.searchParams.start = filter(this.searchParams.start, 'yyyy-MM-dd');
                if (this.searchParams.end) this.searchParams.end = filter(this.searchParams.end, 'yyyy-MM-dd');
                this.$http.getList('Statistic_Yogao2sessionOrder', this.searchParams, this.handleData);
            },

            handleData(data) {
                let result = data.data;
                this.chartData = result.list.map(item => {
                    return {
                        name: item.source_name,
                        value: item.source_count
                    }
                });
            }
        },
        components: {
            pieChart,
            barChart
        }
    }
</script>

<style scoped>
    .chart {
        margin-top: 80px;
    }
</style>
