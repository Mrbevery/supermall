<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" 
        class="tab-control-item" 
        :class="{active:index == isActive}"
        @click="itnClick(index)">
      <span>{{item}}</span>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data(){
    return {
      isActive:0
    }
  },
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods: {
    itnClick(index){
      this.isActive = index
      this.$emit('tabClick',index)
    }
  },
  components: {
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    line-height: 40px;
    font-size: 15px;
    background-color: #fff;
    z-index: 9;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>