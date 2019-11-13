<template>
    <div v-if="dis" @click="operation" v-trigger class="notice">
        <div class="mes">{{mes}}</div>
    </div>
</template>

<script>
    import $ from 'jquery'
    export default {
        name: "Notice",
        props:{
            mes:'',
            dis:Boolean,
        },
        methods:{
            operation(){
                var wd = $('.notice').width();
                $('.notice').css('marginLeft','-'+wd/2+'px');
                setTimeout(()=>{
                    $('.notice').fadeOut(1500);
                },500);
            },
        },
        directives:{
            trigger:{
                inserted(el,binging){
                    el.click();
                    //$(el).trigger('click');
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .notice{
        /*display: none;*/
        max-width: 200px;
        padding: 10px 5px;
        background: #ccc;
        box-shadow: 0px 0px 20px -3px #aaa;
        border-radius: 10px;
        color: #fff;
        position: absolute;
        bottom: 30%;
        left: 50%;
    }
</style>