<template>
    <div class="inforAcc">
        <Header :mess="props" v-on:add="addCate"></Header>
        <div class="main">
            <div class="list">
                <div class="title fl">分类名称</div>
                <div class="cont fr">
                    <input type="text" v-model="name" placeholder="请输入分类名称">
                </div>
            </div>
            <div class="list">
                <div class="title fl">分类类型</div>
                <div class="cont fr">
                    <select name="" id="type" v-model.number="type">
                        <option value="0" selected>请选择</option>
                        <option value="1">收入</option>
                        <option value="2">支出</option>
                    </select>
                </div>
            </div>
            <div class="list">
                <div class="title fl">父级分类</div>
                <div class="cont fr">
                    <select v-if="type == '1'" v-model.number="parent_id">
                        <option value="0">顶级分类</option>
                        <option v-for="costCategory in costCategorys" value="costCategory.id">{{costCategory.name}}</option>
                    </select>
                    <select v-else-if="type == '2'" v-model.number="parent_id">
                        <option value="0">顶级分类</option>
                        <option v-for="incomeCategory in incomeCategorys" value="incomeCategory.id">{{incomeCategory.name}}</option>
                    </select>
                    <select v-else v-model.number="parent_id">
                        <option value="0">顶级分类</option>
                    </select>
                </div>
            </div>
            <div class="list">
                <div class="title fl">排序值</div>
                <div class="cont fr">
                    <select name="" id="sort" v-model.number="sort">
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
        name: "AddCate",
        components:{
            Header,
            Notice,
            Loading
        },
        data(){
            return{
                props:{
                    back:'',
                    title:'新增类别',
                    btn:{method:'add',name:'新增'},
                },
                token:'',
                parent_id:0,
                type:0,
                name:'',
                sort:10,
                incomeCategorys:[],
                costCategorys:[],
                notice:false,
                noticeMes:'修改成功',
                t:null,
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.getCate();
        },
        methods:{
            local(url){
                this.$router.push({path:"/"+url})
            },
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
            addCate(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '保存中,请稍后';
                    this.loading = true;
                },200);
                this.notice = false;
                clearTimeout(this.t);
                axios({
                    method: 'post',
                    url: this.$store.state.api+'category/create?token='+this.token,
                    params: {
                        parent_id:this.parent_id,
                        type:this.type,
                        name:this.name,
                        sort:this.sort,
                    }
                }).then( res=>{
                    // console.log(res);
                    // alert('新增分类成功');
                    clearTimeout(lt);
                    this.loading = false;
                    if (res.data.status){
                        this.noticeMes = '新增分类成功';
                        this.notice = true;
                        this.parent_id=0;
                        this.type=0;
                        this.name='';
                        this.sort=10;
                        this.t = setTimeout(()=>{
                            this.notice = false;
                        },2000);
                    }else{
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
        },
    }
</script>

<style scoped lang="scss">
    .inforAcc {
        .main{
            padding: 0 15px;
            .list {
                width: 100%;
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #f1f1f1;
                white-space: normal;
                text-overflow: ellipsis;
                overflow: hidden;
                .title {
                    width: 40%;
                    text-align: left;
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