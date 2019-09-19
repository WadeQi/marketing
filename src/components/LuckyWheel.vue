<template>
  <div class="lucky-wrap">
    <img class="luck-bg" src="../../static/img/bg_lucky.png" alt />
    <div class="con-wrap">
      <div class="con-title">你还有{{lottery}}次机会</div>
      <ul class="con-list" :style="conListsBg">
        <li
          :class="[index === isCheck?'itemMask':'','item']"
          v-for="(item,index) in list"
          @click="start(index)"
        >
          <img v-if="index !== 4" class="item-icon" :src="item.img" alt />
          <p v-if="index !== 4" class="item-text">{{item.text}}</p>
        </li>
      </ul>
    </div>
     <div class="rule-wrap">
         <div class="rule-title">
             活动规则
         </div>
         <div class="rule-list">
             <p class="rule-item">暂无活动规则</p>
             <p class="rule-item">*所有奖品和活动均与苹果公司无关</p>
         </div>
      </div>
    <div class="pop-msg" v-if="isPop">
      <div class="pop-conter">
        <div class="pop-bg">
          <img class="pop-icon" :src="popObj.img" alt />
        </div>
        <p class="pop-text">{{popObj.text}}</p>
        <div class="pop-btn" @click="clearPop">朕知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
import base64 from './baseUrl'
export default {
  name: "LuckyWheel",
  data() {
    return {
      conListsBg:'',
      popObj:{
          img:'',
          text:''
      },
      lottery:2,
      isPop: false,
      isCheck: -1,
      controlIdx: 0, //控制arr数组转动顺序&&最后停止索引
      speed: 100, //速度
      slowest:2000,//最慢速度
      times: 0, //已转动次数
      prize: parseInt(Math.random()*8), //中奖位置索引
      cycle: 20, //转动多少次
      arr: [0, 1, 2, 5, 8, 7, 6, 3],
      list: [
        { img: "../../static/img/item_smile.png", text: "一等奖" },
        { img: "../../static/img/item_smile.png", text: "二等奖" },
        { img: "../../static/img/item_smile.png", text: "三等奖" },
        { img: "../../static/img/item_smile.png", text: "四等奖" },
        { },
        { img: "../../static/img/item_smile.png", text: "五等奖" },
        { img: "../../static/img/item_smile.png", text: "六等奖" },
        { img: "../../static/img/item_smile.png", text: "七等奖" },
        { img: "../../static/img/item_smile.png", text: "八等奖" }
      ]
    };
  },
  mounted() {
      console.log(base64)
  },
  methods: {
    action() {
      this.times += 1;
      this.cwActive(); //顺时针方向转动
      let prize = this.prize === 4?0:this.prize
      if (this.times > this.cycle && this.isCheck === prize) {
        //如果已转动次数大于设定转动次数&&当前位置等于设定位置停止动画
        this.speed = 100;
        setTimeout(()=>{
            this.isPop = true
        },this.speed)
        let { img ,text } = this.list[this.arr[this.controlIdx-1]]
          this.popObj = {//弹窗信息
              img:img,
              text:text
          }
        window.clearTimeout(this.endTime);
      } else {
        this.endTime = setTimeout(this.action, this.speed);
      }
    },
    cwActive() {
      if (this.controlIdx === 8) {//表示一圈结束controlIdx恢复0
            this.controlIdx = 0;
        if(this.speed !== this.slowest){//达到最高速度不执行
            this.speed += 100;//速度变慢   
        }
      }
      this.isCheck = this.arr[this.controlIdx];
      this.controlIdx += 1;
    },
    start(index) {
      if (index !== 4) {
        return;
      }
      if(this.conListsBg){
          return
      }
      console.log(this.prize)
      if(this.lottery == 0){//抽奖次数已用完
          this.isPop = true
          this.popObj = {
              img:base64.zanwu,
              text:'抱歉您没有抽奖机会了'
          }
          return
      }
      this.conListsBg = 'background-color:rgba(0,0,0,0.5)'
      this.lottery -=1
      this.times = 0
      this.speed = 100
      this.action();
    },
    clearPop(){//关闭弹窗
     this.isPop = false
     this.isCheck = -1
     this.conListsBg=''
    }
  }
};
</script>

<style scoped lang="scss">
.lucky-wrap {
  position: relative;
  .luck-bg {
    display: block;
    width: 100vw;
    height: auto;
  }
  .con-wrap {
    position: absolute;
    width: 100vw;
    top: 350px;
    .con-title {
      color: #fff;
      font-size: 30px;
    }
    .con-list {
      margin: auto;
      margin-top: 83px;
      width: 589px;
      height: 455px;
      padding-left: 10px;
      padding-top: 7px;
      &:after {
        clear: both;
        content: ".";
        display: block;
        width: 0;
        height: 0;
        visibility: hidden;
      }
      .item {
        width: 32%;
        height: 32%;
        //  background-color: #ffffff;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        float: left;
        margin-right: 7px;
        margin-bottom: 9px;
        .item-icon {
          max-width: 80%;
          max-height: 80%;
          width: 60%;
          width: 60%;
        }
        .item-text {
          margin-top: 10px;
        }
      }
      .itemMask {
        z-index: 5;
        -webkit-box-shadow: 0 0 1.06666667rem 0.26666667rem #ffe531 inset;
        box-shadow: 0 0 1.06666667rem 0.26666667rem #ffe531 inset;
        background: #fff;
        border-radius: 0.10666667rem;
      }
    }
  }
  .rule-wrap{
        // height: 500px;
        background-color: rgb(102, 14, 136);
        color: #fff;
        padding-bottom: 40px;
        .rule-title{
            font-size: 35px;
            font-weight: bold;
        }
        .rule-list{
           width: 90%;
           margin: auto;
           font-size: 26px;
           text-align: justify !important;
           line-height: 40px;
           margin-top: 20px;
           .rule-item{
               margin-top: 10px;
           }
        }
    }
  .pop-msg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    .pop-conter {
      width: 550px;
      height: 650px;
      border-radius: 10px;
      background-color: #fff;
      position: relative;
      .pop-bg {
        background-image: url("../../static/img/pop_bg.png");
        background-repeat: no-repeat;
        background-size: 100%;
        border-radius: 10px 10px 0 0;
        width: 100%;
        height: 300px;
        display: flex;
        justify-content: center;
        align-items: center;
        .pop-icon {
          width: 60%;
        }
      }
      .pop-text {
        height: 240px;
        line-height: 240px;
        font-size: 35px;
        font-weight: bold;
      }
      .pop-btn {
        width: 500px;
        height: 80px;
        border-radius: 10px;
        margin: auto;
        background: #ff8b03;
        color: #fff;
        line-height: 80px;
        font-size: 30px;
        font-weight: bold;
      }
    }
  }
}
</style>