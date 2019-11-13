<template>
    <div v-if="dis" class="choose" @click="$emit('dis')">
        <div class="bg"></div>
        <div class="notice">
            <div class="title">提示</div>
            <div class="content">
                {{mes}}
            </div>
            <div class="btns">
                <div class="btn cancel" @click="$emit('status',false)">
                    取消
                </div>
                <div class="btn enter" @click="$emit('status',true)">
                    确认
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Choose",
        props:{
            mes:'',
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
            background: #333;
            opacity: 0.3;
            width: 100%;
            height: 100vh;
        }
        .notice{
            position: absolute;
            width: 250px;
            height: 140px;
            left: 50%;
            top: 50%;
            margin-left: -125px;
            margin-top: -70px;
            box-shadow: 0px 0px 20px 1px;
            border-radius: 10px;
            background: #fff;
            text-align: center;
            .title{
                height: 30px;
                line-height: 30px;
                border-bottom: 1px solid #ccc;
            }
            .content{
                height: 50px;
                padding: 10px 20px;
                color: #777;
            }
            .btns{
                height: 40px;
                line-height: 40px;
                display: flex;
                .btn{
                    flex: 1;
                }
                .enter{
                    border-left: 1px solid #ccc;
                    color: #07e88a;
                }
            }
        }
    }
</style>