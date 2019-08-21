<template>
    <div id="onlineCourses">
        <div class="swiper">
            <el-carousel height="300px">
                <el-carousel-item v-for="(item,index) in bannerInfo" :key="index">
                    <div class="swiper_imgs">
                        <img :src="item.ImageUrl" alt="" srcset="">
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div id="onlineCoursesMain">
            <div class="onlineCoursesMainClass">
                <p>课程分类：</p>
                <div class="onlineCoursesMainClass_cont">
                    <span @click="changeClass(-1)" :class="{spanActive: onlineCoursesIndex == -1}">全部</span>
                    <span :class="{spanActive: index==onlineCoursesIndex}" @click="changeClass(index)" 
                        v-for="(item,index) in category" :key="index">{{item.CategoryName}}</span>
                </div>
            </div>
            <div class="onlineCoursesMainClass">
                <p>课程主题：</p>
                <div class="onlineCoursesMainClass_cont">
                    <span @click="changeClass2(-1)" :class="{spanActives: onlineCoursesIndex2 == -1}">全部</span>
                    <div v-if="category[onlineCoursesIndex]">
                        <span :class="{spanActives: index==onlineCoursesIndex2}" @click="changeClass2(index)"
                        v-for="(item,index) in category[onlineCoursesIndex].SonCategory" :key="index">{{item.CategoryName}}</span>
                    </div>
                </div>
            </div>
            <!-- <div class="onlineCoursesMainClass">
                <p>方式：</p>
                <div class="onlineCoursesMainClass_cont">
                    <span>全部</span>
                    <span>录播</span>
                    <span>线下</span>
                </div>
            </div> -->
        </div>

        <div id="courseClass">
            <div class="courseClassLeft">
                <div class="courseClassTab">
                    <div class="titleList">
                        <div class="titleList_" v-for="(item,index) in tabTitle" :key="index">
                            <div class="tabTitles">
                                <span @click="handleSelect(index)" :class="{activeClass: index==tabIndex}">{{item.title}}</span>
                                <div @click="handleSelects(index)">
                                    <p :class="{sorts: item.sort}"><i class="el-icon-caret-top"></i></p>
                                    <p :class="{sorts: !item.sort}"><i class="el-icon-caret-bottom"></i></p>
                                </div>
                            </div>
                            <section v-if="index < 2"></section>
                        </div>
                    </div>
                    <!-- <div class="titleList Amount">
                        <div v-for="(item,index) in tabTitleAmount" :key="index">
                            <span :class="{activeClass: index==tabIndex}">{{item.title}}</span>
                            <section v-if="index == 1"></section>
                        </div>
                    </div> -->
                </div>
                <div class="freeClassesMain">
                    <div class="freeClassesList" @click="details(index)" v-for="(item,index) in collegelist.Data" :key="index">
                        <section><img :src="item.SmallImageUrl" alt="" srcset=""></section>
                        <div class="h4">{{item.Title}}</div>
                        <div class="h5">{{item.CategoryIdrStr}} {{item.CategoryIdr2Str}}</div>
                        <div class="freeClassesListAmount">
                            <div>
                                <img v-for="(item,index) in item.ComEvaluate" :key="index+'0'" src="~/static/images/xin.png" alt="">
                                <img v-for="(item,index) in (5 - item.ComEvaluate)" :key="index+'1'" src="~/static/images/xins.png" alt="">
                            </div>
                            <div v-if="item.SalePrice > 0"><img src="~/static/images/chuangbi.png" alt="" srcset=""><span>{{item.SalePrice/100}}</span></div>
                            <div v-else><img class="free" src="~/static/images/free.png" alt="" srcset=""></div>
                        </div>
                        <div class="lecturer">
                            <div class="lecturer_logo">
                                <img :src="item.TeacherImg" alt="" srcset="">
                                <span>{{item.TeacherName}}</span>
                            </div>
                            <span>{{item.ViewCount}}人已看</span>
                        </div>
                    </div>
                </div>
                <div class="paging">
                    <el-pagination v-if="collegelist" :background="true" layout="prev, pager, next" :total="collegelist.TotalCount/12*10"
                        @current-change="changeCurrent">
                    </el-pagination>
                </div>
            </div>
            
            <div class="courseClassRight">
                <div class="BusinessCard" v-for="(item,index) in recommend" :key="index">
                    <img class="tuijianjiangshi.png" src="~/static/images/tuijianjiangshi.png" alt="" srcset="">
                    <section>
                        <p>推荐讲师</p>
                        <img :src="item.LogoUrl" alt="" srcset="">
                        <div>
                            <p>
                                <span>{{item.Name}}</span>
                            </p>
                            <p>{{item.Title}}</p>
                        </div>
                    </section>
                    <div class="BusinessCardCourse" @click="detailsRecommend(index, indexs)" v-for="(items,indexs) in item.RecommendCollegeList" :key="indexs">
                        <div><img :src="items.SmallImageUrl" alt="" srcset=""></div>
                        <!-- <div>
                            <div class="h4">{{items.Title}}</div>
                            <div class="h5">{{items.CategoryIdrStr}}  {{items.CategoryIdr2Str}}</div>
                            <div>
                                <img v-for="(item,index) in items.ComEvaluate" :key="index" src="~/static/images/xin.png" alt="">
                                <img v-for="(item,index) in (5 - items.ComEvaluate)" :key="index" src="~/static/images/xins.png" alt="">
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
// import vueiInfinite from 'vue-infinite-scroll'
// import Vue from 'vue'
// Vue.use(vueiInfinite)
export default {
    data(){
        return{
            count: 15, classIndex:0, value1: '',
            tabTitle:[
                {title:'最热', sort: false},
                {title:'最新', sort: false},
                {title:'销量', sort: false},
            ], 
            tabTitleAmount:[
                {title:'价格', url:'index'},
                {title:'免费', url:'index-onlineCourses'},
            ], 
            tabIndex:0,
            classTab:[
                {name:'全部'},{name:'企业管理'},{name:'电商运营'},{name:'供应链'},
                {name:'知识产权'},{name:'支付/资金/财税'},{name:'营销推广'}
            ],
            onlineCoursesIndex: -1,
            onlineCoursesIndex2: -1,
            category:[],
            collegelist:[],
            recommend:[],
            // CategoryIdr:'', CategoryIdr2:'', DataOrderType: 1, DataOrderWay: 1, PageIndex: 1,
            list: {
                CategoryIdr: '', CategoryIdr2: '', DataOrderType: 1, DataOrderWay: 2, SearchCollegeName:'',
                PageIndex: 1, PageSize: 12,
            },
            a:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJAuNSJZJicFdlibpltSzPicp6qftFriclpN6iaKk6N1dgNBu8zyQ2OUueMZ9ghqxAQYsHwiaKdd1B5zgOg/132',
            bannerInfo:''
        }
    },
    computed:{
        ...mapState({
            getHomeList: state => state.getHomeList,
            // category: state => state.category,
            // collegelist: state => state.collegelist,
        }),
        noMore () {
            return this.count >= 20
        },
        disabled () {
            return this.loading || this.noMore
        }
    }, 
    created(){
        this.$store.dispatch('bannerInfo',encodeURI('PC在线课程滚动栏'))
        .then(res=>{
            // console.log(res)
            if(res.IsSuccess){
                this.bannerInfo = res.Data
            }
        })
        this.$store.dispatch('category')
        .then(res=>{
            // console.log(res)
            if(res.IsSuccess){
                this.category = res.Data.List
            }
        })
        this.$store.dispatch('recommend')
        .then(res=>{
            // console.log(res)
            if(res.IsSuccess){
                this.recommend = res.Data
            }
        })
        
        this.getCollegelist()
    },
    methods: {
        // bannerDetails(index){
        //     this.bannerInfo[index].JumpInfo == '' ? '' :this.$router.push({name: 'index-playback',query:{id:this.bannerInfo[index].JumpInfo}})
        // },
        handleSelect(index) {
            this.tabIndex = index
            this.list.DataOrderType = index+1
            this.getCollegelist()
        },
        handleSelects(index) {
            this.tabIndex = index
            this.list.DataOrderType = index+1
            this.list.DataOrderWay = this.tabTitle[index].sort?2:1
            this.tabTitle[index].sort = !this.tabTitle[index].sort
            this.getCollegelist()
        },
        changeClass(index){
            this.onlineCoursesIndex = index
            this.list.CategoryIdr = index == -1 ? '' : this.category[index].CategoryId
            this.onlineCoursesIndex2 = -1
            this.list.CategoryIdr2 = ''
            this.list.PageIndex = 1
            this.getCollegelist()
        },
        changeClass2(index){
            this.onlineCoursesIndex2 = index
            this.list.CategoryIdr2 = index == -1 ? '' : this.category[this.onlineCoursesIndex].SonCategory[index].CategoryId
            this.list.PageIndex = 1
            this.getCollegelist()
        },
        details(index){
            this.$router.push({name: 'index-playback',query:{id:this.collegelist.Data[index].Id}})
        },
        detailsRecommend(index, indexs){
            this.$router.push({name: 'index-playback',query:{id:this.recommend[index].RecommendCollegeList[indexs].Id}})
        },
        getCollegelist(){
            this.$store.dispatch('collegelist', this.list)
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.collegelist = res
                }
            })
        },
        changeCurrent(index){
            this.list.PageIndex = index
            this.getCollegelist()
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
#onlineCourses{
    width: 100%; background-color: #F7F7F7; padding-top: 30px;
}

.swiper{
  width: 1200px; height: 300px; margin: 0 auto; position: relative; border-radius: 10px;
  .swiper_imgs{width: 100%; height: 100%; border-radius: 10px; cursor: pointer;
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


.ellipsis{
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: normal !important;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}



#onlineCoursesMain{
    width: 1200px; border-radius: 20px; background-color: white; border-radius: 10px;
    margin: 30px auto; display: flex; flex-flow: column; justify-content: space-between; padding: 34px 30px;
    .onlineCoursesMainClass{
        width: 100%; font-size: 16px; color: #939393; margin-top: 5px;
        display: flex; justify-content: space-between;
        p{margin-top: 6px;}
        .onlineCoursesMainClass_cont{
            width: 1010px; height: 100%; display: flex; flex-wrap: wrap; align-items: center;
            span{
                margin-right: 10px; padding: 6px 20px; color: #333333; cursor: pointer;
            }
            span:last-child{margin-right: 0;}
            .spanActive{background-color: #F3F3F3; color: #FC6619; border-radius: 20px;}
            .spanActives{ color: #FC6619; border-radius: 20px;}
        }
    }
}


#courseClass{
    width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; padding-bottom: 120px; position: relative;
    #din{position: absolute; top: -111px; left: 0;}
    .courseClassLeft{
        width: 1014px; border-radius: 10px; background-color: #FFFFFF; padding: 30px; padding-bottom: 100px;
        position: relative;
        .courseClassTab{
            width: 100%; display: flex; justify-content: space-between;
        }
        .titleList{
            height: 30px; display: flex; font-size: 18px;font-family:PingFangSC-Regular;font-weight:400;
            align-items: center; color: #515356;
            .activeClass{ color: #FF5E1B; }
            .titleList_{
                width: 90px; cursor: pointer; margin-right: 19px; display: flex; justify-content: space-between; align-items: center;
                .tabTitles{
                    display: flex; align-items: center;
                    p{line-height: 10px; font-size: 11px; margin-left: 5px;}
                    p:nth-child(1){position: relative; top: 3px;}
                    p:nth-child(2){position: relative; top: -2px;}
                    .sorts{ color: #FC6619;}
                }
                section{
                    width: 2px; height: 16px; background-color: #EEEEEE;
                }
            }
        }
        .Amount{
            div{
                margin-left: 19px; margin-right: 0; text-align: right;
                section{float: left;}
            }
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
                .h4{width: 100%; height: 14px; line-height: 14px; font-weight: 600; color: #515356; margin-top: 15px; .ellipsis;}
                .h5{ height: 14px; color: #939393; margin-top: 5px;}
                .freeClassesListAmount{
                    width: 100%; height: 22px; margin-top: 7px; color: #FF0000; 
                    display: flex; justify-content: space-between; align-items: center;
                    div:nth-child(1){img{width: 10px; height: 10px; margin-right: 2px;}}
                    div:nth-child(2){
                        height: 22px; display: flex; align-items: center;
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
            .freeClassesList:nth-child(4n){
                margin-right: 0;
            }
        }
        .paging{
            width: 100%; display: flex; justify-content: center; position: absolute; bottom: 30px; left: 0;
        }
    }


    .courseClassRight{
        width: 156px;
        .BusinessCard{
            width: 100%; background-color: white; border-radius: 10px; text-align: center;
            padding: 10px; margin-bottom: 20px; padding-top: 0;
            .tuijianjiangshi.png{width: 25px; height: 32px;}
            section{
                width: 100%; border-bottom: 1px solid #EEEEEE; padding-bottom: 14px;
                img{width: 80px; height: 80px; border-radius: 50%; margin-top: 10px;}
                div{
                    width: 100%; height: 80px;
                    padding: 8px 0; font-size: 12px; 
                    span:nth-child(1){color: #515356;}
                    p{color: #939393; margin-top: 5px;}
                }
            }
            .BusinessCardCourse{
                width: 100%; height: 80px;
                margin-top: 15px; cursor: pointer;
                div:nth-child(1){width: 100%; height: 100%; background-color: #D8D8D8; img{width: 100%; height: 100%; border-radius: 5px;}}
                // div:nth-child(2){
                //     width: 205px; 
                //     .h4{width: 100%; height: 14px; line-height: 14px; font-weight: 600; color: #515356; margin-top: 0px; .ellipsis;background: none; }
                //     .h5{ height: 14px; color: #939393; margin-top: 5px;}
                //     div:nth-child(3){
                //         height: 22px; display: flex; align-items: center;
                //         img{width: 10px; height: 10px; margin-right: 2px;}
                //     }
                // }
            }
        }
    }
}


</style>


