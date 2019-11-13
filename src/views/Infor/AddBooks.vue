<template>
    <div class="inforAcc">
        <Header :mess="props" v-on:add="addBook"></Header>
        <div class="main">
            <div class="text">
                <input type="text" v-model="name" placeholder="请输入账簿名字">
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
        name: "AddBooks",
        components:{
            Header,
            Notice,
            Loading
        },
        data(){
            return{
                props:{
                    back:'',
                    title:'创建账簿',
                    btn:{method:'add',name:'创建'}

                },
                token:'',
                name:'',
                notice:false,
                noticeMes:'修改成功',
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
            addBook(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '保存中,请稍后';
                    this.loading = true;
                },200);
                clearTimeout(this.t);
                this.notice = false;
                axios({
                    method: 'post',
                    url: this.$store.state.api+'book/create?token='+this.token,
                    params: {
                        name:this.name,
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    if (res.data.data){
                        if (res.data.status){
                            // alert('新增成功');
                            this.noticeMes = '新增成功';
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
                        }
                        this.name='';
                    }else{
                        // alert(res.data.data);
                        this.noticeMes = res.data.data;
                        this.notice = true;
                        this.t = setTimeout(()=>{
                            this.notice = false;
                        },2000);
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
            margin-top: 50px;
            .text{
                padding: 0 15px;
                input{
                    width: 95%;
                    border: none;
                    outline: none;
                    padding-left: 5%;
                    padding-bottom: 3px;
                    border-bottom: 1px solid #07C062;
                }
            }
        }
    }
</style>