<template>
    <div class="register">
        <div class="bg bg-blur"></div>
        <div class="main">
            <div class="header">
                <h3>
                    <span class="fa fa-chevron-left back" @click="local('login')"></span>
                    <span class="title">注册</span>
                </h3>
            </div>
            <h1 class="logo"><img src="img/logo.jpg" alt=""></h1>
            <div class="content">
                <div class="item account">
                    <input type="text" v-model="mobile" placeholder="请输入手机号" maxlength="11" @input="init()">
                </div>
                <div class="item code">
                    <input class="imgcode" type="text" v-model="code" placeholder="请输入图形验证码">
                    <img :src="imgUrl" alt="" @click="getImgcode">
                </div>
                <div class="item code">
                    <input class="code" type="text" v-model="verify" placeholder="请输入手机验证码">
                    <button class="codeBtn" :disabled="disabled" @click="getCode()">{{mes}}</button>
                </div>
                <div class="item nickname" v-if="message">
                    <input type="text" v-model="nickname" placeholder="请输入昵称" maxlength="11">
                </div>
                <div class="item pwd" v-if="message">
                    <input type="password" v-model="pwd" placeholder="请输入密码" autocomplete="off">
                </div>
                <div class="item pwd" v-if="message">
                    <input type="password" v-model="repwd" placeholder="请再次输入密码" autocomplete="off">
                </div>
                <div class="item login">
                    <button class="subBtn" @click="doReg">注册</button>
                </div>
                <div class="item footer tac">
                    <span>已有账号?</span><span class="backBtn" @click="local('Login')">返回登录</span>
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
    import Notice from '@/components/Notice.vue'
    import Loading from '@/components/Loading.vue'

    export default {
        name: 'register',
        components:{
            Notice,
            Loading
        },
        data(){
            return{
                disabled: false,
                mes:'获取验证码',
                message:false,
                mobile:'',
                imgUrl:'',
                key:'',
                code:'',
                verify:'',
                pwd:'',
                repwd:'',
                nickname:'',
                t:null,
                notice:false,
                noticeMes:'修改成功',
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.getImgcode();
        },
        methods:{
            getImgcode(){
                axios({
                    method:'get',
                    url:this.$store.state.api+'captcha',
                    responseType:'json'
                }).then( res=>{
                    // console.log(res)
                    if (res.status) {
                        var data = res.data.data;
                        this.imgUrl = data.url;
                        this.key = data.key;
                    }else{
                        // console.log('图形验证码获取失败');
                    }
                });
            },
            init(){
                this.disabled=false;
                this.mes='获取验证码';
                this.message=false;
                if (this.mobile.length == 11){
                    this.getImgcode();
                }
                this.code='';
                this.verify='';
                this.nickname='';
                this.pwd='';
                this.repwd='';

            },
            getCode(){
                clearTimeout(this.t);
                this.notice = false;
                if (this.mobile.length == 0){
                    this.notices('请输入手机号');
                    return;
                }
                if (this.mobile.length < 11){
                    this.notices('请输入11位手机号');
                    return;
                }
                if (this.code == 0){
                    this.notices('请输入图形验证码');
                    return;
                }
                let lt = setTimeout(()=>{
                    this.loadingMes = '获取中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'post',
                    url: this.$store.state.api+'sms/verify',
                    params: {
                        mobile: this.mobile,
                        captcha_code:this.code,
                        captcha_key:this.key,
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    console.log(res);
                    if (res.data.status){
                        this.disabled = true;
                        this.mes = '已发送';
                        this.message = true;
                    }else{
                        this.notices(res.data.data);
                        return;
                    }
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙,发送失败');
                    return;
                });
            },
            doReg(){
                clearTimeout(this.t);
                this.notice = false;
                if (!this.message){
                    this.notices('请先获取验证码');
                    return;
                }
                if (this.mobile.length == 0){
                    this.notices('请输入手机号');
                    return;
                }
                if (this.mobile.length < 11){
                    this.notices('请输入11位手机号');
                    return;
                }
                if (this.pwd == 0) {
                    this.notices('请输入密码');
                    return;
                }
                if (this.code == 0){
                    this.notices('请输入验证码');
                    return;
                }
                if (this.pwd != this.repwd){
                    this.notices('两次密码不一致');
                    return;
                }
                let lt = setTimeout(()=>{
                    this.loadingMes = '注册中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'post',
                    url: this.$store.state.api+'user/register',
                    params: {
                        mobile: this.mobile,
                        verify:this.verify,
                        password:this.pwd,
                        nickname:this.nickname,
                    }
                }).then(res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    if (res.data.status){
                        this.notices('注册成功',1000);
                        this.$router.push('./');
                    }else{
                        this.notices(res.data.data);
                        this.$router.go(0);
                        // location.reload();
                    }
                }).catch(function (error) {
                    // console.log(error);
                    return;
                });
            },
            local(url){
                this.$router.push('/'+url)
            },
            notices(mes,t=2000){
                this.noticeMes = mes;
                this.notice = true;
                this.t = setTimeout(()=>{
                    this.notice = false;
                },t);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .register{
        font-size: 12px;
        color: #fff;
        .bg{
            background-image:url("img/bg7.jpg");
            width:100%;
            height: 100vh;
            min-height: 600px;
            float:left;
            background-position:center;
            background-repeat:no-repeat;
            background-size:cover;
            filter:blur(9px);
        }
        .main{
            width: 100%;
            position:absolute;
            height: 100vh;
            .header {
                height: 65px;
                color: #fff;
                h3 {
                    margin: 0;
                    padding: 0 5%;
                    span {
                        display: inline-block;
                        width: calc(1 / 3 * 100%);
                        height: 65px;
                        line-height: 65px;
                        font-size: 20px;
                    }
                    .back {
                        span {
                            width: 90%;
                            margin-left: 10%;
                        }
                    }
                    .title {
                        text-align: center;
                    }
                    .method {
                        text-align: right;
                    }
                }
            }
            .logo{
                height: 160px;
                margin: 0;
                position: relative;
                text-align: center;
                img{
                    height: 80px;
                    margin: 0 auto;
                    position:absolute;
                    left: 50%;
                    top:50%;
                    margin-top:-40px;
                    margin-left:-40px;
                    border-radius: 100%;
                }
            }
            .content{
                .item{
                    width: 70%;
                    padding: 0 15%;
                    height: 65px;
                    input{
                        width: 95%;
                        padding: 20px 0 5px 5%;
                        font-size: 16px;
                        border: none;
                        outline: none;
                        background: none;
                        border-bottom: 2px solid #07e88a;
                        color: #fff;
                    }
                    input::-webkit-input-placeholder {
                        color: #fff;
                        font-size: 14px;
                    }
                }
                .code{
                    position: relative;
                    .code{
                        width: 55%;
                        margin-right: 5%;
                    }
                    .codeBtn{
                        font-size: 12px;
                        border: none;
                        outline: none;
                        color: #000;
                        background: #fff;
                        position: absolute;
                        border-radius: 10px;
                        width: 23%;
                        height: 50%;
                        top: 50%;
                        margin-top: -5%;
                    }
                    .imgcode{
                        width: 65%;
                        margin-right: 5%;
                    }
                    img{
                        position: absolute;
                        width: 15%;
                        height: 50%;
                        top: 50%;
                        margin-top: -5%;
                    }
                }
                .login{
                    text-align: center;
                    .subBtn{
                        width: 80%;
                        height: 50px;
                        font-size: 20px;
                        outline: none;
                        background: none;
                        border: 2px solid #07e88a;
                        border-radius: 15px;
                        color: #FFFFFF;
                    }
                }
                .footer{
                    .backBtn{
                        margin-left: 3%;
                        color: #ffff00;
                    }
                }
            }
        }
    }
</style>