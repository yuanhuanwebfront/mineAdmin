<template>
    <div :id="chartId" :style="{height}" class="chart-box">
        <span v-show="false">{{_chartData}}</span>
    </div>
</template>

<script>

    import * as echarts from 'echarts/lib/echarts';
    import "echarts/lib/chart/bar";
    import "echarts/lib/component/tooltip";
    import "echarts/lib/component/title";
    import "echarts/lib/component/legend";

    export default {
        name: "barChart",
        data() {
            return {
                _chartBarIns: null
            }
        },
        props: {
            chartId: {
                required: true,
                type: String
            },
            width: {
                type: String,
                default: '300px'
            },
            height: {
                type: String,
                default: '300px'
            },
            chartTitle: Object,
            chartData: Array
        },
        mounted() {
            this._chartBarIns = echarts.init(document.getElementById(this.chartId), {
                width: this.width,
                height: this.height
            });
        },
        computed: {
            _chartData() {
                let vm = this;

                if (vm._chartBarIns) {
                    vm._chartBarIns.setOption({
                        title: vm.chartTitle,
                        series: {
                            type: 'bar',
                            data: vm.chartData.map(item => item.value)
                        },
                        xAxis: {
                            data: vm.chartData.map(item => item.name)
                        },
                        yAxis: {}
                    })
                }
                return [...vm.chartData];
            }
        }
    }
</script>

<style scoped>
</style>
