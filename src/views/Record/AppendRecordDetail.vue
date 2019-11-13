<template>
    <div class="inforAcc">
        <Header :mess="props"></Header>
        <div class="main">
            <ul class="lists" v-if="edit">
                <li class="list cf">
                    <div class="title fl">账户名称</div>
                    <div class="cont fr">{{mess.account_name}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易金额</div>
                    <div class="cont fr">{{mess.money}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">记录时间</div>
                    <div class="cont fr">{{mess.date}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">上次修改时间</div>
                    <div class="cont fr">{{mess.updated_at}}</div>
                </li>
                <li class="list img_list cf">
                    <div class="img_title fl">图片信息</div>
                    <div class="cont fr">
                        <div v-for="(image,index) in mess.images" class="imgs">
                            <img :src="image.thumbnail" alt="">
                        </div>
                    </div>
                </li>
            </ul>
            <ul class="lists" v-else>
                <li class="list cf">
                    <div class="title fl">账户名称</div>
                    <div class="cont fr">
                        <select name="" id="" v-model="mess.account_id">
                            <option v-for="account in accounts" :value="account.id">{{account.name}}</option>
                        </select>
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">交易金额</div>
                    <div class="cont fr">
                        <input type="number" v-model="mess.money">
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">记录时间</div>
                    <div class="cont fr">
                        <input type="date" v-model="mess.date">
                    </div>
                </li>
                <li class="list cf">
                    <div class="title fl">上次修改时间</div>
                    <div class="cont fr">{{mess.updated_at}}</div>
                </li>
                <li class="list img_list cf">
                    <div class="img_title fl">图片信息</div>
                    <div class="cont fr">
                        <div v-for="(image,index) in mess.images" class="imgs">
                            <span class="delImg" @click="delImg(index)">X</span>
                            <img :src="image.thumbnail" alt="">
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
            <div class="btns fl">
                <p v-if="edit" @click="edit=false">编辑</p>
                <p v-else @click="doEdit">保存</p>
            </div>
            <div class="btns fr">
                <p v-if="edit" @click="doDel">删除</p>
                <p v-else @click="edit=true">取消</p>
            </div>
        </div>
        <Notice :dis="notice" :mes="noticeMes"></Notice>
    </div>
</template>

<script>
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Header from '@/components/Header.vue'
    import Notice from '@/components/Notice.vue'

    export default {
        name: "Detail",
        components:{
            Header,
            Notice
        },
        data(){
            return{
                props:{
                    back:'',
                    title:'追加明细',
                },
                token:'',
                mess:{},
                accounts:[],
                edit:true,
                fileKeys:[],
                notice:false,
                noticeMes:'修改成功',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.mess = this.$route.query.data;
            this.getAccount();
        },
        methods:{
            local(url,id){
                this.$router.push({path:"/"+url,query:{id:id}})

            },
            getAccount(){
                axios({
                    method: 'get',
                    url: 'http://jizhang-api-dev.it266.com/api/account?token='+this.token,
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
            changepic(e) {
                let files = e.target.files;
                for (let file of files) {
                    let params = new FormData();
                    params.append('file', file);
                    axios.post('http://jizhang-api-dev.it266.com/api/upload/image?token=' + this.token, params, {headers: {'Content-Type': 'multipart/form-data'}})
                        .then(res => {
                            // console.log(res);
                            if (res.data.code == 0) {
                                this.fileKeys.push(res.data.data.file.fileKey);
                                this.mess.images.unshift({thumbnail:res.data.data.file.thumbnailUrl._temp});
                            } else {
                                // alert(服务器无响应);
                            }
                        }).catch(error => {
                        // alert('服务器繁忙' + error);
                    })
                }
            },
            doEdit(){
                let image_keys = this.fileKeys.join(',');
                axios({
                    method: 'post',
                    url: 'http://jizhang-api-dev.it266.com/api/record/item/update?itemId='+this.mess.id+'&token='+this.token,
                    params:{
                        money:this.mess.money,
                        account_id:this.mess.account_id,
                        date:this.mess.date,
                        images_keys:image_keys,
                    }
                }).then( res=>{
                    // console.log(res);
                    this.noticeMes = '修改成功';
                    this.notice = true;
                    setTimeout(()=>{
                        this.notice = false;
                    },2000);
                    this.edit=true
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            doDel(){
                if (confirm('您确定要删除吗?')) {
                    axios({
                        method: 'post',
                        url: 'http://jizhang-api-dev.it266.com/api/record/delete?id=' + this.mess.id + '&token=' + this.token,
                    }).then(res => {
                        // alert(res.data.data);
                        this.noticeMes = res.data.data;
                        this.notice = true;
                        setTimeout(()=>{
                            this.notice = false;
                        },2000);
                        this.$router.push({path: "/"})
                    }).catch(function (error) {
                        // console.log(error);
                        // alert('服务器繁忙');
                        return;
                    });
                }
            },
            delImg(index){
                this.mess.images.splice(index,1);
                this.fileKeys.splice(index,1);
                // console.log(this.avatar_urls)
            },
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
                height: 50vh;
                .list{
                    width: 100%;
                    height: 5vh;
                    line-height: 5vh;
                    border-bottom: 1px solid #f1f1f1;
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
                        }
                        select{
                            outline: none;
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
                height: 4vh;
                line-height: 4vh;
                text-align: left;
                font-size: 16px;
                background: #07e88a;
                color: #FFFFFF;
            }
            .items {
                height: 28vh;
                overflow: scroll;
                .item {
                    padding-left: 10%;
                    height: 6vh;
                    line-height: 6vh;
                    text-align: left;
                    font-size: 14px;
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
                        }

                        .money {
                            width: 30%;
                            text-align: right;
                        }
                    }
                    .del {
                        width: 20%;
                        p {
                            width: 80%;
                            margin-top: 20%;
                            background: #07e88a;
                            line-height: 4vh;
                            color: #fff;
                            border-radius: 20px;
                            text-align: center;
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
                    line-height: 6vh;
                    margin: 0 auto;
                    font-size: 18px;
                    border: 1px solid #07C062;
                    color: #07C062;
                    border-radius: 10px;
                }
            }
        }
    }
</style>