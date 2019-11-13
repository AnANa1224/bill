<template>
    <div class="inforAcc">
        <Header :mess="props" v-on:add="addFeedback"></Header>
        <div class="main">
            <div class="list">
                <div class="title fl">意见反馈</div>
                <div class="cont fr">
                    <input type="text" v-model="content"  placeholder="请输入您要反馈的内容">
                </div>
            </div>
            <div class="list">
                <div class="title fl">联系方式</div>
                <div class="cont fr">
                    <input type="text" v-model="contact" maxlength="11" placeholder="方便留下您的电话吗">
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
    import Header from '@/components/Header.vue'
    import Notice from '@/components/Notice.vue'
    import Loading from '@/components/Loading.vue'

    export default {
        name: "Feedback",
        components:{
            Header,
            Notice,
            Loading
        },
        data(){
            return{
                props:{
                    back:'',
                    title:'意见反馈',
                    btn:{method:'add',name:'提交'}
                },
                token:'',
                content:'',
                contact:'',
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
                if (url==undefined){
                    this.$router.go(-1);
                }else{
                    this.$router.push({path:"/"+url})
                }
            },
            addFeedback(){
                clearTimeout(this.t);
                this.notice = false;
                if (this.content == ''){
                    this.notice = true;
                    this.noticeMes = '请填写反馈内容';
                    this.t = setTimeout(()=>{
                        this.notice = false;
                    },2000);
                    return;
                }
                let lt = setTimeout(()=>{
                    this.loadingMes = '保存中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'post',
                    url: this.$store.state.api+'feedback/add?token='+this.token,
                    params: {
                        content:this.content,
                        contact:this.contact,
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    if (res.data.status){
                        this.loading = false;
                        // alert('提交成功,小客会尽快帮您解决问题');
                        this.noticeMes = '提交成功,小客会尽快帮您解决问题';
                        this.notice = true;
                        this.t = setTimeout(()=>{
                            this.notice = false;
                        },2000);
                        this.content='';
                        this.contact='';
                    }else{
                        this.noticeMes = res.data.data;
                        this.notice = true;
                        this.t = setTimeout(()=>{
                            this.notice = false;
                        },2000);
                        // alert(res.data.data);
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
            padding: 0 15px;
            .list {
                width: 100%;
                height: 50px;
                line-height: 50px;
                border-bottom: 1px solid #f1f1f1;
                white-space: normal;
                text-overflow: ellipsis;
                overflow: hidden;
                .title {
                    width: 40%;
                    text-align: left;
                }

                .cont {
                    width: 60%;
                    max-height: 100px;
                    overflow: scroll;
                    text-align: right;
                    color: #676767;

                    input {
                        height: 40px;
                        font-size: 16px;
                        text-align: right;
                        border: none;
                        outline: none;
                        padding-right: 10px;
                        padding-bottom: 3px;
                        border-bottom: 1px solid #07C062;
                    }
                }
            }
        }
    }
</style>