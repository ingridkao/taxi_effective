<template>
    <highcharts :options="chartOptions" class="highchartsBox highchartsPieBox"/>
</template>
<script>
import {taxi_source_series} from '@/assets/js/data.js'
import {pieColor} from '@/assets/config/mapbox-style.js'

export default {
    data() {
        return {
            chartOptions: {
                chart: { 
                    type: 'pie'
                },
                credits: { enabled: false},
                title: { text: null },
                accessibility: {
                    announceNewData: { enabled: true},
                    point: { valueSuffix: '%'}
                },
                plotOptions: {
                    pie: {
                        // allowPointSelect: true,
                        // showInLegend: true,
                        // cursor: 'pointer',
                        colors: pieColor
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
                    name: 'TaxiRegistration',
                    colorByPoint: true,
                    data: taxi_source_series(this.$i18n.locale)
                }]
            }
        }
    }
}
</script>