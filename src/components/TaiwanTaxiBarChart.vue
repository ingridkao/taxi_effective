<template>
    <highcharts :options="chartOptions" :class="{dark: darkMode}" class="highchartsBox"/>
</template>
<script>
// import { getTaxiColorAxis } from '@/assets/config/mapbox-style.js'
// const taxiColorAxis = getTaxiColorAxis()
import {taiwan_Obj, taxi_taiwan_count} from '@/assets/js/data.js'
export default {
    data() {
        return {
            darkMode:true,
            chartOptions: {
                chart: { 
                    type: "bar",
                    height: '650px'
                },
                colorAxis: [{
                    showInLegend:false,
                    min:0, 
                    minColor: '#723122',
                    maxColor: '#F2F12D',
                    // reversed: true
                    // dataClasses: taxiColorAxis
                }],
                credits: {enabled: false },
                title: { text: null},
                plotOptions: {
                    series: {
                        color: '#718e93'
                    }
                },
                xAxis: {
                    categories: Object.values(taiwan_Obj),
                    title: { text: null },
                    labels: { 
                        overflow: 'justify',
                        step: 1,
                        style: {
                            fontSize: '0.9rem',
                        }
                    },
                    // maxPadding: 1
                },
                yAxis: {
                    title: {
                        text: '車輛數',
                        align: 'high' 
                    },
                    labels: { 
                        overflow: 'justify',
                        format: '{value}',
                        max: 33000
                    },
                },
                tooltip: {
                    enabled: false,
                    // valueSuffix: ' 輛'
                },
                series: [{
                    showInLegend: false,           
                    name: "計程車",
                    data: Object.values(taxi_taiwan_count),
                    dataLabels: [{
                        enabled: true,
                        // format: '{y} 輛',
                        // inside: true,
                        style: {
                            fontSize: '0.7rem'
                        }
                    }]
                }]
            }
        }
    }
}
</script>
<style lang="scss">
.highchartsBox{
    &.dark{
        .highcharts-background{
            fill: rgb(42, 42, 42, 0.6);
        }
        .highcharts-container text{
            fill: #c0c0c0 !important;
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
    fill: var(--text-color);
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