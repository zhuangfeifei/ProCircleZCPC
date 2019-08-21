<template>
    <div id="Index">

      <Top :userinfor="userinfor"></Top>

      <nuxt-child></nuxt-child>

      <Bottom :userinfor="userinfor"></Bottom>

      <img v-if="isTop" id="moveUp" @click="top" src="~/static/images/move-up.png" alt="" srcset="">

    </div>
</template>

<script>
import Top from '~/components/top.vue'
import Bottom from '~/components/bottom.vue'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Storage from '~/store/storage'
export default {
  components: {
    Top,Bottom
  },
  data(){
    return{
      a:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJAuNSJZJicFdlibpltSzPicp6qftFriclpN6iaKk6N1dgNBu8zyQ2OUueMZ9ghqxAQYsHwiaKdd1B5zgOg/132',
      isTop: false,centerDialogVisible:false,
      userinfor:''
    }
  },
  computed:{
    ...mapState({
        getHomeList: state => state.getHomeList,
    })
  }, 
  created(){
    this.$store.dispatch('getHomeList')
    let list = {Code:this.$route.query.code, State:this.$route.query.state}
        // console.log(list)
        if(list.Code!=undefined){
            this.$store.dispatch('wxlogin', list)
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.$store.commit('isLoading', true)
                    this.userinfor = res.Data
                    this.$message({
                        message: '登录成功！',
                        type: 'success',
                        center: true,
                        offset: 50
                    });
                    this.$store.dispatch('setLocal', { data:0, name:'indexUrlActive'})
                    this.$store.commit('indexUrlActive')
                    this.$router.push({name: 'index'})
                    // this.getUsers()
                }else{
                    this.$store.commit('isLoading', false)
                    this.$message({
                        message: res.Message,
                        type: 'error',
                        center: true,
                        offset: 50
                    });
                }
            })
        }else{
            this.getUsers()
        }
  },
  mounted(){
    // console.log(this.userinfor)
      $(document).ready(()=>{
          $(window).scroll(()=>{
              // this.clear()
              if ($(window).scrollTop()>10){
                  this.isTop = true
                  this.$store.commit('isTop', false)
              }
              else{
                  this.isTop = false
                  this.$store.commit('isTop', true)
              }
          });
      })
  },
  methods:{
      top(){
          if ($('html').scrollTop()) {
              $('html').animate({ scrollTop: 0 }, 500);
              return false;
          }
          $('body').animate({ scrollTop: 0 }, 500);
          return false;  
      },
      close(){
          this.$store.commit('centerDialogVisible', true)
      },
      getUsers(){
            this.$store.dispatch('getcache', Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'')
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                   this.userinfor = res.Data
                }else{
                  if(res.Code === '5002'){
                    this.$message({
                        message: res.Message,
                        center: true,
                        offset: 50
                    });
                  }else{
                    this.$message({
                        message: res.Message,
                        type: 'error',
                        center: true,
                        offset: 50
                    });
                  }
                }
            })
        },
  },
}
</script>

<style lang="less">
#Index{
  width: 100%; height: 100%; font-size: 12px;font-family:PingFangSC-Regular;
  font-weight:400; padding-top: 179px;
  // background: #fff url(https://cdn2.jianshu.io/assets/web/gupao-43e5e6af6d2d1b2639ab8da6cdcdd1ed.png) no-repeat center center;
  // background-size: 100% 100%;
}

*{margin: 0; padding: 0; box-sizing: border-box;}


#moveUp{
    position: fixed; right: 40px; bottom: 60px;
}
#moveUp:hover{
    cursor:pointer;
    -webkit-transform:scale(1.2); -ms-transform:scale(1.2); transform:scale(1.2); 
}



// 分页
.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #FF5E1B!important;color: white!important;
}
.el-pagination.is-background .el-pager li:not(.disabled):hover{
  color: #FF5E1B; cursor: pointer;
}
#community .el-pagination.is-background .btn-prev,#community .el-pagination.is-background .btn-next,#community .el-pagination.is-background .el-pager li{
  background-color: white;
}

// 折叠面板
.el-collapse{
  border: 0; border-radius: 10px;
}
.el-collapse-item__header{
  height: 100%; line-height: 20px; border: 0; box-shadow:0px 6px 12px 0px rgba(0,0,0,0.05); border-radius: 10px;
   position: relative; z-index: 10;
}
.el-collapse-item__content{
  line-height: 20px; padding-bottom: 0; border: 0; border-radius: 10px; 
}
.el-collapse-item__wrap{
  position: relative; top: 0px; z-index: 1; border-bottom-left-radius: 10px;  border-bottom-right-radius: 10px;
}
.el-collapse-item__header .el-icon-arrow-right:before{
  content: ''
}

// 回复
.communityCommentsList_input{
    width: 431px; height: 30px; background-color: #F4F4F4; border-radius: 15px;
    margin-left: 10px; position: relative; float: left; margin: 10px 0;
    .communityCommentsList_input_{
        width: 100%; height: 100%; border: 0; background: none; outline: none;
        padding-left: 44px;
    }
    .communityCommentsList_input_xiu{width: 15px; height: 17px; position: absolute; left: 14px; top: 7px;}
}
.communityCommentsList_input_huifu{
  color: #FC6619; font-size: 14px; margin-left: 28px; float: left; margin-top: 14px; cursor: pointer;
}
.communityCommentsList_input_huifu_btn{cursor: pointer;}



// 弹窗
.el-dialog,.el-dialog--center{
  border-radius: 10px;
}
.el-dialog--center .el-dialog__body{
  padding-top: 0;
}
.el-divider__text{
  color: #939393; font-size: 14px;
}


#my .el-dialog--center .el-dialog__body{
  padding: 0;
}




// 视频封面
.prism-player .prism-cover{
    background-size: 100% 100%!important; border-radius: 10px!important;
}


// loading
.el-loading-spinner .el-loading-text,.el-loading-spinner i{
   color: #FF5E1B!important;
}
.el-loading-mask,.is-fullscreen{
   width: 500px!important; margin: 0 auto; 
}


// 滑块
.el-slider__button{
  height: 30px!important; width: 40px!important; border-radius: 0!important; border: 0; background: none;
  // background: url('../static/images/right.png') no-repeat; background-size: 100% 100%; 
  // position: relative; left: -10px;
}
.el-slider__bar{
  background: none;
  // height: 30px; 
  // background: none;border-top-left-radius: 0px;border-bottom-left-radius: 0px; top: -16px;
}



::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性

background:none; cursor: pointer;

}

::-webkit-scrollbar {//滚动条的宽度

width:5px;

height:5px;

}

::-webkit-scrollbar-thumb {//滚动条的设置

background-color:#383838;

background-clip:padding-box;

min-height:28px;
border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  
// background-color:#bbb;border-radius: 10px;

}

</style>
