<template>
    <div class="infor">
        <div id="main">
            <div v-if="login" class="header">
                <div class="avatar">
                    <img :src="infor.avatar_url" alt="">
                </div>
                <h3>{{infor.nickname}}</h3>
            </div>
            <div v-else class="header">
                <h1 class="login" @click="local('login')">登录账户, 开始记账</h1>
            </div>
            <div class="title">
                <ul class="lists cf">
                    <li class="list" @click="local('Infor/books')">
                        <p style="color: #DF7428">{{books}}</p>
                        <p>总账簿</p>
                    </li>
                    <li class="list" @click="local('Infor/Account')">
                        <p style="color: #1970D1">{{accounts}}</p>
                        <p>总账户</p>
                    </li>
                    <li class="list" @click="local('index')">
                        <p style="color: #31A34E">{{records}}</p>
                        <p>共记账</p>
                    </li>
                </ul>
            </div>
            <div class="content">
                <ul class="list">
                    <List v-for="inforList in inforLists" v-bind:inforList="inforList" model="inforList" v-on:local="local($event)"></List>
                </ul>
            </div>
        </div>
        <Footer who="infor"></Footer>
        <Notice :dis="notice" :mes="noticeMes"></Notice>
        <Choose :dis="choose" :mes="chooseMes" v-on:status="doLogout($event)" v-on:dis="disnone()"></Choose>
        <Loading :dis="loading" :mes="loadingMes"></Loading>
    </div>
</template>

<script>
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Footer from '@/components/Footer.vue'
    import List from '@/components/List.vue'
    import Notice from '@/components/Notice.vue'
    import Choose from '@/components/Choose.vue'
    import Loading from '@/components/Loading.vue'

    export default {
        name: 'infor',
        components: {
            Footer,
            List,
            Notice,
            Choose,
            Loading
        },
        data(){
            return{
                token:'',
                login:false,
                infor:{},
                inforLists:[
                    [
                        {avatar:"", message:"个人资料", local:"Infor/mes", icon:"fa-yelp"},
                        {avatar:"", message:"安全中心", local:"Infor/safe", icon:"fa-gitlab"},
                    ],
                    [

                        {avatar:"", message:"我的账户", local:"Infor/account", icon:"fa-gg-circle"},
                        {avatar:"", message:"我的账簿", local:"Infor/books", icon:"fa-map"},
                        {avatar:"", message:"意见反馈", local:"Infor/feedback", icon:"fa-send"},
                    ],
                    [{avatar:"", message:"退出登录", local:'logout', icon:"fa-power-off"}],
                ],
                members:0,
                accounts:0,
                records:0,
                books:0,
                notice:false,
                noticeMes:'友情提示',
                choose:false,
                chooseMes:'您确定要退出吗?',
                t:null,
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            if (this.token != null){
                this.init();
                this.getAccounts();
                this.getRecords();
                this.getMember();
                this.getbooks();
            }
        },
        methods:{
            init(){
                axios({
                    method: 'get',
                    url: this.$store.state.api+'user/profile?token='+this.token,
                }).then(res=>{
                    if (res.data.status){
                        // console.log(res);
                        var data = res.data.data;
                        // console.log(data)
                        this.infor={
                            avatar_url:data.avatar_url,
                            mobile:data.mobile,
                            nickname:data.nickname
                        }
                    } else {
                        localStorage.removeItem('token');
                        this.$router.go(0);
                    }
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
                this.login = true;
            },
            local(url){
                this.notice = false;
                clearTimeout(this.t);
                if (url=='login'){
                    this.$router.push({path:"login"});
                }else if (url == 'logout'){
                    if (this.token == null){
                        this.noticeMes = '请先登录';
                        this.notice = true;
                        this.t = setTimeout(()=>{
                            this.notice = false;
                        },2000);
                        return;
                    }else{
                        this.choose = true;
                    }
                    return;
                }else if (this.token == null){
                    this.noticeMes = '请先登录';
                    this.notice = true;
                    this.t = setTimeout(()=>{
                        this.notice = false;
                    },2000);
                    return;
                }else {
                    this.$router.push({path:"/"+url});
                }
            },
            getMember(){
                axios({
                    method: 'get',
                    url: this.$store.state.api+'book/get-default?token='+this.token,
                }).then( res=>{
                    // console.log(res);
                    var data = res.data.data;
                    // console.log(data);
                    axios({
                        method: 'get',
                        url: this.$store.state.api+'member?token='+this.token,
                        params: {
                            book_id:data.id
                        }
                    }).then( res=>{
                        // console.log(res);
                        let data = res.data.data;
                        // console.log(res.data.data);
                        this.members = data.length;
                    }).catch(function (error) {
                        // console.log(error);
                        // alert('服务器繁忙');
                        return;
                    });
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            getAccounts(){
                axios({
                    method: 'get',
                    url: this.$store.state.api+'account?token='+this.token,
                }).then( res=>{
                    // console.log(res);
                    var data = res.data.data;
                    // console.log(data);
                    this.accounts=data.length;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            getRecords(){
                axios({
                    method: 'get',
                    url: this.$store.state.api+'record/real?token='+this.token,
                }).then( res=>{
                    // console.log(res);
                    let data = res.data.data.list;
                    // console.log(data);
                    this.records = data.length;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            getbooks(){
                axios({
                    method: 'get',
                    url: this.$store.state.api+'book?token='+this.token,
                }).then( res=>{
                    // console.log(res);
                    var data = res.data.data;
                    // console.log(data);
                    this.books=data.length;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            doLogout(e){
                if (e) {
                    let lt = setTimeout(()=>{
                        this.loadingMes = '账户注销中,请稍后';
                        this.loading = true;
                    },200);
                    axios({
                        method: 'get',
                        url: this.$store.state.api+'user/logout?token='+this.token,
                    }).then(res => {
                        clearTimeout(lt);
                        this.loading = false;
                        // console.log(res);
                        localStorage.removeItem('token');
                        this.$router.go(0);
                    }).catch(function (error) {
                        // console.log(error);
                        // alert('服务器繁忙');
                    });
                }
            },
            disnone(){
                this.choose = false;
            }
        },
    }

</script>

<style lang="scss" scoped>
    .infor{
        #main{
            height: 90vh;
            background: #ededed;
            font-size: 12px;
            color: #fff;
            overflow: scroll;
            .header{
                height: 23vh;
                padding-top: 5vh;
                background: #07C062;
                text-align: center;
                .login{
                    width: 60%;
                    padding: 2vh 0;
                    margin: 0 auto;
                    text-align: center;
                    font-size: 1.5em;
                    border: 1px solid #fff;
                    border-radius: 10px;
                    cursor: pointer;
                }
                .avatar{
                    width: 80px;
                    height: 80px;
                    margin: 0 auto;
                    border-radius: 100%;
                    background: #000;
                    overflow: hidden;
                    img{
                        height: 100%;
                    }
                }
                h3{
                    margin-top: 2vh;
                    margin-bottom: 0;
                    font-size: 1.5em;
                }
            }
            .title{
                background: #f9f9f9;
                padding: 2vh 0;
                .lists{
                    .list{
                        float: left;
                        text-align: center;
                        width: calc(1/3.1*100%);
                        color: #ababab;
                        border-right: 1px solid #ababab;
                        p{
                            height: 3vh;
                            line-height: 3vh;
                            white-space: normal;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                        p:first-of-type{
                            font-size: 16px;
                        }
                    }
                    .list:last-of-type{
                        border-right: none;
                    }
                }

            }
        }
    }
</style>