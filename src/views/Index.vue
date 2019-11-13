<template>
    <div class="index">
        <div id="header">
            <div class="identity fl tac">
                <div class="home">
                    <span class="fa fa-home"></span>
                </div>
            </div>
            <div class="title fl">
                <h1>记点点</h1>
            </div>
        </div>
        <div id="main" :style="height.main_height">
            <div class="head">
                <ul class="total cf">
                    <li class="item month">
                        <div class="title">{{year}}年</div>
                        <div class="cont" @click="changeList('monthList')">
                            {{month}}
                            <i>月　</i>
                            <span v-if="monthList" class="fa fa-caret-up"></span>
                            <span v-else class="fa fa-caret-down"></span>
                        </div>
                        <div v-if="monthList" class="setMonth">
                            <ul class="monthLists">
                                <li v-for="month in months" class="monthList" @click="changes('month',month)">
                                    <span>2019-{{month}}</span>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="item">
                        <div class="title">收入</div>
                        <div class="cont">{{totalIn}}</div>
                    </li>
                    <li class="item">
                        <div class="title">支出</div>
                        <div class="cont">{{totalOut}}</div>
                    </li>
                </ul>
                <ul class="nav cf">
                    <li class="list">
                        <p class="title">账户</p>
                        <p class="type" @click="changeList('accountList')">
                            <span>{{account_name}}</span>
                            <span v-if="accountList" class="font fa fa-caret-up"></span>
                            <span v-else class="font fa fa-caret-down"></span>
                        </p>
                        <ul v-if="accountList" class="type_lists cf">
                            <li class="type_list" @click="changes('account',{id:null,name:'全部'})">全部</li>
                            <li v-for="account in accounts" class="type_list" @click="changes('account',{id:account.id,name:account.name})">{{account.name}}</li>
                        </ul>
                    </li>
                    <li class="list">
                        <p class="title">类型</p>
                        <p class="type" @click="changeList('typeList')">
                            <span v-if="type == 1">收入</span>
                            <span v-else-if="type == 2">支出</span>
                            <span v-else>全部</span>
                            <span v-if="typeList" class="font fa fa-caret-up"></span>
                            <span v-else class="font fa fa-caret-down"></span>
                        </p>
                        <ul v-if="typeList" class="type_lists cf">
                            <li class="type_list" @click="changes('type','3')">全部</li>
                            <li class="type_list" @click="changes('type','1')">收入</li>
                            <li class="type_list" @click="changes('type','2')">支出</li>
                        </ul>
                    </li>
                    <li class="list">
                        <p class="title">类别</p>
                        <p class="type" @click="changeList('categoryList')">
                            <span>{{category_name}}</span>
                            <span v-if="categoryList" class="font fa fa-caret-up"></span>
                            <span v-else class="font fa fa-caret-down"></span>
                        </p>
                        <ul v-if="categoryList" class="type_lists cf">
                            <li class="type_list" @click="changes('category',{id:null,name:'全部'})">全部</li>
                            <li v-for="category in categorys" class="type_list" @click="changes('category',{id:category.id,name:category.name})">{{category.name}}</li>
                        </ul>
                    </li>
                    <li class="list">
                        <p class="title">待收/付</p>
                        <p class="type" @click="changeList('waitList')">
                            <span>{{wait_name}}</span>
                            <span v-if="waitList" class="font fa fa-caret-up"></span>
                            <span v-else class="font fa fa-caret-down"></span>
                        </p>
                        <ul v-if="waitList" class="type_lists cf">
                            <li class="type_list" @click="changes('wait',{type:0,name:'默认'})">默认</li>
                            <li class="type_list" @click="changes('wait',{type:1,name:'待收'})">待收</li>
                            <li class="type_list" @click="changes('wait',{type:2,name:'待付'})">待付</li>
                        </ul>
                    </li>
                    <li class="list">
                        <p class="title">高级筛选</p>
                        <p class="type" @click="changeList('seniorList')">
                            <span v-if="seniorList">收起</span>
                            <span v-else>筛选</span>
                            <span v-if="seniorList" class="font fa fa-th-large" style="color: #76b70d"></span>
                            <span v-else class="font fa fa-th-large"></span>
                        </p>
                    </li>
                </ul>
                <ul v-if="seniorList" class="senior_lists cf">
                    <li class="senior_list date">
                        <div class="title">
                            <p>起始 <input id="begin_date" type="date" v-model="begin_date" @change="dateChange">
                            </p>
                            <p>结束 <input type="date" v-model="end_date"@change="dateChange">
                            </p>
                        </div>
                    </li>
                    <li class="senior_list name">
                        <p>交易对象</p>
                        <p class="type" @click="changeList('companyList')">
                            <span>{{company_name}}</span>
                            <span v-if="waitList" class="font fa fa-caret-up"></span>
                            <span v-else class="font fa fa-caret-down"></span>
                        </p>
                        <ul v-if="companyList" class="type_lists cf">
                            <li class="type_list" @click="changes('company_name',{name:'全部'})">全部</li>
                            <li v-for="company_name in company_names" class="type_list" @click="changes('company_name',{name:company_name})">{{company_name}}</li>
                        </ul>
                    </li>
                    <li class="senior_list btns">
                        <div class="btn">
                            <p class="enter" @click="enter">确定</p>
                            <p class="clear" @click="clear">清空</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="content" :style="height.cont_height">
                <ul v-if="wait_type==0" class="lists">
                    <li class="title_list">
                        <div class="cont cf fl">
                            <span class="cate fl">账户</span>
                            <span class="company_name fl">交易对象</span>
                            <span class="date">交易时间</span>
                            <span class="money fr">交易金额</span>
                        </div>
                    </li>
                    <li v-for="record in records" class="list">
                        <div class="cont cf fl slider"  @click="local('Record/detail',record.record_id)">
                            <div class="detail" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>
                                <span class="cate">
                                    <p v-for="acc in accounts" v-if="record.account_id == acc.id">{{acc.name}}</p>
                                </span>
                                <span class="company_name">
                                    <p v-if="record.company_name">{{record.company_name}}</p>
                                    <p v-else>无</p>
                                </span>
                                    <span class="date">{{record.date}}</span>
                                    <span class="money">
                                    <p v-if="record.type == 2">-{{record.money}}</p>
                                    <p v-else>{{record.money}}</p>
                                </span>
                            </div>
                            <span class="remove" @click.stop="delRec(record.record_id)">删除</span>
                        </div>
                    </li>
                </ul>
                <ul v-else class="lists">
                    <li class="head_list list">
                        <div class="cont cf fl">
                            <span class="company_name fl">对象</span>
                            <span class="total_money fr">
                                <span v-if="wait_type == 2">应付</span>
                                <span v-else-if="wait_type == 1">应收 </span>
                            </span>
                            <span class="money">
                                <span v-if="wait_type == 2">实付</span>
                                <span v-else-if="wait_type == 1">实收 </span>
                            </span>
                            <span class="wait fr" >
                                <span v-if="wait_type == 2">待付</span>
                                <span v-else-if="wait_type == 1">待收 </span>
                            </span>
                        </div>
                    </li>
                    <li class="total list">
                        <span>总计</span>
                        <span>{{waitMess.total}}</span>
                    </li>
                    <li v-for="waitMes in waitMess.list" class="list">
                        <div class="cont cf fl slider" @click="local('Record/appendRecord',waitMes.id,'wait')">
                            <div class="detail" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd'>
                                <span class="company_name">
                                    <p v-if="waitMes.company_name">{{waitMes.company_name}}</p>
                                    <p v-else>无</p>
                                </span>
                                <span class="total_money">{{waitMes.total_money}}</span>
                                <span class="money">{{waitMes.paid_money}}</span>
                                <span class="wait">{{waitMes.total_money - waitMes.paid_money}}</span>
                            </div>
                            <span class="remove" @click.stop="delRec(waitMes.id)">删除</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div id="page" :style="height.page_height">
            <ul class="page_btns cf">
                <li v-if="pageMes.currentPage == 1" class="page_btn prev prohibit" @click="changes('page',{page:pageMes.prevPage})"><span class="fa fa-caret-left"></span> 上一页</li>
                <li v-else class="page_btn prev" @click="changes('page',{page:pageMes.prevPage})"><span class="fa fa-caret-left"></span> 上一页</li>
                <li class="page_btn pageCount">
                    <div class="cont" @click="changeList('pageList')">
                        当前第{{pageMes.currentPage}}页
                        <span v-if="pageList" class="fa fa-caret-down"></span>
                        <span v-else class="fa fa-caret-up"></span>
                    </div>
                    <ul v-if="pageList" class="page_lists cf">
                        <li v-for="p in pages" class="page_list" @click="changes('page',{page:p})">
                            <p v-if="p == page" class="current">{{p}}</p>
                            <p v-else>{{p}}</p>
                        </li>
                    </ul>
                </li>
                <li v-if="pageMes.currentPage + 1 > pageMes.pageCount" class="page_btn next prohibit" @click="changes('page',{page:pageMes.nextPage})">下一页 <span class="fa fa-caret-right"></span></li>
                <li v-else class="page_btn next" @click="changes('page',{page:pageMes.nextPage})">下一页 <span class="fa fa-caret-right"></span></li>
            </ul>
        </div>
        <Footer who="index"></Footer>
        <Notice :dis="notice" :mes="noticeMes"></Notice>
        <Choose :dis="choose" :mes="chooseMes" v-on:status="doDel($event)" v-on:dis="disnone()"></Choose>
        <Loading :dis="loading" :mes="loadingMes"></Loading>
    </div>
</template>

<script>
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Footer from '@/components/Footer.vue'
    import Notice from '@/components/Notice.vue'
    import Choose from '@/components/Choose.vue'
    import Loading from '@/components/Loading.vue'
    import $ from 'jquery'

    export default {
        name: 'index',
        components: {
            Footer,
            Notice,
            Choose,
            Loading
        },
        data(){
            return{
                token:'',
                height:{
                    page_height:'height:0vh;display:none',
                    main_height:'height:82vh',
                    cont_height:'height:62vh',
                },
                monthList:false,
                typeList:false,
                accountList:false,
                categoryList:false,
                waitList:false,
                seniorList:false,
                pageList:false,
                companyList:false,
                totalIn:0,
                totalOut:0,
                records:[],
                accounts:[],
                categorys:[],
                waitMess:[],
                company_names:[],
                months:[
                    '11',
                    '10',
                    '09',
                    '08',
                    '07',
                    '06',
                    '05',
                    '04',
                    '03',
                    '02',
                    '01',
                ],
                year:'',
                month:'',
                date:true,
                begin_date:'',
                end_date:'',
                type:3,
                page:1,
                pages:[],
                pageMes:{},
                account_id:null,
                account_name:'全部',
                category_id:null,
                category_name:'全部',
                wait_type:0,
                wait_name:'默认',
                company_name:'全部',
                props:{cate:'分类',name:'对象',date:'2222-22-22',money:'8888'},
                startX: 0,  //触摸位置
                endX: 0,   //结束位置
                moveX: 0,  //滑动时的位置
                disX: 0,  //移动距离
                deleteSlider: '',//滑动时的效果
                disList:'',
                sliderStatus:false,
                notice:false,
                noticeMes:'修改成功',
                choose:false,
                chooseMes:'您确定要删除吗?',
                loading:false,
                loadingMes:'保存中,请稍后',
                delId:'',
                t:null,
            }
        },
        mounted() {
            this.token = localStorage.getItem('token');
            if (this.token != null){
                this.getDate();
                this.getAccount();
                this.init();
                this.getCompanys();
            }else {
                this.$router.push({path:"/infor"});
            }
        },
        methods:{
            total(){
                if (this.account_id == null) {
                    this.totalIn = 0;
                    this.totalOut = 0;
                    setTimeout(()=>{
                        let accs = this.accounts;
                        for (let acc of accs) {
                            axios({
                                method: 'get',
                                url: 'http://jizhang-api-dev.it266.com/api/account/change?id=' + acc.id + '&token=' + this.token,
                                params: {
                                    month: this.year + '-' + this.month,
                                }
                            }).then(res => {
                                // console.log(res);
                                var data = res.data.data;
                                this.totalIn += data.in;
                                this.totalOut += data.out;
                            }).catch(function (error) {
                                // console.log(error);
                                // alert('服务器繁忙');
                                return;
                            });
                        }
                    },500);

                } else{
                    axios({
                        method: 'get',
                        url: 'http://jizhang-api-dev.it266.com/api/account/change?id='+this.account_id+'&token='+this.token,
                        params:{
                            month:this.year+'-'+this.month,
                        }
                    }).then( res=>{
                        // console.log(res);
                        var data = res.data.data;
                        // console.log(data)
                        this.totalIn = data.in;
                        this.totalOut = data.out;
                        this.monthsList = false;
                    }).catch(function (error) {
                        // console.log(error);
                        // alert('服务器繁忙');
                        return;
                    });
                }
            },
            init(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '数据加载中,请稍后';
                    this.loading = true;
                },200);
                var end_date;
                var begin_date;
                let company_name = this.company_name == '全部' ? company_name = '' : this.company_name;
                if (this.date){
                    if ( this.month==1 || this.month==3 || this.month==5 || this.month==7 || this.month==8 || this.month==10 || this.month==12 ){
                        end_date = this.year + '-' + this.month + '-' + '31';
                    } else if (this.month==2 ){
                        if ( (this.year)%4==0 ){
                            end_date = this.year + '-' + this.month + '-' + '29';
                        }else {
                            end_date = this.year + '-' + this.month + '-' + '28';
                        }
                    } else {
                        end_date = this.year + '-' + this.month + '-' + '30';
                    }
                    begin_date = this.year+'-'+this.month+'-01';
                }else {
                    end_date = this.end_date;
                    begin_date = this.begin_date;
                }
                axios({
                    method: 'get',
                    url: 'http://jizhang-api-dev.it266.com/api/record/real?token='+this.token,
                    params:{
                        begin_date:begin_date,
                        end_date:end_date,
                        type:this.type,
                        account_id:this.account_id,
                        category_id:this.category_id,
                        company_name:company_name,
                        page:this.page,
                    }
                }).then( res=>{
                    // console.log(res);
                    let data = res.data.data;
                    // console.log(data);
                    this.records = data.list;
                    // console.log(this.records);
                    this.pageMes = data.page;
                    let pageCount= this.pageMes.pageCount;
                    if (pageCount>1){
                        this.pages = [];
                        this.height={
                            page_height:'height:4vh',
                                main_height:'height:78vh',
                                cont_height:'height:54vh',
                        };
                        for (pageCount;pageCount>=1;pageCount--){
                            this.pages.push(pageCount);
                        }
                    }else {
                        this.height={
                            page_height:'height:0vh;display:none',
                            main_height:'height:82vh',
                            cont_height:'height:58vh',
                        }
                    }
                    // this.getCompanys();
                    this.date = true;
                    this.total();
                    clearTimeout(lt);
                    this.loading = false;
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            changes(type,data){
                if (type == 'month'){
                    this.month = data;
                    this.monthList = false;
                } else if (type == 'type'){
                    this.category_name = '全部';
                    this.category_id = null;
                    this.type = data;
                    if (data != 3){
                        this.getCate(data);
                    } else {
                        this.categorys = [];
                    }
                    this.typeList = false;
                } else if (type == 'account'){
                    this.account_id = data.id;
                    this.account_name = data.name;
                    this.accountList = false;
                } else if (type == 'category'){
                    this.category_id = data.id;
                    this.category_name = data.name;
                    this.categoryList = false;
                    this.getWait();
                } else if (type == 'wait'){
                    this.wait_type = data.type;
                    this.wait_name = data.name;
                    this.waitList = false;
                    this.getWait();
                    return;
                } else if (type == 'page'){
                    // console.log(data);
                    this.page = data.page;
                    this.pageList = false;
                } else if (type == 'company_name'){
                    // console.log(data);
                    this.company_name = data.name;
                    this.companyList = false;
                    return;
                }
                this.init()
            },
            changeList(list){
                if (list == 'monthList'){
                    this.typeList=false;
                    this.accountList=false;
                    this.categoryList=false;
                    this.waitList=false;
                    this.seniorList=false;
                    this.pageList=false;
                    this.companyList=false;
                    this.monthList = !this.monthList;
                } else if (list == 'typeList'){
                    this.monthList=false;
                    this.accountList=false;
                    this.categoryList=false;
                    this.waitList=false;
                    this.seniorList=false;
                    this.pageList=false;
                    this.companyList=false;
                    this.typeList = !this.typeList;
                } else if (list == 'accountList'){
                    this.monthList=false;
                    this.typeList=false;
                    this.categoryList=false;
                    this.waitList=false;
                    this.seniorList=false;
                    this.pageList=false;
                    this.companyList=false;
                    this.accountList = !this.accountList;
                } else if (list == 'categoryList'){
                    this.monthList=false;
                    this.typeList=false;
                    this.accountList=false;
                    this.waitList=false;
                    this.seniorList=false;
                    this.pageList=false;
                    this.companyList=false;
                    this.categoryList = !this.categoryList;
                } else if (list == 'waitList'){
                    this.monthList=false;
                    this.typeList=false;
                    this.accountList=false;
                    this.categoryList=false;
                    this.seniorList=false;
                    this.pageList=false;
                    this.companyList=false;
                    this.waitList = !this.waitList;
                } else if (list == 'seniorList'){
                    this.monthList=false;
                    this.typeList=false;
                    this.accountList=false;
                    this.categoryList=false;
                    this.waitList=false;
                    this.pageList=false;
                    this.companyList=false;
                    this.seniorList = !this.seniorList;
                } else if (list == 'pageList'){
                    this.monthList=false;
                    this.typeList=false;
                    this.accountList=false;
                    this.categoryList=false;
                    this.waitList=false;
                    this.seniorList=false;
                    this.companyList=false;
                    this.pageList = !this.pageList;
                } else if (list == 'companyList'){
                    this.monthList=false;
                    this.typeList=false;
                    this.accountList=false;
                    this.categoryList=false;
                    this.waitList=false;
                    this.seniorList=true;
                    this.pageList=false;
                    this.companyList = !this.companyList;
                }

            },
            getWait(){
                axios({
                    method: 'get',
                    url: 'http://jizhang-api-dev.it266.com/api/record/account/waiting?token='+this.token,
                    params:{
                        type:this.wait_type,
                        begin_date:this.year+'-'+this.month+'-01',
                        end_date:this.year+'-'+this.month+'-30',
                        category_id:this.category_id,

                    }
                }).then( res=>{
                    // console.log(res);
                    var data = res.data.data;
                    // console.log(data)
                    this.waitMess=data
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            getAccount(){
                axios({
                    method: 'get',
                    url: 'http://jizhang-api-dev.it266.com/api/account?token='+this.token,
                }).then( res=>{
                    // console.log(res);
                    var data = res.data.data;
                    // console.log(data)
                    this.accounts=data
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            getCate(type){
                axios({
                    method: 'get',
                    url: 'http://jizhang-api-dev.it266.com/api/category?token='+this.token,
                    params: {
                        type:type,
                    }
                }).then( res=>{
                    // console.log(res.data.data);
                    this.categorys = res.data.data;
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
                this.year = year;
                this.month = month;
                this.begin_date = year + seperator1 + month + seperator1 + '01';
                if ( month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12 ){
                    this.end_date = year + seperator1 + month + seperator1 + '31';
                } else if (month==2 ){
                    if ( year%4==0 ){
                        this.end_date = year + seperator1 + month + seperator1 + '29';
                    }else {
                        this.end_date = year + seperator1 + month + seperator1 + '28';
                    }
                } else {
                    this.end_date = year + seperator1 + month + seperator1 + '30';
                }
                return currentdate;
            },
            getCompanys(){
                this.company_names = [];
                var end_date;
                var begin_date;
                if (this.date){
                    if ( this.month==1 || this.month==3 || this.month==5 || this.month==7 || this.month==8 || this.month==10 || this.month==12 ){
                        end_date = this.year + '-' + this.month + '-' + '31';
                    } else if (this.month==2 ){
                        if ( (this.year)%4==0 ){
                            end_date = this.year + '-' + this.month + '-' + '29';
                        }else {
                            end_date = this.year + '-' + this.month + '-' + '28';
                        }
                    } else {
                        end_date = this.year + '-' + this.month + '-' + '30';
                    }
                    begin_date = this.year+'-'+this.month+'-01';
                }else {
                    end_date = this.end_date;
                    begin_date = this.begin_date;
                }
                axios({
                    method: 'get',
                    url: 'http://jizhang-api-dev.it266.com/api/record/real?token='+this.token,
                    params: {
                        begin_date: begin_date,
                        end_date: end_date,
                    }
                }).then( res=>{
                    // console.log(res);
                    let data = res.data.data;
                    // console.log(data);
                    for (let record of data.list){
                        this.company_names.push(record.company_name);
                    }
                    // console.log(this.company_names);
                    this.company_names = [...new Set(this.company_names)];
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            local(url,id){
                this.$router.push({path:'/'+url,query:{id:id}})
            },
            delRec(id){
                this.delId = id;
                this.choose = true;
            },
            doDel(e){
                if (e) {
                    clearTimeout(this.t);
                    this.notice = false;
                    axios({
                        method: 'post',
                        url: 'http://jizhang-api-dev.it266.com/api/record/delete?id=' + this.delId + '&token=' + this.token,
                    }).then(res => {
                        // console.log(res);
                        // alert(res.data.data);
                        this.noticeMes = res.data.data;
                        this.notice = true;
                        this.t = setTimeout(()=>{
                            this.notice = false;
                        },2000);
                        var slider = $('.slider');
                        for (var val of slider){
                            val.removeAttribute('style');
                        }
                        this.sliderStatus = false;
                        this.total();
                        this.init();
                        this.getWait();
                        // console.log(slider);
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
            enter(){
                this.date=false;
                this.init();
                this.getCompanys();
            },
            dateChange(){
                this.date=false;
                this.getCompanys();
            },
            clear(){
                this.date=true;
                this.company_name = '全部';
                this.getDate();
                this.init();
                this.getCompanys();
            },
            touchStart(ev){
                ev = ev || event;
                if (this.sliderStatus){
                    var slider = $('.slider');
                    // console.log(slider);
                    for (var val of slider){
                        val.removeAttribute('style');
                    }
                    this.sliderStatus = false;
                }
                var list = ev.target;
                // console.log(list);
                var listParent = $(list).parents('.slider');
                // console.log(listParent);
                this.disList = listParent;
                this.deleteSlider = "transform:translateX(0px)";
                // console.log(listParent);
                this.disList.attr('style',this.deleteSlider);
                //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                if(ev.touches.length == 1){
                    // 记录开始位置
                    this.startX = ev.touches[0].clientX;
                }
            },
            touchMove(ev){
                ev = ev || event;
                //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
                let wd = $('.remove').eq(0).width();
                // console.log(wd);
                if(ev.touches.length == 1) {
                    // 滑动时距离浏览器左侧实时距离
                    this.moveX = ev.touches[0].clientX;
                    //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                    this.disX = this.startX - this.moveX;
                    // console.log(this.disX);
                    // 如果是向右滑动或者不滑动，不改变滑块的位置
                    if (this.disX < 0 || this.disX == 0) {
                        this.deleteSlider = "transform:translateX(0px)";
                        this.disList.attr('style',this.deleteSlider);
                    } else if (this.disX > 0) {// 大于0，表示左滑了，此时滑块开始滑动
                        //具体滑动距离我取的是 手指偏移距离*5。
                        this.deleteSlider = "transform:translateX(-" + this.disX + "px)";
                        this.disList.attr('style',this.deleteSlider);
                        this.sliderStatus = true;
                        // 最大也只能等于删除按钮宽度
                        if (this.disX*5 >= wd) {
                            this.deleteSlider = "transform:translateX(-" +wd+ "px)";
                            this.disList.attr('style',this.deleteSlider);
                        }
                    }
                }
            },
            touchEnd(ev){
                ev = ev || event;
                let wd = $('.remove').eq(0).width();
                // console.log(wd);
                if (ev.changedTouches.length == 1) {
                    let endX = ev.changedTouches[0].clientX;
                    this.disX = this.startX - endX;
                    //console.log(this.disX)
                    //如果距离小于删除按钮一半,强行回到起点
                    if ((this.disX*5) < (wd/2)) {
                        this.deleteSlider = "transform:translateX(0px)";
                        this.disList.attr('style',this.deleteSlider);
                    }else{
                        //大于一半 滑动到最大值
                        this.deleteSlider = "transform:translateX(-"+wd+ "px)";
                        this.disList.attr('style',this.deleteSlider);
                    }
                }
            },
        },
    }

</script>

<style lang="scss" scoped>
    .index{
        #header{
            height: 8vh;
            background: #38B74C;
            white-space: normal;
            text-overflow: ellipsis;
            overflow: hidden;
            .identity{
                width: 15%;
                height: 100%;
                margin-left: 2%;
                .home{
                    width: 22px;
                    height: 22px;
                    margin-top: 1.5vh;
                    padding: 5px;
                    border-radius: 100%;
                    background: #FFFFFF;
                    span{
                        display: inline-block;
                        width: 22px;
                        height: 22px;
                        font-size: 22px;
                        color: #07C062;
                    }
                }
            }
            .title{
                line-height: 8vh;
                h1{
                    margin: 0;
                    color: #fff;
                }
            }
        }
        #main{
            background: #f1f1f1;
            font-size: 12px;
            .head{
                 height: 20vh;
                 min-height: 96px;
                 padding-top: 4vh;
                 background: #07C062;
                 position: relative;
                 .total{
                     height: 10vh;
                     min-height: 50px;
                     .item{
                         width: calc(1/3*100%);
                         float: left;
                         text-align: center;
                         color: #f1f1f1;
                         .title{
                             font-size: 14px;
                             margin-bottom: 1vh;
                         }
                         .cont{
                             font-style: italic;
                             font-size: 18px;
                             max-height: 20px;
                             white-space: normal;
                             text-overflow: ellipsis;
                             overflow: hidden;
                             i{
                                 margin-right: 5%;
                                 font-size: 14px;
                             }
                             .font{
                                 margin-left: 5%;
                             }
                         }
                     }
                     .month{
                         position: relative;
                         .setMonth{
                             position: absolute;
                             width: 100%;
                             height: 150px;
                             overflow: scroll;
                             background: #fff;
                             opacity: 0.8;
                             color: #07C062;
                             .monthList{
                                 width: 90%;
                                 padding: 0 5%;
                                 height: 3vh;
                                 line-height: 3vh;
                             }
                             span{
                                 border-bottom: 1px solid #ababab;
                             }
                         }
                     }
                 }
                 .nav{
                     background: #e4e4e2;
                     .list{
                         float: left;
                         text-align: center;
                         height: 10vh;
                         min-height: 50px;
                         width: calc(1/5*100%);
                         font-size: 12px;
                         .title{
                             height: 5vh;
                             line-height: 5vh;
                             min-height: 25px;
                             white-space: normal;
                             text-overflow: ellipsis;
                             overflow: hidden;
                         }
                         .type{
                             width: 80%;
                             max-height: 22px;
                             padding: 5px 0;
                             margin: 0 auto;
                             background: #fff;
                             border-radius: 10px;
                             white-space: normal;
                             text-overflow: ellipsis;
                             overflow: hidden;
                             .font{
                                 margin-left: 8px;
                             }
                         }
                         .type_lists{
                             position: relative;
                             z-index: 666;
                             width: 80%;
                             max-height: 30vh;
                             overflow: scroll;
                             margin: 0 auto;
                             border-radius: 10px;
                             background: #f9f9f9;
                             color: #000000;
                             .type_list{
                                 height: 3vh;
                                 line-height: 3vh;
                                 border-bottom: 1px solid #e4e4e2;
                                 white-space: normal;
                                 text-overflow: ellipsis;
                                 overflow: hidden;
                             }
                         }
                     }
                 }
                 .senior_lists{
                     position: absolute;
                     z-index: 99999;
                     bottom: 0;
                     width: 80%;
                     height: 10vh;
                     line-height: 5vh;
                     background: #FFFFFF;
                     .senior_list{
                         text-align: center;
                         float: left;
                         select{
                             outline: none;
                         }
                     }
                     .date{
                         width: calc(1/2*100%);
                         p{
                             input{
                                 /*display: none;*/
                                 width: 70%;
                                 outline: none;
                                 border: 1px solid #f1f1f1;
                             }
                         }
                     }
                     .name{
                         width: calc(1/3*100%);
                         .type{
                             width: 80%;
                             height: 3vh;
                             line-height: 3vh;
                             margin: 0 auto;
                             background: #f7f7f9;
                             border-radius: 10px;
                             white-space: normal;
                             text-overflow: ellipsis;
                             overflow: hidden;
                             .font{
                                 margin-left: 8px;
                             }
                         }
                         .type_lists{
                             position: relative;
                             z-index: 666;
                             width: 80%;
                             max-height: 30vh;
                             overflow: scroll;
                             margin: 0 auto;
                             border-radius: 10px;
                             background: #f9f9f9;
                             color: #000000;
                             .type_list{
                                 height: 3vh;
                                 line-height: 3vh;
                                 border-bottom: 1px solid #e4e4e2;
                                 white-space: normal;
                                 text-overflow: ellipsis;
                                 overflow: hidden;
                             }
                         }
                     }
                     .btns{
                         width: calc(1/6*100%);
                         .btn{
                             p{
                                 position: relative;
                                 width: 80%;
                                 height: 80%;
                                 line-height: 2vh;
                                 background: #38db56;
                                 color: #fff;
                                 border-radius: 20px;
                                 text-align: center;
                             }
                             .enter{
                                 margin-top: 25%;
                                 top: 25%;
                             }
                             .clear{
                                 margin-top: 25%;
                                 bottom: 25%;
                             }
                         }
                     }
                 }
             }
            .content{
                width: 100%;
                overflow: scroll;
                .lists{
                    .list {
                        width: 100%;
                        height: 8vh;
                        overflow: hidden;
                        position: relative;
                        .cont {
                            /*position: absolute;*/
                            /*left: 0;*/
                            width: 125%;
                            background: #f1f1f1;
                            text-align: center;
                            span {
                                float: left;
                                display: inline-block;
                                height: 8vh;
                                line-height: 8vh;
                                width: 20%;
                            }

                            .cate {
                            }

                            .company_name {
                            }

                            .date {
                            }

                            .money {
                                text-align: center;
                            }

                            .remove {
                                background: #a0f2ad;
                            }
                        }
                    }
                    .title_list{
                        width: 100%;
                        background: #ededed;
                        height: 6vh;
                        line-height: 6vh;
                        color: #76b70d;
                        text-align: center;
                        .cont{
                            width: 100%;
                            height: 6vh;
                            span{
                                width: 25%;
                                height: 6vh;

                            }
                        }
                    }
                    .head_list{
                        background: #ededed;
                        height: 4vh;
                        line-height: 4vh;
                        color: #76b70d;
                        .cont{
                            width: 100%;
                            height: 4vh;
                            span{
                                width: 25%;
                                height: 4vh;
                                line-height: 4vh;
                                span{
                                    width: 100%;
                                }
                            }
                        }
                    }
                    .total{
                        width: 95%;
                        padding-right: 5%;
                        height: 4vh;
                        line-height: 4vh;
                        background: #e4e4e2;
                        text-align: right;
                        span:first-of-type{
                            font-size: 12px;
                        }
                        span:last-of-type{
                            color: #ff6700;
                            margin-left: 3%;
                            font-size: 16px;
                        }
                    }
                }
            }
        }
        #page{
            line-height: 4vh;
            background: #fafafa;
            .page_btns{
                padding: 0 10%;
                .page_btn{
                    height: 4vh;
                    float: left;
                    width: calc(1/3*100%);
                    color: #07C062;
                    span{
                        font-size: 22px;
                        line-height: 4vh;
                    }
                }
                .prev{
                    text-align: left;
                    white-space: normal;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    span{
                        float: left;
                        margin-right: 10px;
                    }
                }
                .pageCount{
                    position: relative;
                    text-align: center;
                    .cont{
                        height: 4vh;
                        white-space: normal;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
                    span{
                        float: right;
                        margin-left: 10px;
                    }
                    .page_lists{
                        width: 100%;
                        min-height: 8vh;
                        max-height: 12vh;
                        overflow: scroll;
                        position: absolute;
                        bottom: 4vh;
                        .page_list{
                            background: #fafafa;
                            .current{
                                margin: 0 auto;
                                background: #07e27e;
                                color: #FFFFFF;
                                border-radius: 10%;
                            }
                        }
                    }
                }
                .next{
                    text-align: right;
                    white-space: normal;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    span{
                        float: right;
                        margin-left: 10px;
                    }
                }
                .prohibit{
                    color: #525252;
                }
            }
        }
    }
</style>