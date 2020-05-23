<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll class="content">
      <home-swiper :banners="banners" />
      <home-recommend :recommends="recommends" />
      <feature-view/>
      <tab-control class="tab-control" 
                  :titles="['流行','新款','精选']"
                  @tabClick="tabClick" />
      <goodsList :goods="goods[crrentType].list" />
    </scroll>
    
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import {getHomeMultidata , getHomeGoodsdata} from 'network/home'
  import HomeSwiper from './childComps/HomeSwiper'
  import HomeRecommend from './childComps/HomeRecommend'
  import FeatureView from './childComps/FeatureView'
  import TabControl from 'components/content/tabcontrol/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  
  export default {
    name:'Home',
    components: {
      NavBar,
      HomeSwiper,
      HomeRecommend,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll
    },
    data (){
      return {
        banners:[],
        recommends:[],
        goods:{
          'pop':{ page:0, list:[] },
          'new':{ page:0, list:[] },
          'sell':{ page:0, list:[] },
        },
        crrentType:'pop'
      }
    },
    created() {
      this.getHomeMultidata();

      this.getHomeGoodsdata('pop');
      this.getHomeGoodsdata('new');
      this.getHomeGoodsdata('sell');
    },
    methods:{
      /**
       * 网络请求
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
      },
      getHomeGoodsdata(type){
        const page = this.goods[type].page + 1
        getHomeGoodsdata(type,page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page = page
        })
      },
      /**
       * 事件监听
       */
      tabClick(index){
        switch(index) {
          default:
            this.crrentType = 'pop'
            break;
          case 1:
            this.crrentType = 'new'
            break;
          case 2:
            this.crrentType = 'sell'
            break;
        }
      }
    }
  }
</script>

<style>
  .tab-control {
    position: sticky;
    top:44px;
  }

  #home {
    padding-top: 44px;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 9;
  }

  .content {
    height: 300px;
  }

</style>