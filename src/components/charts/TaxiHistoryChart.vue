<template>
    <highcharts :options="chartOptions" class="highchartsBox HistoryBox"/>
</template>
<script>
import {dataColor, taxi_history} from '@/assets/js/data.js'
const times = taxi_history.map(item => item["時間"])
const targetColumn = ['總車輛']
const targetSpline = ['靠行計程車', '運輸合作社', '個人營業者']
const seriesColumn = targetColumn.map(item => {
    return {
        name: item,
        type: 'column',
        data: taxi_history.map(data => data[item]),
        color: dataColor[4]
    }
})
const seriesSpline = targetSpline.map((item, index) => {
    return {
        name: item,
        type: 'spline',
        data: taxi_history.map(data => data[item]),
        color: dataColor[index]
    }
})
export default {
    data() {
        return {
            chartOptions: {
                title: { text: null},
                credits: {enabled: false },
                xAxis: {
                    categories: times,
                    title: { text: null },
                    labels: { 
                        overflow: 'justify',
                        style: {
                            fontSize: '0.8rem',
                        }
                    }
                },
                yAxis: {
                    title: { text: '車輛數' }
                },
                tooltip: {
                    shared: true,
                    formatter: function () {
                        let str = `<span style="font-size:14px">${this.x}</span><br>`
                        const body = this.points.map(item => {
                            str += `<span style="width: 5rem;color:${item.color};">${item.series.name}</span>： ${item.y}輛<br/>`
                        })
                        return str
                    },
                },
                legend: {
                    layout: 'vertical',
                    // align: 'left',
                    x: -120,
                    verticalAlign: 'top',
                },
                series: [...seriesColumn, ...seriesSpline]
            }
        }
    }
}
</script>