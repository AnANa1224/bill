<template>
    <div class="inforMes">
        <Header :mess="props" v-on:edit="edits"></Header>
        <div class="main">
            <div class="lists">
                <div class="list cf">
                    <div class="attr">
                        为确保您的账号安全，请输入登录密码验证身份
                    </div>
                    <div class="mes">
                        <input type="password" v-model="pwd" placeholder="请输入账号密码" autocomplete="off">
                    </div>
                </div>
                <div class="list cf">
                    <div class="attr">
                        更换后，下次登录必须使用新手机号登录
                    </div>
                    <div class="mes">
                        <input type="text" v-model="tel" placeholder="请输入手机号" maxlength="11">
                    </div>
                    <div class="code">
                        <input type="text" v-model="code" placeholder="请输入图形验证码">
                        <img class="fr" :src="imgUrl" alt="" height="30" width="25%" @click="getImgcode">
                    </div>
                    <div class="code">
                        <input type="text" v-model="verify" :disabled="!disabled" placeholder="请输入短信验证码">
                        <button v-if="disabled" class="codeBtn active" :disabled="disabled" @click="getCode(tel)">{{mes}}</button>
                        <button v-else class="codeBtn" :disabled="disabled" @click="getCode(tel)">{{mes}}</button>
                    </div>
                </div>
            </div>
        </div>
        <Notice :dis="notice" :mes="noticeMes"></Notice>
        <Choose :dis="choose" :mes="chooseMes" v-on:status="doEdit($event)" v-on:dis="disnone()"></Choose>
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
        name: "InforMes",
        components:{
            Header,
            Notice,
            Choose,
            Loading
        },
        data(){
            return{
                props:{
                    back:'',
                    title:'手机绑定',
                    btn:{method:'edit',name:'保存'}
                },
                tel:'',
                token:'',
                pwd:'',
                code:'',
                verify:'',
                dis:false,
                disabled: false,
                mes:'获取',
                imgUrl:'',
                notice:false,
                noticeMes:'修改成功',
                choose:false,
                chooseMes:'您确定要修改吗?',
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.getImgcode();
        },
        methods:{
            getImgcode(){
                axios({
                    method:'get',
                    url:this.$store.state.api+'captcha',
                    responseType:'json'
                }).then(res=>{
                    // console.log(res);
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
                this.$router.push({path:"/"+url})
            },
            editMobile(){
                this.dis=true;
                this.props.btn = {method:'edit',name:'保存'};
            },
            getCode(){
                clearTimeout(this.t);
                this.notice = false;
                if (this.pwd == 0) {
                    this.notices('请输入密码');
                    return;
                }
                if (this.tel.length == 0){
                    this.notices('请输入手机号');
                    return;
                }
                if (this.tel.length < 11){
                    this.notices('请输入11位手机号');
                    return;
                }
                if (this.code == 0){
                    this.notices('请输入图形验证码');
                    return;
                }
                axios({
                    method: 'post',
                    url: this.$store.state.api+'sms/verify',
                    params: {
                        mobile: this.tel,
                        captcha_code:this.code,
                        captcha_key:this.key,
                    }
                }).then( res=>{
                    console.log(res);
                    if (res.data.status){
                        this.disabled = true;
                        this.mes = '已发送';
                    }else{
                        this.notices('图形验证码有误');
                        // alert('图形验证码有误');
                        return;
                    }
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙,发送失败');
                    return;
                });
            },
            edits(){
                this.notice = false;
                clearTimeout(this.t);
                if (this.pwd == 0) {
                    this.notices('请输入密码');
                    return;
                }
                if (this.tel.length == 0){
                    this.notices('请输入手机号');
                    return;
                }
                if (this.tel.length < 11){
                    this.notices('请输入11位手机号');
                    return;
                }
                if (this.code == 0){
                    this.notices('请输入验证码');
                    return;
                }
                if (this.verify == ''){
                    this.notices('请先获取验证码');
                    return;
                }
                this.choose = true;
            },
            doEdit(e){
                if (e){
                    let lt = setTimeout(()=>{
                        this.loadingMes = '保存中,请稍后';
                        this.loading = true;
                    },200);
                    axios({
                        method: 'post',
                        url: this.$store.state.api+'user/mobile?token='+this.token,
                        params: {
                            verify:this.verify,
                            password:this.pwd,
                            mobile:this.tel,
                        }
                    }).then((res)=>{
                        clearTimeout(lt);
                        this.loading = false;
                        // console.log(res);
                        if (res.data.status){
                            this.dis = false;
                            this.noticeMes = '修改成功,请重新登录';
                            this.notice = true;
                            this.t = setTimeout(()=>{
                                axios({
                                    method: 'get',
                                    url: this.$store.state.api+'user/logout?token='+this.token,
                                }).then(res => {
                                    localStorage.removeItem('token');
                                    this.$router.push({path:'/login'});
                                });
                            },500);
                        }else{
                            this.notices(res.data.data);
                            // alert(res.data.data);
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

<style scoped lang="scss">
    .inforMes {
        height: 100vh;
        overflow: hidden;
        .main{
            height: 92vh;
            background: #f1f1f1;
            .lists{
                font-size: 12px;
                .list{
                    padding: 10px 0;
                    .attr{
                        padding-left: 20px;
                        color: #333;
                        line-height: 30px;
                    }
                    .mes{
                        input{
                            width: 100%;
                            height: 30px;
                            padding-left: 5%;
                            border: none;
                            outline: none;
                            border-bottom: 1px solid #07e88a;
                        }
                    }
                    .code{
                        input{
                            width: 70%;
                            height: 30px;
                            padding-left: 5%;
                            border: none;
                            outline: none;
                            border-bottom: 1px solid #07e88a;
                        }
                        .codeBtn{
                            width: 25%;
                            height: 30px;
                            border: none;
                            outline: none;
                            background: #07e88a;
                            color: #FFFFFF;
                            border-bottom: 1px solid #07e88a;
                        }
                        .active{
                            background: #aaa;
                        }
                    }
                }
            }
        }
    }
</style>