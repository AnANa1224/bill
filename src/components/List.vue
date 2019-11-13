<template>
    <div v-if="model=='mess'" class="item">
        <li @click="$emit('localChat',{nickname:mes.nickname,avatar:mes.avatar})">
            <div class="avatar fl">
                <img v-bind:src="mes.avatar" alt="">
            </div>
            <div class="cont fl">
                <div class="time cf">
                    <p class="fl">{{mes.nickname}}</p>
                    <p class="fr">{{mes.lastTime}}</p>
                </div>
                <div class="message">
                    <p>{{mes.message}}</p>
                </div>
            </div>
        </li>
    </div>
    <div v-else-if="model=='inforList'" class="iList">
        <li>
            <div v-for="mes in inforList">
                <div class="avatar fl">
                    <span :class="'fa '+mes.icon"></span>
                </div>
                <div class="cont fl">
                    <p @click="$emit('local',mes.local)"><span class="fl">{{mes.message}}</span><span class="fr fa fa-chevron-right"></span></p>
                </div>
            </div>
        </li>
    </div>
</template>

<script>
    export default {
        name: "Main",
        props: {
            model:String,
            mes:Object,
            inforList:Array,
        },

    }
</script>

<style scoped lang="scss">
    .list .item li{
        height: 8vh;
        margin-bottom: 1px;
        .avatar{
            text-align: center;
            width: 20%;
            height: 100%;
        }
        .avatar img{
            border-radius: 8px;
            height: 80%;
            margin-top: 8%;
        }
        .cont{
            width: 78%;
            height: 100%;
            border-bottom: 1px solid #e4e4e2;
        }
        .cont .time{
            margin-top: 4%;
        }
        .cont .time p:first-of-type{
            width: 80%;
            text-align: left;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            letter-spacing:2px;
        }
        .cont .time p:last-of-type{
            color: #ababab;
            margin-right: 5%;
            letter-spacing:2px;
        }
        .cont .message{
            color: #aaa;
            margin-top: 2%;
        }
        .cont .message p {
            text-align: left;
            width: 90%;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            letter-spacing: 2px;
        }
    }
    .list .iList{
        li{
            margin-bottom: 1.5vh;
            background: #fff;
            color: #333333;
        }
        li::after{clear: both; content: ''; display: table; }
        .avatar{
            text-align: center;
            width: 20%;
            height: 8vh;
            line-height: 9vh;
        }
        .avatar span{
            font-size: 20px;
            color: #42b983;
        }
        .cont{
            width: 80%;
            height: 8vh;
            border-bottom: 1px solid #ededed;
        }
        li div:last-of-type .cont{
            border-bottom: none;
        }
        .cont p{
            height: 100%;
            line-height: 8vh;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            letter-spacing:2px;
            font-size: 16px;
        }
        .cont p span:last-of-type{
            height: 8vh;
            line-height: 8vh;
            color: #ababab;
            margin-right: 2%;
        }
    }
</style>