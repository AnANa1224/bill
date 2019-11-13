<template>
    <div class="inforAcc">
        <Header :mess="props" v-on:add="addMember"></Header>
        <div class="main cf">
            <div class="title fl">成员账号</div>
            <div class="cont fr"><input type="text" v-model="mobile" maxlength="11" placeholder="请输入成员手机号"></div>
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
        name: "AddMember",
        components:{
            Header,
            Notice,
            Loading
        },
        data(){
            return{
                props:{
                    back:'',
                    title:'添加成员',
                    btn:{method:'add',name:'保存'}
                },
                token:'',
                id:'',
                mobile:'',
                notice:false,
                noticeMes:'修改成功',
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.id = this.$route.query.id;
        },
        methods:{
            local(url){
                if (url==undefined){
                    this.$router.go(-1);
                }else{
                    this.$router.push({path:"/"+url})
                }
            },
            addMember(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '保存中,请稍后';
                    this.loading = true;
                },200);
                clearTimeout(this.t);
                this.notice = false;
                axios({
                    method: 'post',
                    url: this.$store.state.api+'member/add?token='+this.token,
                    params: {
                        book_id:this.id,
                        mobile:this.mobile,
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    if (res.data.status){
                        // alert('邀请成功');
                        this.noticeMes = '邀请成功';
                        this.notice = true;
                        this.t = setTimeout(()=>{
                            this.notice = false;
                        },2000);
                        this.mobile = '';
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
            width: 90%;
            padding: 10% 5%;
            text-align: center;
            .title{
                width: 35%;
                height: 60px;
                line-height: 60px;
                text-align: right;
            }
            .cont{
                width: 65%;
                height: 60px;
                line-height: 60px;
                input{
                    border: none;
                    outline: none;
                    padding-left: 10px;
                    padding-bottom: 3px;
                    border-bottom: 1px solid #07C062;
                }
            }
        }
    }
</style>