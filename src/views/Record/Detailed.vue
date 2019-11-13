<template>
    <div class="inforAcc">
        <Header :mess="props"></Header>
        <div class="main">
            <ul class="lists" v-if="edit">
                <li class="list cf">
                    <div class="title fl">记账人</div>
                    <div class="cont fr">{{mess.user_nickname}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易类型</div>
                    <div class="cont fr">{{mess.type_string}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易分类</div>
                    <div class="cont fr">{{mess.category_name}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易账户</div>
                    <div class="cont fr">{{items.account_name}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易对象</div>
                    <div class="cont fr">
                        <span v-if="mess.company_name">{{mess.company_name}}</span>
                        <span v-else>无记录</span>
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span>交易金额</span>
                    </div>
                    <div class="cont fr">{{mess.total_money}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="mess.type==1">实收金额</span>
                        <span v-if="mess.type==2">实付金额</span>
                    </div>
                    <div class="cont fr">{{items.money}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易日期</div>
                    <div class="cont fr">{{items.date}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">添加时间</div>
                    <div class="cont fr">{{items.created_at}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">上次修改</div>
                    <div class="cont fr">{{items.updated_at}}</div>
                </li>
                <li class="list img_list cf">
                    <div class="img_title fl">图片信息</div>
                    <div class="cont fr">
                        <div v-for="(avatar_url,index) in avatar_urls" class="imgs">
                            <img :src="avatar_url.thumbnail" alt="">
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="lists" v-else>
                <li class="list cf">
                    <div class="title fl">记账人</div>
                    <div class="cont fr">{{mess.user_nickname}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易类型</div>
                    <div class="cont fr">{{mess.type_string}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易分类</div>
                    <div class="cont fr">{{mess.category_name}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span>交易金额</span>
                    </div>
                    <div class="cont fr">{{mess.total_money}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易账户</div>
                    <div class="cont fr">
                        <select name="" id="" v-model="acc">
                            <option v-for="account in accounts" :value="account.id">{{account.name}}</option>
                        </select>
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">
                        <span v-if="mess.type==1">实收金额</span>
                        <span v-if="mess.type==2">实付金额</span>
                    </div>
                    <div class="cont fr">
                        <input type="text" v-model="money">
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">记录时间</div>
                    <div class="cont fr">
                        <input type="date" v-model="date">
                    </div>
                </li>
                <li class="list img_list cf">
                    <div class="img_title fl">图片信息</div>
                    <div class="cont fr">
                        <div v-for="(avatar_url,index) in avatar_urls" class="imgs">
                            <span class="delImg" @click="delImg(index)">X</span>
                            <img :src="avatar_url.thumbnail" alt="">
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
            <div v-if="appendLists.length>1" class="head_item">追加记录</div>
            <ul class="items">
                <li v-for="(appendList,indexd) in appendLists" class="item">
                    <div class="cont cf fl">
                        <span class="company_name fl">{{appendList.account_name}}</span>
                        <span class="date">{{appendList.date}}</span>
                        <span class="money fr">{{appendList.money}}</span>
                    </div>
                    <div class="btns fr">
                        <p v-if="index == indexd" class="default">当前</p>
                        <p v-else class="choice" @click="doChange(indexd)">选择</p>
                    </div>
                </li>
            </ul>
        </div>
        <div class="footer">
            <div class="btns fl">
                <p v-if="edit" @click="edit=false">编辑</p>
                <p v-else="edit" @click="doEdit">保存</p>
            </div>
            <div class="btns fr">
                <p v-if="edit" @click="choose = true">删除</p>
                <p v-else @click="giveUp">取消</p>
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
        name: "Detail",
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
                    title:'明细',
                },
                token:'',
                id:Number,
                mess:{},
                items:{},
                edit:true,
                accounts:[],
                money:Number,
                acc:Number,
                date:'',
                imgUrls:[],
                avatar_urls:[],
                fileKeys:[],
                appendLists:[],
                index:0,
                notice:false,
                noticeMes:'修改成功',
                choose:false,
                chooseMes:'您确定要删除吗?',
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.date = this.getDate();
            this.id = this.$route.query.id;
            this.init();
            this.getAccount();
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
                    // console.log(res.data);
                    // console.log(res.data.data);
                    this.mess = res.data.data;
                    // this.props.title = this.mess.category_name;
                    this.appendLists = this.mess.items;
                    this.items = this.mess.items[this.index];
                    // console.log(this.items);
                    this.acc = this.items.account_id;
                    this.money = this.items.money;
                    this.avatar_urls = this.items.images;
                    // console.log(this.avatar_urls)
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
                    // console.log(data);
                    this.accounts=data;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
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
            local(url,id){
                this.$router.go(-1);
            },
            doEdit(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '保存中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'post',
                    url: this.$store.state.api+'record/item/update?itemId='+this.items.id+'&token='+this.token,
                    params:{
                        money:this.money,
                        account_id:this.acc,
                        date:this.date
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    this.noticeMes = '修改成功';
                    this.notice = true;
                    setTimeout(()=>{
                        this.notice = false;
                    },2000);
                    this.init();
                    this.edit=true
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
                for (let file of files) {
                    let params = new FormData();
                    params.append('file', file);
                    axios.post(this.$store.state.api+'upload/image?token=' + this.token, params, {headers: {'Content-Type': 'multipart/form-data'}})
                        .then(res => {
                            clearTimeout(lt);
                            this.loading = false;
                            // console.log(res);
                            if (res.data.code == 0) {
                                this.fileKeys.push(res.data.data.file.fileKey);
                                this.avatar_urls.unshift({thumbnail:res.data.data.file.thumbnailUrl._temp});
                            } else {
                                alert(服务器无响应);
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
                        url: this.$store.state.api+'record/item/delete?itemId=' + this.items.id + '&token=' + this.token,
                    }).then(res => {
                        clearTimeout(lt);
                        this.loading = false;
                        // alert(res.data.data);
                        this.noticeMes = res.data.data;
                        this.notice = true;
                        setTimeout(()=>{
                            this.notice = false;
                        },2000);
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
            giveUp(){
                this.init();
                this.edit=true;
            },
            doChange(index){
                this.edit=true;
                this.index = index;
                this.init();
            },
        },
    }
</script>

<style scoped lang="scss">
    .inforAcc {
        .main{
            height: 83vh;
            .lists{
                width: 90%;
                padding: 0 5%;
                height: 420px;
                overflow: scroll;
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
                            text-align: right;
                            width: 70%;
                            border: none;
                            outline: none;
                            padding-left: 10px;
                            padding-bottom: 3px;
                            border-bottom: 1px solid #07C062;
                        }
                        select{
                            width: 40%;
                            border: none;
                            outline: none;
                            padding-bottom: 3px;
                            border-bottom: 1px solid #07C062;
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
                .img_list{
                    border-bottom: none;
                    .cont{
                        height: auto;
                        max-height: 13vh;
                        overflow: scroll;
                    }
                }
            }
            .head_item{
                padding-left: 10%;
                height: 32px;
                line-height: 32px;
                text-align: left;
                font-size: 16px;
                background: #07e88a;
                color: #FFFFFF;
                white-space: normal;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .items {
                height: 18vh;
                overflow: scroll;
                .item {
                    padding-left: 10%;
                    height: 6vh;
                    line-height: 6vh;
                    text-align: left;
                    font-size: 14px;
                    white-space: normal;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    .cont {
                        width: 70%;
                        text-align: center;
                        span {
                            display: inline-block;
                            height: 8vh;
                        }

                        .company_name {
                            width: 30%;
                            text-align: left;
                        }

                        .date {
                            width: 40%;
                            margin: 0 auto;
                            white-space: normal;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }

                        .money {
                            width: 30%;
                            text-align: right;
                        }
                    }
                    .btns {
                        width: 20%;
                        p{
                            width: 80%;
                            margin-top: 20%;
                            height: 4vh;
                            line-height: 4vh;
                            border-radius: 20px;
                            text-align: center;
                            white-space: normal;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                        .choice {
                            background: #07e88a;
                            color: #fff;
                        }
                        .default{
                            background: #ededed;
                            color: #000;
                        }
                    }
                }
            }
        }
        .footer{
            height: 8vh;
            .btns{
                width: calc(48%);
                text-align: center;
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