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
                series: seriesData
            }
        }
    }
}
</script>