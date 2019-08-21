<template>
    <div id="community">
        <div class="swiper">
            <el-carousel height="300px">
                <el-carousel-item v-for="(item,index) in bannerInfo" :key="index">
                    <div class="swiper_imgs">
                        <img :src="item.ImageUrl" alt="" srcset="">
                        <!-- <img @click="$router.push({name:'index-playback', query:{id:37}})" src="~/static/images/banner.jpg" alt="" srcset=""> -->
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="community">
            <div class="communityLeft">
                <div class="communityTab">
                    <div class="titleList">
                        <div v-for="(item,index) in tabTitle" :key="index" @click="handleSelect(index)">
                            <span :class="{activeClass: index==tabIndex}">{{item.title}}</span>
                            <section v-if="index < tabTitle.length -1"></section>
                        </div>
                    </div>
                </div>
                <div class="communityMain">
                    <el-collapse accordion @change="changes">
                        <el-collapse-item class="communityMainList" :name="index" v-for="(item,index) in articleList.Data" :key="index">
                            <template slot="title">
                                <!-- 贴子 -->
                                <div @click.once="getCommentlist" class="communityZhenList">
                                    <section class="communityZhenList_logo">
                                        <img class="avatar" :src="item.UserImg || a" alt="" srcset="">
                                        <!-- <img class="jia" src="~/static/images/jia.png" alt="" srcset=""> -->
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
                                            <span>{{item.CreateTime}}</span>
                                            <div>
                                                <el-tooltip class="item" effect="dark" content="收藏" placement="top">
                                                    <img @click.stop="collect(4, item, index)" :src="require('~/static/images/'+(item.IsCollect?'xin':'xins')+'.png')" alt="" srcset="">
                                                </el-tooltip>
                                                <el-tooltip class="item" effect="dark" content="点赞" placement="top">
                                                    <img @click.stop="zanMethod(4, item, index, 0)" :src="require('~/static/images/'+(item.IsZan?'zan':'zans')+'.png')" alt="" srcset="">
                                                </el-tooltip>
                                                <span>（{{item.LikeCount}}）</span>
                                                <el-tooltip class="item" effect="dark" content="评论" placement="top">
                                                    <img src="~/static/images/pin.png" alt="" srcset="">
                                                </el-tooltip>
                                                <span>（{{item.ReplyCount}}）</span>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </template>
                            <!-- 评论 -->
                            <div class="communityComments" v-if="item.IsComment">
                                <!-- 输入框 -->
                                <div class="communityCommentsList">
                                    <section class="communityZhenList_logo">
                                        <img class="avatar" :src="userinfor.LogoUrl || a" alt="" srcset="">
                                    </section>
                                    <p class="commentsName">{{userinfor.UserName}}</p>
                                    <div class="communityCommentsList_input">
                                        <input type="text" v-model="contentP" placeholder="评论">
                                        <img src="~/static/images/xiugai.png" alt="" srcset="">
                                    </div>
                                    <div @click="comment(item.Id)" class="inputBtn">评论</div>
                                </div>
                                <!-- 评论内容 -->
                                <div v-for="(itemTwo,indexTwo) in item.CommentList" :key="indexTwo" class="commentsContent">
                                    <div class="commentsContent_title">
                                        <img @click="getReply(index,indexTwo)" class="avatars" :src="itemTwo.UserImg || a" alt="" srcset="">
                                        <div @click="getReply(index,indexTwo)" class="commentsContent_cont">
                                            <p><span>{{itemTwo.UserName || '匿名用户'}}</span><span>{{itemTwo.CreateTime}}</span></p>
                                            <div>{{itemTwo.Content}}</div>
                                        </div>
                                        <div class="huifu">
                                            <el-popover placement="bottom-end" width="550" v-model="itemTwo.visible">
                                                <div class="communityCommentsList_input">
                                                    <input class="communityCommentsList_input_" v-model="contentH" type="text" :placeholder="'回复@ '+itemTwo.UserName+' ：'">
                                                    <img class="communityCommentsList_input_xiu" src="~/static/images/xiugai.png" alt="" srcset="">
                                                </div>
                                                <span @click="commentH(item.Id, itemTwo.Id, index, indexTwo)" class="communityCommentsList_input_huifu">回复</span>
                                                <span class="communityCommentsList_input_huifu_btn" slot="reference">回复</span>
                                            </el-popover>
                                            <el-tooltip class="item" effect="dark" content="点赞" placement="top">
                                                <img @click.stop="zanMethod(1, itemTwo, index, indexTwo)" :src="require('~/static/images/'+(itemTwo.IsZan?'zan':'zans')+'.png')" alt="" srcset="">
                                            </el-tooltip>
                                        </div>
                                    </div>
                                    <div v-if="itemTwo.IsReply && itemTwo.ReplyList.length > 0" class="huifuCont">
                                        <p v-for="(itemThree, indexThree) in itemTwo.ReplyList" :key="indexThree">
                                            <span>{{itemThree.UserName}}：</span>{{itemThree.Content}}
                                        </p>
                                    </div>
                                </div>
                                <div @click="getCommentlist()" class="commentsMore">{{isMore ? '查看更多' : '没有更多了'}}</div>
                            </div>
                        </el-collapse-item>
                    </el-collapse>
                    
                </div>
                <div class="paging">
                    <el-pagination :background="true" layout="prev, pager, next" :total="articleList.TotalCount/5*10"
                        @current-change="changeCurrent">
                    </el-pagination>
                </div>
            </div>
            
            <div class="communityRight">
                <div class="opinion">
                    <textarea placeholder="说说你的看法" v-model="content" required maxlength="500" cols="30" rows="10"></textarea>
                    <img class="opinion_xiu" src="~/static/images/xiugai.png" alt="" srcset="">
                    <div class="opinion_send">
                        <section>
                            <img class="avatars" :src="userinfor.LogoUrl || a" alt="" srcset="">
                            <span>{{userinfor.UserName}}</span>
                        </section>
                        <div @click="addArticle">发表</div>
                    </div>
                </div>

                <!-- <div class="HotTopic">
                    <span>热门话题</span>
                    <p>AntV 是蚂蚁金服全新一代数据可视化解决方案，致力于提供一套简单方便、专业可靠、无限可能的数据可视化最佳实践。</p>
                    <p>Ant Design是一个服务于企业级产品的设计体系，基于『确定』和『自然』的设计价值观和模块化的解决方案，让设计者专注于更好的用户体验。</p>
                    <p>从 2015 年 4 月起，Ant Design 在蚂蚁金服中后台产品线迅速推广，对接多条业务线，覆盖系统 800 个以上。定位于中台业务的 Ant Design 兼顾专业和非专业的设计人员，具有学习成本低、上手速度快、实现效果好等特点，并且提供从界面设计到前端开发的全链路生态，可以大大提升设计和开发的效率。</p>
                </div> -->

                <div class="post">
                    <h4>我的发帖
                        <span>{{myArticle.length ==0?'（未发帖）':''}}</span>
                    </h4>
                    <div class="postList" v-if="index < 2" :class="{postListEnd:index==1}" v-for="(item,index) in myArticle" :key="index">
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


    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Storage from '~/store/storage'
export default {
    data(){
        return{
            count: 15, classIndex:0, value1: '', c:'',
            tabTitle:[
                {title:'最新', url:'index-onlineCourses'},
                {title:'最热', url:'index'},
            ], 
            tabIndex:0,
            onlineCoursesIndex: 0,
            list:[
                {listItem:[
                    {visible:false},
                    {visible:false},
                    {visible:false},
                ]},
                {listItem:[
                    {visible:false},
                    {visible:false},
                    {visible:false},
                ]},
                {listItem:[
                    {visible:false},
                    {visible:false},
                    {visible:false},
                ]},
                {listItem:[
                    {visible:false},
                    {visible:false},
                    {visible:false},
                ]},
            ],
            visible: false,
            a: require('~/static/images/user.png'),
            dataList:{
                OrderType:2, PageSize: 5, PageIndex: 1
            },
            commentlistIndex:0,
            articleList:[],
            isMore: true, // 没有更多了
            myArticle:[],  // 我的发帖
            getmyfavoriate:[],  // 我的收藏
            content:'', // 发帖
            contentP:'', // 评论
            contentH:'', // 回复
            bannerInfo:''
        }
    },
    computed:{
        ...mapState({
            // getHomeList: state => state.getHomeList,
            // category: state => state.category,
            // collegelist: state => state.collegelist,
        }),
    }, 
    created(){
        this.userinfor = Storage.getLocal('userinfor')?Storage.getLocal('userinfor'):''
        this.$store.dispatch('bannerInfo',encodeURI('PC箴创社区滚动栏'))
        .then(res=>{
            // console.log(res)
            if(res.IsSuccess){
                this.bannerInfo = res.Data
            }
        })
        this.getArticleList()
        this.getMy()
        this.getmyfavoriateMethod()
    },
    methods: {
        handleSelect(index) {
            this.tabIndex = index
            this.dataList.OrderType = index == 0 ? 2 : 1
            this.getArticleList()
        },
        details(){
            this.$router.push({name: 'index-playback'})
        },
        getArticleList(){ // 获取发帖列表
            this.dataList.token = Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'',
            this.$store.dispatch('articleList', this.dataList)
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.articleList = res
                }
            })
        },
        changes(e){
            if(typeof e == 'number'){
                this.commentlistIndex = e
            }
        },
        getCommentlist(){ // 获取评论列表
            setTimeout(()=>{
                this.$store.dispatch('commentlist', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', ArticleId: this.articleList.Data[this.commentlistIndex].Id, PageSize: 5, 
                    PageIndex: this.articleList.Data[this.commentlistIndex].commentIndex || 1})
                .then(res=>{
                    // console.log(res)
                    if(res.IsSuccess){
                        this.articleList.Data[this.commentlistIndex].CommentList = this.articleList.Data[this.commentlistIndex].CommentList && this.articleList.Data[this.commentlistIndex].commentIndex == 1 ? res.Data : this.articleList.Data[this.commentlistIndex].CommentList.concat(res.Data)
                        this.articleList.Data[this.commentlistIndex].commentIndex = this.articleList.Data[this.commentlistIndex].commentIndex ? this.articleList.Data[this.commentlistIndex].commentIndex + 1 : 2
                        this.articleList.Data[this.commentlistIndex].IsComment = true
                        this.isMore = res.Data.length == 0 ? false : true
                    }
                })
            },100)
        },
        getReply(ArticleIndex,CommentIndex){  // 获取回复列表
            this.$store.dispatch('replylist', 
                {ArticleId: this.articleList.Data[ArticleIndex].Id, CommentId: this.articleList.Data[ArticleIndex].CommentList[CommentIndex].Id, 
                    PageSize: 50, PageIndex: 1})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.articleList.Data[ArticleIndex].CommentList[CommentIndex].ReplyList = res.Data
                    // 关闭、显示回复
                    this.articleList.Data[ArticleIndex].CommentList[CommentIndex].IsReply = !this.articleList.Data[ArticleIndex].CommentList[CommentIndex].IsReply
                    // console.log(this.articleList)
                }
            })
        },
        addArticle(){ // 发帖
            this.$store.dispatch('addArticle', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', Content: this.content, CategoryId: 22})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.$message({
                        message: '发送成功！',
                        type: 'success',
                        center: true,
                        offset: 350
                    });
                    this.content = ''
                    this.getArticleList()
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
        comment(id){ // 发评论
            this.$store.dispatch('comment', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', Content: this.contentP, ArticleId: id, CommentId:0, TargetUserId:0})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                   this.$message({
                        message: '评论成功！',
                        type: 'success',
                        center: true,
                        offset: 350
                    });
                    this.contentP = ''
                    // this.getArticleList()
                    this.articleList.Data[this.commentlistIndex].commentIndex = 1
                    this.articleList.Data[this.commentlistIndex].ReplyCount += 1
                    this.getCommentlist()
                }
            })
        },
        commentH(ArticleId, CommentId, index, indexTwo){ // 回复
            this.$store.dispatch('comment', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', Content: this.contentH, ArticleId, CommentId, TargetUserId:0})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                   this.$message({
                        message: '回复成功！',
                        type: 'success',
                        center: true,
                        offset: 350
                    });
                    this.contentH = ''
                    this.articleList.Data[index].CommentList[indexTwo].IsReply = false  // 关闭回复
                    this.articleList.Data[index].CommentList[indexTwo].visible = false  // 关闭回复框
                    this.getReply(index, indexTwo)
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
        getmyfavoriateMethod(){ // 我的收藏
            this.$store.dispatch('getmyfavoriate', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', PageSize: 2, PageIndex: 1})
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.getmyfavoriate = res.Data
                }
            })
        },
        zanMethod(TargetType, item, index, indexTwo){ // 点赞
            this.$store.dispatch('zan', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', TargetType, TargetId: item.Id, Oper: item.IsZan?0:1 })
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    if(TargetType == 4){
                        this.articleList.Data[index].IsZan = !this.articleList.Data[index].IsZan
                        this.articleList.Data[index].LikeCount += item.IsZan?1:-1
                    }else{
                        this.articleList.Data[index].CommentList[indexTwo].IsZan = !this.articleList.Data[index].CommentList[indexTwo].IsZan
                    }
                    
                }
            })
        },
        collect(TargetType, item, index){ // 收藏
            this.$store.dispatch('collect', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', TargetType, TargetId: item.Id, Oper: item.IsCollect?0:1 })
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.articleList.Data[index].IsCollect = !this.articleList.Data[index].IsCollect
                    this.getmyfavoriateMethod()
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
        changeCurrent(index){
            this.dataList.PageIndex = index
            this.getArticleList()
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
#community{
    width: 100%; height: 100%; box-sizing: border-box; background-color: #F7F7F7; padding-top: 30px;
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


.community{
    width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; margin-top: 30px; padding-bottom: 50px;
    .communityLeft{
        width: 805px; position: relative; height: 100%;
        .communityTab{
            width: 100%; display: flex; justify-content: space-between;
        }
        .titleList{
            height: 30px; display: flex; font-size: 18px;font-family:PingFangSC-Regular;font-weight:400;
            align-items: center; color: #515356;
            .activeClass{ color: #FF5E1B; }
            div{
                width: 60px; cursor: pointer; margin-right: 19px;
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
        .communityMain{
            width: 100%; margin-top: 30px;
            .communityMainList{margin-bottom: 15px;}
            .communityZhenList{
                width: 100%; padding: 15px 20px; border-radius: 10px; 
                display: flex; justify-content: space-between; background-color: #FFFFFF;
                .communityZhenList_logo{
                    width: 40px; height: 40px; margin-top: 5px; text-align: center;
                    .avatar{width: 100%; height: 100%; border-radius: 50%;}
                    .jia{
                        width: 20px; height: 20px; margin-top: 10px;
                    }
                }
                .communityZhenListCont{
                    width: 700px; height: 100%; color: #939393; font-size: 14px; 
                    .communityZhenListName{
                        width: 100%; height: 20px; display: flex; justify-content: space-between; align-items: center;
                        img{width: 11px; height: 15px; margin-left: 11px;}
                    }
                    .communityZhenListCont_{
                        width: 100%; margin-top: 10px; color: #515356;
                    }
                    .message{
                        width: 100%; display: flex; align-items: center; justify-content: space-between; margin-top: 10px;
                        img{width: 11px; height: 11px; margin-left: 20px;}
                    }
                }
            }

            .communityComments{
                width: 100%; padding: 30px 20px;
                // 输入框
                .communityCommentsList{
                    width: 100%; height: 40px; display: flex; align-items: center; margin-bottom: 15px;
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
                    .inputBtn{
                        width: 100px; height: 30px; border-radius: 15px; background-color: #FC6619; cursor: pointer;
                        text-align: center; line-height: 30px; color: white; font-size: 14px; margin-left: 43px;
                    }
                    .inputBtn:hover{
                        background-color: #FF8C51;
                    }
                }
                // 评论内容
                .commentsContent{
                    width: 695px; border-bottom: 1px solid #F3F3F3; margin-left: 54px; padding: 20px 0; cursor: pointer;
                    .commentsContent_title{
                        width: 100%;  display: flex;
                        .avatars{width: 40px; height: 40px;}
                        .commentsContent_cont{
                            width: 540px; margin-left: 25px;
                            p{color: #B1B1B1; span:nth-child(2){margin-left: 20px;}}
                        }
                        .huifu{
                            width: 60px; margin-left: 25px; display: flex; justify-content: space-between;
                            margin-top: 14px; color: #BFBFBF; font-size: 14px;
                            img{width: 15px; height: 15px; cursor: pointer;}
                            .communityCommentsList_input{
                                width: 431px; height: 30px; background-color: #F4F4F4; border-radius: 15px;
                                margin-left: 20px; position: relative;
                                input{
                                    width: 100%; height: 100%; border: 0; background: none; outline: none;
                                    padding-left: 44px;
                                }
                                img{width: 15px; height: 17px; position: absolute; left: 14px; top: 7px;}
                            }
                        }
                    }
                    .huifuCont{
                        width: 641px; border: 1px solid #E9E9E9; padding: 10px; color: #515356; margin-left: 60px;
                        margin-top: 10px;
                        span{color: #B1B1B1}
                    }
                }
                .commentsMore{
                    width: 100%; text-align: center; color: #FC6619; margin-top: 20px; cursor: pointer;
                }
            }
        }
        .paging{
            width: 100%; height: 100px; display: flex; justify-content: center; align-items: center;
            margin-top: -15px;
        }
    }


    .communityRight{
        width: 365px; padding-top: 60px;
        .opinion{
            width: 100%; height: 260px; background-color: white; padding: 30px 30px 15px 30px; border-radius: 10px;
            position: relative;
            textarea{
                width: 100%; height: 160px; resize: none; border: 0; background-color: #F4F4F4; outline: none; border-radius: 5px;
                padding: 10px; overflow: hidden; text-indent: 25px; line-height: 20px;
            }
            .opinion_xiu{
                width: 15px; height: 17px; position: absolute;; top: 40px; left: 40px;
            }
            .opinion_send{
                width: 100%; height: 40px; display: flex; justify-content: space-between; align-items: center;
                color: #939393; font-size: 14px; margin-top: 10px; 
                section{
                    display: flex; align-items: center;
                    img{width: 40px; height: 40px; border-radius: 50%; margin-right: 10px;}
                }
                div{
                    width: 100px; height: 30px; text-align: center; line-height: 30px; color: white; 
                    background-color: #FC6619; border-radius: 15px; cursor: pointer;
                }
                div:hover{
                    background-color: #FF8C51;
                }
            }
        }

        .HotTopic{
            width: 100%; height: 352px; background-color: white; border-radius: 10px; margin-top: 30px; padding: 20px;
            span{font-size: 20px; color: #333333;}
            p{color: #515356; margin-top: 25px; line-height: 17px;}
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


</style>


