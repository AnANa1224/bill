<template>
    <div class="record">
        <Header :mess="props"></Header>
        <div v-if="type==2" class="main">
            <div class="head cv">
                <div class="list income fl">
                    <p class="fr bb">支出</p>
                </div>
                <div class="list cost fl">
                    <p class="fl" @click="change(1)">收入</p>
                </div>
            </div>
            <div class="category">
                <ul class="lists cf">
                    <li v-for="incomeCategory in incomeCategorys" class="list">
                        <div class="cont fl" @click="local('Record/editCate',{id:incomeCategory.id,name:incomeCategory.name,sort:incomeCategory.sort})">{{incomeCategory.name}}</div>
                        <div class="del fr"><p @click="delCate(incomeCategory.id)">删除</p></div>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="type==1" class="main">
            <div class="head cv">
                <div class="list income fl">
                    <p class="fr" @click="change(2)">支出</p>
                </div>
                <div class="list cost fl">
                    <p class="fl bb">收入</p>
                </div>
            </div>
            <div class="category">
                <ul class="lists cf">
                    <li v-for="costCategory in costCategorys" class="list">
                        <div class="cont fl" @click="local('Record/editCate',{id:costCategory.id,name:costCategory.name,sort:costCategory.sort})">{{costCategory.name}}</div>
                        <div class="del fr"><p @click="delCate(costCategory.id,1)">删除</p></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer">
            <div class="btns fl">
                <p>占位</p>
            </div>
            <div class="btns fr">
                <p @click="local('Record/addCate')">新增分类</p>
            </div>
        </div>
        <Notice :dis="notice" :mes="noticeMes"></Notice>
        <Choose :dis="choose" :mes="chooseMes" v-on:status="doDel($event)" v-on:dis="disnone()"></Choose>
        <Loading :dis="loading" :mes="loadingMes"></Loading>
    </div>
</template>

<script>
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Header from '@/components/Header.vue'
    import Notice from '@/components/Notice.vue'
    import Choose from '@/components/Choose.vue'
    import Loading from '@/components/Loading.vue'

    export default {
        name: "category",
        components:{
            Header,
            Notice,
            Choose,
            Loading
        },
        data(){
            return{
                props:{
                    back:'record',
                    title:'类别设置',
                },
                type:2,
                token:'',
                incomeCategorys:[],
                costCategorys:[],
                notice:false,
                noticeMes:'修改成功',
                choose:false,
                chooseMes:'您确定要删除吗?',
                delId:'',
                t:'',
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted() {
            this.token = localStorage.getItem('token');
            this.init();
        },
        methods:{
            init(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '加载中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'get',
                    url: this.$store.state.api+'category?token='+this.token,
                    params: {
                        type:this.type,
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res.data.data);
                    this.incomeCategorys = res.data.data;
                    this.costCategorys = res.data.data;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            change(status){
                this.type = status;
                this.init();
            },
            local(url,mes){
                this.$router.push({path:'/'+url,query:mes})
            },
            delCate(id,type=2){
                this.delId = id;
                this.choose = true;
                this.type = type;
            },
            doDel(e){
                if (e) {
                    let lt = setTimeout(()=>{
                        this.loadingMes = '删除中,请稍后';
                        this.loading = true;
                    },200);
                    clearTimeout(this.t);
                    this.notice = false;
                    axios({
                        method: 'post',
                        url: this.$store.state.api+'category/delete?id=' + this.delId + '&token=' + this.token,
                    }).then(res => {
                        // console.log(res);
                        // alert('删除分类成功');
                        clearTimeout(lt);
                        this.loading = false;
                        if (res.data.status) {
                            this.noticeMes = '删除分类成功';
                            this.notice = true;
                            this.t = setTimeout(()=>{
                                this.notice = false;
                            },2000);
                            this.init();
                        } else {
                            // alert(res.data.data);
                            return;
                        }
                    }).catch(function (error) {
                        // console.log(error);
                        // alert('服务器繁忙');
                        return;
                    });
                }
                this.choose = false;
            },
            disnone(){
                this.choose = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    .record {
        .main {
            height: 84vh;
            overflow: scroll;
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
                        padding-left: 10%;
                        height: 8vh;
                        line-height: 8vh;
                        text-align: left;
                        font-size: 14px;
                        .cont{
                            width: 70%;
                            height: 8vh;
                            white-space: normal;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                        .del{
                            position: relative;
                            width: 20%;
                            height: 8vh;
                            white-space: normal;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            p{
                                position: absolute;
                                width: 80%;
                                height: 4vh;
                                top: 50%;
                                margin-top: -2vh;
                                background: #31A34E;
                                line-height: 4vh;
                                color: #fff;
                                border-radius: 20px;
                                text-align: center;
                                white-space: normal;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            }
                        }
                    }
                }
            }
        }
        .footer{
            height: 8vh;
            .btns{
                width: calc(48%);
                text-align: center;
                p{
                    width: 90%;
                    height: 6vh;
                    line-height: 6vh;
                    margin: 0 auto;
                    font-size: 18px;
                    border: 1px solid #07C062;
                    border-radius: 10px;
                    white-space: normal;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
    }
</style>