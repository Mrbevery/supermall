<template>
  <div class="Detail">
    <detail-nav-bar class="DetailNav"></detail-nav-bar>
    <Scroll class="content" ref="scroll">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailImagesInfo :imagesInfo="imagesInfo" @imgLoad="imgLoad"></DetailImagesInfo>
      <DetailParamInfo :paramInfo="pramsInfo"></DetailParamInfo>
    </Scroll>
    <DetailBottomBar></DetailBottomBar>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import {getDetail,Goods,Shop,GoodsParams} from 'network/Detail'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import Scroll from 'components/common/scroll/Scroll'
import DetailImagesInfo from './childComps/DetailImagesInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

export default {
  name: 'Detail',
  data() { 
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      imagesInfo:{},
      pramsInfo:{}
    }
  },
  created(){
    this.iid = this.$route.params.iid
    getDetail(this.iid).then(res => {
      const data = res.result
      //1.获取头部图片
      this.topImages = data.itemInfo.topImages
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      //3.创建店铺信息
      this.shop = new Shop(data.shopInfo)
      //4.获取商品详情
      this.imagesInfo = data.detailInfo
      //5.获取参数信息
      this.pramsInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)
    })
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailImagesInfo,
    DetailParamInfo,
    DetailBottomBar
  },
  methods: {
    imgLoad(){
      this.$refs.scroll.refresh()
    }
  }
 }
</script>

<style scoped>
  .Detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .DetailNav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px);
  }
</style>