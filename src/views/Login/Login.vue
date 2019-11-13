<template>
  <div class="login">
    <div class="bg bg-blur"></div>
    <div class="main">
      <div class="header">
        <h3>
          <span class="fa fa-chevron-left back" @click="local('infor')"></span>
          <span class="title">登录</span>
        </h3>
      </div>
      <h1 class="logo"><img src="img/logo.jpg" alt=""></h1>
      <div class="content">
          <div class="item account">
            <input type="text" v-model="mobile" placeholder="请输入手机号" maxlength="11" required>
          </div>
          <div class="item pwd">
            <input type="password" v-model="pwd" placeholder="请输入密码" autocomplete="off">
          </div>
          <div class="item code">
            <input class="imgcode" type="text" v-model="code" placeholder="请输入图形验证码" @click="getImgcode">
            <img :src="imgUrl" alt="">
          </div>
          <div class="item login">
            <button class="subBtn" @click="log">登录</button>
          </div>
          <div class="item footer cf">
            <div class="forget fl">
              <span @click="local('Login/forgetPwd')">忘记密码?</span>
            </div>
            <div class="register fr">
              <span @click="local('Login/register')">快速注册</span>
            </div>
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
    name: 'login',
    components:{
        Notice,
        Loading
    },
    data(){
      return{
        mobile:'',
        pwd:'',
        imgUrl:'',
        key:'',
        code:'',
        notice:false,
        noticeMes:'修改成功',
        t:null,
        loading:false,
        loadingMes:'保存中,请稍后',
      }
    },
    mounted(){
      var token = localStorage.getItem('token');
      if (token != undefined){
        this.$router.push({path:'/'})
      }
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
        local(url){
            this.$router.push({path:'/'+url})
        },
        log(){
            clearTimeout(this.t);
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
            let lt = setTimeout(()=>{
                this.loadingMes = '登录中,请稍后';
                this.loading = true;
            },200);
            axios({
              method: 'post',
              url: this.$store.state.api+'user/token/mobile',
              params: {
                mobile: this.mobile,
                password:this.pwd,
                captcha_code:this.code,
                captcha_key:this.key,
              }
            }).then((res)=>{
              // console.log(res);
                clearTimeout(lt);
                this.loading = false;
                if (res.data.status){
                    var data = res.data;
                    // console.log(data.data.token);
                    localStorage.setItem('token',data.data.token);
                    this.$router.push({path:'infor'})
                }else{
                    // alert(res.data.data);
                    this.notices(res.data.data);
                }
            }).catch(function (error) {
              // console.log(error);
              // alert('服务器繁忙');
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
      background-image:url("img/bg.jpg");
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
          display: none;
          position: relative;
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
      }
    }
  }
</style>