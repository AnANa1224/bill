<template>
    <div class="inforAcc">
        <Header :mess="props"></Header>
        <div class="main">
            <ul class="lists">
                <li class="list head cf" >
                    <div class="cont cf">
                        <div class="item">账户名称</div>
                        <div class="item">初始额度</div>
                        <div class="item">余额</div>
                    </div>
                </li>
                <li v-for="mes in mess" class="list cf">
                    <div class="cont cf" @click="local('Infor/editAccount',mes.id)">
                        <div class="item">{{mes.name}}</div>
                        <div class="item">{{mes.initial_balance}}</div>
                        <div class="item">{{mes.balance}}</div>
                        <div class="item del"><span class="delBtn" @click.stop="delAcc(mes.id)">删除</span></div>
                    </div>
                </li>
            </ul>
        </div>
        <Notice :dis="notice" :mes="noticeMes"></Notice>
        <Choose :dis="choose" :mes="chooseMes" v-on:status="doDel($event)" v-on:dis="disnone()"></Choose>
        <Loading :dis="loading" :mes="loadingMes"></Loading>
    </div>
</template>

<script>
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import $ from 'jquery'
    import Header from '@/components/Header.vue'
    import Notice from '@/components/Notice.vue'
    import Choose from '@/components/Choose.vue'
    import Loading from '@/components/Loading.vue'

    export default {
        name: "Account",
        components:{
            Header,
            Notice,
            Choose,
            Loading
        },
        data(){
            return{
                props:{
                    back:'infor',
                    title:'我的账户',
                    method:{local:'Infor/addAccount',name:'新增账户',data:{}},
                },
                token:'',
                mess:[],
                notice:false,
                noticeMes:'修改成功',
                choose:false,
                chooseMes:'您确定要删除吗?',
                delId:'',
                t:null,
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.init();
        },
        methods:{
            init(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '页面加载中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'get',
                    url: this.$store.state.api+'account?token='+this.token,
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    var data = res.data.data;
                    // console.log(data)
                    this.mess=data
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            local(url,id){
                this.$router.push({path:"/"+url,query: {id:id}})
            },
            delAcc(id){
                this.delId = id;
                this.choose = true;
            },
            doDel(e){
                if (e){
                    let lt = setTimeout(()=>{
                        this.loadingMes = '删除中,请稍后';
                        this.loading = true;
                    },200);
                    clearTimeout(this.t);
                    this.notice = false;
                    axios({
                        method: 'post',
                        url: this.$store.state.api+'account/delete?id=' + this.delId + '&token=' + this.token,
                    }).then(res => {
                        clearTimeout(lt);
                        this.loading = false;
                        // console.log(res);
                        if (res.data.status) {
                            // alert('删除账户成功');
                            this.noticeMes = '删除账户成功';
                            this.notice = true;
                            this.init();
                            this.t = setTimeout(()=>{
                                this.notice = false;
                            },2000);
                        } else {
                            // alert(res.data.data);
                            this.noticeMes = res.data.data;
                            this.notice = true;
                            this.t = setTimeout(()=>{
                                this.notice = false;
                            },2000);
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
        },
    }
</script>

<style scoped lang="scss">
    .inforAcc {
        .main{
            .lists{
                .list{
                    height: 64px;
                    line-height: 64px;
                    padding: 0 20px;
                    border-bottom: 1px solid #ccc;
                    .cont{
                        text-align: center;
                        .item{
                            height: 64px;
                            float: left;
                            width: calc(1/4*100%);
                            white-space: normal;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                        .del{
                            width: 20%;
                            height: 32px;
                            padding: 16px 0;
                            white-space: normal;
                            text-overflow: ellipsis;
                            overflow: hidden;
                            .delBtn{
                                height: 32px;
                                display: block;
                                width: 50%;
                                margin: 0 auto;
                                line-height: 32px;
                                border-radius: 10px;
                                background: #42b983;
                                color: #FFF;
                                text-align: center;
                                white-space: normal;
                                text-overflow: ellipsis;
                                overflow: hidden;
                            }
                        }
                    }
                }
                .head{
                    background: #42b983;
                    color: #fff;
                }
            }
        }
    }
</style>