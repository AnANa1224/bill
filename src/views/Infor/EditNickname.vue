<template>
    <div class="inforMes">
        <Header :mess="props" v-on:edit="doEdit"></Header>
        <div class="main">
            <div class="text">
                <input type="text" v-model="nickname">
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
        name: "editNickname",
        components:{
            Header,
            Notice,
            Loading
        },
        data(){
            return{
                props:{
                    back:'',
                    title:'昵称',
                    btn:{method:'edit',name:'保存'}
                },
                token:'',
                nickname:'',
                notice:false,
                noticeMes:'修改成功',
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.getMes();
        },
        methods:{
            getMes(){
                axios({
                    method: 'get',
                    url: this.$store.state.api+'user/profile?token='+this.token,
                }).then( res=>{
                    var data = res.data.data;
                    this.nickname=data.nickname
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
                this.login = true;
            },
            local(url){
                this.$router.push({path:"/"+url})
            },
            doEdit(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '保存中,请稍后';
                    this.loading = true;
                },200);
                clearTimeout(this.t);
                this.notice = false;
                axios({
                    method: 'post',
                    url: this.$store.state.api+'user/profile/update?token='+this.token,
                    params: {
                        nickname:this.nickname,
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    // alert(res.data.data);
                    this.noticeMes = res.data.data;
                    this.notice = true;
                    this.setTimeout(()=>{
                        this.notice = false;
                    },2000);
                    return;
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
    .inforMes {
        .main{
            margin-top:5vh;
            .text{
                width: 90%;
                margin: 0 auto;
                height: 20vh;
                padding: 2%;
                input{
                    width: 98%;
                    padding-left: 5%;
                    padding-bottom: 3%;
                    border: none;
                    outline: none;
                    border-bottom: 1px solid #42b983;
                }
            }
        }
    }
</style>