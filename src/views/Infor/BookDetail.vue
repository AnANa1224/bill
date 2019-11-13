<template>
    <div class="inforAcc">
        <Header :mess="props" v-on:local="local('Infor/addMember',id)"></Header>
        <div class="main">
            <ul class="lists" v-if="edit">
                <li class="list cf">
                    <div class="title fl">账簿名称</div>
                    <div class="cont fr">{{book.name}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">记录时间</div>
                    <div class="cont fr">{{book.created_at}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">上次更新时间</div>
                    <div class="cont fr">{{book.updated_at}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">排序值</div>
                    <div class="cont fr">{{book.sort}}</div>
                </li>
            </ul>
            <ul class="lists" v-else>
                <li class="list cf">
                    <div class="title fl">账簿名称</div>
                    <div class="cont fr"><input type="text" v-model="name"></div>
                </li>
                <li class="list cf">
                    <div class="title fl">记录时间</div>
                    <div class="cont fr">{{book.created_at}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">上次更新时间</div>
                    <div class="cont fr">{{book.updated_at}}</div>
                </li>
                <li class="list cf">
                    <div class="title fl">排序值</div>
                    <div class="cont fr">{{book.sort}}</div>
                </li>
            </ul>
            <ul class="member" v-if="members.length">
                <li class="member_head cf">
                    <div class="fl item">成员名称</div>
                    <div v-if="!edit" class="fr item">操作</div>
                    <div class="fr item">加入时间</div>
                </li>
                <li v-if="notice" class="member_list">{{notice}}</li>
                <li v-else v-for="member in members" class="member_list cf">
                    <div class="fl item">{{member.nickname}}</div>
                    <div v-if="!edit" class="fr item del"@click="delMember(member.id)">删除</div>
                    <div class="fr item">{{member.created_at}}</div>
                </li>
            </ul>
            <ul class="member" v-else>
                <li class="member_list">还没有好友?</li>
                <li class="member_list">简直不要太惨</li>
                <li class="member_list">快去 <span class="add" @click="local('Infor/addMember',id)">邀请好友</span> 开启你们的共同记账之旅吧</li>
            </ul>
        </div>
        <div class="footer">
            <div class="btns fl">
                <p v-if="disabled">无权修改</p>
                <p v-else-if="edit" @click="edit=false">编辑</p>
                <p v-else @click="doEdit">保存</p>
            </div>
            <div class="btns fr">
                <p v-if="disabled">无权添加</p>
                <p v-else-if="edit" @click="delBook()">删除</p>
                <p v-else @click="edit=true">取消</p>
            </div>
        </div>
        <Notice :dis="notices" :mes="noticeMes"></Notice>
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
        name: "BookDetail",
        components:{
            Header,
            Notice,
            Choose,
            Loading
        },
        data(){
            return{
                props:{
                    back:'Infor/books',
                    title:'账簿详情',
                    // method:{local:'Infor/addMember',name:'添加成员',data:{id:this.$route.query.id}},
                    btn:{method:'local',name:'添加成员'}
                },
                token:'',
                id:'',
                book:{},
                edit:true,
                name:'',
                members:Array,
                notice:'',
                disabled:false,
                notices:false,
                noticeMes:'修改成功',
                choose:false,
                chooseMes:'您确定要删除吗?',
                delBooks:false,
                delBookId:'',
                delMembers:false,
                delMemberId:'',
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.id = this.$route.query.id;
            this.init();
            this.getMember();
        },
        methods:{
            init(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '页面加载中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'get',
                    url: this.$store.state.api+'book/detail?token='+this.token,
                    params: {
                        book_id:this.id
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res.data.data);
                    this.book = res.data.data;
                    this.name = this.book.name;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            getMember(){
                axios({
                    method: 'get',
                    url: this.$store.state.api+'member?token='+this.token,
                    params: {
                        book_id:this.id
                    }
                }).then( res=>{
                    // console.log(res);
                    // console.log(res.data.data);
                    if (res.data.status){
                        this.members = res.data.data;
                    }else{
                        this.props.method = {};
                        this.disabled = true;
                        this.notice = res.data.data;
                    }
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            local(url,id){
                if (url == 'Infor/addMember' && this.disabled){
                    this.noticeMes = '无权操作';
                    this.notices = true;
                    setTimeout(()=>{
                        this.notices = false;
                    },2000);
                    return;
                }
                this.$router.push({path:"/"+url,query:{id:id}})

            },
            doEdit(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '保存中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'post',
                    url: this.$store.state.api+'book/update?&token='+this.token,
                    params:{
                        book_id:this.id,
                        book_name:this.name,
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // console.log(res);
                    if (res.data.status){
                        // alert('修改成功');
                        this.noticeMes = '修改成功';
                        this.notices = true;
                        setTimeout(()=>{
                            this.notices = false;
                        },2000);
                        this.edit=true;
                        this.init();
                    }else{
                        this.noticeMes = res.data.data;
                        this.notices = true;
                        setTimeout(()=>{
                            this.notices = false;
                        },2000);
                        // alert(res.data.data);
                    }
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            delMember(id){
                this.delMembers = true;
                this.delMemberId = id;
                this.choose = true;
            },
            delBook(){
                this.delBooks = true;
                this.delBookId = this.id;
                this.choose = true;
            },
            doDel(e){
                if (this.delMembers){
                    if (e) {
                        let lt = setTimeout(()=>{
                            this.loadingMes = '删除中,请稍后';
                            this.loading = true;
                        },200);
                        clearTimeout(this.t);
                        this.notice = false;
                        axios({
                            method: 'post',
                            url: this.$store.state.api+'member/delete?token=' + this.token,
                            params:{
                                book_id:this.id,
                                user_id:this.delMemberId,
                            }
                        }).then(res => {
                            clearTimeout(lt);
                            this.loading = false;
                            // console.log(res.data.data);
                            // alert(res.data.data);
                            // alert('删除成功');
                            this.noticeMes = res.data.data;
                            this.notices = true;
                            this.getMember();
                            this.t = setTimeout(() => {
                                this.notices = false;
                            }, 2000);
                        }).catch(function (error) {
                            // console.log(error);
                            // alert('服务器繁忙');
                            return;
                        });
                    }
                    this.delMembers = false;
                    this.choose = false;
                } else if(this.delBooks){
                    if (e) {
                        let lt = setTimeout(()=>{
                            this.loadingMes = '删除中,请稍后';
                            this.loading = true;
                        },200);
                        clearTimeout(this.t);
                        this.notice = false;
                        axios({
                            method: 'post',
                            url: this.$store.state.api+'book/delete?token=' + this.token,
                            params:{
                                book_id:this.id,
                            }
                        }).then(res => {
                            clearTimeout(lt);
                            this.loading = false;
                            // console.log(res);
                            if (res.data.data == null){
                                // alert('删除成功');
                                this.local('Infor/books');
                            }else{
                                this.noticeMes = res.data.data;
                                this.notices = true;
                                this.t = setTimeout(()=>{
                                    this.notices = false;
                                },2000);
                                // alert(res.data.data);
                            }
                        }).catch(function (error) {
                            // console.log(error);
                            // alert('服务器繁忙');
                            return;
                        });
                    }
                    this.delBooks = false;
                    this.choose = false;
                }
            },
            disnone(){
                this.choose = false;
            }
        },
    }
</script>

<style scoped lang="scss">
    .inforAcc {
        .main{
            height: 83vh;
            overflow: scroll;
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
                            text-align: right;
                            border: none;
                            outline: none;
                            padding-left: 10px;
                            padding-bottom: 3px;
                            border-bottom: 1px solid #07C062;
                        }
                    }
                }
            }
            .member{
                margin-top: 4vh;
                padding: 0 5%;
                line-height: 4vh;
                .member_head{
                    background: #f1f1f1;
                }
                .member_list{
                    height: 32px;
                    line-height: 32px;
                    white-space: normal;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    .add{
                        display: inline-block;
                        padding: 0 2%;
                        background: #42b983;
                        opacity: 0.5;
                        color: #fff;
                        border-radius: 20%;
                    }
                }
                .item{
                    width: calc(1/3*100%);
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    text-align: center;
                }
                .del{
                    background: #07e88a;
                    color: #fff;
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
                    padding: 1vh 0;
                    min-height: 24px;
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