<template>
    <div id="playback">
        
        <div class="videos">
            <div class="videosDetails">

                <div id="dplayers"><img :src="activityDetail.SmallImageUrl" alt=""></div>

                <div class="CourseDetails">
                    <div class="CourseDetails_">
                        <div class="BusinessCardCourse">
                            <div class="BusinessCardCourse_">
                                <section>{{activityDetail.Title}}</section> 
                                <p v-if="activityDetail.CategoryIdrStr">{{activityDetail.CategoryIdrStr}} {{activityDetail.CategoryIdr2Str}}</p>
                                <p v-else class="kongge">企业管理</p>
                                <span class="transforms">报名截止：{{activityDetail.Deadline}}</span>
                                <p class="transforms">时间：{{activityDetail.FromTime+' - '+activityDetail.ToTime}}</p>
                                <p class="transforms">地点：{{activityDetail.Address}}</p>
                            </div>
                        </div>
                        <div class="buy">
                            <div class="buyMount">
                                <img src="~/static/images/Gold.png" alt="" srcset="">
                                <p>{{activityDetail.SalePrice/100}}</p><del>{{activityDetail.Price/100}}</del>
                            </div>
                            <div class="buyBtn" :class="{isBuyBtn:!activityDetail.IsCanBook || activityDetail.IsBook}" @click="activityDetail.IsCanBook?centerDialogVisible=true:''">
                                {{activityDetail.IsExpired?'结束': activityDetail.IsBook ? '已报名' : activityDetail.SalePrice>0?'报名' :'免费'}}
                            </div>
                        </div>
                    </div>
                    <div class="CourseCont">
                        <div class="Introduction">
                            <span>活动内容：</span>
                            {{activityDetail.Description}}
                        </div>
                        <div class="buy">
                            <div v-if="activityDetail" class="buyMount">
                                <img :src="activityDetail.TeacherInfo.LogoUrl" alt="" srcset="">
                                <p>{{activityDetail.TeacherInfo.Name}}</p>
                                <img class="label" src="~/static/images/zhubanfang.png" alt="" srcset="">
                            </div>
                            <!-- <div>箴全集团部门负责人</div> -->
                        </div>
                    </div>
                </div>

            </div>
            
            <div class="videosTab">
                <div :class="{videosTabActive: index==videosTabIndex}" @click="changeTab(index)" v-for="(item,index) in videosTabList" :key="index">{{item}}</div>
            </div>
        </div>


        <div class="playbackDetail">
            <div class="playbackDetail_left">
                <div v-if="videosTabIndex==0" v-html="activityDetail.Content"></div>
                <div v-if="videosTabIndex==1" class="courseCatalog">
                    <h4>已经报名<span>（{{activityDetail.BookUsers.length}}人）</span></h4>
                    <div class="directory">
                        <section v-for="(item,index) in activityDetail.BookUsers" :key="index">
                            <img :src="item.LogoUrl" alt="" srcset="">
                            <p>{{item.Name}}</p>
                        </section>
                    </div>
                </div>
            </div>

            <div class="playbackDetail_right">
                <div class="dynamic">
                    <div class="directory">
                        <section>
                            <img src="~/static/images/xiaoer.jpg" alt="" srcset="">
                            <p>扫描上方二维码</p>
                            <p>咨询具体活动事宜</p>
                        </section>
                        <section>
                            <img src="~/static/images/xcxcode.jpg" alt="" srcset="">
                            <p>扫描上方二维码</p>
                            <p>关注箴创学院小程序</p>
                        </section>
                    </div>
                </div>

                <div class="RelatedCourses">
                    <h4>其它活动</h4>
                    <div class="RelatedCoursesList">
                        <div v-if="activityDetail" class="RelatedCoursesList_" :style="{width: +activityDetail.RelActivity.length*170+20+'px'}">
                            <section @click="details(item.Id)" v-for="(item,index) in activityDetail.RelActivity" :key="index">
                                <div><img :src="item.SmallImageUrl" alt="" srcset=""></div>
                                <div class="p">{{item.Title}}</div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <el-dialog :visible.sync="centerDialogVisible" width="500px" center :modal-append-to-body="false">
            <div class="buy"> 
                <p class="buyTitle">购买课程</p>
                <div v-if="buyResult">
                    <section class="chuangbi">
                        <img src="~/static/images/chuang.png" alt="" srcset="">
                        <span>-{{activityDetail.SalePrice/100}}</span>
                    </section>
                    <div class="tip">这将消耗掉{{activityDetail.SalePrice/100}}枚创币，余额{{userinfors.Balance/100}}创币，购买的课程可在我的课程里找到。</div>
                    <div class="slider">
                        <span>滑动按钮验证</span>
                        <section :style="{width: solidWidth+'%'}">
                            <span v-if="solidWidth == 100">验证通过</span>
                            <img src="~/static/images/right.png" alt="" srcset="">
                        </section>
                        <div class="changeSlider"><el-slider v-model="value" :min="12" @input="changeSliders" :show-tooltip="false" :disabled="isSolid"></el-slider></div>
                    </div>
                    <div class="buyBtns" @click="buyMethod">报名</div>
                </div>
                <!-- <div v-else class="isBuyResult">
                    <div v-if="isError">
                        <img class="error" src="~/static/images/error.png" alt="" srcset="">
                        <p>余额不足，充值失败，<span @click="$router.push({name:'index-my'})">去充值</span></p>
                    </div>
                    <div v-else>
                        <img src="~/static/images/success.png" alt="" srcset="">
                        <p>购买成功，你可以在<span @click="$router.push({name:'index-my'})">我的课程</span>里面找到</p>
                    </div>
                </div> -->
            </div>
        </el-dialog>

    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Storage from '~/store/storage'
import 'dplayer/dist/DPlayer.min.css';

export default {
    data(){
        return{
            videosTabList:['活动详情','已经报名'],
            videosTabIndex:0,
            a:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJAuNSJZJicFdlibpltSzPicp6qftFriclpN6iaKk6N1dgNBu8zyQ2OUueMZ9ghqxAQYsHwiaKdd1B5zgOg/132',
            activityDetail:'',

            centerDialogVisible: false,
            isSolid:false,
            value:12,
            orderStatus: 3,
            solidWidth: 12,
            buyResult: true,
            isError: false,
            activityId:'',
            userinfors:''

        }
    },
    computed:{
        ...mapState({
            getHomeList: state => state.getHomeList,
        }),
    }, 
    mounted(){
        
        // if (typeof window !== 'undefined') {
        //     var DPlayer = require('dplayer');
        //     const dp = new DPlayer({
        //     container: document.getElementById('dplayers'),
        //         video: {
        //             url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
        //         }
        //     });   
        // }
        if ($('html').scrollTop()) {
            $('html').animate({ scrollTop: 0 }, 0);
            return false;
        }
        $('body').animate({ scrollTop: 0 }, 0);
        
        
    },
    created(){
        this.userinfors = Storage.getLocal('userinfor') || ''
        this.activityId = this.$route.query.activityId
        this.get()
    },
    methods: {
        changeTab(index){
            this.videosTabIndex = index
        },
        changeSliders(e){
            this.solidWidth = e
            e == 100 ? this.isSolid = true : false
        },
        get(){
            this.$store.dispatch('activityDetail', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', activityId: this.activityId})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.activityDetail = res.Data
                }
            })
        },
        buyMethod(){
            if(this.value == 100){
                this.$store.dispatch('createorder', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', 
                    GoodsId: this.activityDetail.Id, PayType: 3, GoodsType: 2})
                .then(res=>{
                    // console.log(res)
                    this.centerDialogVisible = false
                    this.value = 12
                    this.isSolid = false
                    if(res.IsSuccess){
                        this.$message({
                            message: '报名成功！',
                            type: 'success',
                            center: true,
                            offset: 50
                        });
                        this.$router.go(0)
                    }else{
                        if(res.Code === '5001'){
                            this.$message({
                                message: '报名失败',
                                type: 'error',
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
            }
        },
        details(id){
            this.activityId = id
            this.$router.push({name: 'index-eventDetails', query:{activityId: id}})
            this.get()
            if ($('html').scrollTop()) {
                $('html').animate({ scrollTop: 0 }, 0);
                return false;
            }
            $('body').animate({ scrollTop: 0 }, 0);
        },
    }
}
</script>
<style lang="less" scoped>
#playback{
    width: 100%; height: 100%; box-sizing: border-box; background-color: #F7F7F7; padding-bottom: 30px;
}

.ellipsiss{
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: normal !important;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}


.videos{
    width: 100%; height: 613px; background-color: #5C5C5C; padding: 30px;
    .videosDetails{
        width: 1200px; margin: 0 auto; display: flex; justify-content: space-between;
        #dplayers{
            width: 805px; height: 500px; border-radius: 10px; background-color: rgba(0,0,0,0.17);
            img{width: 100%; height: 100%; border-radius: 10px;}
        }
        .CourseDetails{
            width: 356px; height: 100%;
            .CourseDetails_{
                width: 100%; height: 200px; background:rgba(0,0,0,0.17); border-radius: 10px; padding-bottom: 20px;
                .BusinessCardCourse{
                    width: 100%; height: 141px; display: flex; justify-content: space-between; align-items: center;
                    padding: 20px; background:rgba(0,0,0,0.05);
                    // div:nth-child(1){width: 118px; height: 100%; background-color: #D8D8D8;}
                    .BusinessCardCourse_{
                        width: 100%; height: 100%; 
                        p{line-height: 22px; color: #FFFFFF;font-size: 10px;}
                        section{ max-height: 43px; line-height: 21.5px; .ellipsiss; font-size: 15px;font-family:PingFangSC-Semibold;font-weight:600; color: #FFFFFF;}
                        // span:nth-child(2){position: absolute; right: -30px; top: 0; font-size: 10px;}
                        span{font-size: 10px;color: #FFFFFF;}
                        p:nth-child(5){position: relative; top: -4px;}
                        .kongge{opacity: 0;}
                        .transforms{
                            -webkit-text-size-adjust:none;
                            -webkit-transform:scale(0.833);
                            transform:scale(0.833);
                            -webkit-transform-origin-x: 0;
                        }
                    }
                }
                .buy{
                    width: 100%; height: 20px; display: flex; justify-content: space-between; align-items: center;
                    padding: 0 20px; margin-top: 20px; color: white;
                    .buyMount{
                        display: flex; font-size: 20px; align-items: center;
                        img{width: 30px; height: 33px; margin-right: 10px;}
                        del{font-size: 16px; color: #6D7278; margin-left: 10px; }
                    }
                    .buyBtn{
                        width: 110px; height: 32px; font-size: 16px; line-height: 32px; cursor: pointer;
                        background:linear-gradient(315deg,rgba(255,94,146,1) 0%,rgba(255,135,52,1) 100%);
                        border-radius: 16px; text-align: center!important;
                    }
                    .isBuyBtn{background:linear-gradient(315deg,rgba(0,0,0,0.15) 0%,rgba(0,0,0,.15) 100%)!important; color: gray}
                    .buyBtn:hover{background:linear-gradient(315deg,rgba(255,94,146,.8) 0%,rgba(255,135,52,.8) 100%);}
                }
            }
            .CourseCont{
                width: 100%; height: 226px; margin-top: 30px; background:rgba(0,0,0,0.17); border-radius: 10px; padding: 20px 0;
                position: relative;
                .Introduction{
                    width: 100%; padding: 0 20px; color: #B6B6B6; line-height: 18px;
                    span{color: #FFFFFF;}
                }
                .buy{
                    width: 100%; height: 86px; display: flex; justify-content: space-between; align-items: center;
                    padding: 0 20px; color: white; background:rgba(0,0,0,0.05); position: absolute; bottom: 0;
                    left: 0; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;
                    .buyMount{
                        display: flex; align-items: center;
                        img:nth-child(1){width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;}
                        .label{width: 30px; height: 18px; margin-left: 10px; margin-top: 2px;}
                    }
                }
            }
        }
    }
    .videosTab{
        width: 1200px; height: 46px; display: flex; margin: 0 auto; font-size: 20px; color:rgba(255,255,255,0.7);
        margin-top: 35px;
        div{margin-right: 75px; cursor: pointer; }
        .videosTabActive{ border-bottom: 2px solid #FFFFFF; }
    }
}



.playbackDetail{
    width: 1200px; margin: 0 auto; margin-top: 28px; display: flex; justify-content: space-between;

    .playbackDetail_left{
        width: 805px; border-radius: 10px; background-color: white; padding: 20px; position: relative;
        // 课程目录
        .courseCatalog{
            width: 100%; height: 540px;
            h4{
                font-size: 20px; color: #333333; font-family:PingFangSC-Regular; font-weight:400;
                span{color: #939393; font-size: 14px;}
            }
            .directory{
                width: 100%; height: 100%; display: flex; flex-wrap: wrap; padding: 30px 20px;
                section{
                    width: 120px; height: 130px; text-align: center; font-size: 14px; color: #515356;
                    margin-right: 30px;
                    img{width: 93px; height: 93px; border-radius: 50%; margin-bottom: 5px;}
                }
                section:nth-child(5n){margin-right: 0;}
            }
        }
    }

    .playbackDetail_right{
        width: 365px;
        .dynamic{
            width: 100%; height: 210px; border-radius: 10px; background-color: white; padding: 20px;
            .directory{
                width: 100%; height: 100%; display: flex; justify-content: center;
                section{
                    width: 130px; height: 100%; text-align: center; font-size: 14px; color: #515356;
                    img{width: 130px; height: 130px; margin-bottom: 5px;}
                }
                section:nth-child(1){margin-right: 40px;}
            }
        }
        .RelatedCourses{
            width: 100%; background-color: white; border-radius: 10px; padding-top: 20px;
            margin-top: 30px; padding-bottom: 20px;
            h4{
                font-size: 20px; color: #333333; font-family:PingFangSC-Regular; font-weight:400; 
                margin-left: 20px;
            }
            .RelatedCoursesList{
                width: 100%; overflow-x: auto; margin-top: 8px; padding-bottom: 10px;
                .RelatedCoursesList_{
                    display: flex;
                    section{
                        width: 150px; margin-left: 20px; cursor: pointer;
                        div{
                            width: 100%; height: 90px;background:rgba(227,227,227,1);border-radius: 5px;
                            img{width: 100%; height: 100%; border-radius: 5px;}
                        }
                        .p{ width: 100%; height: 14px; line-height: 14px; color: #939393; margin-top: 10px;.ellipsis; background: none;}
                    }
                }
            }
        }
        
    }

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





.buy{
    width: 360px; margin: 0 auto; text-align: center; 
    .buyTitle{color: #333333; font-size: 20px; font-family:PingFangSC-Semibold; font-weight:600;}
    .chuangbi{
        width: 200px; margin: 0 auto; font-size: 30px; color: #333333; display: flex; align-items: center;
        font-family:PingFangSC-Semibold; font-weight:600; justify-content: center; margin-top: 30px;
        img{width: 55px; height: 65px; margin-right: 10px;}
    }
    .tip{
        width: 350px; margin: 0 auto; font-size: 14px; color: #939393; margin-top: 19px;
    }
    .buyBtns{
        width: 231px; height: 50px; margin: 0 auto; margin-top: 30px; border-radius: 25px;
        display: flex; justify-content: center; align-items: center; color: white; font-size: 18px;
        font-family:PingFangSC-Semibold; font-weight:600;
        background:linear-gradient(270deg,rgba(255,94,146,1) 0%,rgba(255,135,52,1) 100%);
        box-shadow:0px 10px 14px 0px rgba(187,81,81,0.28); cursor: pointer;
    }
    .buyBtns:hover{
        background:linear-gradient(270deg,rgba(255,94,146,.8) 0%,rgba(255,135,52,.8) 100%);
    }

    .slider{
        width: 360px; height: 30px; background-color: #EBEBEB; line-height: 30px; margin-top: 30px; position: relative;
        section{
            height: 100%; background-color: #75CE49; position: absolute;; top: 0; left: 0; 
            display: flex; align-items: center; justify-content: flex-end;
            img{width: 40px; height: 28px; margin-left: 1px; margin-right: 1px;}
            span{ font-size: 14px; color: #FFFFFF; margin-right: 110px; }
        }
        .changeSlider{
            width: 320px; height: 100%; position: absolute; left: 20px; top: 0; opacity: 0;
        }
    }

    .isBuyResult{
        img{width: 100px; height: 70px; margin-top: 83px; margin-bottom: 40px;}
        span{color: #FC6619; cursor: pointer;}
        p{margin-bottom: 95px;}
        .error{width: 98px; height: 98px; margin-top: 70px; margin-bottom: 26px; }
    }
}


</style>


