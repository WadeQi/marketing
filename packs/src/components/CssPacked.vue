<template>
  <div class="pack-wrap">
      <ul>
          <li :style="{left:item.left}" v-for="(item,index) in packs" @click="removePack($event,item)">
              <img :src="item.img" alt="">
          </li>
      </ul>
      <div class="numbers">
        <div class="total">金币:{{total}}</div>
        <div class="packPrice" v-show="packPrice !== -1">+{{packPrice}}</div>
      </div>
      <div class="start" v-if="startStatus">
          <div @click="start()" v-if="endtime>0">开始</div>
          <div v-else>总金额：{{total}}</div>
      </div>
      <div class="endtime">倒计时:{{endtime}}</div>
  </div>
</template>

<script>
export default {
    name:'CssPacked',
    data(){
        return {
            startStatus:true,
            endtime:15,
            packs:[
                {price:1},
            ],
             density:{//密度
                max:3,
                min:1
            },
            total:0,
            packPrice:-1
        }
    },
    mounted(){
        // this.start()
    },
    methods:{
        pushPacks(){
            let random = Math.floor(Math.random() * (this.density.max - this.density.min) + this.density.min);
            let arr = []
            // console.log(parseInt(Math.random() * (window.innerWidth - 200)+0))
              for (let i = 0; i < random; i++) {
                // console.log('aa')
                 const newPack = {
                    img:'../../static/img/redpacket2.png',
                    price:parseInt(Math.random()*(10-1)+1),
                    left:parseInt(Math.random() * (window.innerWidth - 200)+0) + 'px'
                }
                arr.push(newPack)
             }
            //  console.log(arr)
                this.packs = [...this.packs,...arr]
             this.time = setTimeout(()=>{
                    this.endtime --
                    this.pushPacks()
                    console.log(this.endtime)
                    if(this.endtime < 1){
                        window.clearTimeout(this.time)
                        // this.endtime = 10
                        this.startStatus = true
                    }
                },1000)
        },
        removePack(e,item){
            console.log(e,item)
            this.packPrice = -1
            this.total += item.price
            this.packPrice = item.price
            setTimeout(()=>{
                this.packPrice = -1
            },700)
            let target = e.currentTarget;
            document.querySelector('ul').removeChild(target)
        },
        start(){
            this.startStatus = false
            this.pushPacks()
        }
    }
}
</script>

<style lang="scss">
.pack-wrap{
    width: 100vw;
    height: 100vh;
    background-color: #000;
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
    ul{
        width: 100%;
        height: 100%;
        position: relative;
        overflow: hidden;
        li{
            position: absolute;
            animation: all 3s linear;
            display: inline-block;
            img{
                width: 200px;
                height: auto;
                animation: line 5s linear 1 forwards;
            }
        }
    }
}
@keyframes line {
    0%{
        transform: translateY(-200px);
    }
    100%{
         transform: translateY(120vh);
    }
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
    animation: hidden 0.7s;
    color: #FFD700;
  }
}
@keyframes hidden {
  0%{
    opacity: 1
  }
  100%{
    opacity: 0;
  }
}
</style>