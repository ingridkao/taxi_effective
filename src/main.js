import { createApp } from 'vue'
import App from './App.vue'

import Highcharts from "highcharts"
import Highcharts3d from "highcharts/highcharts-3d"
import coloraxis from "highcharts/modules/coloraxis"
import HighchartsVue from 'highcharts-vue'

Highcharts3d(Highcharts)
coloraxis(Highcharts)

const app  = createApp(App)
app.use(HighchartsVue)
app.mount('#app')
