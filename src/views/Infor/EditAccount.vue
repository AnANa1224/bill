<template>
    <div class="inforAcc">
        <Header :mess="props" v-on:edit="editAcc"></Header>
        <div class="main">
            <div class="list">
                <div class="title fl">账户名称</div>
                <div class="cont fr">
                    <input type="text" v-model="mes.name" placeholder="请输入账户名称">
                </div>
            </div>
            <div class="list">
                <div class="title fl">账户类型</div>
                <div class="cont fr">
                    <select name="" id="type" v-model="mes.type">
                        <option value="1">现金</option>
                        <option value="2">银行</option>
                        <option value="3">支付平台</option>
                        <option value="4">其他</option>
                    </select>
                </div>
            </div>
            <div class="list">
                <div class="title fl">排序值</div>
                <div class="cont fr">
                    <select name="" id="sort" v-model="mes.sort">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                </div>
            </div>
            <div class="list">
                <div class="title fl">备注信息</div>
                <div class="cont fr">
                    <input type="text" v-model="mes.remark" placeholder="可输入备注信息">
                </div>
            </div>
        </div>
        <Notice :dis="notice" :mes="noticeMes"></Notice>
        <Loading :dis="loading" :mes="loadingMes"></Loading>
    </div>
</template>

<script>
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Header from '@/components/Header.vue'
    import Notice from '@/components/Notice.vue'
    import Loading from '@/components/Loading.vue'

    export default {
        name: "AddAccount",
        components:{
            Header,
            Notice,
            Loading
        },
        data(){
            return{
                props:{
                    back:'Infor/account',
                    title:'我的账户',
                    btn:{method:'edit',name:'保存'}
                },
                token:'',
                id:'',
                mes:{},
                notice:false,
                noticeMes:'修改成功',
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.id = this.$route.query.id;
            this.getMes();
        },
        methods:{
            getMes(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '信息获取中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'get',
                    url: this.$store.state.api+'account/detail?id='+this.id+'&token='+this.token,
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    var data = res.data.data;
                    // console.log(data)
                    this.mes=data
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            local(url){
                this.$router.push({path:"/"+url})
            },
            editAcc(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '保存中,请稍后';
                    this.loading = true;
                },200);
                clearTimeout(this.t);
                this.notice = false;
                axios({
                    method: 'post',
                    url: this.$store.state.api+'account/update?id='+this.mes.id+'&token='+this.token,
                    params: {
                        name:this.mes.name,
                        type:this.mes.type,
                        remark:this.mes.remark,
                        sort:this.mes.sort,
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    if (res.data.status){
                        this.noticeMes = '修改成功';
                        this.notice = true;
                        this.t = setTimeout(()=>{
                            this.notice = false;
                        },2000);
                    }else{
                        this.noticeMes = res.data.data;
                        this.notice = true;
                        setTimeout(()=>{
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
        },
    }
</script>

<style scoped lang="scss">
    .inforAcc {
        .main{
            padding: 0 15px;
            .list {
                width: 100%;
                /*height: 50px;*/
                max-height: 51px;
                overflow: scroll;
                line-height: 50px;
                border-bottom: 1px solid #f1f1f1;

                .title {
                    width: 40%;
                    text-align: left;
                    white-space: normal;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }

                .cont {
                    width: 60%;
                    max-height: 100px;
                    overflow: scroll;
                    text-align: right;
                    color: #676767;

                    input {
                        text-align: right;
                        border: none;
                        outline: none;
                        padding-right: 10px;
                        padding-bottom: 3px;
                        border-bottom: 1px solid #07C062;
                    }

                    select{
                        width: 50%;
                        border: none;
                        outline: none;
                        text-align: right;
                        background: #fafafa;
                    }
                }
            }
        }
    }
</style>