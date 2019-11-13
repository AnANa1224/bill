<template>
    <div class="inforAcc">
        <Header :mess="props"></Header>
        <div class="main">
            <ul class="lists" v-if="operated==''">
                <li class="list cf">
                    <div class="title fl">交易类型</div>
                    <div class="cont fr">{{mess.type_string}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">记账人</div>
                    <div class="cont fr">{{mess.user_nickname}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="mess.type==1">应收金额</span>
                        <span v-if="mess.type==2">应付金额</span>
                    </div>
                    <div class="cont fr">{{mess.total_money}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="mess.type==1">实收金额</span>
                        <span v-if="mess.type==2">实付金额</span>
                    </div>
                    <div class="cont fr">
                        <div class="cont fr">{{money}}</div>
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易对象</div>
                    <div class="cont fr">{{mess.company_name}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">记录时间</div>
                    <div class="cont fr">{{mess.created_at}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">备注信息</div>
                    <div class="cont fr">{{mess.remark}}</div>
                </li>
            </ul>
            <ul class="lists" v-else-if="operated=='edit'">
                <li class="list cf">
                    <div class="title fl">交易类型</div>
                    <div class="cont fr">{{mess.type_string}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">记账人</div>
                    <div class="cont fr">{{mess.user_nickname}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="mess.type==1">应收金额</span>
                        <span v-if="mess.type==2">应付金额</span>
                    </div>
                    <div class="cont fr">
                        <input type="text" v-model="mess.total_money">
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="mess.type==1">实收金额</span>
                        <span v-if="mess.type==2">实付金额</span>
                    </div>
                    <div class="cont fr">{{money}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易对象</div>
                    <div class="cont fr">
                        <input type="text" v-model="mess.company_name">
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">记录时间</div>
                    <div class="cont fr">{{mess.created_at}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">备注信息</div>
                    <div class="cont fr">
                        <input type="text" v-model="mess.remark">
                    </div>
                </li>
            </ul>
            <ul class="lists" v-else-if="operated=='append'">
                <li class="list cf">
                    <div class="title fl">交易类型</div>
                    <div class="cont fr">{{mess.type_string}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">记账人</div>
                    <div class="cont fr">{{mess.user_nickname}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="mess.type==1">应收金额</span>
                        <span v-if="mess.type==2">应付金额</span>
                    </div>
                    <div class="cont fr">{{mess.total_money}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="mess.type==1">已收金额</span>
                        <span v-if="mess.type==2">已付金额</span>
                    </div>
                    <div class="cont fr">{{money}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="mess.type==1">待收金额</span>
                        <span v-if="mess.type==2">代付金额</span>
                    </div>
                    <div class="cont fr">
                        {{mess.total_money-money}}.00
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易对象</div>
                    <div class="cont fr">{{mess.company_name}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">记录时间</div>
                    <div class="cont fr">{{mess.created_at}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">备注信息</div>
                    <div class="cont fr">{{mess.remark}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">追加金额</div>
                    <div class="cont fr">
                        <input type="number" required v-model="newMoney">
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易账户</div>
                    <div class="cont fr">
                        <select name="" id="" v-model="account_id">
                            <option v-for="account in accounts" :value="account.id">{{account.name}}</option>
                        </select>
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易日期</div>
                    <div class="cont fr">
                        <input type="date" v-model="date">
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易凭证</div>
                    <div class="cont fr">
                        <div v-for="(avatar_url,index) in avatar_urls" class="imgs">
                            <span class="delImg" @click="delImg(index)">X</span>
                            <img :src="avatar_url" alt="">
                        </div>
                        <div class="add tac">
                            <label for="file">
                                <span class="addimg fa fa-plus-square-o"></span>
                            </label>
                            <input id="file" type="file" name="file[]" multiple style="display: none" @change="changepic">
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="btns">
                <p v-if="edit" @click="edit=false,append=true,operated='edit'">编辑</p>
                <p v-else @click="doEdit">保存</p>
            </div>
            <div class="btns">
                <p v-if="append" @click="append=false,edit=true,operated='append'">追加</p>
                <p v-else @click="doAppend">保存</p>
            </div>
            <div class="btns">
                <p v-if="edit && append" @click="choose = true">删除</p>
                <p v-else @click="edit=true,append=true,operated=''">取消</p>
            </div>
        </div>
        <Notice :dis="notice" :mes="noticeMes"></Notice>
        <Choose :dis="choose" :mes="chooseMes" v-on:status="doDel($event)" v-on:dis="disnone()"></Choose>
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
        name: "AppendRecord",
        components:{
            Header,
            Choose,
            Notice,
            Loading
        },
        data(){
            return{
                props:{
                    back:'index',
                    title:'明细',
                    method:{local:'Record/detailed',name:'明细',data:{id:''}},
                },
                token:'',
                id:'',
                mess:{},
                edit:true,
                append:true,
                del:true,
                money:Number,
                date:'',
                operated:"",
                newMoney:'',
                accounts:[],
                fileKeys:[],
                avatar_urls:[],
                image_keys:'',
                account_id:'',
                notice:false,
                noticeMes:'修改成功',
                choose:false,
                chooseMes:'您确定要删除吗?',
                t:null,
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.id = this.$route.query.id;
            this.date = this.getDate();
            this.getAccount();
            this.init();
        },
        methods:{
            init(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '页面加载中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'get',
                    url: this.$store.state.api+'record/detail?id='+this.id+'&token='+this.token,
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    // console.log(res.data.data);
                    this.mess = res.data.data;
                    this.money = this.mess.paid_money;
                    this.props.title = this.mess.category_name;
                    this.props.method.data.id = this.mess.id;
                    if (this.mess.total_money-this.mess.paid_money<=0){
                        this.$router.push({path:'/Record/detail',query:{id:this.mess.id}})
                    }
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            getAccount(){
                axios({
                    method: 'get',
                    url: this.$store.state.api+'account?token='+this.token,
                }).then( res=>{
                    // console.log(res);
                    var data = res.data.data;
                    // console.log(data)
                    this.accounts=data;
                    this.account_id=data[0].id;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
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
            local(url,id){
                this.$router.push({path:"/"+url,query:{id:id}})
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
                    url: this.$store.state.api+'record/update?id='+this.mess.id+'&token='+this.token,
                    params:{
                        total_money:this.mess.total_money,
                        company_name:this.mess.company_name,
                        remark:this.mess.remark
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    this.notices(res.data.data);
                    this.edit=true;
                    this.operated="";
                    this.init();
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            doAppend(){
                if (this.newMoney <= 0){
                    this.notices('金额不能小于零');
                    return;
                }
                let lt = setTimeout(()=>{
                    this.loadingMes = '保存中,请稍后';
                    this.loading = true;
                },200);
                clearTimeout(this.t);
                this.notice = false;
                this.image_keys = this.fileKeys.join(',');
                axios({
                    method: 'post',
                    url: this.$store.state.api+'record/sequel?token='+this.token,
                    params:{
                        record_id:this.id,
                        money:this.newMoney,
                        account_id:this.account_id,
                        date:this.date,
                        image_keys:this.image_keys,
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    this.notices(res.data.data);
                    this.append=true;
                    this.operated="";
                    this.init();
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            changepic(e) {
                let lt = setTimeout(()=>{
                    this.loadingMes = '图片上传中,请稍后';
                    this.loading = true;
                },200);
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
            doDel(e){
                if (e) {
                    let lt = setTimeout(()=>{
                        this.loadingMes = '删除中,请稍后';
                        this.loading = true;
                    },200);
                    axios({
                        method: 'post',
                        url: this.$store.state.api+'record/delete?id=' + this.mess.id + '&token=' + this.token,
                    }).then(res => {
                        clearTimeout(lt);
                        this.loading = false;
                        // alert(res.data.data);
                        this.$router.push({path: "/"})
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
    .inforAcc {
        .main{
            height: 84vh;
            .lists{
                width: 90%;
                padding: 0 5%;
                .list{
                    width: 100%;
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 1px solid #f1f1f1;
                    white-space: normal;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    .title{
                        width: 40%;
                        text-align: left;
                    }
                    .cont{
                        width: 60%;
                        text-align: right;
                        color: #676767;
                        input{
                            border: none;
                            outline: none;
                            padding-left: 10px;
                            padding-bottom: 3px;
                            border-bottom: 1px solid #07C062;
                            text-align: right;
                        }
                    }
                    .imgs{
                        float: left;
                        width: 50px;
                        height: 50px;
                        margin-right: 5%;
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
                            height: 100%;
                        }
                    }
                    .add{
                        float: left;
                        width: 50px;
                        height: 50px;
                        .addimg{
                            font-size: 50px;
                        }
                    }
                }
            }
        }
        .footer{
            height: 8vh;
            padding: 0 3%;
            .btns{
                width: calc(1/3*100%);
                text-align: center;
                float: left;
                p{
                    width: 90%;
                    height: 6vh;
                    line-height: 6vh;
                    margin: 0 auto;
                    font-size: 18px;
                    border: 1px solid #07C062;
                    color: #07C062;
                    border-radius: 10px;
                    white-space: normal;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }
    }
</style>