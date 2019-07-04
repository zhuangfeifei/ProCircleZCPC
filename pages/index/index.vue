<template>
    <div id="home">

        <div class="swiper">
            <el-carousel height="500px">
                <el-carousel-item v-for="(item,index) in getHomeList.BannerList" :key="index">
                    <!-- <img class="swiperImg" :src="item.ImageUrl" alt="" srcset=""> -->
                    <div class="swiper_imgs"></div>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="main">
            <div class="zc indexService">
                <i class="el-icon-d-arrow-right"></i>
                <h3>箴创企业服务</h3>
                <p>赋能跨境电商企业，多人学习，共同提升</p>
            </div>
            <div class="indexServiceList">
                <div v-for="(item,index) in getHomeList.FreeCollegeList" :key="index">
                    <img class="indexServiceList_img" :src="item.SmallImageUrl" alt="" srcset="">
                </div>
            </div>
            <div class="zc indexExcellent">
                <i class="el-icon-d-arrow-right"></i>
                <h3>精品课程</h3>
                <div>
                    <p>查看更多</p>
                    <i class="el-icon-d-arrow-right"></i>
                </div>
            </div>
            <div class="indexServiceList">
                <div v-for="(item,index) in getHomeList.ExcellentCollegeList" :key="index">
                    <img class="indexServiceList_img" :src="item.SmallImageUrl" alt="" srcset="">
                </div>
            </div>
            <div class="zc indexService">
                <i class="el-icon-d-arrow-right"></i>
                <h3>讲师风采</h3>
                <p></p>
            </div>
            <div class="indexlecturerList">
                <div v-for="(item,index) in getHomeList.TeacherInfoList" :key="index">
                    <img class="indexServiceList_img" :src="item.LogoUrl" alt="" srcset="">
                </div>
            </div>
        </div>

    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
export default {
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
        this.$store.dispatch('getHomeList')
    },
    methods:{
        
    },
}
</script>
<style lang="less" scoped>
#home{
    width: 100%;
}



.swiper{
  width: calc(100% - 500px); min-width: 1111px; margin: 0 auto;
  .swiper_imgs{width: 100%; height: 100%;
    background: #fff url(https://cdn2.jianshu.io/assets/web/gupao-43e5e6af6d2d1b2639ab8da6cdcdd1ed.png) no-repeat center center;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}



.main{
  width: calc(100% - 500px); min-width: 1111px; margin: 0px auto;
}
.zc{
  width: 100%; height: 50px; margin: 0 auto; display: flex; align-items: center; margin-top: 20px; position: relative;
}
.indexServiceList{
  width: 100%; height: 200px; display: flex; flex-wrap: wrap;
  div{width: 350px; height: 100%; background-color: #99a9bf; margin-right: 30px;}
  div:nth-child(3n){margin: 0}
}
.indexServiceList_img{
  width: 100%; height: 100%;
}
.indexlecturerList{
  width: 100%; height: 250px; display: flex; flex-wrap: wrap;
  div{width: 232.75px; height: 100%; background-color: #99a9bf; margin-right: 60px;}
  div:nth-child(4n){margin-right: 0;}
}
.indexExcellent{
  div{position: absolute; right: 0; display: flex; align-items: center;}
}
</style>

