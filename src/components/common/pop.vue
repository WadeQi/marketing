<template>
    <div class="pop-msg" v-if="isShow">
      <div class="pop-conter">
        <div class="pop-bg">
          <img class="pop-icon" :src="popObj.img" alt />
        </div>
        <p class="pop-text">{{popObj.text}}</p>
        <div class="pop-btn" @click="clearPop">朕知道了</div>
      </div>
    </div>
</template>

<script>
export default {
    name:'pop',
    data(){
        return {
            isShow:this.isPop
        }
    },
    watch:{
        isPop:{
            handler:function(val){
                console.log('aa')
                this.isShow = val
            } 
        }
    },
    props:['popObj','isPop'],
    created(){
        console.log(this.isShow)
    },
    methods:{
        clearPop(){
            // this.isShow = false
              this.$emit('clearPop',false)
        }
    }
}
</script>

<style scoped lang="scss">
.pop-msg {
    position: fixed;
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
        background-image: url("../../../static/img/pop_bg.png");
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
</style>