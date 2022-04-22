<template>
    <highcharts :options="chartOptions" class="highchartsBox taxiHistory"/>
</template>

<script>
    import {taxi_history, history_series_column} from '@/assets/js/data.js'
    const times = taxi_history.map(item => item["time"])
    const legendPosition =  window.screen.width < 500 ? window.screen.width - 290 : 140
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
                    title: { text: this.$t('unit.vehicle') }
                },
                tooltip: {
                    shared: true,
                    formatter: function () {
                        let str = `<span style="font-size:14px">${this.x}</span><br>`
                        const body = this.points.map(item => {
                            str += `<span style="width: 5rem;color:${item.color};">
                                        ${item.series.name}
                                    </span>： ${item.y}輛<br/>`
                        })
                        return str
                    },
                },
                legend: {
                    layout: 'vertical',
                    // align: 'left',
                    x: legendPosition,
                    verticalAlign: 'top',
                },
                series: history_series_column(this.$i18n.locale)
            }
        }
    }
}
</script>