<template>
    <div class="inforMes">
        <Header :mess="props" v-on:edit="doEdit"></Header>
        <div class="main">
            <div class="avatar">
                <label for="file"><img :src="avatar_url" alt=""></label>
            </div>
            <div class="upload-pic">
                <div class="upload-title">{{uploadTitle}}</div>
                <div class="upload-box">
                    <form :action="url" method="post" enctype="multipart/form-data">
                        <input type="file" id="file" name="file" class="file-path" @change="changepic" style="display: none" />
                    </form>
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
        name: "editAvatar",
        components:{
            Header,
            Notice,
            Loading
        },
        data(){
            return{
                props:{
                    back:'',
                    title:'头像',
                    btn:{method:'edit',name:'保存'}
                },
                token:'',
                avatar_url:'',
                uploadTitle:'点击头像修改',
                file:File,
                url:'',
                fileKey:'',
                notice:false,
                noticeMes:'修改成功',
                loading:false,
                loadingMes:'保存中,请稍后',
            }
        },
        mounted(){
            this.token = localStorage.getItem('token');
            this.getMes();
        },
        methods:{
            getMes(){
                let lt = setTimeout(()=>{
                    this.loadingMes = '图片上传中,请稍后';
                    this.loading = true;
                },200);
                axios({
                    method: 'get',
                    url: this.$store.state.api+'user/profile?token='+this.token,
                }).then((response)=>{
                    clearTimeout(lt);
                    this.loading = false;
                    var data = response.data.data;
                    this.avatar_url=data.avatar_url
                }).catch(function (error) {
                    // console.log(error);
                    // alert('服务器繁忙');
                    return;
                });
                this.login = true;
            },
            local(url){
                this.$router.push({path:"/"+url})
            },
            changepic(e) {
                let lt = setTimeout(()=>{
                    this.loadingMes = '图片上传中,请稍后';
                    this.loading = true;
                },200);
                let file = e.target.files[0];
                this.file = file;
                // console.log(file);
                // 预览
                // let url = URL.createObjectURL(file);
                // this.avatar_url = url;
                let params = new FormData();
                params.append('file', this.file);
                axios({
                    method: 'post',
                    headers:{
                        'Content-Type': 'multipart/form-data',
                    },
                    url: this.$store.state.api+'upload/image?token='+this.token,
                    data: params,
                }).then(res => {
                    // console.log(res);
                    if (res.data.code == 0) {
                        this.fileKey = res.data.data.file.fileKey;
                        this.avatar_url = res.data.data.file.thumbnailUrl._temp;
                        clearTimeout(lt);
                        this.loading = false;
                    }else{
                        // alert('服务器无响应');
                    }
                }).catch(error => {
                    // alert('服务器繁忙' + error);
                })
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
                    url: this.$store.state.api+'user/profile/update?token='+this.token,
                    params: {
                        avatar:this.fileKey,
                    }
                }).then( res=>{
                    clearTimeout(lt);
                    this.loading = false;
                    // alert(res.data.data);
                    this.noticeMes = res.data.data;
                    this.notice = true;
                    this.t = setTimeout(()=>{
                        this.notice = false;
                    },2000);
                    // this.$router.go(-1);
                }).catch(function (error) {
                    // alert('服务器繁忙');
                    return;
                });
            }
        },
    }
</script>

<style scoped lang="scss">
    .inforMes {
        .main{
            text-align: center;
            .avatar{
                width: 90%;
                margin: 0 auto;
                height: 20vh;
                padding: 2%;
                img{
                    height: 100%;
                    border-radius: 100%;
                }
            }
        }
    }
</style>