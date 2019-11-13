<template>
    <div class="inforMes">
        <Header :mess="props"></Header>
        <div class="main">
            <ul class="lists">
                <li class="list cf" @click="local('Infor/editPwd')">
                    <div class="attr fl">修改密码</div>
                    <div class="mes fr">
                        <p></p>
                        <span class="fa fa-chevron-right"></span>
                    </div>
                </li>
                <li class="list cf" @click="local('Infor/mobile')">
                    <div class="attr fl">修改绑定手机</div>
                    <div class="mes fr">
                        <p>{{infor.mobile}}</p>
                        <span class="fa fa-chevron-right"></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import VueAxios from 'vue-axios'
    import Header from '@/components/Header.vue'

    export default {
        name: "Safe",
        components:{
            Header,
        },
        data(){
            return{
                props:{
                    back:'infor',
                    title:'安全中心',
                },
                infor:{},
                token:'',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.init();
        },
        methods:{
            init(){
                axios({
                    method: 'get',
                    url: this.$store.state.api+'user/profile?token='+this.token,
                }).then( res=>{
                    // console.log(res);
                    var data = res.data.data;
                    // console.log(data)
                    let mobile = data.mobile;
                    let t = mobile.substr(2,6);
                    mobile = mobile.replace(t,'******');
                    this.infor={
                        mobile:mobile,
                    }
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
            },
            local(url){
                this.$router.push({path:"/"+url})
            }
        },
    }
</script>

<style scoped lang="scss">
    .inforMes {
        .main{
            margin-top: 5%;
            .lists{
                .list{
                    height: 8vh;
                    padding: 0 20px;
                    white-space: normal;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    .attr{
                        line-height: 8vh;
                    }
                    .mes{
                        height: 100%;
                        color: #ababab;
                        line-height: 8vh;
                        p{
                            float: left;
                            width: 10vh;
                            height: 100%;
                            text-align: center;
                            img{
                                height: 100%;
                            }
                        }
                        span{
                            margin-left: 20px;
                            float: left;
                            line-height: 8vh;
                        }
                    }
                }
            }
        }
    }
</style>