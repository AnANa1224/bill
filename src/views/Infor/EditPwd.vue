<template>
    <div class="inforMes">
        <Header :mess="props" v-on:edit="edit"></Header>
        <div class="main">
            <div class="list cf">
                <div class="mes">
                    <input type="password" v-model="oldPwd" placeholder="请输入原账号密码" autocomplete="off">
                </div>
            </div>
            <div class="list cf">
                <div class="mes">
                    <input type="password" v-model="newPwd" placeholder="请输入新的密码" autocomplete="off">
                </div>
            </div>
            <div class="list cf">
                <div class="mes">
                    <input type="password" v-model="rePwd" placeholder="请再次输入新密码" autocomplete="off">
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
        name: "EditPwd",
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
                    title:'密码修改',
                    btn:{method:'edit',name:'保存'}
                },
                token:'',
                oldPwd:'',
                newPwd:'',
                rePwd:'',
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
        },
        methods:{
            local(url){
                this.$router.push({path:"/"+url})
            },
            edit(){
                clearTimeout(this.t);
                this.notice = false;
                if (this.oldPwd.length == 0){
                    this.notices('请输入原始密码');
                    return;
                }
                if (this.newPwd.length == 0){
                    this.notices('请输入新的密码');
                    return;
                }
                if (this.rePwd.length == 0){
                    this.notices('请再次输入新密码');
                    return;
                }
                if (this.newPwd !== this.rePwd){
                    this.notices('两次密码不一致');
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
                    clearTimeout(this.t);
                    this.notice = false;
                    axios({
                        method: 'post',
                        url: this.$store.state.api+'user/password?token='+this.token,
                        params: {
                            password:this.oldPwd,
                            new_password:this.newPwd,
                        }
                    }).then( res=>{
                        clearTimeout(lt);
                        this.loading = false;
                        // console.log(res);
                        if (res.data.status){
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
                            return;
                        }
                    }).catch(function (error) {
                        // console.log(error);
                        // alert('服务器繁忙');
                        return;
                    });
                }
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
            font-size: 14px;
            .list{
                .mes{
                    input{
                        width: 100%;
                        height: 40px;
                        padding-left: 5%;
                        border: none;
                        outline: none;
                        border-bottom: 1px solid #07e88a;
                    }
                }
            }
        }
    }
</style>