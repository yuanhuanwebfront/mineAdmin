<template>
    <div :id="chartId" :style="{height}" class="chart-box">
        <span v-show="false">{{_chartData}}</span>
    </div>
</template>

<script>

    import * as echarts from 'echarts/lib/echarts';
    import "echarts/lib/chart/pie";
    import "echarts/lib/component/tooltip";
    import "echarts/lib/component/title";
    import "echarts/lib/component/legend";

    export default {
        name: "pieChart",
        data() {
            return {
                _chartIns: null
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
            this._chartIns = echarts.init(document.getElementById(this.chartId), {
                width: this.width,
                height: this.height
            });
        },
        computed: {
            _chartData() {
                let vm = this;
                if (vm._chartIns) {
                    vm._chartIns.setOption({
                        title: vm.chartTitle,
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b} : {c} ({d}%)"
                        },
                        series: {
                            type: 'pie',
                            label: {
                                normal: {
                                    show: false,
                                }
                            },
                            data: [...vm.chartData]
                        },
                        legend: {
                            bottom: 0,
                            left: 'center',
                        },
                    })
                }
                return [...vm.chartData];
            }
        }
    }
</script>

<style scoped>
</style>
