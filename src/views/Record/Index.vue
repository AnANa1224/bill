<template>
    <div class="record">
        <Header :mess="props"></Header>
        <div v-if="status=='income'" class="main">
            <div class="head cv">
                <div class="list income fl">
                    <p class="fr bb">支出</p>
                </div>
                <div class="list cost fl">
                    <p class="fl" @click="status='cost'">收入</p>
                </div>
            </div>
            <div class="category">
                <ul class="lists cf">
                    <li v-for="incomeCategory in incomeCategorys" class="list">
                        <p class="item" @click="local('Record/createRecord',incomeCategory)">{{incomeCategory.name}}</p>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="status=='cost'" class="main">
            <div class="head cv">
                <div class="list income fl">
                    <p class="fr" @click="status='income'">支出</p>
                </div>
                <div class="list cost fl">
                    <p class="fl bb">收入</p>
                </div>
            </div>
            <div class="category">
                <ul class="lists cf">
                    <li v-for="costCategory in costCategorys" class="list">
                        <p class="item" @click="local('Record/createRecord',costCategory)">{{costCategory.name}}</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Header from '@/components/Header.vue'

    export default {
        name: "record",
        components:{
            Header,
        },
        data(){
            return{
                props:{
                    back:'index',
                    title:'记一笔',
                    method:{local:'Record/category',name:'设置',data:{}},

                },
                status:'income',
                token:'',
                incomeCategorys:[],
                costCategorys:[],
            }
        },
        mounted() {
            this.token = localStorage.getItem('token');
            this.getCate();
        },
        methods:{
            getCate(){
                axios({
                    method: 'get',
                    url: this.$store.state.api+'category?token='+this.token,
                    params: {
                        type:2,
                    }
                }).then( res=>{
                    // console.log(res.data.data);
                    this.incomeCategorys = res.data.data;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
                axios({
                    method: 'get',
                    url: this.$store.state.api+'category?token='+this.token,
                    params: {
                        type:1,
                    }
                }).then( res=>{
                    // console.log(res.data.data);
                    this.costCategorys = res.data.data;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            local(url,mes){
                this.$router.push({path:"/"+url,query:mes});
            },
        }
    }
</script>

<style scoped lang="scss">
    .record {
        .main {
            .head{
                height: 6vh;
                border-bottom: 1px solid #ababab;
                line-height: 6vh;
                .list{
                    width: 50%;
                    height: 6vh;
                    text-align: center;
                    font-size: 14px;
                    white-space: normal;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    p{
                        width: 50%;
                        height: 98%;
                    }
                    .bb{
                        border-bottom: 2px solid #07C062;
                    }
                }
            }
            .category{
                margin-top: 2%;
                .lists{
                    .list{
                        width: calc(1/4*100%);
                        height: 8vh;
                        line-height: 8vh;
                        margin: 1vh 0;
                        text-align: center;
                        float: left;
                        font-size: 14px;
                        .item{
                            width: 80%;
                            height: 100%;
                            margin: 0 auto;
                            border-radius: 20px;
                            background: #07C062;
                            opacity: 0.6;
                            color: #fff;
                            white-space: normal;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                    }
                }
            }
        }
    }
</style>