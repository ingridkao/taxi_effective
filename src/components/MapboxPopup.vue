<template>
    <div class="popupBox">
        <div v-for="(feature, i) in featuresData" :key="i" class="featuresDataBox">
            <div v-for="(item, j) in feature.properties" :key="j" v-show="j != 'Timestamp'">
                <div v-if="j === '序號' || j === '百大熱點排序' || j === 'ROADNAME' || j === '敘述'|| j === 'NUMPOINTS' || j === '路寬' || j === '路段名稱'">
                    <span>{{translate(j)}}</span>
                    <b>{{item}}</b>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

export default{
    methods: {
        translate(j){
            if(j === 'ROADNAME'){
                return '主要街道'
            }else if(j === 'NUMPOINTS'){
                return '攔車次數'
            }else{
                return j
            }
        }
    }
}
</script>

<style lang="scss">
.mapboxgl-popup-content {
    width: 18rem;
}
.popupHeader{
    color: #6d8a8e;
    text-align: left;
}
.popupBox{
    width: 18rem;
    white-space:nowrap;
    overflow: scroll;
    text-align: left;
    padding-bottom: 1rem;
}
.featuresDataBox{
    display: inline-block;
    width: 18rem;
    word-wrap:break-word;
    span{
        padding-right: .5rem;
    }
}
</style>