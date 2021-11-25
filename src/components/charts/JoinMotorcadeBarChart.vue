<template>
    <highcharts :options="chartOptions" class="highchartsBox"/>
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
            chartOptions: {
                chart: { type: "bar" },
                title: { text: null},
                credits: {enabled: false },
                xAxis: {
                    categories: action_keys
                },
                yAxis: {
                    title: { 
                        text: "％",
                        align: 'high',
                    },
                    max: 100
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.1,
                        borderWidth: 0
                    }
                },
                tooltip: {
                    valueSuffix: ' %',
                },
                legend: {
                    layout: 'vertical',
                    // align: 'left',
                    x: 180,
                    verticalAlign: 'top',
                },
                series: seriesData
            }
        }
    }
}
</script>