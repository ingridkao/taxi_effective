<template>
    <highcharts :options="chartOptions" :class="{dark: darkMode}" class="highchartsPieBox"/>
</template>
<script>
import {taxi_source_type, taxi_source_series} from '@/assets/js/data.js'
const taxi_series_data = taxi_source_series()
export default {
    data() {
        return {
            darkMode:true,
            chartOptions: {
                chart: { 
                    type: 'pie'
                },
                credits: { enabled: false},
                title: { text: null },
                // xAxis: {
                //     categories: Object.keys(taxi_source_type),
                //     title: { text: null}
                // },
                accessibility: {
                    announceNewData: { enabled: true},
                    point: { valueSuffix: '%'}
                },
                plotOptions: {
                    pie: {
                        // allowPointSelect: true,
                        // showInLegend: true,
                        // cursor: 'pointer',
                        colors: ["#dad82a", "#a1c0f3", "#a1d0f3"]
                        // dataLabels: { enabled: false},
                    },
                    series: {
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}<br>{point.y:.1f}%',
                        }
                    }
                },
                tooltip: {
                    enabled: false,
                    // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
                    // pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
                },
                series: [{
                    name: '計程車登記',
                    colorByPoint: true,
                    data: taxi_series_data
                }]
            }
        }
    }
}
</script>
<style lang="scss">
.highchartsPieBox{
    height: 17.5rem;
    &.dark{
        .highcharts-background{
            fill: rgb(42, 42, 42, 0.6);
        }
    }
}

@media (prefers-color-scheme: dark) { 
    :root {
        --background-color: #1F2227;
        --text-color: #c0c0c0;
        --hilight-color: #8db4d6;
    }
    
    /* Some data colors. Light mode uses defaults */
    .highcharts-color-0 {
        fill: #0460ba;
        stroke: #0460ba;
    }
    .highcharts-color-1 {
        fill: #9696ab;
        stroke: #9696ab;
    }
}
.highcharts-background {
    fill: var(--background-color);
}
.highcharts-container text {
    fill: #c0c0c0 !important;
    tspan{
        stroke-width: 0px;
    }
}
.highcharts-subtitle,
.highcharts-credits,
.highcharts-axis-title {
    fill-opacity: 0.7;
}
.highcharts-grid-line {
    stroke: var(--text-color);
    stroke-opacity: 0.2;
}
.highcharts-tooltip-box {
    fill: var(--background-color);
}
.highcharts-column-series rect.highcharts-point {
    stroke: var(--background-color);
}

</style>