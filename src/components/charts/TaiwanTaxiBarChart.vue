<template>
    <highcharts :options="chartOptions" class="highchartsBox taiwanTaxiBar"/>
</template>
<script>
import {taiwan_Obj, taxi_taiwan_count} from '@/assets/js/data.js'
import {DistrictCount, mainColorConfig} from '@/assets/config/mapbox-style.js'
const taxi_array = Object.values(taxi_taiwan_count)
const taxi_sum = taxi_array.reduce((a, b) =>  a + b , 0)
const taxi_ratio = (item) => Math.floor(item/taxi_sum*10000)/100
export default {
    data() {
        return {
            chartOptions: {
                chart: { 
                    type: "bar",
                },
                colorAxis: [{
                    showInLegend:false,
                    min:0, 
                    minColor: DistrictCount.min,
                    maxColor: DistrictCount.max,
                    // reversed: true
                    // dataClasses: taxiColorAxis
                }],
                credits: {enabled: false },
                title: { text: null},
                plotOptions: {
                    series: {
                        color: mainColorConfig.plotOptionsText,
                        borderColor: 'transparent',
                        className: 'plot'
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
                    className: 'path-stroke-transparent'
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
                    }
                },
                tooltip: {
                    // enabled: false,
                    // valueSuffix: ' 輛',
                    formatter: function () {
                        return `${this.x}<br/>計程車： ${this.y} 輛<br/>佔比：${taxi_ratio(this.y)}%`
                    },
                    style: {
                        color: mainColorConfig.tooltipText,
                        fontSize: '0.9rem'
                    }
                },
                series: [{
                    showInLegend: false,
                    name: "計程車",
                    data: taxi_array,
                    color: 'grey',
                    dataLabels: {
                        enabled: true,
                        // format: '{y} 輛',
                        // inside: true,
                        formatter: function () {
                            return `<p class="seriesStyle">${taxi_ratio(this.y)}%</p>`
                        }
                    }
                }]
            }
        }
    }
}
</script>