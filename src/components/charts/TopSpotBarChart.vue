<template>
    <highcharts :options="chartOptions" class="highchartsBox scrollChart"/>
</template>
<script>
// import {hotspot, chartData} from '@/assets/js/topspot.js'
import { chartData } from '@/assets/js/topspot.js'
import {topSpot} from '@/assets/config/mapbox-style.js'
export default {
    data() {
        return {
            darkMode:true,
            chartOptions: {
                chart: { 
                    type: "bar",
                    height: '1900px'
                },
                credits: {enabled: false },
                title: { text: null},
                colorAxis: {
                    showInLegend:false,
                    minColor: topSpot.min,
                    maxColor: topSpot.max
                },
                plotOptions: {
                    series: {
                        cursor: 'pointer',
                        borderColor: 'transparent',
                        point: {
                            events: {
                                click: (e) => {
                                    if(e.point && e.point.category >= 0){
                                        this.$emit('center', e.point.category)
                                    }
                                }
                            }
                        }
                    }
                },
                xAxis: {
                    className: 'path-stroke-transparent',
                    title: { text: null },
                    tickInterval: 1,//labels show
                    labels: { 
                        overflow: 'justify',
                        style: {
                            fontSize: '0.7rem',
                        },
                        formatter: function () {
                            const {value} = this
                            return (chartData[value])? chartData[value][0]: ''
                        }
                    },
                },
                yAxis: { 
                    title: { text: null },
                    title: {
                        text: '車輛數',
                        align: 'high' 
                    },
                    plotLines: [{
                        color: '#d58681',
                        dashStyle: 'ShortDash',
                        width: 1,
                        value: 375,
                        zIndex: 0
                    }]
                },
                // tooltip: {
                //     useHTML: true,
                //     outside: true,
                //     formatter: function () {
                //         const {key, x} = this
                //         const data = hotspot[x]
                //         console.log(data);
                //         return `<div class="tooltipBox">
                //             <h6>Top${data['百大熱點排序']}: ${key}</h6>
                //             <p>${data['敘述']}</p>
                //             <p>時間:${data['熱點時間']}</p>
                //         </div>`
                //     }
                // },
                series: [{
                    showInLegend: false,
                    name: "百大熱點路段",
                    data: chartData,
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            return `<p class="seriesStyle">${this.y}</p>`
                        }
                    }
                }]
            }
        }
    }
}
</script>