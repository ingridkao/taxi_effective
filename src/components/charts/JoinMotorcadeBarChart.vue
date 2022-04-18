<template>
    <highcharts :options="chartOptions" class="highchartsBox joinMotorcade"/>
</template>
<script>
import { fleets_categories, fleets_source_series} from '@/assets/js/data.js'
const legendPosition =  window.screen.width < 500 ? window.screen.width - 290 : 140

export default {
    data() {
        return {
            chartOptions: {
                chart: { type: "bar" },
                title: { text: null},
                credits: {enabled: false },
                xAxis: {
                    categories: fleets_categories(this.$i18n.locale)
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
                    verticalAlign: 'top',
                    x: legendPosition,
                },
                series: fleets_source_series(this.$i18n.locale)
            }
        }
    }
}
</script>