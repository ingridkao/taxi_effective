<template>
    <highcharts :options="chartOptions" :class="{dark: darkMode}" class="highchartsBox"/>
</template>
<script>
import {dataColor, passenger_action_index, passenger_action} from '@/assets/js/data.js'
const action_keys = passenger_action.map(item => item.type)
const action_values = Object.values(passenger_action_index)
const seriesData = Object.keys(passenger_action_index).map( (actionKey, actionindex) =>{
    return {
        // showInLegend: false,           
        name: action_values[actionindex],
        data: passenger_action.map(item => item[actionKey]),
        color: dataColor[actionindex],
        dataLabels: [{enabled: true}]
    }
})
export default {
    data() {
        return {
            darkMode:true,
            chartOptions: {
                chart: { type: "bar" },
                credits: {enabled: false },
                title: { text: null},
                xAxis: {
                    categories: action_keys
                },
                yAxis: {
                    title: { text: "?" },
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },

                // tooltip: {
                //     formatter: function () {
                //         return `${this.x}<br/>計程車： ${this.y} 輛<br/>佔比：${taxi_ratio(this.y)}%`
                //     },
                //     style: {
                //         color: '#fff',
                //         fontSize: '1rem'
                //     }
                // },
                series: seriesData
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