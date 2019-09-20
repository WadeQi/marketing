<template>
  <div class="dial-wrap">
      <img class="dial-bg" src="../../static/img/bigBg.jpg" alt="">
      <div class="con-wrap">
          <div>您今天还有{{lottery}}次抽奖机会</div>
          <div class="point" :style="{transform:'rotate(' + rotateAngle + 'deg)'}" @click="start()">
              <img src="../../static/img/point.png" alt="">
          </div>
          <div class="con-list">
              <div class="con-item" v-for="(item,index) in list">
                  <img class="con-item_img" :src="item.img" alt="">
                  <p class="con-item_text">{{item.text}}</p>
              </div>
          </div>
      </div>
      <div class="win-wrap">
          <div class="win-title">
              中奖纪录
          </div>
          <div class="win-list">
              <ul class="win-list_box">
                  <li class="win-list_item" v-for="(item,index) in 8">
                      <div class="item-left">
                          <img class="item-avatar" src="../../static/img/user.png" alt="">
                          <div class="item-left_right">
                              <p class="item-left_right_phone">123999999</p>
                              <p>2019/09/20</p>
                          </div>
                      </div>
                      <div class="item-right">iphoneX</div>
                  </li>
              </ul>
          </div>
      </div>
      <div class="win-wrap win-fer">
          <div class="win-title">活动规则</div>
          <div class="win-list">
              测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测测试测试测试测试测试测试测试测测试测试测试测试测试测试测试测试
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'luckyDial',
    data(){
        return {
            lottery:2,//次数
            target:95,//停止位置角度
            turnsNum:2,//转动多少圈
            rotateAngle:1,//转动多少度
            qunHistory:0,//圈数记录
            controlTime:1,//控制倒计时
            index:1,//停止位置索引
            list:[
                {img:"../../static/img/item_smile.png",text:'一等奖'},
                {img:"../../static/img/item_smile.png",text:'一等奖'},
                {img:"../../static/img/item_smile.png",text:'一等奖'},
                {img:"../../static/img/item_smile.png",text:'一等奖'},
                {img:"../../static/img/item_smile.png",text:'一等奖'},
                {img:"../../static/img/item_smile.png",text:'一等奖'},
                {img:"../../static/img/item_smile.png",text:'一等奖'},
                {img:"../../static/img/item_smile.png",text:'一等奖'},
            ]
        }
    },
    mounted(){
        console.log(this.pointScope())
    },
    methods:{
        activeDial(){
            // if()
            if(this.rotateAngle >=359){
                this.rotateAngle = 0
                this.qunHistory += 1
                this.controlTime += 5
            }else{
                this.rotateAngle += 5
            }
            console.log(this.target,this.rotateAngle)
            if(this.qunHistory > this.turnsNum && this.target <= this.rotateAngle){
                // console.log('aa')
                console.log(this.pointScope())
                clearTimeout(this.endTime)
            }else{
                this.endTime = setTimeout(this.activeDial,this.controlTime)
            }
            console.log(this.setRotate)
        },
        pointScope(){
            let rot = this.rotateAngle
            let index
            if((337.6 < rot && rot<360)||(rot>0 && rot<22.5)){
                index = 0
            }else if(rot>22.6&&rot<67.5){
                index = 1
            }else if(rot>67.6&&rot<112.5){
                index = 2
            }else if(rot>112.6&&rot<157.5){
                index = 3
            }else if(rot>157.6&&rot<202.5){
                index = 4
            }else if(rot>202.6&&rot<247.5){
                index = 5
            }else if(rot>246.6&&rot<292.5){
                index = 6
            }else if(rot>292.6&&rot<337.5){
                index = 7
            }
            return index
        },
        start(){//开始转动
            console.log('aaa')
            this.activeDial()
            
        }
    }
}
</script>

<style scoped lang="scss">
.flex-row{
    display: flex;
    flex-direction:row;
}
.flex-col{
    display: flex;
    flex-direction:column;
}
.flex-center{
    justify-content: center;
    align-items: center
}
.flex-row_cen{
    justify-content: center;
}
.flex-row_bw{
    justify-content: space-between
}
.flex-col_cen{
    align-items: center
}
.dial-wrap{
    position: relative;
    background-color: #FFB264;
    padding-bottom: 50px;
    .dial-bg{
        width: 100vw;
    }
    .con-wrap{
        position: absolute;
        top: 320px;
        width: 100vw;
        .point{
            position: absolute;
            left: 50%;
            margin-left: -112.5px;
            top: 301px;
            width: 225px;
            img{
                width: 100%;
            }
        }
        .con-list{
         width: 100vw;
        //  height: 500px;
         margin-top: 70px;
         position: relative;
         .con-item{
             width: 200px;
             &:nth-child(1){
                 position: absolute;
                 left: 50%;
                 top: 50px;
                 margin-left: -100px;
             }
              &:nth-child(2){
                 position: absolute;
                 left: 420px;
                 transform:rotate(48deg);
                 top: 110px;
             }
              &:nth-child(3){
                 position: absolute;
                 left: 480px;
                 top: 260px;
                 transform:rotate(90deg);
             }
              &:nth-child(4){
                 position: absolute;
                 left: 420px;
                 top: 410px;
                 transform:rotate(135deg);
             }
              &:nth-child(5){
                 position: absolute;
                 left: 50%;
                 top: 470px;
                 margin-left: -100px;
                 transform:rotate(180deg);
             }
              &:nth-child(6){
                 position: absolute;
                 left: 130px;
                 top: 410px;
                 transform:rotate(224deg);
             }
             &:nth-child(7){
                 position: absolute;
                 left: 65px;
                 top: 260px;
                 transform:rotate(269deg);
             }
              &:nth-child(8){
                 position: absolute;
                 left: 120px;
                 top: 110px;
                 transform:rotate(313deg);
             }
             .con-item_img{
                 width: 60%
             }
             .con-item_text{
                 font-size: 30px;
             }
         }
        }
    }
    .win-wrap{
         @extend .flex-col;
         @extend .flex-center;
         .win-title{
             width: 240px;
             height: 50px;
             line-height: 50px;
             color: #000;
             font-size: 30px;
             font-weight: bold;
             border-radius: 20px;
             background-image: url('../../static/img/win_title.png');
             background-repeat: no-repeat;
             background-size: 100% 100%;
             background-color: rgba(255, 217, 178, 1)
         }
         .win-list{
             width: 600px;
             background-color: rgba(255, 217, 178, 1);
             border-radius: 20px;
             margin-top: 20px;
             height: 700px;
             overflow: hidden;
             .win-list_box{
                 .win-list_item{
                     @extend .flex-row;
                     @extend .flex-row_bw;
                     @extend .flex-col_cen;
                     width: 100%;
                     padding: 20px;
                     box-sizing: border-box;
                 }
                 .item-left{
                     @extend .flex-row;
                     @extend .flex-row_bw;
                     @extend .flex-col_cen;
                     .item-avatar{
                         width: 80px;
                         height: 80px;
                         margin-right: 10px;
                     }
                     .item-left_right_phone{
                         margin-bottom: 10px;
                     }
                 }
             }
         }
    }
    .win-fer{
        margin-top: 20px;
        .win-list{
            padding: 30px;
        }
    }
}
</style>