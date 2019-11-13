<template>
    <div class="inforAcc">
        <Header :mess="props" v-on:edit="editCate"></Header>
        <div class="main">
            <div class="list">
                <div class="title fl">分类名称</div>
                <div class="cont fr">
                    <input type="text" v-model="mes.name" placeholder="请输入账户名称">
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
        name: "EditCategory",
        components:{
            Header,
            Notice,
            Loading
        },
        data(){
            return{
                props:{
                    back:'',
                    title:'修改分类',
                    btn:{method:'edit',name:'保存'}
                },
                mes:{},
                notice:false,
                noticeMes:'修改成功',
                t:null,
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.mes = this.$route.query;
        },
        methods:{
            local(url){
                this.$router.push({path:"/"+url})
            },
            editCate(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '保存中,请稍后';
                    this.loading = true;
                },200);
                this.notice = false;
                clearTimeout(this.t);
                axios({
                    method: 'post',
                    url: this.$store.state.api+'category/update?id='+this.mes.id+'&token='+this.token,
                    params: {
                        name:this.mes.name,
                        sort:this.mes.sort,
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    if (res.data.status){
                        // alert('修改类别成功');
                        this.noticeMes = '修改类别成功';
                        this.notice = true;
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