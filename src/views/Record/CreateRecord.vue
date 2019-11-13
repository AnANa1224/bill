<template>
    <div class="inforAcc">
        <Header :mess="props" v-on:add="createRecord"></Header>
        <div class="main">
            <ul class="lists">
                <li class="list cf">
                    <div class="title fl">交易类别</div>
                    <div class="cont fr">
                        <span>{{cateMes.name}}</span>
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易对象</div>
                    <div class="cont fr"><input type="text" v-model="company_name" placeholder="请输入交易对象"></div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易金额</div>
                    <div class="cont fr"><input type="number" v-model="total_money" placeholder="0.00"></div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="cateMes.type == 1">实收金额</span>
                        <span v-if="cateMes.type == 2">实付金额</span>
                    </div>
                    <div class="cont fr"><input type="number" v-model="money" placeholder="0.00"></div>
                </li>
                <li class="list cf">
                    <div class="title fl">账户类型</div>
                    <div class="cont fr">
                        <select class="account" name="" id="type" v-model="account_id">
                            <option v-for="account in accounts" :value="account.id">{{account.name}}</option>
                        </select>
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易日期</div>
                    <div class="cont fr">
                        <input class="date" type="date" v-model="date">
                    </div>
                </li>
                <li class="list img cf">
                    <div class="title fl">交易凭证</div>
                    <div class="cont fr">
                        <div v-for="(avatar_url,index) in avatar_urls" class="imgs">
                            <span class="delImg" @click="delImg(index)">X</span>
                            <img :src="avatar_url" alt="">
                        </div>
                        <div class="add tac fr">
                            <label for="file">
                                <span class="addimg fa fa-plus-square-o"></span>
                            </label>
                            <input id="file" type="file" name="file[]" multiple style="display: none" @change="changepic">
                        </div>
                    </div>
                </li>
                <li class="list cf">
                    <textarea name="" id="" cols="30" rows="10" placeholder="备注...">

                    </textarea>
                </li>
            </ul>
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
        name: "CreateRecord",
        components:{
            Header,
            Notice,
            Loading
        },
        data(){
            return{
                props:{
                    back:'',
                    title:'记一笔',
                    btn:{method:'add',name:'保存'},
                },
                token:'',
                cateMes:{},
                accounts:[],
                fileKeys:[],
                avatar_urls:[],
                total_money:'',
                money:'',
                account_id:Number,
                category_id:0,
                date:'',
                company_name:'',
                remark:'',
                image_keys:'',
                type:'',
                notice:false,
                noticeMes:'修改成功',
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            let cateMes = this.$route.query;
            this.cateMes = cateMes;
            this.category_id = cateMes.id;
            this.date = this.getDate();
            this.getaccount();
        },
        methods:{
            // 获取当前时间  格式YYYY-MM-DD
            getDate(){
                var date = new Date();
                var seperator1 = "-";
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var strDate = date.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                var currentdate = year + seperator1 + month + seperator1 + strDate;
                return currentdate;
            },
            getaccount(){
                axios({
                    method: 'get',
                    url: this.$store.state.api+'account?token='+this.token,
                }).then( res=>{
                    // console.log(res);
                    var data = res.data.data;
                    // console.log(data);
                    this.accounts=data;
                    this.account_id = data[0].id;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            local(url){
                this.$router.push({path:"/"+url})
            },
            createRecord(){
                clearTimeout(this.t);
                this.notice = false;
                if (this.company_name == ''){
                    this.notices('请输入交易对象');
                    return;
                }
                if (this.total_money == ''){
                    this.notices('请输入交易金额');
                    return;
                }
                if (this.money == ''){
                    this.notices('请输入实际金额');
                    return;
                }
                let lt = setTimeout(()=>{
                    this.loadingMes = '保存中,请稍后';
                    this.loading = true;
                },200);
                this.image_keys = this.fileKeys.join(',');
                // console.log(this.image_keys);
                axios({
                    method: 'post',
                    url: this.$store.state.api+'record/create?token='+this.token,
                    params: {
                        total_money:this.total_money,
                        money:this.money,
                        account_id:this.account_id,
                        category_id:this.category_id,
                        date:this.date,
                        company_name:this.company_name,
                        remark:this.remark,
                        image_keys:this.image_keys,
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    if (res.data.status){
                        this.total_money='';
                        this.money='';
                        this.date=this.getDate();
                        this.company_name='';
                        this.remark='';
                        this.fileKeys=[];
                        this.avatar_urls=[];
                        this.image_keys='';
                        // alert('记录成功');
                        this.notices('记录成功');
                    }else{
                        // alert(res.data.data);
                        this.notices(res.data.data);
                        return;
                    }
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            changepic(e) {
                let lt = setTimeout(()=>{
                    this.loadingMes = '图片加载中,请稍后';
                    this.loading = true;
                },300);
                let files = e.target.files;
                for (let file of files){
                    let params = new FormData();
                    params.append('file', file);
                    axios.post(this.$store.state.api+'upload/image?token='+this.token, params, {headers: {'Content-Type': 'multipart/form-data'}})
                        .then(res => {
                            clearTimeout(lt);
                            this.loading = false;
                            // console.log(res);
                            if (res.data.code == 0) {
                                this.fileKeys.push(res.data.data.file.fileKey);
                                this.avatar_urls.push(res.data.data.file.thumbnailUrl._temp);
                            }else{
                                // alert('服务器无响应');
                                this.notices('服务器无响应');
                            }
                        }).catch(error => {
                        // alert('服务器繁忙' + error);
                    })
                }
            },
            delImg(index){
                this.avatar_urls.splice(index,1);
                this.fileKeys.splice(index,1);
                // console.log(this.avatar_urls)
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
    .inforAcc {
        .main{
            .lists{
                width: 90%;
                padding: 0 5%;
                overflow: hidden;
                .list{
                    width: 100%;
                    /*height: 50px;*/
                    max-height: 100px;
                    overflow: scroll;
                    line-height: 50px;
                    border-bottom: 1px solid #f1f1f1;
                    .title{
                        width: 40%;
                        height: 50px;
                        text-align: left;
                        white-space: normal;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    .cont{
                        width: 60%;
                        height: 50px;
                        text-align: right;
                        color: #676767;
                        white-space: normal;
                        text-overflow: ellipsis;
                        overflow: hidden;
                        span{
                            margin-right: 5%;
                        }
                        input{
                            text-align: right;
                            border: none;
                            outline: none;
                            padding-right: 10px;
                            padding-bottom: 3px;
                            /*border-bottom: 1px solid #07C062;*/
                        }
                        .imgs{
                            width: calc(1/3*100%);
                            float: left;
                            height: 50px;
                            position: relative;
                            .delImg{
                                width: 12px;
                                height: 12px;
                                line-height: 12px;
                                font-size: 12px;
                                color: #fff;
                                text-align: center;
                                background: #07C062;
                                position: absolute;
                                top: 0;
                                right: 0;
                            }
                            img{
                                width: 50px;
                                height: 50px;
                            }
                        }
                        .add{
                            width: calc(1/3*100%);
                            text-align: right;
                            height: 50px;
                            .addimg{
                                font-size: 50px;
                            }
                        }
                        .account{
                            border: none;
                            outline: none;
                            text-align: right;
                        }
                    }
                    textarea{
                        width: 90%;
                        height: 50px;
                        resize: none;
                        border: none;
                        outline: none;
                        padding: 3% 5%;
                        font-size: 16px;
                    }
                }
                .img{
                    max-height: 100px;
                    .cont{
                        height: auto;
                        max-height: 100px;
                        overflow: scroll;
                    }
                }
            }
        }
    }
</style>