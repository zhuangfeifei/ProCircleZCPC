<template>
    <div id="home">

        <div class="swiper">
            <!-- <img @click="$router.push({name:'index-playback', query:{id:37}})" src="~/static/images/banner.jpg" alt="" srcset=""> -->
            <el-carousel height="300px" :loop="true" autoplay>
                <el-carousel-item v-for="(item,index) in getHomeList.BannerList" :key="index">
                    <img class="swiper_img" @click="bannerDetails(index)" :src="item.ImageUrl" alt="" srcset="">
                    <!-- <img class="swiper_img" @click="bannerDetails(index)" :src="item.ImageUrl" alt="" srcset=""> -->
                </el-carousel-item>
            </el-carousel>
        </div>
        
        <!-- 免费课程 -->
        <div class="freeClasses">
            <div class="freeClassesName" @click="More('index-onlineCourses', 1)">
                <h1>免费课程</h1><span>查看更多</span>
            </div>
            <div class="freeClassesMain">
                <div class="freeClassesList" @click="details(index)" v-for="(item,index) in getHomeList.FreeCollegeList" :key="index">
                    <section><img :src="item.SmallImageUrl" alt="" srcset=""></section>
                    <div class="h4">{{item.Title}}</div>
                    <div class="h5">{{item.CategoryIdrStr}}  {{item.CategoryIdr2Str}}</div>
                    <div class="freeClassesListAmount">
                        <div>
                            <img v-for="(item,index) in item.ComEvaluate" :key="index" src="~/static/images/xin.png" alt="">
                            <img v-for="(item,index) in (5 - item.ComEvaluate)" :key="index" src="~/static/images/xins.png" alt="">
                        </div>
                        <div v-if="item.SalePrice > 0"><img src="~/static/images/chuangbi.png" alt="" srcset=""><span>{{item.SalePrice/100}}</span></div>
                        <div v-else><img class="free" src="~/static/images/free.png" alt="" srcset=""></div>
                    </div>
                    <div class="lecturer">
                        <div class="lecturer_logo">
                            <img :src="item.TeacherImg" alt="" srcset="">
                            <span>{{item.TeacherName}}</span>
                        </div>
                        <span><i class="el-icon-user-solid"></i>{{item.ViewCount}}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 精品课程 -->
        <div class="courses">
            <div class="coursesName" @click="More('index-onlineCourses', 1)">
                <h1>精品课程</h1><span>查看更多</span>
            </div>
            <div class="coursesMain">
                <div v-if="index<4" class="coursesList" @click="coursesDetails(index)" v-for="(item,index) in getHomeList.ExcellentCollegeList" :key="index">
                    <section><img :src="item.SmallImageUrl" alt="" srcset=""></section>
                    <div class="h4">{{item.Title}}</div>
                    <div class="h5">{{item.CategoryIdrStr}}  {{item.CategoryIdr2Str}}</div>
                    <div class="coursesListAmount">
                        <div>
                            <img v-for="(item,index) in item.ComEvaluate" :key="index" src="~/static/images/xin.png" alt="">
                            <img v-for="(item,index) in (5 - item.ComEvaluate)" :key="index" src="~/static/images/xins.png" alt="">
                        </div>
                        <div v-if="item.SalePrice > 0"><img src="~/static/images/chuangbi.png" alt="" srcset=""><span>{{item.SalePrice/100}}</span></div>
                        <div v-else><img class="free" src="~/static/images/free.png" alt="" srcset=""></div>
                    </div>
                    <div class="Introduction">{{item.Description}}</div>
                    <div class="lecturer">
                        <div class="lecturer_logo">
                            <img :src="item.TeacherImg" alt="" srcset="">
                            <span>{{item.TeacherName}}</span>
                        </div>
                        <span><i class="el-icon-user-solid"></i>{{item.ViewCount}}</span>
                    </div>
                </div>
            </div>
        </div>


        <!-- 箴创社区 -->
        <div class="communitys">
            <div class="communityZhen">
                <div class="communityZhenName">
                    <h1 @click="More('index-community', 4)">箴创社区</h1>
                    <section class="hot" v-for="(item,index) in change" :key="index" 
                        @click="communityChange(index)"  :class="{activeSection:index==activeIndex}">{{item}}</section>
                </div>
                <div class="communityZhenList" v-for="(item,index) in getHomeList[activeIndex==0?'ArticleListJH':'ArticleListRM']" :key="index">
                    <section class="communityZhenList_logo">
                        <img :src="item.UserImg || a" alt="" srcset="">
                    </section>
                    <div class="communityZhenListCont">
                        <div class="communityZhenListName">
                            <p>{{item.UserName || '匿名用户'}}</p>
                            <!-- <section>
                                <img src="~/static/images/fire.png" alt="" srcset="">
                                <img src="~/static/images/fire.png" alt="" srcset="">
                            </section> -->
                        </div>
                        <div class="communityZhenListCont_">
                            <p>{{item.Content}}</p>
                        </div>
                        <section class="message">
                            <img src="~/static/images/zans.png" alt="" srcset="">
                            <span>（{{item.LikeCount}}）</span>
                            <img src="~/static/images/pins.png" alt="" srcset="">
                            <span>（{{item.ReplyCount}}）</span>
                        </section>
                    </div>
                </div>
            </div>
        </div>


        <!-- 箴创社区 -->
        <!-- <div class="community">
            <div class="communityNews" v-if="getHomeList">
                <div class="communityNewsList">
                    <img v-if="getHomeList.FirstNewsList.length > 0" :src="getHomeList.FirstNewsList[0].SmallImageUrl" alt="" srcset="">
                    <div>
                        <h1>{{getHomeList.FirstNewsCategory}}</h1>
                        <p @click="communityDetails(item.Id)" v-for="(item,index) in getHomeList.FirstNewsList" :key="index">{{item.Title}}</p>
                        <section @click="More('index-news', 3)">更多 ></section>
                    </div>
                </div>
                <div class="communityNewsList">
                    <img v-if="getHomeList.SecondNewsList.length > 0" :src="getHomeList.SecondNewsList[0].SmallImageUrl" alt="" srcset="">
                    <div>
                        <h1>{{getHomeList.SecondNewsCategory}}</h1>
                        <p @click="communityDetails(item.Id)" v-for="(item,index) in getHomeList.SecondNewsList" :key="index">{{item.Title}}</p>
                        <section @click="More('index-news', 3)">更多 ></section>
                    </div>
                </div>
            </div>
        </div> -->

        <!-- 线下活动 -->
        <div class="offlineActivities">
            <div class="offlineActivitiesName" @click="More('index-offlineActivities', 2)">
                <h1>线下活动</h1><span>查看更多</span>
            </div>
            <div class="offlineActivitiesMain">
                <div v-if="index<2" @click="offlineActivitiesDetails(item.Id)" class="offlineActivitiesList" v-for="(item,index) in getHomeList.ActivityList" :key="index">
                    <section><img :src="item.SmallImageUrl" alt="" srcset=""></section>
                    <div class="lecturer">
                        <div class="h4">{{item.Title}}</div>
                        <span><i class="el-icon-user-solid"></i>{{item.ApplyCount}}</span>
                    </div>
                    <h5>{{item.Address}}</h5>
                    <h5>{{item.ToTime}}</h5>
                    <div class="offlineActivitiesListAmount">
                        <div><img src="~/static/images/chuangbi.png" alt="" srcset=""><span>{{item.SalePrice/100}}</span></div>
                        <div class="toUp" :class="{isBuyBtn:!item.IsCanBook || item.IsBook}">
                            {{item.IsExpired?'结束': item.IsBook ? '已报名' : item.SalePrice>0?'报名' :'免费'}}
                        </div>
                    </div>
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
            a:require('~/static/images/user.png'),
            change:['精华','热门'], activeIndex: 0,
        }
    },
    computed:{
        ...mapState({
            getHomeList: state => state.getHomeList,
            userinfor: state => state.userinfor,
        })
    }, 
    created(){
        // this.$store.dispatch('getHomeList')
        this.$store.dispatch('setLocal', { data:0, name:'indexUrlActive'})
        this.$store.commit('indexUrlActive')
    },
    methods:{
        communityChange(index){
            this.activeIndex = index
            // console.log(this.userinfor)
        },
        bannerDetails(index){
            this.getHomeList.BannerList[index].JumpInfo == '' ? '' :this.$router.push({name: 'index-playback',query:{id:this.getHomeList.BannerList[index].JumpInfo}})
        },
        details(index){
            // this.$store.dispatch('collegedetailen', this.getHomeList.FreeCollegeList[index].Id)
            this.$router.push({name: 'index-playback',query:{id:this.getHomeList.FreeCollegeList[index].Id}})
        },
        coursesDetails(index){
            // this.$store.dispatch('collegedetailen', this.getHomeList.ExcellentCollegeList[index].Id)
            this.$router.push({name: 'index-playback',query:{id:this.getHomeList.ExcellentCollegeList[index].Id}})
        },
        communityDetails(id){
            this.$router.push({name: 'index-newsDetail', query:{id}})
        },
        offlineActivitiesDetails(id){
            this.$router.push({name: 'index-eventDetails', query:{activityId: id}})
            setTimeout(()=>{
                if ($('html').scrollTop()) {
                    $('html').animate({ scrollTop: 0 }, 0);
                    return false;
                }
                $('body').animate({ scrollTop: 0 }, 0);
            },150)
        },
        More(url, index){
            this.$router.push({name: url})
            this.$store.dispatch('setLocal', { data:index, name:'indexUrlActive'})
            this.$store.commit('indexUrlActive')
            setTimeout(()=>{
                if ($('html').scrollTop()) {
                    $('html').animate({ scrollTop: 0 }, 0);
                    return false;
                }
                $('body').animate({ scrollTop: 0 }, 0);
            },150)
        }
    },
}
</script>
<style lang="less" scoped>
#home{
    width: 100%; 
    // padding-top: 180px;
}

.swiper{
  width: 1200px; height: 300px; margin: 30px auto; border-radius: 10px; cursor: pointer;
  img{width: 100%; height: 100%; border-radius: 10px;}
}
.swiper_img{width: 1200px; height: 100%; border-radius: 10px; cursor: pointer;
// background: #A0A0A0 ;
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


.ellipsis{
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: normal !important;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}


// 免费课程
.freeClasses{
    width: 1200px; background-color: #FFFFFF; margin: 0 auto; margin-top: 50px; padding-bottom: 40px;
    .freeClassesName{
        width: 100%; height: 33px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;
        h1{font-size: 24px; color: #333333;font-family:PingFangSC-Regular;font-weight:400;}
        span{font-size: 16px;}
    }
    .freeClassesMain{
        width: 100%; display: flex; flex-wrap: wrap;
        .freeClassesList{
            width: 216px; height: 264px; margin-top: 20px; margin-right: 30px; cursor: pointer;
            section{
                width: 100%; height: 130px; background-color: #E3E3E3; 
                img{width: 100%; height: 100%; border-radius: 5px;}
            }
            section:hover{box-shadow:0px 0px 10px 0px rgba(0,0,0,0.2);}
            .h4{color: #515356; margin-top: 15px; font-weight: 600;}
            .h5{color: #939393; margin-top: 5px;}
            .h4,.h5{width: 100%; height: 15px; line-height: 15px; .ellipsis }
            .freeClassesListAmount{
                width: 100%; height: 22px; margin-top: 9px; color: #FF0000; 
                display: flex; justify-content: space-between; align-items: center;
                div:nth-child(1){
                    display: flex; align-items: center;
                    img{width: 10px; height: 10px; margin-right: 2px; border-radius: 5px;}
                }
                div:nth-child(2){
                    display: flex; align-items: center;
                    img{width: 20px; height: 22px; margin-right: 5px;}
                    .free{width: 61px; height: 15px;}
                }
            }
            .lecturer{
                width: 100%; height: 52px; margin-top: 7px; border-top: 1px solid #E8E8E8;
                display: flex; justify-content: space-between; align-items: center;
                color: #939393; font-size: 10px;
                .lecturer_logo{
                    height: 30px; display: flex; align-items: center;
                    img{width: 30px; height: 30px; border-radius: 50%; margin-right: 6px;}
                }
            }
        }
        .freeClassesList:nth-child(5n){
            margin-right: 0;
        }
    }
}

// 精品课程
.courses{
    width: 100%; background-color: #F7F7F7; padding-top: 25px; padding-bottom: 25px;
    .coursesName{
        width: 1200px; height: 33px; display: flex; justify-content: space-between; align-items: center;
        margin: 0 auto; cursor: pointer;
        h1{font-size: 24px; color: #333333;font-family:PingFangSC-Regular;font-weight:400;}
        span{font-size: 16px;}
    }
    .coursesMain{
        width: 1200px; display: flex; flex-wrap: wrap; margin: 0 auto;
        .coursesList{
            width: 285px; height: 338px; margin-top: 20px; margin-right: 20px; cursor: pointer;
            background-color: white; padding: 20px; border-radius: 10px;
            section{
                width: 100%; height: 147px; background-color: #E3E3E3; 
                img{width: 100%; height: 100%; border-radius: 5px;}
            }
            section:hover{box-shadow:0px 0px 10px 0px rgba(0,0,0,0.2);}
            .h4{color: #515356; margin-top: 5px; font-weight: 600;}
            .h5{color: #939393; margin-top: 5px;}
            .h4,.h5{width: 100%; height: 15px; line-height: 15px; .ellipsis }
            .coursesListAmount{
                width: 100%; height: 22px; margin-top: 7px; color: #FF0000; 
                display: flex; justify-content: space-between; align-items: center;
                div:nth-child(1){
                    display: flex; align-items: center;
                    img{width: 10px; height: 10px; margin-right: 2px;}
                }
                div:nth-child(2){
                    display: flex; align-items: center;
                    img{width: 20px; height: 22px; margin-right: 5px;}
                    .free{width: 61px; height: 15px;}
                }
            }
            .Introduction{
                width: 100%; height: 41px; margin-top: 7px; border-top: 1px solid #E8E8E8; padding-top: 10px;
                color: #939393; font-size: 10px; line-height: 16px; .ellipsis; -webkit-line-clamp: 2;
            }
            .lecturer{
                width: 100%; height: 52px;
                display: flex; justify-content: space-between; align-items: center;
                color: #939393; font-size: 10px;
                .lecturer_logo{
                    height: 30px; display: flex; align-items: center;
                    img{width: 30px; height: 30px; border-radius: 50%; margin-right: 6px;}
                }
            }
        }
        .coursesList:nth-child(4n){
            margin-right: 0;
        }
    }
}

// 线下活动
.offlineActivities{
    width: 100%; background-color: #ffffff;
    .offlineActivitiesName{
        width: 1200px; height: 33px; display: flex; justify-content: space-between; align-items: center;
        margin: 0 auto; cursor: pointer;
        h1{font-size: 24px; color: #333333;font-family:PingFangSC-Regular;font-weight:400;}
        span{font-size: 16px;}
    }
    .offlineActivitiesMain{
        width: 1200px; display: flex; flex-wrap: wrap; margin: 0 auto; justify-content: center;
        .offlineActivitiesList{
            width: 420px; height: 428px; margin-top: 14px; margin-right: 20px; cursor: pointer;
            section{
                width: 100%; height: 253px; background-color: #E3E3E3; border-radius: 10px;
                img{width: 100%; height: 100%; border-top-left-radius: 10px; border-top-right-radius: 10px;}
            }
            section:hover{box-shadow:0px 0px 10px 0px rgba(0,0,0,0.2);}
            .lecturer{
                width: 100%; margin-top: 17px; color: #939393; font-size: 10px; margin-bottom: 10px;
                display: flex; justify-content: space-between; align-items: center;               
                .h4{ width: 220px; height: 12px; line-height: 12px; color: #515356; .ellipsis; font-weight: 600;}
            }
            h5{color: #B1B1B1; margin-top: 3px;}
            .offlineActivitiesListAmount{
                width: 100%; margin-top: 9px; color: #FF0000; border-top: 1px solid #E8E8E8; font-size: 16px;
                display: flex; justify-content: space-between; align-items: center; justify-content: flex-end; padding-top: 13px;
                div:nth-child(1){
                    display: flex; align-items: center;
                    img{width: 20px; height: 22px; margin-right: 5px;}
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
}

// 箴创社区
.community{
    width: 100%; background-color: #F7F7F7; padding-top: 70px; padding-bottom: 70px;
    .communityNews{
        width: 1200px; height: 240px; margin: 0 auto; display: flex; justify-content: space-between;
        font-size: 14px; color: #939393; border-radius: 10px;
        .communityNewsList{
            width: 590px; height: 100%; background-color: white; border-radius: 10px;
            display: flex;
            img{width: 240px; height: 240px;box-shadow:0px 4px 20px 0px rgba(0,0,0,0.1); border-radius:10px;}
            div{
                padding: 48px 30px;
                h1{
                    font-size: 24px; color: #333333;font-family:PingFangSC-Regular;font-weight:400;
                    margin-bottom: 18px;
                }
                p{margin-top: 6px; cursor: pointer;}
                section{margin-top: 15px; color: #FF6008;font-family:PingFangSC-Semibold; font-weight:600; cursor: pointer;}
            }
        }
    }
}

.communitys{
    width: 100%; background-color: white; padding-bottom: 50px;
    .communityZhen{
        width: 1200px; margin: 0 auto; margin-top: 50px;
        .communityZhenName{
            width: 100%; height: 33px; display: flex; align-items: center; margin-bottom: 25px; 
            h1{
                font-size: 24px; color: #333333;font-family:PingFangSC-Regular;font-weight:400;
                margin-right: 30px; cursor: pointer;
            }
            .hot{
                margin-left: 20px; font-size: 14px; cursor: pointer;
            }
            .activeSection{border-bottom: 2px solid #FC6619;}
        }
        .communityZhenList{
            width: 100%; padding: 15px 20px; margin-bottom: 10px; box-shadow:0px 2px 10px 0px rgba(0,0,0,0.1); border-radius:10px;
            display: flex; justify-content: space-between; background-color: #FFFFFF;
            .communityZhenList_logo{
                width: 40px; height: 40px; margin-top: 5px;
                img{width: 100%; height: 100%; border-radius: 50%;}
            }
            .communityZhenListCont{
                width: 1100px; height: 100%; color: #939393; font-size: 14px; 
                .communityZhenListName{
                    width: 900px; height: 20px; display: flex; justify-content: space-between; align-items: center;
                    img{width: 12px; height: 15px; margin-left: 10px;}
                }
                .communityZhenListCont_{
                    width: 100%; margin-top: 10px;
                }
                .message{
                    width: 100%; display: flex; align-items: center; justify-content: flex-end; margin-top: 10px;
                    img{width: 15px; height: 15px; margin-left: 20px;}
                }
            }
        }
    }
}
</style>

