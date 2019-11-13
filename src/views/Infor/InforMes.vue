<template>
    <div class="inforMes">
        <Header :mess="props"></Header>
        <div class="main">
            <ul class="lists">
                <li class="list cf" @click="local('Infor/editAvatar')">
                    <div class="attr fl">头像</div>
                    <div class="mes fr">
                        <p><img :src="infor.avatar_url" alt=""></p>
                        <span class="fa fa-chevron-right"></span>
                    </div>
                </li>
                <li class="list cf" @click="local('Infor/editName')">
                    <div class="attr fl">昵称</div>
                    <div class="mes fr">
                        <p>{{infor.nickname}}</p>
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
        name: "InforMes",
        components:{
            Header,
        },
        data(){
            return{
                props:{
                    back:'',
                    title:'个人资料',
                },
                token:'',
                infor:{},
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
                    this.infor={
                        avatar_url:data.avatar_url,
                        nickname:data.nickname
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
                    overflow: scroll;
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
                                border-radius: 100%;
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