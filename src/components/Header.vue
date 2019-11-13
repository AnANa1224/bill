<template>
    <div class="header">
        <h3>
            <span class="fa fa-chevron-left back" @click="local(mess.back)">　返回</span>
            <span class="title">{{mess.title}}</span>
            <span v-if="mess.method" class="method" @click="local(mess.method.local,mess.method.data)">{{mess.method.name}}</span>
            <span v-if="mess.btn" class="method" @click="$emit(mess.btn.method)">{{mess.btn.name}}</span>
        </h3>
    </div>
</template>

<script>
    export default {
        name: "Header",
        props: {
            mess:Object,
        },
        mounted() {
            // console.log(this.mess)
        },
        methods: {
            local(url,data){
                if (url==''){
                    this.$router.go(-1);
                }else{
                    this.$router.push({path:"/"+url,query:data})
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .header {
        background: #07C062;
        color: #fff;
        h3 {
            margin: 0;
            padding: 0 5%;
            span {
                display: inline-block;
                width: calc(1/3*100%);
                height: 8vh;
                line-height: 8vh;
                white-space: normal;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .back{
                span{
                    width: 90%;
                    margin-left: 10%;
                }
            }
            .title{
                text-align: center;
            }
            .method{
                text-align: right;
            }
        }
    }
</style>