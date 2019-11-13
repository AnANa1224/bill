<template>
    <div v-if="dis" class="choose">
        <div class="bg"></div>
        <div class="notice">
            <i class="fa fa-spinner fa-pulse"></i>
            <br>
            {{mes}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loading",
        props:{
            mes:String,
            dis:Boolean,
        },
    }
</script>

<style scoped lang="scss">
    .choose{
        .bg{
            position: absolute;
            left: 0;
            top: 0;
            background: #fff;
            opacity: 0.3;
            width: 100%;
            height: 100vh;
        }
        .notice{
            position: absolute;
            width: 250px;
            height: 100px;
            /*line-height: 100px;*/
            left: 50%;
            top: 50%;
            margin-left: -125px;
            margin-top: -70px;
            color: #666;
            border-radius: 10px;
            text-align: center;
            i{
                margin-bottom: 10px;
                font-size: 30px;
                margin-left: 10px;
                color: #07e88a;
            }
        }
    }
</style>