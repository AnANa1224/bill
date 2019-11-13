<template>
    <div id="footer">
        <ul class="menu cf">
            <li v-if="who=='index'" class="active">
                <div class="model">
                    <p class="fa fa-usd"></p>
                    <p class="wx">明细</p>
                </div>
            </li>
            <li v-else @click="local('')">
                <div class="model">
                    <p class="fa fa-usd"></p>
                    <p class="wx">明细</p>
                </div>
            </li>
            <li v-if="who=='accountTable'" class="active">
                <div class="model">
                    <p class="fa fa-align-center"></p>
                    <p class="list">超表</p>
                </div>
            </li>
            <li v-else @click="local('recordTable')">
                <div class="model">
                    <p class="fa fa-align-center"></p>
                    <p class="list">超表</p>
                </div>
            </li>
            <li v-if="who=='circle'" class="active core">
                <div class="model">
                    <p class="fa fa-plus-circle"></p>
                    <p class="list">记账</p>
                </div>
            </li>
            <li v-else @click="local('record')" class="core">
                <div class="model">
                    <p class="fa fa-plus-circle"></p>
                    <p class="list">记账</p>
                </div>
            </li>
            <li v-if="who=='trophy'" class="active">
                <div class="model">
                    <p class="fa fa-trophy"></p>
                    <p class="find">榜单</p>
                </div>
            </li>
            <li v-else @click="local('trophy')">
                <div class="model">
                    <p class="fa fa-trophy"></p>
                    <p class="find">榜单</p>
                </div>
            </li>
            <li v-if="who=='infor'" class="active">
                <div class="model">
                    <p class="fa fa-user-o"></p>
                    <p class="me">我的</p>
                </div>
            </li>
            <li v-else @click="local('infor')">
                <div class="model">
                    <p class="fa fa-user-o"></p>
                    <p class="me">我的</p>
                </div>
            </li>
        </ul>
        <Notice :dis="notice" :mes="noticeMes"></Notice>
        <Choose :dis="choose" :mes="chooseMes" v-on:status="doLogin($event)" v-on:dis="disnone()"></Choose>
    </div>
</template>

<script>
    import Notice from '@/components/Notice.vue'
    import Choose from '@/components/Choose.vue'

    export default {
        name: "Footer",
        components: {
            Choose,
            Notice
        },
        data(){
            return{
                token:'',
                notice:false,
                noticeMes:'修改成功',
                choose:false,
                chooseMes:'您还未登录,是否前往登录?',
            }
        },
        props:{
            who:String,
        },
        mounted() {
            this.token = localStorage.getItem('token');
        },
        methods:{
            local(url){
                clearTimeout(this.t);
                this.notice = false;
                if (this.token == null) {
                    this.choose = true;
                    return;
                }
                if (url == 'trophy' || url == 'recordTable') {
                    this.notice = true;
                    this.noticeMes = '该页面暂未开放，敬请期待';
                    this.t = setTimeout(()=>{
                        this.notice = false;
                    },2000);
                    return;
                }
                this.$router.push('/'+url)
            },
            doLogin(e){
                if (e) {
                    this.$router.push({path: "login"});
                }
                this.choose = false;
            },
            disnone(){
                this.choose = false;
            }
        }
    }
</script>

<style scoped lang="scss">
    #footer{
        height: 10vh;
        background: #f1f1f1;
        color: #000;
        .menu{
            height: 100%;
            background: #f1f1f1;
        }
        .menu li{
            margin-top: 2vh;
            border-top: 1px solid #333333;
            padding-top: 1vh;
            float: left;
            text-align: center;
            width: calc(1/5*100%);
        }
        .model{
            width: 30px;
            height: 30px;
            margin: 0 auto;

        }
        .menu li p:first-of-type{
            font-size: 16px;
        }
        .active p {
            color: #07C062;
        }
        .menu .core{
            padding: 0;

        }
        .menu .core .model{
            width: 50px;
            height: 50px;
            margin: -10px auto 0;
            padding-left: 1px;
            background: #f1f1f1;
            border-radius: 100%;

        }
        .menu .core .model p:first-of-type{
            width: 40px;
            height: 40px;
            font-size: 40px;
            color: #FEDA01;
            border-radius: 100%;
            margin: 0 auto;
        }
        .menu .core .model p:first-of-type{
            margin-top: -2px;
        }
    }
</style>