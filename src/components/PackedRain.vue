<template>
  <div class="hello">
    <canvas id="canvas" :width="wid" :height="hei" @click="canvasHandle"></canvas>
    <div class="numbers">
      <div class="total">金币:{{total}}</div>
      <div class="packPrice" v-show="showPrice">+{{packPrice}}</div>
    </div>
    <div class="start" v-if="startStatus">
          <div @click="start()" v-if="endtime>0">开始</div>
          <div v-else>总金额：{{total}}</div>
      </div>
      <div class="endtime">倒计时:{{endtime}}</div>
  </div>
</template>

<script>
let img = new Image();
img.src = "../../static/img/redpacket2.png";
export default {
  name: "PackedRain",
  data() {
    return {
      showPrice:false,//单个红包金额显隐
      startStatus:true,
      endtime:15,
      wid: 320,
      hei: 568,
      packedArr: [
      ],
      density:{//密度
        max:3,
        min:1
      },
      speed: 3,//下落速度
      total:0,
      packPrice:-1
    };
  },
  /** @type {HTMLCanvasElement} */

  created() {},
  mounted() {
    this.wid = window.innerWidth;
    this.hei = window.innerHeight
    this.initCanvas();
  },
  methods: {
    getPixelRatio(context) {
        let backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    },

    canvasHandle(event){//点击canvas
      // console.log(event)
      this.showPrice = true
       this.packPrice = -1
      //  点击xy轴
      let x = event.clientX
      let y = event.clientY
      let arr = []
      this.packedArr.forEach((item,index)=>{
        // console.log(item)
        let leftX = x - item.x
        let topY = y - item.y
        // console.log(leftX,topY)
        if(leftX>=0 && leftX <= 50*this.ratio && topY>=0 && topY<=50*this.ratio){
          //轴向m = x || y: (点击m-元素m >=0 & 点击m-元素m <= 元素宽高) = 当前元素
          // console.log(item)
          this.total += item.price
          this.packPrice = item.price//红包显示
          setTimeout(()=>{//隐藏动画
             this.showPrice = false
          },700)
          arr.push(index)
        }
      })
      // 红包重叠删除最后一个
      if(arr.length > 0){
        this.packedArr.splice(arr[0],1)
      }
    },
    initCanvas() {//初始化canvas
      const canvas = document.getElementById("canvas");
      // console.log(canvas);
      if (canvas.getContext) {
        this.ctx = canvas.getContext("2d");
        this.ratio = this.getPixelRatio(this.ctx);
      }
    },
    drawPacked() {//绘制红包
      let that = this;
      // console.log(this.packedArr)
      this.packedArr.forEach((item, index) => {
           const newPacked = {
              x: item.x,
              y: item.y + that.speed,
              img: img,
              price:item.price
        };
        this.packedArr.splice(index, 1, newPacked);
        // console.log(img)
        this.ctx.drawImage(img, item.x, item.y, 50*this.ratio, 50*this.ratio);
      });
    },
    movePacked() {//执行动画帧
      this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      let arr = this.packedArr.filter((item,index)=>{//删除已超出窗口空包
        return item.y <= window.innerHeight
      })
      this.packedArr = arr
      // console.log(arr)
      this.drawPacked();
      window.requestAnimationFrame(this.movePacked);
    },
    pushPackArr() {//创建红包数据
      //随机数量，一次掉了多少个
      const random = Math.floor(Math.random() * (this.density.max - this.density.min) + this.density.min);
      let arr = []
      // console.log(random)
      for (let i = 0; i < random; i++) {
        const newPack = {
          x: Math.random() * (window.innerWidth - 50*this.ratio), 
          y: -100*this.ratio - Math.random()*(50*this.ratio), //避免过多重叠
          img: img, 
          price: parseInt(Math.random() * (10))//随机金额
        };
        arr.push(newPack);
        // console.log(arr)
      }
        this.packedArr = [...this.packedArr, ...arr]
      this.time = setTimeout(() => {//间断插入红包数据
          this.endtime -- 
          this.pushPackArr();
          // console.log(this.speed)
          if(this.endtime < 1){
            window.clearTimeout(this.time)
            this.startStatus = true
          }
        }, 1000);
    },
    start() {//执行动画
      this.startStatus = false //隐藏开始结束遮罩层
      this.pushPackArr();//红包数据插入
      this.movePacked();//执行动画祯绘制红包图片
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#canvas{
  background-color: #000;
  display: block
}
.start{
        z-index: 20;
        position: fixed;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: #FFD700;
        display: flex;
        justify-content: center;
        align-items: center;
        div{
            border: 1px solid #000;
            padding: 20px 15px;
            font-size: 40px;
        }
    }
.endtime{
        position: fixed;
        right: 0px;
        top:50px;
        background-color: #FFD700;
        // width: 100px;
        font-size: 30px;
        line-height: 60px;
        // height: 60px;
        padding: 10px 20px;
        border-radius: 50px 0 0 50px;
        z-index: 10
    }
.numbers{
  position: fixed;
  left: 50px;
  top:50px;
  font-size: 30px;
  // background-color: #fff;
  display: flex;
  align-items: center;
  height: 60px;
  .total{
    color: #fff;
  }
  .packPrice{
    position: relative;
    margin-left: 20px;
    font-size: 35px;
    // animation: hidden 0.7s;
    color: #FFD700;
  }
}
.v-enter,.v-leave-to{
            opacity: 0; //透明度,0代表完全透明,1完全不透明
        }
        .v-enter-active,.v-leave-active{
            transition: all 0.5s ease;  
        }
</style>
