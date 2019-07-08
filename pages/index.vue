<template>
    <div id="Index">

      <Top></Top>

      <nuxt-child></nuxt-child>


      <div class="footer"></div>

    </div>
</template>

<script>
import Top from '~/components/top.vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
export default {
  components: {
    Top
  },
  data(){
    return{

    }
  },
  computed:{
    ...mapState({
        getHomeList: state => state.getHomeList,
    })
  }, 
  created(){
    // this.$store.dispatch('getHomeList')
  },
  methods:{
    
  },
}
</script>

<style lang="less" scoped>
#Index{
  width: 100%; height: 100%;
  // background: #fff url(https://cdn2.jianshu.io/assets/web/gupao-43e5e6af6d2d1b2639ab8da6cdcdd1ed.png) no-repeat center center;
  // background-size: 100% 100%;
}






.footer{
  width: 100%; height: 100px;
}





.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
