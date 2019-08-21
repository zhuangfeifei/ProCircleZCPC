<template>
    <div id="offlineActivities">
        <div class="swiper">
            <el-carousel height="300px">
                <el-carousel-item v-for="(item,index) in bannerInfo" :key="index">
                    <div class="swiper_imgs">
                        <img :src="item.ImageUrl" alt="" srcset="">
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>


        <div class="courseClass">
            <div class="courseClassLeft">
                <div class="courseClassTab">
                    <div class="titleList">
                        <div @click="handleSelect(-1)"><span :class="{activeClass: tabIndex==-1 }">全部</span><section></section></div>
                        <div v-for="(item,index) in activityCategory" :key="index" @click="handleSelect(index)">
                            <span :class="{activeClass: index==tabIndex}">{{item.CategoryName}}</span>
                            <section v-if="index < activityCategory.length - 1"></section>
                        </div>
                    </div>
                    <!-- <div class="titleList Amount">
                        <div v-for="(item,index) in tabTitleAmount" :key="index" @click="handleSelect(index)">
                            <span :class="{activeClass: index==tabIndex}">{{item.title}}</span>
                            <section v-if="index == 1"></section>
                        </div>
                    </div> -->
                </div>
                <div class="offlineActivitiesMain">
                    <div class="offlineActivitiesList" @click="details(item.Id)" v-for="(item,index) in activityList.Data" :key="index">
                        <section><img :src="item.SmallImageUrl" alt="" srcset=""></section>
                        <div class="lecturer">
                            <h4>{{item.Title}}</h4>
                            <span><i class="el-icon-user-solid"></i>{{item.ApplyCount}}</span>
                        </div>
                        <h5>{{item.Address}}</h5>
                        <h5>{{item.ToTime}}</h5>
                        <div class="offlineActivitiesListAmount">
                            <div>
                                <div v-if="item.SalePrice > 0"><img src="~/static/images/chuangbi.png" alt="" srcset=""><span>{{item.SalePrice/100}}</span></div>
                                <div v-else><img class="free" src="~/static/images/free.png" alt="" srcset=""></div>
                            </div>
                            <div class="toUp" :class="{isBuyBtn:!item.IsCanBook || item.IsBook}">
                                {{item.IsExpired?'结束': item.IsBook ? '已报名' : item.SalePrice>0?'报名' :'免费'}}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="paging">
                    <el-pagination :background="true" layout="prev, pager, next" :total="activityList.TotalCount/6*10"
                        @current-change="changeCurrent">
                    </el-pagination>
                </div>
            </div>
            
        </div>

    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Storage from '~/store/storage'
export default {
    data(){
        return{
            count: 15, classIndex:0, value1: '',
            tabTitle:[
                {title:'全部'},
                {title:'联合办公'},
                {title:'互动公开课'},
                {title:'大咖私董会'},
                {title:'游学寻梦'},
                {title:'企业咨询'},
            ], 
            tabTitleAmount:[
                {title:'推荐'},
                {title:'最新'},
            ], 
            tabIndex: -1,
            classTab:[
                {name:'全部'},{name:'企业管理'},{name:'电商运营'},{name:'供应链'},
                {name:'知识产权'},{name:'支付/资金/财税'},{name:'营销推广'}
            ],
            onlineCoursesIndex: 0,
            a:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJAuNSJZJicFdlibpltSzPicp6qftFriclpN6iaKk6N1dgNBu8zyQ2OUueMZ9ghqxAQYsHwiaKdd1B5zgOg/132',
            activityCategory:[],
            activityList:[],
            list:{ CategoryId:'', TeacherId:'', SearchActivityName:'', PageSize: 6, PageIndex: 1},
            bannerInfo:''
        }
    },
    computed:{
        ...mapState({
            
        }),
        noMore () {
            return this.count >= 20
        },
        disabled () {
            return this.loading || this.noMore
        }
    }, 
    created(){
        this.$store.dispatch('bannerInfo',encodeURI('PC线下活动滚动栏'))
        .then(res=>{
            // console.log(res)
            if(res.IsSuccess){
                this.bannerInfo = res.Data
            }
        })
        this.$store.dispatch('activityCategory',{token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'',})
        .then(res=>{
            // console.log(res)
            if(res.IsSuccess){
                this.activityCategory = res.Data.List
            }
        })
        this.activityListMehod()
    },
    methods: {
        handleSelect(index) {
            this.tabIndex = index
            this.list.CategoryId = index == -1 ? '' : this.activityCategory[index].CategoryId
            this.list.PageIndex = 1
            this.activityListMehod()
        },
        changeClass(index){
            this.onlineCoursesIndex = index
        },
        details(id){
            this.$router.push({name: 'index-eventDetails', query:{activityId: id}})
        },
        activityListMehod(){
            this.list.token = Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:''
            this.$store.dispatch('activityList', this.list)
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.activityList = res
                }
            })
        },
        changeCurrent(index){
            this.list.PageIndex = index
            this.activityListMehod()
            if ($('html').scrollTop()) {
                $('html').animate({ scrollTop: 350 }, 0);
                return false;
            }
            $('body').animate({ scrollTop: 350 }, 0);
        }
    }
}
</script>
<style lang="less" scoped>
#offlineActivities{
    width: 100%; height: 100%; box-sizing: border-box; background-color: #F7F7F7; padding-top: 30px;
}

.swiper{
  width: 1200px; height: 300px; margin: 0 auto; position: relative; border-radius: 10px; cursor: pointer;
  .swiper_imgs{width: 100%; height: 100%; border-radius: 10px;
        img{width: 100%; height: 100%; border-radius: 10px;}
    // background: #fff url(https://cdn2.jianshu.io/assets/web/gupao-43e5e6af6d2d1b2639ab8da6cdcdd1ed.png) no-repeat center center;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item,.el-carousel{
    border-radius: 10px;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}

.cascader{
    width: 600px; position: absolute; top: 0; left: 0; z-index: 10; background-color: white;
}




.courseClass{
    width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; padding-bottom: 30px; margin-top: 30px;
    .courseClassLeft{
        width: 100%; height: 946px; border-radius: 10px; background-color: #FFFFFF; padding: 30px;
        position: relative;
        .courseClassTab{
            width: 100%; display: flex; justify-content: space-between;
        }
        .titleList{
            height: 30px; display: flex; font-size: 18px;font-family:PingFangSC-Regular;font-weight:400;
            align-items: center; color: #515356;
            .activeClass{ color: #FF5E1B; }
            div{
                cursor: pointer; margin-right: 19px;
                section{
                    width: 2px; height: 16px; background-color: #EEEEEE; float: right; margin-top: 5px; margin-left: 19px;
                }
            }
        }
        .Amount{
            div{
                margin-left: 19px; margin-right: 0; text-align: right;
                section{float: left;}
            }
        }
        // 线下活动
        .offlineActivitiesMain{
            width: 100%; display: flex; flex-wrap: wrap; margin: 0 auto;
            .offlineActivitiesList{
                width: 320px; height: 362px; margin-top: 20px; margin-right: 90px; cursor: pointer;
                section{
                    width: 100%; height: 200px; background-color: #E3E3E3; 
                    img{width: 100%; height: 100%; border-radius: 5px;}
                }
                section:hover{box-shadow:0px 0px 10px 0px rgba(0,0,0,0.2);}
                .lecturer{
                    width: 100%; margin-top: 17px; color: #939393; font-size: 10px; margin-bottom: 10px;
                    display: flex; justify-content: space-between; align-items: center;               
                    h4{color: #515356;}
                }
                h5{color: #B1B1B1; margin-top: 3px;}
                .offlineActivitiesListAmount{
                    width: 100%; margin-top: 9px; color: #FF0000; border-top: 1px solid #E8E8E8; font-size: 16px;
                    display: flex; justify-content: space-between; align-items: center; justify-content: flex-end; padding-top: 13px;
                    div:nth-child(1){
                        div{
                            display: flex; align-items: center;
                            img{width: 20px; height: 22px; margin-right: 5px;}
                            .free{width: 61px; height: 15px;}
                        }
                    }
                    .toUp{
                        width: 120px; height: 24px; background-color: #FC6619; border-radius: 19px;
                        color: #FFFFFF; font-family:PingFangSC-Semibold; font-weight:600;
                        text-align: center; line-height: 24px; margin-left: 14px; font-size: 12px;
                    }
                    .isBuyBtn{background-color: #939393;}
                }
            }
            .offlineActivitiesList:nth-child(3n){
                margin-right: 0;
            }
        }
        
        .paging{
            width: 100%; display: flex; justify-content: center; position: absolute; bottom: 60px; left: 0;
        }
    }


    
}


</style>


