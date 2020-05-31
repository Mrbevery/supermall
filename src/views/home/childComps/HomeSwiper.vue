<template>
<div>
  <swiper>
    <swiper-item v-for="item in banners">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperLoadImg">
      </a>
    </swiper-item>
  </swiper>
</div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper'

  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        isImgLoad:false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      swiperLoadImg(){
        if(!this.isImgLoad){
          this.$emit('imgLoad')
        }
        this.isImgLoad = true
      }
    }
  }
</script>

<style scoped>

</style>
