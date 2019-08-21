<template>
    <div id="playback">
        
        <div class="videos">
            <div class="videosDetails" v-if="collegedetailen">
                
                <div>
                    <div id="dplayers"></div>
                </div>
                <div v-if="isEnter && isPlay" class="dplayersTitle">{{collegedetailen.Title}}</div>
                <div v-if="isLoadingVideo" class="LoadingVideo">
                    <i class="el-icon-loading"></i>
                </div>

                <div class="CourseDetails">
                    <div class="CourseDetails_">
                        <div class="BusinessCardCourse">
                            <div><img :src="collegedetailen.SmallImageUrl" alt="" srcset=""></div>
                            <div>
                                <div>{{collegedetailen.Title}}</div>
                                <p>{{collegedetailen.CategoryIdrStr}}  {{collegedetailen.CategoryIdr2Str}}</p>
                                <p>
                                    <img v-for="(item,index) in collegedetailen.ComEvaluate" :key="index" src="~/static/images/xin.png" alt="">
                                    <img v-for="(item,index) in (5 - collegedetailen.ComEvaluate)" :key="index" src="~/static/images/xins.png" alt="">
                                </p>
                                <p>已学习人数：{{collegedetailen.ViewCount}}</p>
                            </div>
                        </div>
                        <div class="videosType">
                            <div>教学类型：录播</div>
                            <div>课程课时：{{collegedetailen.CollegeClass.length}}课时</div>
                            <!-- <div class="transforms">课程总时长：99时99分99秒</div> -->
                        </div>
                        <div class="buy">
                            <div class="buyMount">
                                <img src="~/static/images/Gold.png" alt="" srcset="">
                                <p>{{collegedetailen.SalePrice/100}}</p><del>{{collegedetailen.CollegePrice/100}}</del>
                            </div>
                            <div class="buyBtn" @click="isBuy">{{collegedetailen.SalePrice==0?'免费': orderStatus == 2 || orderStatus == 3 ?'已购买':'购买'}}</div>
                        </div>
                    </div>
                    <!-- <div class="CourseCont">
                        <div class="Introduction">
                            <span>课程简介：</span>
                            {{collegedetailen.Description}}
                        </div>
                        <div class="buy">
                            <div class="buyMount">
                                <img :src="collegedetailen.TeacherInfo.LogoUrl" alt="" srcset="">
                                <p>{{collegedetailen.TeacherInfo.Name}}</p>
                                <img class="label" src="~/static/images/label.png" alt="" srcset="">
                            </div>
                            <div class="Tags">{{collegedetailen.TeacherInfo.Tags}}</div>
                        </div>
                    </div> -->
                    <div class="catalogList">
                        <div class="catalogListH">课程目录：</div>
                        <div class="catalogListScroll">
                            <div v-for="(item,index) in collegedetailen.CollegeClass" :key="index"
                             :class="{activeVideos: videoIndex == index}" @click="changeVideo(index)">
                                {{index+1+'.'}} {{item.ClassName}}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            
            <div class="videosTab" v-if="collegedetailen">
                <div :class="{videosTabActive: index==videosTabIndex}" @click="changeTab(index)" v-for="(item,index) in videosTabList" :key="index">{{item}}</div>
            </div>
        </div>


        <div class="playbackDetail" v-if="collegedetailen">
            <div class="playbackDetail_left">
                <div v-if="videosTabIndex==0" v-html="collegedetailen.CollegeContent"></div>
                <div v-if="videosTabIndex==1" class="courseCatalog">
                    <h4>课程目录</h4>
                    <div :class="{activeVideo: videoIndex == index}" @click="changeVideo(index)" 
                    v-for="(item,index) in collegedetailen.CollegeClass" :key="index" class="directory">
                        <span>{{index>8?index+1:'0'+(index+1)}}</span>
                        <div>
                            <p>{{item.ClassName}}</p>
                            <span v-if="videoIndex == index">正在看</span> 
                        </div>
                    </div>
                </div>
                <div v-if="videosTabIndex==2" class="CurriculumEvaluation">
                    <div class="evaluation">
                        <h4>课程评价</h4>
                        <p v-if="getevaluate.length > 0">
                            <img v-for="(item,index) in collegedetailen.ComEvaluate" :key="index" src="~/static/images/daxin.png" alt="">
                        </p>
                        <span v-else>暂无评价</span>
                    </div>
                    <!-- 输入框 -->
                    <div v-if="userinfor" class="communityCommentsList">
                        <section class="communityZhenList_logo">
                            <img class="avatar" :src="userinfor.LogoUrl" alt="" srcset="">
                        </section>
                        <p class="commentsName">{{userinfor.UserName}}</p>
                        <div class="communityCommentsList_input">
                            <input type="text" v-model="contentP" placeholder="评论">
                            <img src="~/static/images/xiugai.png" alt="" srcset="">
                        </div>
                        <div class="daxin">
                            <img v-for="(items,indexs) in 5" @click="xinIndex=indexs" :key="items" :src="require('~/static/images/'+(xinIndex < indexs?'xins':'xin')+'.png')" alt="">
                        </div>
                        <div @click="comment" class="inputBtn">评论</div>
                    </div>
                    <div v-if="getevaluate" v-for="(item,index) in getevaluate" :key="index" class="dynamicList">
                        <img :src="item.LogoUrl" alt="" srcset="">
                        <div class="dynamicListCont">
                            <div>
                                <p><span>{{item.UserName}}</span><span>{{item.CreateTime}}</span></p>
                                <div>
                                    <img v-for="(items) in item.Score" :key="items+'1'" src="~/static/images/xin.png" alt="">
                                    <img v-for="(itemss) in (5 - item.Score)" :key="itemss" src="~/static/images/xins.png" alt="">
                                </div>
                            </div>
                            <div>{{item.Content}}</div>
                        </div>
                    </div>
                    <div v-if="getevaluate.length>=10" class="more" :class="{mores:!isMore}" @click="getevaluateMore">{{isMore?'查看更多':'没有更多了'}}</div>
                </div>
            </div>

            <div class="playbackDetail_right">
                <!-- <div class="RelatedCourses">
                    <h4>相关课程</h4>
                    <div class="RelatedCoursesList">
                        <div class="RelatedCoursesList_" :style="{width: +collegedetailen.RelCollege.length*170+20+'px'}">
                            <section @click="details(item.Id)" v-for="(item,index) in collegedetailen.RelCollege" :key="index">
                                <div><img :src="item.SmallImageUrl" alt="" srcset=""></div>
                                <p>{{item.Title}}</p>
                            </section>
                        </div>
                    </div>
                </div> -->

                <div class="courseInstructor">
                    <div class="Introduction">
                        <span>课程简介：</span>
                        {{collegedetailen.Description}}
                    </div>
                    <div class="lecturerIntroduction">
                        <span>讲师简介：</span>
                        <img :src="collegedetailen.TeacherInfo.LogoUrl" alt="" srcset="">
                        <p>{{collegedetailen.TeacherInfo.Name}}</p>
                        <div class="Tags">{{collegedetailen.TeacherInfo.Tags}}</div>
                    </div>
                </div>

                <div class="dynamic">
                    <h4>大家在学</h4>
                    <div v-for="(item,index) in schoolmate" :key="index" class="dynamicList">
                        <img :src="item.LogoUrl || a" alt="" srcset="">
                        <div class="dynamicListCont">
                            <div>
                                <p><span>{{item.Name}}</span><span>开始学习</span></p>
                                <p>{{item.Time}}</p>
                            </div>
                            <div>{{item.Info}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <el-dialog :visible.sync="centerDialogVisible" width="500px" center :modal-append-to-body="false" :close-on-click-modal="false" :before-close="shuaxing">
            <div class="buy"> 
                <p class="buyTitle">购买课程</p>
                <div v-if="buyResult">
                    <section class="chuangbi">
                        <img src="~/static/images/chuang.png" alt="" srcset="">
                        <span>-{{collegedetailen.SalePrice/100}}</span>
                    </section>
                    <div class="tip" v-if="userinfor">这将消耗掉{{collegedetailen.SalePrice/100}}枚创币，余额{{userinfor.Balance/100}}创币，购买的课程可在我的课程里找到。</div>
                    <div class="slider">
                        <span>滑动按钮验证</span>
                        <section :style="{width: solidWidth+'%'}">
                            <span v-if="solidWidth == 100">验证通过</span>
                            <img src="~/static/images/right.png" alt="" srcset="">
                        </section>
                        <div class="changeSlider"><el-slider v-model="value" :min="12" @input="changeSliders" :show-tooltip="false" :disabled="isSolid"></el-slider></div>
                    </div>
                    <div class="buyBtn" @click="buyMethod">购买</div>
                </div>
                <div v-else class="isBuyResult">
                    <div v-if="isError">
                        <img class="error" src="~/static/images/error.png" alt="" srcset="">
                        <p>余额不足，充值失败，<span @click="$router.push({name:'index-my'})">去充值</span></p>
                    </div>
                    <div v-else>
                        <img src="~/static/images/success.png" alt="" srcset="">
                        <p>购买成功，你可以在<span @click="$router.push({name:'index-my'})">我的课程</span>里面找到</p>
                    </div>
                </div>
            </div>
        </el-dialog>

        <el-dialog :visible.sync="isBindPhone" width="500px" center :modal-append-to-body="false">
            <div class="logins"> 
                <img class="zhen" src="~/static/images/zhen.png" alt="" srcset="">
                <p>绑定手机号码</p>
                <div>
                    <div class="phone">
                        <div class="phoneValue">
                            <section>+86</section><input v-model="phone" type="text" placeholder="请输入手机号">
                        </div>
                        <div class="send" @click="getCode" :class="{codeActive: !isCode}">{{isCode ? '发送验证码' : time}}</div>
                    </div>
                    <div class="code"><input v-model="code" type="text" placeholder="请输入接收到的验证码"></div>
                    <div class="loginBtn" @click="phoneBind" :class="{loginBtns: phone && code}"><img src="~/static/images/you.png" alt="" srcset=""></div>
                </div>
            </div>
        </el-dialog>

    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Storage from '~/store/storage'
// import 'dplayer/dist/DPlayer.min.css';

export default {
    head:{
        link: [
            { rel: 'stylesheet', href: 'https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css' }
        ],
        script: [
            { src: 'https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js', ssr: false },
        ],
    },
    data(){
        return{
            Kid:'',
            videosTabList:['课程详情','课程目录','课程评价'], centerDialogVisible:false,
            videosTabIndex:0, value:12,
            videoIndex:-1,videoUrl:'',VideoId:'', PageIndex:1,
            a:require('~/static/images/user.png'),
            collegedetailen:'',
            getevaluate:'',
            schoolmate:'',
            userinfor:'',
            playauth:'',
            player:'',
            orderStatus: 1,
            solidWidth: 12,
            isSolid: false,
            buyResult: true,
            isError: false,
            contentP:'',
            xinIndex:-1,
            isPlay: false,
            isEnter: false,
            isMore: true,
            isBindPhone:false, // 是否绑定手机号
            phone:'', code:'',
            isCode: true, time:60,
            isShua:false, // 购买成功点击关闭刷新页面
            isLoadingVideo: true, // 加载视频loading
        }
    },
    computed:{
        // ...mapState({
        //     collegedetailen: state => state.collegedetailen,
        // }),
        // collegedetailen(){
        //     // console.log(this.$store.state.collegedetailen)
        //     if(this.$store.state.collegedetailen == '') this.$store.commit('collegedetailen')
        //     return this.$store.state.collegedetailen
        // },
        // getevaluate(){
        //     if(this.$store.state.getevaluate == '') this.$store.commit('getevaluate')
        //     return this.$store.state.getevaluate
        // }
    }, 
    asyncData({isDev, route, store, env, params, query, req, res, redirect, error}) {
        
        // console.log(query)
        // store.dispatch('collegedetailen', query.id)
    },
    created(){
        this.userinfor = Storage.getLocal('userinfor')
    },
    mounted(){
        this.Kid = this.$route.query.id
        this.getCollegedetailen()
        this.$store.dispatch('schoolmate') // 学员动态
        .then(res=>{
            if(res.IsSuccess){
                this.schoolmate = res.Data
            }
        })
        
        if(this.$store.state.collegedetailen == undefined) {
            this.$store.commit('collegedetailen')
        }
        if ($('html').scrollTop()) {
            $('html').animate({ scrollTop: 0 }, 0);
            return false;
        }
        $('body').animate({ scrollTop: 0 }, 0);
    },
    methods: {
        isBuy(){
            if(this.collegedetailen.SalePrice>0 && this.orderStatus == 1){
                if(this.userinfor == null || this.userinfor == undefined ||this.userinfor == ''){
                    this.$message({
                        message: '请登录',
                        center: true,
                        offset: 50
                    });
                }else if(this.userinfor.Mobile == ''){
                    this.isBindPhone = true
                }else{
                    this.centerDialogVisible = true
                }
            }
        },
        getCode(){
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (myreg.test(this.phone)) {
                if(this.isCode){
                    this.isCode = false
                    let isTime = setInterval(()=>{
                        this.time -= 1
                        if(this.time == 0) {
                            clearInterval(isTime)
                            this.isCode = true
                            this.time = 60
                        }
                    },1000)
                    let data = {
                        Mobile: this.phone, Type: 2
                    }
                    this.$store.dispatch('phoneCode', data)
                    .then(res=>{
                        // console.log(res)
                        if(res.IsSuccess){
                            this.$message({
                                message: '验证码发送成功！',
                                type: 'success',
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
                    })
                }
            }else{
                this.$message({
                    message: '请输入正确的手机号！',
                    type: 'error',
                    center: true,
                    offset: 50
                });
            }
        },
        phoneBind(){
            let data = {
                Mobile: this.phone, Captcha: this.code, FriendCode:''
            }
            if(this.phone && this.code){
                this.$store.dispatch('phoneBind', data)
                .then(res=>{
                    // console.log(res)
                    if(res.IsSuccess){
                        Storage.setLocal(res.Data, 'userinfor')
                        this.$message({
                            message: '绑定成功！',
                            type: 'success',
                            center: true,
                            offset: 50
                        });
                        this.isBindPhone = false
                        // this.$store.commit('isLoading', true)
                        this.userinfor = Storage.getLocal('userinfor')
                        this.$router.go(0)
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
            }
        },
        getCollegedetailen(){ // 课程详情
            this.$store.dispatch('collegedetailen', this.Kid)
            .then(res=>{
                if(res.IsSuccess){
                    this.collegedetailen = res.Data
                    setTimeout(()=>{
                        this.getVideo()
                    },100)
                    if(res.Data.SalePrice > 0){
                        let Goods = [
                            {GoodsType: res.Data.GoodsType, GoodsId: res.Data.Id}
                        ]
                        this.$store.dispatch('status', {Goods, token: this.userinfor?this.userinfor.Token:''})
                        .then(result=>{  // 是否购买
                            // console.log(res)
                            if(result.IsSuccess){
                                this.orderStatus = result.Data.Goods[0].OrderStatus
                                console.log(this.orderStatus)
                                this.$nextTick(()=>{
                                    this.changeVideo(0)
                                    this.videoIndex = 0
                                })
                            }else{
                                if(result.Code === '5002'){
                                    this.$message({
                                        message: result.Message,
                                        center: true,
                                        offset: 50
                                    });
                                }else{
                                    this.$message({
                                        message: result.Message,
                                        type: 'error',
                                        center: true,
                                        offset: 50
                                    });
                                }
                            }
                        })
                    }else{
                        this.$nextTick(()=>{
                            this.changeVideo(0)
                            this.videoIndex = 0
                        })
                    }
                }else{
                    this.$message({
                        message: res.Message,
                        type: 'error',
                        center: true,
                        offset: 50
                    });
                }
            })
        },
        details(id){
            this.Kid = id
            this.getCollegedetailen()
            if ($('html').scrollTop()) {
                $('html').animate({ scrollTop: 0 }, 0);
                return false;
            }
            $('body').animate({ scrollTop: 0 }, 0);
        },
        changeTab(index){
            this.videosTabIndex = index
            if(index == 2){ // 获取评价
                this.PageIndex = 0
                this.isMore= true
                this.$store.dispatch('getevaluate', {CollegeId: this.collegedetailen.CollegeId, PageSize:10, PageIndex: 1})
                .then(res=>{
                    this.getevaluate = res.Data
                })
            }
        },
        changeVideo(index){
            this.videoIndex = index
            console.log(this.orderStatus)
            if(this.orderStatus == 1 && this.collegedetailen.SalePrice > 0){
                this.$message({
                    showClose: true,
                    message: '您还没有购买此课程哦！',
                    type: 'warning',
                    center: true
                });
            }else{
                if(this.collegedetailen.CollegeClass[index].IsEn){
                    this.isLoadingVideo = true
                    var i = 0
                    // setInterval(()=>{
                        this.$store.dispatch('playauth', 
                            {token:Storage.getLocal('userinfor').Token, VideoId: this.collegedetailen.CollegeClass[index].VideoId, ClassId: this.collegedetailen.CollegeClass[index].ClassId})
                        .then(res=>{    // 视频流
                            // console.log(res)
                            if(res.IsSuccess){
                                this.playauth = res.Data
                                this.videoUrl = ''
                                this.VideoId = this.collegedetailen.CollegeClass[index].VideoId
                                
                                if(i == 0){
                                    this.getVideo()
                                }else{
                                    this.player.replayByVidAndPlayAuth(this.VideoId, res.Data)
                                }
                                i++
                            }
                        })
                    // },3000)
                }else{
                    this.videoUrl = this.collegedetailen.CollegeClass[index].VideoUrl
                    this.VideoId = this.collegedetailen.CollegeClass[index].VideoId
                    this.getVideo()
                }
            }
        },
        getVideo(){
            if(!this.player){
                this.player = new Aliplayer({
                    id: "dplayers",
                    source: this.videoUrl,
                    width: "805px",
                    height: "500px",
                    vid: this.VideoId,
                    playauth: this.playauth,
                    qualitySort: "asc",
                    format: "mp4",
                    mediaType: "video",
                    autoplay: this.orderStatus == 1 && this.collegedetailen.SalePrice > 0 ? false : true,
                    isLive: false,
                    rePlay: false,
                    controlBarVisibility:'click',
                    skinLayout:[
                        {name:"bigPlayButton", align:"cc"},
                        {
                        name:"controlBar", align:"blabs", x:0, y:0,
                        children: [
                            {name:"progress", align:"tlabs", x: 0, y:0},
                            {name:"playButton", align:"tl", x:15, y:10},
                            {name:"nextButton", align:"tl", x:10, y:10},
                            {name:"timeDisplay", align:"tl", x:10, y:2},
                            {name:"asd", align:"cc", x:10, y:2},
                            {name:"fullScreenButton", align:"tr", x:10, y:10},
                            {name:"streamButton", align:"tr", x:10, y:10},
                            {name:"volume", align:"tr", x:10, y:10}
                        ]
                        },
                        {
                        name:"fullControlBar", align:"tlabs", x:0, y:0,
                        children: [
                            {name:"fullTitle", align:"tl", x:25, y:6},
                            {name:"fullNormalScreenButton", align:"tr", x:24, y:13},
                            {name:"fullTimeDisplay", align:"tr", x:10, y:12},
                            {name:"fullZoom", align:"cc"}
                        ]
                        }
                    ],
                    playsinline: true,
                    preload: true,
                    useH5Prism: true,
                    // cover: this.videoUrl == '' ? this.collegedetailen.SmallImageUrl : ''
                    cover: this.videoUrl == '' ? 'https://zcxy.oss-cn-beijing.aliyuncs.com/pc/lALPDgQ9q7U09cHNAfTNAyU_805_500.png' : ''
                    },(player)=> {
                        setTimeout(()=>{
                            this.isLoadingVideo = false
                        },1000)
                        player.setCover('https://zcxy.oss-cn-beijing.aliyuncs.com/pc/lALPDgQ9q7U09cHNAfTNAyU_805_500.png')
                        player.on('playing',()=>{
                            this.isPlay = true
                        })
                        player.on('hideBar',()=>{
                            this.isEnter = false
                        })
                        player.on('showBar',()=>{
                            this.isEnter = true
                        })
                    }
                );
            }else{
                // 存在播放器实例则先销毁组件
                this.player.dispose()
                // 将播放器实例重置
                this.player = null
                this.getVideo()
            }
            // if (typeof window !== 'undefined') {
            //     var DPlayer = require('dplayer');
            //     const dp = new DPlayer({
            //     container: document.getElementById('dplayers'),
            //         video: {
            //             url: this.videoUrl,
            //             // url: 'https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4',
            //         }
            //     });   
            // }
        },
        getevaluateMore(){
            this.PageIndex += 1
            this.$store.dispatch('getevaluate', {CollegeId: this.collegedetailen.CollegeId, PageSize:10, PageIndex: this.PageIndex})
            .then(res=>{
                if(res.IsSuccess){
                    if(res.Data.length > 0){
                        this.isMore = true
                        this.getevaluate = this.getevaluate.concat(res.Data)
                    }else{
                        // this.PageIndex ==1?  this.getevaluate = res.Data :''
                        this.isMore = false
                        // this.$message({
                        //     message: '没有更多了！',
                        //     type: 'success',
                        //     center: true,
                        //     offset: 50
                        // });
                    }
                }else{
                    this.$message({
                        message: res.Message,
                        type: 'error',
                        center: true,
                        offset: 50
                    });
                }
            })
        },
        changeSliders(e){
            this.solidWidth = e
            e == 100 ? this.isSolid = true : false
        },
        buyMethod(){
            if(this.value == 100){
                this.$store.dispatch('createorder', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', 
                    GoodsId: this.collegedetailen.Id, PayType: 3, GoodsType: this.collegedetailen.GoodsType})
                .then(res=>{
                    // console.log(res)
                    this.buyResult = false
                    if(res.IsSuccess){
                        this.isError = false
                        this.isShua = true
                    }else{
                        this.isError= true
                        this.$message({
                            message: res.Message,
                            type: 'error',
                            center: true,
                            offset: 50
                        });
                    }
                })
            }
        },
        shuaxing(done){
            done()
            if(this.isShua){
                this.$router.go(0)
            }
        },
        comment(){
            if(this.contentP != ''){
                this.$store.dispatch('addvaluate', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', 
                    CollegeId: this.collegedetailen.CollegeId, Content: this.contentP, Score: this.xinIndex+1, TargetId: ''})
                .then(res=>{
                    // console.log(res.data)
                    if(res.IsSuccess){
                        this.contentP = ''
                        this.xinIndex = -1
                        this.PageIndex = 0
                        this.$message({
                            message: '评价成功',
                            type: 'success',
                            center: true,
                            offset: 50
                        });
                        this.changeTab(2)
                    }else{
                        this.$message({
                            message: res.Message,
                            type: 'error',
                            center: true,
                            offset: 50
                        });
                    }
                })
            }else{
                this.$message({
                    message: '请输入内容',
                    type: 'error',
                    center: true,
                    offset: 50
                });
            }
        },
    }
}
</script>
<style lang="less" scoped>
#playback{
    width: 100%; height: 100%; box-sizing: border-box; background-color: #F7F7F7;
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
.transforms{
    -webkit-text-size-adjust:none; float: left;
    -webkit-transform:scale(0.833);
    transform:scale(0.833);
    -webkit-transform-origin-x: 0;
}

.videos{
    width: 100%; height: 613px; background-color: #5C5C5C; padding: 30px;
    .videosDetails{
        width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; position: relative;
        #dplayers{
            width: 805px; height: 500px; border-radius: 10px; 
        }
        .dplayersTitle{
            width: 400px; text-align: center; position: absolute; bottom: 15px; left: 200px; z-index: 100001; color: white;
        }
        .LoadingVideo{
            width: 805px; height: 100%; position: absolute; top: 0; left: 0; display: flex; justify-content: center; align-items: center; z-index: 100003;
            font-size: 40px; color: white;
        }
        .CourseDetails{
            width: 356px; height: 100%;
            .CourseDetails_{
                width: 100%; height: 223px; background:rgba(0,0,0,0.17); border-radius: 10px; padding: 20px 0;
                .BusinessCardCourse{
                    width: 100%; height: 71px; display: flex; justify-content: space-between; align-items: center;
                    padding: 0 20px;
                    div:nth-child(1){width: 118px; height: 100%;img{width: 100%; height: 100%; border-radius: 5px;}}
                    div:nth-child(2){
                        width: 180px;
                        p{line-height: 20px; color: #FFFFFF;}
                        div:nth-child(1){
                            width: 100%; height: 16px; line-height: 16px; .ellipsis; background: none;
                            color: #FFFFFF; font-size: 15px;font-family:PingFangSC-Semibold;font-weight:600;}
                        p:nth-child(2){color: #939393; font-size: 12px;}
                        p:nth-child(3){line-height: 15px; margin-top: 5px;img{width: 10px; height: 10px; margin-right: 2px;}}
                        p:nth-child(4){font-size: 10px;.transforms;}
                    }
                }
                .videosType{
                    width: 100%; height: 40px; background:rgba(0,0,0,0.05); margin-top: 20px; padding: 0 20px;
                    color: #FFFFFF; font-size: 10px; display: flex; align-items: center; position: relative;
                    div:nth-child(2){margin-left: 15px;}
                    div:nth-child(3){
                        position: absolute; top: 11.5px; right: -8px;
                    }
                }
                .buy{
                    width: 100%; height: 33px; display: flex; justify-content: space-between; align-items: center;
                    padding: 0 20px; margin-top: 20px; color: white;
                    .buyMount{
                        display: flex; font-size: 20px; align-items: center;
                        img{width: 30px; height: 33px; margin-right: 10px;}
                        del{font-size: 16px; color: #6D7278; margin-left: 10px; }
                    }
                    .buyBtn{
                        width: 110px; height: 32px; font-size: 16px; line-height: 32px; cursor: pointer;
                        background:linear-gradient(315deg,rgba(255,94,146,1) 0%,rgba(255,135,52,1) 100%);
                        border-radius: 16px; text-align: center!important; margin: 0px;
                    }
                    .buyBtn:hover{background:linear-gradient(315deg,rgba(255,94,146,.8) 0%,rgba(255,135,52,.8) 100%);}
                }
            }
            // .CourseCont{
            //     width: 100%; height: 226px; margin-top: 30px; background:rgba(0,0,0,0.17); border-radius: 10px; padding: 20px 0;
            //     position: relative;
            //     .Introduction{
            //         width: 100%; padding: 0 20px; color: #B6B6B6; line-height: 18px;
            //         span{color: #FFFFFF;}
            //     }
            //     .buy{
            //         width: 100%; height: 86px; display: flex; justify-content: space-between; align-items: center;
            //         padding: 0 20px; color: white; background:rgba(0,0,0,0.05); position: absolute; bottom: 0;
            //         left: 0; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;
            //         .buyMount{
            //             display: flex; align-items: center;
            //             img:nth-child(1){width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;}
            //             .label{width: 30px; height: 18px; margin-left: 10px;}
            //         }
            //         .Tags{
            //             max-width: 180px;
            //         }
            //     }
            // }
            .catalogList{
                width: 100%; height: 247px; background-color: rgba(0,0,0,0.17); margin-top: 30px;
                border-radius: 10px;
                .catalogListH{
                    width: 100%; height: 47px; background:rgba(0,0,0,0.05); border-radius:10px 10px 0px 0px;
                    line-height: 50px; padding-left: 20px; color: #FFFFFF;
                }
                .catalogListScroll{
                    width: 100%; height: 200px; overflow-y: auto; color: white;
                    div{
                        width: 100%; height: 31px; padding: 0 20px; line-height: 31px;
                        color: #B1B1B1; .ellipsis; cursor: pointer;
                    }
                    .activeVideos{
                        color: #FFFFFF;
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
    width: 1200px; margin: 0 auto; margin-top: 28px; display: flex; justify-content: space-between; padding-bottom: 100px;

    .playbackDetail_left{
        width: 805px; min-height: 538px; border-radius: 10px; background-color: white; padding: 20px; position: relative;
        // 课程目录
        .courseCatalog{
            width: 100%; height: 100%;
            h4{
                font-size: 20px; color: #333333; font-family:PingFangSC-Regular; font-weight:400;
            }
            .directory{
                width: 100%; height: 52px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;
                span{font-size: 14px; color: #D7D7D7;}
                div{
                    width: 737px; height: 100%; border-bottom: 1px solid #EEEEEE;
                    display: flex; justify-content: space-between; align-items: center;
                    span{color: #939393;}
                }
            }
            .activeVideo{
                font-family:PingFangSC-Semibold; font-weight:600;
                span{color: #FC6619;}
                div{
                    color: #333333;
                    span{font-weight:400;}
                }
            }
        }
        // 课程评价
        .CurriculumEvaluation{
            width: 100%; overflow: hidden; padding-bottom: 30px;
            .evaluation{
                width: 100%;display: flex; justify-content: space-between; align-items: center;
                h4{
                    font-size: 20px; color: #333333; font-family:PingFangSC-Regular; font-weight:400;
                }
                img{width: 20px; height: 18px; margin-left: 5px;}
            }
            
            .dynamicList{
                width: 100%; display: flex; justify-content: space-between; border-bottom: 1px solid #F3F3F3;
                padding-top: 15px; padding-bottom: 20px;
                img{width: 40px; height: 40px;}
                .dynamicListCont{
                    width: 710px;
                    div:nth-child(1){
                        display: flex; justify-content: space-between; align-items: center;
                        color: #B1B1B1;
                        span{margin-right: 20px;}
                        div{
                            width: 60px; display: flex; align-items: center;
                            img{width: 10px; height: 10px; margin-left: 2px;}
                        }
                    }
                    div:nth-child(2){
                        width: 533px; color: #515356; margin-top: 3px;
                    }
                }
            }
            .more{
                width: 100%; height: 57px; line-height: 57px; text-align: center; color: #FC6619; background-color: white;
                position: absolute; bottom: 0; left: 0; cursor: pointer; border-radius: 10px;
            }
            .mores{
                color: gray;
            }

            // 输入框
            .communityCommentsList{
                width: 100%; height: 80px; display: flex; align-items: center; margin-bottom: 15px;
                background-color: white; border-radius: 10px; justify-content: space-between; border-bottom: 1px solid #F3F3F3;
                .communityZhenList_logo{
                    width: 40px; height: 40px; text-align: center;
                    .avatar{width: 100%; height: 100%; border-radius: 50%;}
                    .jia{
                        width: 20px; height: 20px; margin-top: 10px;
                    }
                }
                .commentsName{
                    margin-left: 10px; color: #939393; font-size: 14px;
                }
                .communityCommentsList_input{
                    width: 431px; height: 30px; background-color: #F4F4F4; border-radius: 15px;
                    margin-left: 20px; position: relative;
                    input{
                        width: 100%; height: 100%; border: 0; background: none; outline: none;
                        padding-left: 44px;
                    }
                    img{width: 15px; height: 17px; position: absolute; left: 14px; top: 7px;}
                }
                .daxin{
                    width: 60px; display: flex; align-items: center; margin-left: 20px; cursor: pointer;
                    img{width: 10px; height: 10px; margin-left: 2px;}
                }
                .inputBtn{
                    width: 100px; height: 30px; border-radius: 15px; background-color: #FC6619; cursor: pointer;
                    text-align: center; line-height: 30px; color: white; font-size: 14px; margin-left: 20px;
                }
                .inputBtn:hover{
                    background-color: #FF8C51;
                }
            }
        }
    }

    .playbackDetail_right{
        width: 365px;
        // .RelatedCourses{
        //     width: 100%; min-height: 183px; background-color: white; border-radius: 10px; padding-top: 20px; padding-bottom: 10px;
        //     h4{
        //         font-size: 20px; color: #333333; font-family:PingFangSC-Regular; font-weight:400; 
        //         margin-left: 20px;
        //     }
        //     .RelatedCoursesList{
        //         width: 100%; overflow-x: auto; margin-top: 8px;
        //         .RelatedCoursesList_{
        //             display: flex;
        //             section{
        //                 width: 150px; margin-left: 20px; cursor: pointer;
        //                 div{width: 100%; height: 90px;background:rgba(227,227,227,1);border-radius: 5px;img{width: 100%; height: 100%; border-radius: 5px;}}
        //                 p{color: #939393; margin-top: 10px;}
        //             }
        //         }
        //     }
        // }
        .courseInstructor{
            width: 100%; min-height: 278px; background-color: white; border-radius: 10px; padding: 20px;
            font-size: 12px;
            span{color: #333333;}
            .Introduction{
                width: 100%; height: 123px; color: #B6B6B6; line-height: 18px;
                color: #939393;  border-bottom: 1px solid #E8E8E8; overflow: hidden;
            }
            .lecturerIntroduction{
                width: 100%; padding-top: 19px; text-align: center; position: relative; color: #939393;
                span{position: absolute; left: 0; top: 19px;}
                img{width: 50px; height: 50px; border-radius: 50px;}
                p{margin: 5px 0; color: #333333;}
            }
        }

        .dynamic{
            width: 100%; border-radius: 10px; background-color: white; padding: 20px; margin-top: 30px;
            h4{
                font-size: 20px; color: #333333; font-family:PingFangSC-Regular; font-weight:400;
            }
            .dynamicList{
                width: 100%; height: 40px; display: flex; justify-content: space-between; align-items: center;
                margin-top: 18px;
                img{width: 40px; height: 40px; border-radius: 50%;}
                .dynamicListCont{
                    width: 264px;
                    div:nth-child(1){
                        display: flex; justify-content: space-between; align-items: center;
                        color: #939393;
                        p:nth-child(2){display: inline-block; width: 90px; text-align: right;}
                        span{margin-right: 10px;}
                    }
                    div:nth-child(2){ color: #333333;}
                }
            }
        }
    }

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
    .buyBtn{
        width: 231px; height: 50px; margin: 0 auto; margin-top: 30px; border-radius: 25px;
        display: flex; justify-content: center; align-items: center; color: white; font-size: 18px;
        font-family:PingFangSC-Semibold; font-weight:600;
        background:linear-gradient(270deg,rgba(255,94,146,1) 0%,rgba(255,135,52,1) 100%);
        box-shadow:0px 10px 14px 0px rgba(187,81,81,0.28); cursor: pointer;
    }
    .buyBtn:hover{
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






.logins{
    width: 100%; text-align: center; border-radius: 10px;
    .zhen{
        width: 150px; height: 48px; margin-bottom: 25px; margin-top: 15px;
    }
    p{font-size: 20px; color: #333333; font-family:PingFangSC-Semibold; font-weight:600;}
    .phone{
        width: 420px; height: 50px; margin: 0 auto; margin-top: 35px;
        display: flex; justify-content: space-between;
        .phoneValue{
            width: 290px; height: 100%; background-color: #F3F3F3; border-radius: 25px;
            display: flex;
            section{
                width: 70px; height: 100%; border-radius: 25px; background-color: #D1D1D1;
                text-align: center; line-height: 50px; font-size: 14px; color: #939393;
            }
            input{
                width: 220px; height: 100%; background: none; outline: none; border: 0; padding-left: 10px;
            }
        }
        .send{
            width: 120px; height: 100%; border-radius: 25px; line-height: 50px; text-align: center;
            background-color: #FC6619; color: white; cursor: pointer;
        }
        .send:hover{background-color: #FF8C51;}
        .codeActive{background-color: #D8D8D8;}
        .codeActive:hover{background-color: #D8D8D8;}
    }
    .code{
        width: 420px; height: 50px; background-color: #F3F3F3; border-radius: 25px; margin: 0 auto; margin-top: 20px;
        input{
            width: 100%; height: 100%; background: none; outline: none; border: 0; padding-left: 22px;
        }
    }
    .loginBtn{
        width: 231px; height: 50px; margin: 0 auto; margin-top: 30px; border-radius: 25px; margin-bottom: 50px;
        background-color: #D8D8D8; display: flex; justify-content: center; align-items: center;
        img{
            width: 23px; height: 20px;
        }
    }
    .loginBtns{
        background:linear-gradient(270deg,rgba(255,94,146,1) 0%,rgba(255,135,52,1) 100%);
        box-shadow:0px 10px 14px 0px rgba(187,81,81,0.28); cursor: pointer;
    }
    .loginBtns:hover{
        background:linear-gradient(270deg,rgba(255,94,146,.8) 0%,rgba(255,135,52,.8) 100%);
    }


    .wxLogin{
        width: 240px; margin: 0 auto; margin-top: 10px; font-size: 14px; color: #333333; position: relative;
        img{width: 100%; height: 240px;}
        .shuaxing{
            width: 100%; height: 240px; position: absolute; top: 0; left: 0; cursor: pointer;
            background: rgba(255,255,255,0.7); display: flex; justify-content: center; align-items: center;
            img{width: 80px; height: 80px;}
        }
    }


    .other{
        width: 300px; margin: 0 auto; margin-top: 40px;
    }
    .wx{
        width: 44px; height: 44px; margin-top: 18px; cursor: pointer;
    }
    span{color: #FC6619; font-size: 14px; cursor: pointer;}
}



</style>


