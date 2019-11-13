<template>
    <div class="record">
        <div id="header">
            <div class="item title">
                <span class="fa fa-bar-chart-o"></span>
                <span>统计</span>
            </div>
            <div class="item type">
                <ul class="type_lists cf">
                    <li v-if="type == '2'" class="type_list bg">支出</li>
                    <li v-else class="type_list"  @click="type = 2">支出</li>
                    <li v-if="type == '1'" class="type_list bg">收入</li>
                    <li v-else class="type_list" @click="type = 1">收入</li>
                    <li v-if="type == '3'" class="type_list bg">收支</li>
                    <li v-else class="type_list" @click="type = 3">收支</li>
                </ul>
            </div>
            <div class="item excel">
                <span>导出</span>
            </div>
        </div>
        <div id="main">
            <div class="head">
                <ul class="total cf">
                    <li v-if="date_type == 'day'" class="item bb">日份</li>
                    <li v-else class="item"  @click="now = 'day'">日份</li>
                    <li v-if="date_type == 'month'" class="item bb">月份</li>
                    <li v-else class="item" @click="now = 'month'">月份</li>
                    <li v-if="date_type == 'year'" class="item bb">年份</li>
                    <li v-else class="item" @click="now = 'year'">年份</li>
                </ul>
            </div>
        </div>
        <Footer who="accountTable"></Footer>
    </div>
</template>

<script>
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Footer from '@/components/Footer.vue'

    export default {
        name: "record",
        components:{
            Footer
        },
        data(){
            return{
                props:{
                    back:'index',
                    title:'统计',
                },
                status:'income',
                token:'',
                incomeCategorys:[],
                costCategorys:[],
                type:2,
                date_type:'day',
                excel:0,
            }
        },
        mounted() {
            this.token = localStorage.getItem('token');
        },
        methods:{
            local(url,mes){
                this.$router.push({path:"/"+url,query:mes});
            },
        }
    }
</script>

<style scoped lang="scss">
    .record {
        #header {
            height: 8vh;
            background: #38B74C;
            display: flex;
            color: #fff;
            text-align: center;
            .item{
                flex: 1;
            }
            .title{
                line-height: 8vh;
                text-align: left;
                span{
                    margin-left: 3%;
                    margin-right: 10%;
                }
            }
            .excel{
                text-align: right;
                line-height: 8vh;
            }
            .type{
                font-size: 13px;
                position: relative;
                .type_lists{
                    position: absolute;
                    top: 50%;
                    display: flex;
                    width: 95%;
                    height: 30px;
                    line-height: 30px;
                    margin: -15px auto 0;
                    border: 1px solid #FFF;
                    border-radius: 5px;
                    .type_list{
                        flex: 1;
                    }
                    .type_list:nth-of-type(2){
                        border-left: 1px solid #fff;
                        border-right: 1px solid #fff;
                    }
                    .bg{
                        background: #fff;
                        color: #07e88a;
                    }
                }
            }
        }
        #main {
            height: 82vh;
            background: #f1f1f1;
            font-size: 12px;
            .head{
                background: #07C062;
                position: relative;
                .total{
                    padding: 0 5%;
                    height: 45px;
                    line-height: 45px;
                    .item{
                        width: calc(1/3*100%);
                        height: 43px;
                        float: left;
                        text-align: center;
                        color: #f1f1f1;
                        .title{
                            font-size: 14px;
                            margin-bottom: 1vh;
                        }
                    }
                    .bb{
                        border-bottom: 2px solid #fff;
                    }
                    .month{
                        position: relative;
                        .setMonth{
                            position: absolute;
                            width: 100%;
                            background: #fff;
                            opacity: 0.8;
                            color: #07C062;
                            .monthList{
                                width: 90%;
                                padding: 0 5%;
                                height: 3vh;
                                line-height: 3vh;

                            }
                            span{
                                border-bottom: 1px solid #ababab;
                            }
                        }
                    }
                }
                .nav{
                    background: #e4e4e2;
                    .list{
                        float: left;
                        text-align: center;
                        height: 10vh;
                        line-height: 5vh;
                        width: calc(1/5*100%);
                        font-size: 12px;
                        .type{
                            width: 80%;
                            height: 3vh;
                            line-height: 3vh;
                            margin: 0 auto;
                            background: #fff;
                            border-radius: 10px;
                            white-space: normal;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            .font{
                                margin-left: 8px;
                            }
                        }
                        .type_lists{
                            position: relative;
                            z-index: 666;
                            width: 80%;
                            max-height: 30vh;
                            overflow: scroll;
                            margin: 0 auto;
                            border-radius: 10px;
                            background: #f9f9f9;
                            color: #000000;
                            .type_list{
                                height: 3vh;
                                line-height: 3vh;
                                border-bottom: 1px solid #e4e4e2;
                                white-space: normal;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            }
                        }
                    }
                }
                .senior_lists{
                    position: absolute;
                    z-index: 99999;
                    bottom: 0;
                    width: 80%;
                    height: 10vh;
                    line-height: 5vh;
                    background: #FFFFFF;
                    .senior_list{
                        text-align: center;
                        float: left;
                        select{
                            outline: none;
                        }
                    }
                    .date{
                        width: calc(1/2*100%);
                        p{
                            input{
                                /*display: none;*/
                                width: 70%;
                                outline: none;
                                border: 1px solid #f1f1f1;
                            }
                        }
                    }
                    .name{
                        width: calc(1/3*100%);
                        .type{
                            width: 80%;
                            height: 3vh;
                            line-height: 3vh;
                            margin: 0 auto;
                            background: #f7f7f9;
                            border-radius: 10px;
                            white-space: normal;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            .font{
                                margin-left: 8px;
                            }
                        }
                        .type_lists{
                            position: relative;
                            z-index: 666;
                            width: 80%;
                            max-height: 30vh;
                            overflow: scroll;
                            margin: 0 auto;
                            border-radius: 10px;
                            background: #f9f9f9;
                            color: #000000;
                            .type_list{
                                height: 3vh;
                                line-height: 3vh;
                                border-bottom: 1px solid #e4e4e2;
                                white-space: normal;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            }
                        }
                    }
                    .btns{
                        width: calc(1/6*100%);
                        .btn{
                            p{
                                position: relative;
                                width: 80%;
                                height: 80%;
                                line-height: 2vh;
                                background: #38db56;
                                color: #fff;
                                border-radius: 20px;
                                text-align: center;
                            }
                            .enter{
                                margin-top: 25%;
                                top: 25%;
                            }
                            .clear{
                                margin-top: 25%;
                                bottom: 25%;
                            }
                        }
                    }
                }
            }
        }
    }
</style>