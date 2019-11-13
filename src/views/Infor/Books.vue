<template>
    <div class="inforAcc">
        <Header :mess="props"></Header>
        <div class="main">
            <ul class="lists">
                <li class="list head cf" >
                    <div class="cont cf">
                        <div class="item">账簿名称</div>
                        <div class="item">创建者</div>
                        <div class="item">创建时间</div>
                    </div>
                </li>
                <li v-for="book in books" class="list cf">
                    <div class="cont cf" @click="local('Infor/bookDetail',book.id)">
                        <div class="item">{{book.name}}</div>
                        <div class="item">{{book.user_name}}</div>
                        <div class="item">{{book.created_at}}</div>
                        <div class="item btns">
                            <span v-if="book.id == booksDefault.id" class="default">默认</span>
                            <span v-else class="switch" @click.stop="switchs(book.id)">切换</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <Notice :dis="notice" :mes="noticeMes"></Notice>
        <Choose :dis="choose" :mes="chooseMes" v-on:status="doSwitch($event)" v-on:dis="disnone()"></Choose>
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
        name: "Books",
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
                    title:'我的账簿',
                    method:{local:'Infor/addBooks',name:'新增账簿',data:{}},
                },
                token:'',
                books:[],
                booksDefault:{},
                notice:false,
                noticeMes:'修改成功',
                choose:false,
                chooseMes:'您确定要切换至该账号吗?',
                book_id: '',
                loading:false,
                loadingMes:'保存中,请稍后',

            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.init();
            this.getDefault();
        },
        methods:{
            init(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '页面加载中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'get',
                    url: this.$store.state.api+'book?token='+this.token,
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    var data = res.data.data;
                    // console.log(data);
                    this.books=data;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            getDefault(){
                axios({
                    method: 'get',
                    url: this.$store.state.api+'book/get-default?token='+this.token,
                }).then( res=>{
                    // console.log(res);
                    var data = res.data.data;
                    // console.log(data);
                    this.booksDefault = data;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            switchs(id){
                this.book_id = id;
                this.choose = true;
            },
            doSwitch(e){
                if (e) {
                    let lt = setTimeout(()=>{
                        this.loadingMes = '切换中,请稍后';
                        this.loading = true;
                    },200);
                    clearTimeout(this.t);
                    this.notice = false;
                    axios({
                        method: 'post',
                        url: this.$store.state.api+'book/set-default?token=' + this.token,
                        params: {
                            book_id: this.book_id,
                        }
                    }).then(res => {
                        clearTimeout(lt);
                        this.loading = false;
                        // console.log(res);
                        this.getDefault();
                        this.noticeMes = res.data.data;
                        this.notice = true;
                        this.t = setTimeout(()=>{
                            this.notice = false;
                        },2000);
                        // alert(res.data.data);
                    }).catch(function (error) {
                        // console.log(error);
                        // alert('服务器繁忙');
                        return;
                    });
                }
            },
            local(url,id){
                this.$router.push({path:"/"+url,query: {id:id}})
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
                    }
                    .btns{
                        position: relative;
                        span{
                            position: absolute;
                            display: block;
                            width: 50px;
                            height: 32px;
                            top: 50%;
                            left: 50%;
                            margin: -16px 0 0 -25px;
                            line-height: 32px;
                            border-radius: 10px;
                            text-align: center;
                        }
                        .switch{
                            background: #42b983;
                            color: #FFF;
                        }
                        .default{
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