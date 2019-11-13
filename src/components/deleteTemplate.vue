<template>
    <div class="cont cf fl" @touchstart='touchStart' @touchmove='touchMove' @touchend='touchEnd' :style="deleteSlider">
        <span class="cate">{{mess.cate}}</span>
        <span class="company_name">
            <p v-if="mess.name">{{mess.name}}</p>
            <p v-else>无</p>
        </span>
        <span class="date">{{mess.date}}</span>
        <span class="money"><p>{{mess.money}}</p></span>
        <span class="remove" ref='remove'>删除</span>
    </div>
</template>

<script>
    export default {
        name: "deleteTemplate",
        props:{
            mess:{}
        },
        data(){
            return{
                startX: 0,  //触摸位置
                endX: 0,   //结束位置
                moveX: 0,  //滑动时的位置
                disX: 0,  //移动距离
                deleteSlider: '',//滑动时的效果
            }
        },
        methods:{
            touchStart(ev){
                this.deleteSlider = "transform:translateX(0px)";
                //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
                if(ev.touches.length == 1){
                    // 记录开始位置
                    this.startX = ev.touches[0].clientX;
                }
            },
            touchMove(ev){
                //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
                let wd = this.$refs.remove.offsetWidth;
                if(ev.touches.length == 1) {
                    // 滑动时距离浏览器左侧实时距离
                    this.moveX = ev.touches[0].clientX
                    //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
                    this.disX = this.startX - this.moveX;
                    //console.log(this.disX)
                    // 如果是向右滑动或者不滑动，不改变滑块的位置
                    if (this.disX < 0 || this.disX == 0) {
                        this.deleteSlider = "transform:translateX(0px)";
                    } else if (this.disX > 0) {// 大于0，表示左滑了，此时滑块开始滑动
                        //具体滑动距离我取的是 手指偏移距离*5。
                        this.deleteSlider = "transform:translateX(-" + this.disX*5 + "px)";
                        // 最大也只能等于删除按钮宽度
                        if (this.disX*5 >= wd) {
                            this.deleteSlider = "transform:translateX(-" +wd+ "px)";
                        }
                    }
                }
            },
            touchEnd(ev){
                let wd = this.$refs.remove.offsetWidth;
                if (ev.changedTouches.length == 1) {
                    let endX = ev.changedTouches[0].clientX;
                    this.disX = this.startX - endX;
                    //console.log(this.disX)
                    //如果距离小于删除按钮一半,强行回到起点
                    if ((this.disX*5) < (wd/2)) {
                        this.deleteSlider = "transform:translateX(0px)";
                    }else{
                        //大于一半 滑动到最大值
                        this.deleteSlider = "transform:translateX(-"+wd+ "px)";
                    }
                }
            },
            deleteLine (){
                this.deleteSlider = "transform:translateX(0px)";
                this.$emit('deleteLine');
            }
        }
    }
</script>

<style scoped lang="scss">
    .cont {
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
</style>