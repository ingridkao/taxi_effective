<template>
    <div class="popupBox">
        <div v-for="(feature, i) in featuresData" :key="i" class="featuresDataBox">
            <div v-for="(item, j) in feature.properties" :key="j" v-show="j != 'Timestamp'">
                <div v-if="j === '百大熱點排序' || j === 'ROADNAME' || j === '敘述'|| j === 'NUMPOINTS' || j === '路寬' || j === '路段名稱' || j === '熱點時間'">
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
            }else if(j === '百大熱點排序'){
                return '設招呼站百大熱點排序'
            }else{
                return j
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';
.mapboxgl-popup-content {
    width: 22rem;
    font-size: 0.9rem;
    button{
        width: 2rem;
        font-size: 1.5rem;
        &:focus{
            outline: none;
        }
    }
}
.popupHeader{
    color: #6d8a8e;
    text-align: left;
}
.popupBox{
    @include scrollbar_style;
    white-space:nowrap;
    overflow: scroll;
    text-align: left;
}
.featuresDataBox{
    display: inline-block;
    word-wrap:break-word;
    >div{
        margin-bottom: .25rem;
    }
    span{
        padding-right: .5rem;
    }
}
</style>