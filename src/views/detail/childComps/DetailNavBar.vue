<template>
  <div class="DatailNavBar">
    <NavBar>
      <div slot="left" class="back" @click="itemBack">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="title">
        <div v-for="(item,index) in titles" 
              class="title-item"
              :class="{active:index===currentIndex}"
              @click="itemClick(index)">{{item}}</div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'DatailNavBar',
  data() { 
    return {
      titles:['商品','参数','评论','推荐'],
      currentIndex:0
    }
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index){
      this.currentIndex = index
    },
    itemBack(){
      this.$router.back();
    }
  }
 }
</script>

<style scoped>
  .title{
    display: flex;
  }
  .title-item{
    flex: 1;
    font-size: 14px;
  }
  .active{
    color: red;
  }
  .back img{
    margin-top: 10px;
  }
</style>