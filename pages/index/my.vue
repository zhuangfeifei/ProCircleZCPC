<template>
    <div id="my">

        <div class="my">
            <div class="myLeft">
                <div class="myinfor">
                    <div>
                        <img :src="userinfor.LogoUrl" alt="" srcset="">
                        <p>{{userinfor.UserName}}</p>
                    </div>
                    <div>
                        <p><span>姓名</span><input @blur.prevent="updateUser" type="text" v-model="userinfor.IdName"><span>性别</span><span>{{userinfor.Sex==0?'男':userinfor.Sex==1?'女':''}}</span></p>
                        <p><span>手机号</span><span>{{userinfor.Mobile}}</span></p>
                        <p><span>公司</span><input type="text" v-model="userinfor.CompanyName"></p>
                        <p><span>主营产品</span><input type="text" v-model="userinfor.CompanyExperience"></p>
                        <p><span>职位</span><input type="text" v-model="userinfor.CompanyPosition"></p>
                        <p><span>现居地</span><input type="text" v-model="userinfor.LiveCity"></p>
                    </div>
                    <img class="zhuyi" src="~/static/images/zhuyi.png" alt="" srcset="">
                    <h3 @click="logout" class="out">退出此账号</h3>
                </div>

                <div class="my_course">
                    <div class="myTab">
                        <div class="titleList">
                            <p>我的课程<span>（{{myCollegeList.length}}门）</span></p>
                        </div>
                        <!-- <div class="titleList Amount">
                            <div v-for="(item,index) in tabTitleAmount" :key="index" @click="handleSelect(index)">
                                <span :class="{activeClass: index==tabIndex}">{{item.title}}</span>
                                <section v-if="index == 1"></section>
                            </div>
                        </div> -->
                    </div>
                    <div class="freeClassesMain">
                        <div class="freeClassesList" @click="details(item.Id)" v-for="(item,index) in myCollegeList" :key="index">
                            <section><img :src="item.SmallImageUrl" alt="" srcset=""></section>
                            <h4>{{item.Title}}</h4>
                        </div>
                    </div>
                    <p v-if="myCollegeList.length>=4" @click="myCollege" class="more" :class="{isMore: !myCollegeListMore}">{{myCollegeListMore?'查看更多':'没有更多了'}}</p>
                </div>

                <!-- <div class="my_course">
                    <div class="myTab">
                        <div class="titleList">
                            <p>收藏的课程<span>（{{myCollegeFavoriateList.length}}门）</span></p>
                        </div>
                    </div>
                    <div class="freeClassesMain">
                        <div class="freeClassesList" @click="details(item.Id)" v-for="(item,index) in myCollegeFavoriateList" :key="index">
                            <section><img :src="item.SmallImageUrl" alt="" srcset=""></section>
                            <h4>{{item.Title}}</h4>
                        </div>
                    </div>
                    <p v-if="myCollegeFavoriateList.length>=4" @click="myCollegeFavoriate" class="more" :class="{isMore: !myCollegeFavoriateMore}">{{myCollegeFavoriateMore?'查看更多':'没有更多了'}}</p>
                </div> -->


                <div class="my_course">
                    <div class="myTab">
                        <div class="titleList">
                            <p>我的活动<span>（{{myActivityList.length}}个）</span></p>
                        </div>
                    </div>
                    <div class="freeClassesMain">
                        <div class="freeClassesList" @click="detailsActivity(item.Id)" v-for="(item,index) in myActivityList" :key="index">
                            <section><img :src="item.SmallImageUrl" alt="" srcset=""></section>
                            <h4>{{item.Title}}</h4>
                        </div>
                    </div>
                    <p v-if="myActivityList.length>=4" @click="myActivity" class="more" :class="{isMore: !myActivityListMore}">{{myActivityListMore?'查看更多':'没有更多了'}}</p>
                </div>

                <!-- <div class="post">
                    <h4>关注的导师<span>（5位）</span></h4>
                    <div class="FocusOn">
                        <section v-for="(item,index) in 5" :key="index">
                            <img class="avatars" :src="a" alt="" srcset="">
                            <p>James Clark</p>
                        </section>
                    </div>
                </div> -->
                <!-- <div class="paging">
                    <el-pagination :background="true" layout="prev, pager, next" :total="50">
                    </el-pagination>
                </div> -->
            </div>
            
            <div class="communityRight">
                <div class="topUp">
                    <div class="topUpTitle">
                        <section>
                            <img src="~/static/images/chuang.png" alt="" srcset=""><span>{{userinfor.Balance/100}}个</span>
                        </section>
                        <div @click="getcache">充值</div>
                    </div>
                    <div class="topUpList_Y">
                        <div v-for="(item,index) in myorderList" :key="index" class="topUpList">
                            <section></section>
                            <div>{{item.Title}}</div>
                            <span>{{item.DateTime}}</span>
                        </div>
                    </div>
                </div>

                <div class="post">
                    <h4>我的发帖
                        <span>{{myArticle.length ==0?'（未发帖）':''}}</span>
                    </h4>
                    <div class="postList" v-if="index < 2" :class="{postListEnd:index==1}" v-for="(item,index) in myArticle" :key="index">
                        <p>{{item.Content}}</p>
                        <section class="message">
                            <div>
                                <img src="~/static/images/zan.png" alt="" srcset="">
                                <span>（{{item.LikeCount}}）</span>
                                <img src="~/static/images/pin.png" alt="" srcset="">
                                <span>（{{item.ReplyCount}}）</span>
                            </div>
                        </section>
                    </div>
                    <!-- <h4>我关注的学友<span>（5位）</span></h4>
                    <div class="FocusOn">
                        <section v-for="(item,index) in 5" :key="index">
                            <img class="avatars" :src="a" alt="" srcset="">
                            <p>James Clark</p>
                        </section>
                    </div> -->
                </div>

                <div class="post collectionPost">
                    <h4>收藏的帖子
                        <span>{{getmyfavoriate.length==0?'（未收藏）':''}}</span>
                    </h4>
                    <div class="postList" v-if="index < 2" v-for="(item,index) in getmyfavoriate" :key="index">
                        <p>{{item.Content}}</p>
                        <section class="message">
                            <div>
                                <img src="~/static/images/zans.png" alt="" srcset="">
                                <span>（{{item.LikeCount}}）</span>
                                <img src="~/static/images/pins.png" alt="" srcset="">
                                <span>（{{item.ReplyCount}}）</span>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        </div>


        <el-dialog :visible.sync="centerDialogVisible" width="500px" center :modal-append-to-body="false">
            <div class="buy"> 
                <p class="buyTitle">充值创币</p>
                <div class="h5">充值账号：{{userinfor.Mobile}}（此账号）<span v-if="!isPay" @click="isPay = true">返回到金额选择</span></div>
                <div v-if="isPay" class="amount">
                    <div class="amountList">
                        <div class="amountList_cont" v-for="(item,index) in amountList" :key="index">
                            <div class="amounts" @click="changeAmount(index)">
                                <div>
                                    <h4 :class="{amountActive:amountIndex == index}">{{item}}<span>枚</span></h4>
                                    <p>￥{{item}}</p>
                                </div>
                            </div>
                            <img v-if="amountIndex == index" src="~/static/images/Rectangle.png"/>
                        </div>
                    </div>
                    <div class="PaymentMethod">
                        <span>支付方式：</span>
                        <img @click="isWx = false" src="~/static/images/zhifubaos.png" alt="">
                        <img @click="isWx = true" src="~/static/images/wxs.png" alt="">
                        <div @click="createorder" class="buyBtn">充值</div>
                    </div>
                    <div class="changeGou">
                        <div class="gou" @click="isWx = false"><img v-if="!isWx" src="~/static/images/gou.png" alt=""></div>
                        <div class="gou" @click="isWx = true"><img v-if="isWx" src="~/static/images/gou.png" alt=""></div>
                    </div>
                </div>
                <div v-else class="result">
                    <div v-if="!isPayEnd && payImgCode.PayType == 1" class="wxImgs">
                        <img class="wxImg" :src="payImgCode.PayExtend" alt="" srcset="">
                        <section v-if="isGuoqi" class="zhen"><img @click="createorder" src="~/static/images/shuaxing.png" alt="" srcset=""></section>
                        <p>请使用微信扫描二维码<br/>支付“<span>{{amountList[amountIndex]}}</span>元”充值<span>{{amountList[amountIndex]}}</span>创币</p>
                    </div>
                    <div v-else>
                        <img class="undraw_bitcoin2_ave" src="~/static/images/undraw_bitcoin2_ave.png" alt="" srcset="">
                        <p><img src="~/static/images/dui.png" alt="" srcset="">
                            您已成功充值“{{amountList[amountIndex]}}”创币，<br/>当前余额{{userinfor.Balance}}创币</p>
                    </div>
                </div>
            </div>
            <div class="buyTip">
                1.创币可用于购买箴创学院小程序内所有课程<br/>
                2.创币为虚拟币，充值后创币不会过期，但无法提现和转赠他人<br/>
                3.1人民币=1创币
            </div>
        </el-dialog>

        <div id="zhifubaos">
            <div v-html="payImgCode.PayExtend"></div>
        </div>

    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Storage from '~/store/storage'
export default {
    data(){
        return{
            count: 15, classIndex:0, value1: '',centerDialogVisible:false,
            tabTitleAmount:[
                {title:'按购买时间', url:'index'},
                {title:'按学习时间', url:'index-onlineCourses'},
            ], 
            tabIndex:0,
            classTab:[
                {name:'全部'},{name:'企业管理'},{name:'电商运营'},{name:'供应链'},
                {name:'知识产权'},{name:'支付/资金/财税'},{name:'营销推广'}
            ],
            onlineCoursesIndex: 0,
            amountList:[0.01,68,188,288,388,588], amountIndex: 0,
            a:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJAuNSJZJicFdlibpltSzPicp6qftFriclpN6iaKk6N1dgNBu8zyQ2OUueMZ9ghqxAQYsHwiaKdd1B5zgOg/132',
            userinfor:'',
            getmyfavoriate:[],
            myArticle:[],
            myCollegeList:[],
            myCollegeFavoriateList:[],
            myActivityList:[],
            isWx:false, // 是否微信支付
            isPay: true, // 是否支付
            payImgCode:'', // 微信支付码
            isGuoqi: false, // 是否过期
            isPayEnd: false, // 是否支付成功
            setInterval:'', time:600,
            myorderList:[], // 支付纪律
            myCollegePageIndex:0, // 我的课程
            myCollegeListMore: true, // 我的课程
            myCollegeFavoriatePageIndex:0, // 我收藏的课程
            myCollegeFavoriateMore: true, // 我收藏的课程
            myActivityListPageIndex:0, // 我的活动
            myActivityListMore: true, // 我的活动
            isResult: false

            
        }
    },
    computed:{
        ...mapState({
            getHomeList: state => state.getHomeList,
            category: state => state.category,
            collegelist: state => state.collegelist,
        }),
        noMore () {
            return this.count >= 20
        },
        disabled () {
            return this.loading || this.noMore
        }
    }, 
    created(){
        this.getUser()

        this.getMy()
        this.getmyfavoriateMethod()
        this.myCollege()
        this.myCollegeFavoriate()
        this.myorder()
        this.myActivity()
    },
    methods: {
        updateUser(){
            let list = {
                Id: this.userinfor.Id, IdName: this.userinfor.IdName, CompanyName: this.userinfor.CompanyName, CompanyProduct: this.userinfor.LiveProvince, 
                CompanyPosition: this.userinfor.CompanyPosition, LiveCity: this.userinfor.LiveCity,
                token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:''
            }
            this.$store.dispatch('updateUser', list)
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    // this.userinfor = res.Data
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
        handleSelect(index) {
            this.tabIndex = index
        },
        classActives(index){
            this.classIndex = index
            let datas = {
                CategoryId: this.category[index].CategoryId, PageIndex: 1, PageSize: 10, Type: 1
            }
            // console.log(this.category[index].CategoryId,index)
            this.$store.dispatch('collegelist', datas)
        },
        changeClass(index){
            this.onlineCoursesIndex = index
        },
        details(id){
            this.$router.push({name: 'index-playback',query:{id}})
        },
        detailsActivity(id){
            this.$router.push({name: 'index-eventDetails',query:{activityId: id}})
        },
        changeAmount(index){
            this.amountIndex = index
        },
        getUser(){
            this.$store.dispatch('getUser', Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'')
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.userinfor = res.Data
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
        getMy(){ // 获取我的发帖列表
            this.$store.dispatch('myArticle', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', PageSize: 2, PageIndex: 1})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.myArticle = res.Data
                }
            })
        },
        myCollege(){ // 我的课程
            this.myCollegePageIndex += 1
            this.$store.dispatch('myCollege', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', PageSize: 4, PageIndex: this.myCollegePageIndex})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    if(res.Data.length > 0){
                        this.myCollegeList = this.myCollegeList.concat(res.Data)
                    }else{
                        this.myCollegeListMore = false
                    }
                }
            })
        },
        getmyfavoriateMethod(){ // 我的收藏
            this.$store.dispatch('getmyfavoriate', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', PageSize: 2, PageIndex: 1})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.getmyfavoriate = res.Data
                }
            })
        },
        myCollegeFavoriate(){ // 我的收藏课程
            this.myCollegeFavoriatePageIndex += 1
            this.$store.dispatch('myCollegeFavoriate', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', PageSize: 4, PageIndex: this.myCollegeFavoriatePageIndex})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    if(res.Data.length > 0){
                        this.myCollegeFavoriateList = this.myCollegeFavoriateList.concat(res.Data)
                    }else{
                        this.myCollegeFavoriateMore = false
                    }
                }
            })
        },
        myActivity(){ // 我的活动
            this.myActivityListPageIndex += 1
            this.$store.dispatch('myActivity', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', PageSize: 4, PageIndex: this.myActivityListPageIndex})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    if(res.Data.length > 0){
                        this.myActivityList = this.myActivityList.concat(res.Data)
                    }else{
                        this.myActivityListMore = false
                    }
                }
            })
        },
        getcache(){ // 获取用户信息
            this.$store.dispatch('getcache', Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'')
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.centerDialogVisible = true
                }
            })
        },
        createorder(){ // 创建订单
            this.$store.dispatch('createorder', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', 
                GoodsId: this.amountList[this.amountIndex]*100, PayType: this.isWx?1:2, GoodsType: 3, IsRefresh: this.isGuoqi})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.payImgCode = res.Data
                    if(this.isWx){
                        this.isPay = false
                        setTimeout(()=>{
                            this.isGuoqi = true
                        }, 600000)
                        this.setInterval = setInterval(()=>{
                            this.time == 0 ? clearInterval(this.setInterval) : this.isPayEndMethod()
                            this.time --
                        },1000)
                    }else{
                        let times = 3
                        let zhi = setInterval(()=>{
                            times == 0 ? clearInterval(zhi) : $('#alipaysubmit').submit()
                            times --
                        },150)
                    }
                }
            })
        },
        myorder(){ // 购买记录
            this.$store.dispatch('myorder',  {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', PageSize: 50, PageIndex: 1})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.myorderList = res.Data
                    
                }
            })
        },
        isPayEndMethod(){ // 判断是否支付完成
            let Goods = [
                {GoodsType: 3, GoodsId: this.amountList[this.amountIndex]*100}
            ]
            this.$store.dispatch('status', {Goods, token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:''})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    if(res.Data.Goods[0].OrderStatus == 2){
                        this.isPayEnd = true
                    } 
                }
            })
        },
        logout(){
            this.$store.dispatch('logout', Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'')
            .then((res)=>{
                // console.log(res)
                if(res.IsSuccess){
                    Storage.setLocal('','userinfor')
                    this.$message({
                        message: '退出成功！',
                        type: 'success',
                        center: true,
                        offset: 50
                    });
                    this.$router.push({name:'index'})
                    this.$router.go(0)
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
    },
    watch:{
        isPayEnd(val,old){
            if(val){
                this.getUser()
            }
        },
        centerDialogVisible(val,old){
            if(!val){
                this.isPay = true
                this.isWx = false
                this.amountIndex = 0
            }
        }
    }
}
</script>
<style lang="less" scoped>
#my{
    width: 100%; height: 100%; box-sizing: border-box; background-color: #F7F7F7; padding-top: 30px; position: relative;
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


.my{
    width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; padding-bottom: 85px;
    .myLeft{
        width: 805px; position: relative;
        .myinfor{
            width: 100%; height: 300px; margin-bottom: 30px; display: flex; position: relative;
            div:nth-child(1){
                width: 300px; height: 100%; background: url('../../static/images/zhenfang.png') no-repeat;
                background-size: 100% 100%; font-size: 24px; color: #FFFFFF; text-align: center;
                img{width: 90px; height: 90px; border-radius: 50%; margin-top: 66px; margin-bottom: 20px;}
            }
            div:nth-child(2){
                width: 507px; height: 100%; background: url('../../static/images/sanjiao.png') no-repeat;
                background-size: 100% 100%; display: flex; flex-flow: column; justify-content: space-around;
                padding-left: 40px; font-size: 14px; 
                p{
                    color: #333333;
                    input{color: #999999; border: 0; outline: none; background: none; padding-left: 20px;}
                    span:nth-child(2n){color: #999999; margin-left: 20px;}
                }
            }
            .out{
                font-size: 12px; cursor: pointer; color: #FC6619; position: absolute; right: 16px; bottom: 16px;
            }
            .zhuyi{
                width: 20px; height: 20px; position: absolute; top: 16px; right: 16px;
            }
        }

        .my_course{
            width: 100%; background-color: #FFFFFF; padding: 20px; border-radius: 10px; margin-bottom: 30px;
            .myTab{
                width: 100%; display: flex; justify-content: space-between;
            }
            .titleList{
                height: 30px; display: flex; font-size: 18px;font-family:PingFangSC-Regular;font-weight:400;
                align-items: center; color: #515356;
                p{span{color: #939393; font-size: 14px;}}
                .activeClass{ color: #FF5E1B; }
                div{
                    width: 113px; cursor: pointer; margin-right: 19px;
                    section{
                        width: 2px; height: 16px; background-color: #EEEEEE; float: right; margin-top: 5px;
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
                    width: 176px; margin-top: 20px; margin-right: 20px; cursor: pointer;
                    section{
                        width: 100%; height: 106px; background-color: #E3E3E3; 
                        img{width: 100%; height: 100%;}
                    }
                    section:hover{box-shadow:0px 0px 10px 0px rgba(0,0,0,0.2);}
                    h4{color: #515356; margin-top: 15px;}
                }
                .freeClassesList:nth-child(4n){
                    margin-right: 0;
                }
            }
            .more{
                text-align: center; color: #FC6619; cursor: pointer; margin-top: 5px;
            }
            .isMore{color: gray;}
        }

        .post{
            width: 100%; background-color: white; border-radius: 10px; margin-top: 30px; padding: 20px;
            h4{
                font-size: 20px; color: #333333;font-family:PingFangSC-Regular;font-weight:400;
                span{font-size: 14px; color: #939393;}
            }
            .FocusOn{
                width: 100%; display: flex; flex-wrap: wrap; margin-top: 30px;
                section{
                    width: 125px; text-align: center; color: #939393; margin-right: 35px; margin-bottom: 20px;
                    img{width: 93px; height: 93px; border-radius: 50%; margin-bottom: 5px;}
                }
                section:nth-child(5n){margin-right: 0;}
            }
        }

        .paging{
            width: 100%; display: flex; justify-content: center; position: absolute; bottom: 30px; left: 0;
        }
    }


    .communityRight{
        width: 365px; 
        .topUp{
            width: 100%; height: 300px; background-color: white; border-radius: 10px; padding: 13px 20px;
            .topUpTitle{
                width: 100%; height: 85px; border-bottom: 1px solid #F3F3F3; display: flex; justify-content: space-between;
                align-items: center; padding-bottom: 10px;
                section{
                    height: 65px; display: flex; align-items: center; font-size: 30px; color: #333333;font-family:PingFangSC-Semibold;
                    font-weight:600;
                    img{width: 55px; height: 65px; margin-right: 20px;}
                }
                div{
                    width: 77px; height: 30px; border-radius: 15px; border: 1px solid #FC6619; cursor: pointer;
                    color: #FC6619; text-align: center; line-height: 30px; font-size: 18px;
                }
            }
            .topUpList_Y{
                width: 100%; height: 190px; overflow-y: auto;
                .topUpList{
                    width: 100%; height: 15px; color: #939393; display: flex; align-items: center;
                    margin-top: 12px;
                    section{width: 8px; height: 8px; border-radius: 50%; background-color: #939393;}
                    div{width: 225px; height: 100%; margin-left: 8px; height: 14px; line-height: 14px; .ellipsis;}
                    span{margin-left: 20px;}
                }
            }
        }

        .post{
            width: 100%; background-color: white; border-radius: 10px; margin-top: 30px; padding: 20px;
            h4{
                font-size: 20px; color: #333333;font-family:PingFangSC-Regular;font-weight:400;
                span{font-size: 14px; color: #939393;}
            }
            .postList{
                width: 100%; border-bottom: 1px solid #F3F3F3; padding: 20px 0; font-size: 14px;
                .message{
                    width: 100%; display: flex; align-items: center; justify-content: flex-end; margin-top: 10px;
                    img{width: 11px; height: 11px; margin-left: 20px;}
                }
            }
            .postListEnd{border-bottom: 0; margin-bottom: 10px;}
            .postList:nth-child(2n){border-bottom: 0!important;}
            .FocusOn{
                width: 100%; display: flex; flex-wrap: wrap; margin-top: 15px;
                section{
                    text-align: center; color: #939393; margin-right: 16px; margin-bottom: 20px;
                    img{width: 50px; height: 50px; border-radius: 50%; margin-bottom: 5px;}
                }
                section:nth-child(4n){margin-right: 0;}
            }
        }
        .collectionPost{
            .postList:last-child{border-bottom: 0;}
        }
    }
}




.buy{
    width: 360px; margin: 0 auto; 
    .buyTitle{color: #333333; text-align: center; font-size: 20px; font-family:PingFangSC-Semibold; font-weight:600;}
    .h5{margin-top: 30px; display: flex; justify-content: space-between; align-items: center;
        font-size: 14px; span{ color: #FC6619; cursor: pointer;}
    }

    .amountList{
        width: 100%; display: flex; justify-content: space-between; flex-wrap: wrap; box-sizing: border-box; text-align: center;
        .amountList_cont{
            width: 106px; height: 60px; background-color: #F5F5F5; border-radius: 4px; text-align: center; position: relative;
            margin-top: 26px;  color: #939393;
            h4{font-size: 18px; color: #333333;font-family:PingFangSC-Regular; font-weight:400;}
            .amountActive{color: #FC6619;}
            .amounts{
                width: 100%; height: 100%; display: flex; justify-content: center; align-items: center;
                position: absolute; top: 0; left: 0; z-index: 10;font-size: 12px;
                p{font-size: 12px;}
            }
            img{width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 1;}
        }
    }

    .result{
        width: 100%; text-align: center; padding-top: 20px;
        .undraw_bitcoin2_ave{width: 200px; height: 216px; margin-bottom: 28px;}
        .wxImgs{position: relative;}
        .wxImg{width: 240px; height: 240px; margin-bottom: 5px;}
        .zhen{
            width: 240px; height: 240px; position: absolute; top: 0; left: 0; display: flex; align-items: center; justify-content: center;
            background-color: rgba(255, 255, 255, 0.9);
            img{width: 80px; height: 80px;}
        }
        p{img{width: 20px; height: 14px;} span{color: #FC6619;}}
    }

    .PaymentMethod{
        width: 100%; height: 50px; display: flex; justify-content: space-between; align-items: center; margin-top: 30px; cursor: pointer;
    }
    .changeGou{
        display: flex; width: 95px; margin-left: 90px; justify-content: space-between; padding: 0 10px; margin-top: 3px;
        .gou{
            width: 15px; height: 15px; border-radius: 50%; cursor: pointer; background-color: rgba(0,0,0,0.25); img{width: 100%; height: 100%;}
        }
    }

    .buyBtn{
        width: 150px; height: 50px; border-radius: 25px;
        display: flex; justify-content: center; align-items: center; color: white; font-size: 18px;
        font-family:PingFangSC-Semibold; font-weight:600;
        background:linear-gradient(270deg,rgba(255,94,146,1) 0%,rgba(255,135,52,1) 100%);
        box-shadow:0px 10px 14px 0px rgba(187,81,81,0.28); cursor: pointer;
    }
    .buyBtn:hover{background:linear-gradient(270deg,rgba(255,94,146,.8) 0%,rgba(255,135,52,.8) 100%);}

}

.buyTip{
    width: 100%; height: 102px; background-color: #EDEDED; padding: 20px 28px; margin-top: 30px;
    font-size: 14px; color: #939393; line-height: 20px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px;
}



#zhifubaos{
    opacity: 0; position: absolute; bottom: -1000px; left: 0;
}

</style>


