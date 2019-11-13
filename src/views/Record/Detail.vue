<template>
    <div class="inforAcc">
        <Header :mess="props"></Header>
        <div class="main">
            <ul class="lists" v-if="edit">
                <li class="list cf">
                    <div class="title fl">类型</div>
                    <div class="cont fr">{{mess.type_string}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">记账人</div>
                    <div class="cont fr">{{mess.user_nickname}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="mess.type==1">应收</span>
                        <span v-if="mess.type==2">应付</span>
                    </div>
                    <div class="cont fr">{{mess.total_money}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="mess.type==1">实收</span>
                        <span v-if="mess.type==2">实付</span>
                    </div>
                    <div class="cont fr">{{mess.paid_money}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易对象</div>
                    <div class="cont fr">{{mess.company_name}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">备注</div>
                    <div class="cont fr">{{mess.remark}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">记录时间</div>
                    <div class="cont fr">{{mess.created_at}}</div>
                </li>
            </ul>
            <ul class="lists" v-else="edit">
                <li class="list cf">
                    <div class="title fl">类型</div>
                    <div class="cont fr">{{mess.type_string}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">记账人昵称</div>
                    <div class="cont fr">{{mess.user_nickname}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="mess.type==1">应收</span>
                        <span v-if="mess.type==2">应付</span>
                    </div>
                    <div class="cont fr">
                        <input type="text" v-model="mess.total_money">
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="mess.type==1">实收</span>
                        <span v-if="mess.type==2">实付</span>
                    </div>
                    <div class="cont fr">{{mess.paid_money}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易对象</div>
                    <div class="cont fr">
                        <input type="text" v-model="mess.company_name">
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">备注</div>
                    <div class="cont fr">
                        <input type="text" v-model="mess.remark">
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">记录时间</div>
                    <div class="cont fr">{{mess.created_at}}</div>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="btns fl">
                <p v-if="edit" @click="edit=false">编辑</p>
                <p v-else @click="doEdit">保存</p>
            </div>
            <div class="btns fr">
                <p v-if="edit" @click="choose = true">删除</p>
                <p v-else @click="edit=true">取消</p>
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
        name: "Detail",
        components:{
            Header,
            Notice,
            Choose,
            Loading
        },
        data(){
            return{
                props:{
                    back:'index',
                    title:'详情',
                    method:{local:'Record/detailed',name:'明细',data:{id:''}},
                },
                token:'',
                id:'',
                mess:{},
                edit:true,
                notice:false,
                noticeMes:'修改成功',
                choose:false,
                chooseMes:'您确定要删除吗?',
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.id = this.$route.query.id;
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
                    url: this.$store.state.api+'record/detail?id='+this.id+'&token='+this.token,
                }).then( res=>{
                    // console.log(res.data.data);
                    this.mess = res.data.data;
                    this.props.title = this.mess.category_name;
                    this.props.method.data.id = this.mess.id;
                    if (this.mess.total_money-this.mess.paid_money>0){
                        this.$router.push({path:'/Record/appendRecord',query:{id:this.mess.id}})
                    }
                    clearTimeout(lt);
                    this.loading = false;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            local(url,id){
                this.$router.push({path:"/"+url,query:{id:id}})
            },
            doEdit(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '保存中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'post',
                    url: this.$store.state.api+'record/update?id='+this.mess.id+'&token='+this.token,
                    params:{
                        total_money:this.mess.total_money,
                        company_name:this.mess.company_name,
                        remark:this.mess.remark
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    this.noticeMes = '修改成功';
                    this.notice = true;
                    this.edit=true;
                    setTimeout(()=>{
                        this.notice = false;
                    },2000);
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            doDel(e){
                if (e) {
                    axios({
                        method: 'post',
                        url: this.$store.state.api+'record/delete?id=' + this.mess.id + '&token=' + this.token,
                    }).then(res => {
                        // console.log(res)
                        // alert(res.data.data);
                        this.$router.push({path: "/index"})
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
            height: 84vh;
            .lists{
                width: 90%;
                height: 50vh;
                padding: 0 5%;
                overflow: hidden;
                .list{
                    width: 100%;
                    height: 5vh;
                    line-height: 5vh;
                    border-bottom: 1px solid #f1f1f1;
                    white-space: normal;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    .title{
                        width: 40%;
                        text-align: left;
                    }
                    .cont{
                        width: 60%;
                        text-align: right;
                        color: #676767;
                        input{
                            text-align: right;
                            border: none;
                            outline: none;
                            padding-left: 10px;
                            padding-bottom: 3px;
                            border-bottom: 1px solid #07C062;
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
                    color: #07C062;
                    border-radius: 10px;
                    white-space: normal;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
    }
</style>