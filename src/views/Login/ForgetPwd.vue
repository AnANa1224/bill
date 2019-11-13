<template>
    <div class="login">
        <div class="bg bg-blur"></div>
        <div class="main">
            <div class="header">
                <h3>
                    <span class="fa fa-chevron-left back" @click="local('login')"></span>
                    <span class="title">忘记密码</span>
                </h3>
            </div>
            <h1 class="logo"><img src="img/logo.jpg" alt=""></h1>
            <div class="content">
                <div class="item account">
                    <input type="text" v-model="mobile" placeholder="请输入手机号" maxlength="11">
                </div>
                <div class="item code">
                    <input class="imgcode" type="text" v-model="code" placeholder="请输入图形验证码">
                    <img :src="imgUrl" alt="" @click="getImgcode">
                </div>
                <div class="item code">
                    <input class="code" type="text" v-model="verify" placeholder="请输入手机验证码">
                    <button class="codeBtn" :disabled="disabled" @click="getCode(mobile)">{{mes}}</button>
                </div>
                <div class="item pwd">
                    <input type="password" v-model="pwd" placeholder="请输入密码" autocomplete="off">
                </div>
                <div class="item pwd">
                    <input type="password" v-model="repwd" placeholder="请再次输入密码" autocomplete="off">
                </div>
                <div class="item login">
                    <button class="subBtn" @click="edit">确认</button>
                </div>
                <div class="item footer tac">
                    <span>想起来了?</span><span class="backBtn" @click="local('Login')">返回登录</span>
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
        name: 'editPwd',
        components:{
            Notice,
            Loading
        },
        data(){
            return{
                mobile:'',
                pwd:'',
                repwd:'',
                imgUrl:'',
                key:'',
                code:'',
                verify:'',
                disabled: false,
                mes:'获取验证码',
                notice:false,
                noticeMes:'修改成功',
                t:null,
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
                }).then((res)=>{
                    if (res.status) {
                        var data = res.data.data;
                        this.imgUrl = data.url;
                        this.key = data.key;
                    }else{
                        // console.log('图形验证码获取失败');
                    }
                });
            },
            getCode(mobile){
                clearTimeout(this.t);
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
                    this.loadingMes = '发送中,请稍后';
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
                    }else{
                        // alert(res.data.data);
                        this.notice = true;
                        this.noticeMes = res.data.data;
                        setTimeout(()=>{
                            this.notice = false;
                        },2000);
                    }
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            local(url){
                this.$router.push({path:'/'+url})
            },
            edit(){
                if (this.mobile.length == 0){
                    this.notices('请输入手机号');
                    return;
                }
                if (this.mobile.length < 11){
                    this.notices('请输入11位手机号');
                    return;
                }
                if (this.message){
                    this.notices('请先获取验证码');
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
                    this.loadingMes = '找回中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'post',
                    url: this.$store.state.api+'user/token/sms',
                    params: {
                        mobile: this.mobile,
                        password:this.pwd,
                        verify:this.verify
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    if (res.data.status){
                        var res = res.data;
                        localStorage.setItem('token',res.data.token);
                        this.loadingMes = '找回成功,登录中';
                        this.loading = true;
                        setTimeout(()=>{
                            this.$router.push({path:'/infor'});
                        },1000);
                    }else{
                        // alert(res.data.data);
                        this.notices(res.data.data);
                    }
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            notices(mes,t=2000){
                this.noticeMes = mes;
                this.notice = true;
                this.t = setTimeout(()=>{
                    this.notice = false;
                },t);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .login{
        font-size: 12px;
        color: #fff;
        .bg{
            background-image:url("img/bg6.jpg");
            width:100%;
            min-height: 600px;
            height: 100vh;
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
                        border-bottom: 2px solid #2e8e14;
                        color: #000;
                    }
                    input::-webkit-input-placeholder {
                        color: #000;
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
                        color: #fff;
                        background: #76b70d;
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
                        border: 2px solid #2e8e14;
                        border-radius: 15px;
                        color: #134806;
                        font-weight: bold;
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