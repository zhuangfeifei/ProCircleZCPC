import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Api from '../axios/api'
import Storage from './storage'
// Vue.use(Storage)

const store = ()=> new Vuex.Store({

    state:{
        imgUrl:'192.168.1.157',
        indexUrlActive:'0',
        getHomeList:'',// 首页
        collegedetailen:'',// 课程详情
        getevaluate:'',// 评论列表
        category:'',  // 课程分类
        collegelist:'',  // 课程分类列表
        isTop: true,  // top
        isLoading: false,  // top
        centerDialogVisible: false,  // login
        userinfor: '',  // 用户信息
    },

    mutations:{
        indexUrlActive(state){
            // console.log(Storage.getLocal('indexUrlActive'))
            state.indexUrlActive = Storage.getLocal('indexUrlActive')
        },
        isTop(state, res){
            state.isTop = res
        },
        isLoading(state, res){
            // console.log(res)
            state.isLoading = res
        },
        centerDialogVisible(state, res){
            state.centerDialogVisible = res
        },
        getHomeList(state){
            state.getHomeList = Storage.getLocal('getHomeList')
        },
        collegedetailen(state){
            state.collegedetailen = Storage.getLocal('collegedetailen')
        },
        getevaluate(state){
            state.getevaluate = Storage.getLocal('getevaluate')
        },
        userinfor(state){
            state.userinfor = Storage.getLocal('userinfor')
        },
    },

    actions:{
        getLocal({}, res){
            Storage.getLocal(res)
        },
        setLocal({}, res){
            Storage.setLocal(res.data, res.name)
        },

        // 登录
        phoneCode({commit}, datas){  // 获取验证码
            return Api('post','/user/captcha', '', datas).then(res=>{
                // console.log(res.data)
                    return res.data
            },err=>{
                return err
            })
        },
        quickLogin({commit}, datas){  // 快速登录
            return Api('post','/user/quicklogin', '', datas).then(res=>{
                // console.log(res.data)
                if(res.data.IsSuccess){
                    // console.log(res.data.Date)
                    Storage.setLocal(res.data.Data, 'userinfor')
                    commit('userinfor')
                }
                return res.data
            },err=>{
                return err
            })
        },
        phoneBind({commit}, datas){  // 绑定手机号
            return Api('post','/user/pcwx/bind', '', datas).then(res=>{
                // console.log(res.data)
                if(res.data.IsSuccess){
                    // console.log(res.data.Date)
                    Storage.setLocal(res.data.Data, 'userinfor')
                    commit('userinfor')
                }
                return res.data
            },err=>{
                return err
            })
        },
        getcache({commit}, token){  // 获取用户信息(缓存)
            return Api('post','/user/getcache', token,).then(res=>{
                // console.log(res.data)
                if(res.data.IsSuccess){
                    // console.log(res.data.Date)
                    Storage.setLocal(res.data.Data, 'userinfor')
                    setTimeout(()=>{
                        commit('userinfor')
                        commit('isLoading', true)
                    },100)
                }else{
                    commit('isLoading', false)
                }
                return res.data
            },err=>{

            })
        },
        wxloginurl({commit},datas){ // PC微信扫码
            return Api('post','/user/pc/wxloginurl', '', datas).then(res=>{
                // console.log(res.data)
                return res.data
            },err=>{

            })
        },
        wxlogin({commit}, datas){ // PC微信扫码登录
            return Api('post','/user/pc/wxlogin', '', datas).then(res=>{
                // console.log(res.data)
                if(res.data.IsSuccess){
                    // console.log(res.data.Date)
                    Storage.setLocal(res.data.Data, 'userinfor')
                    commit('userinfor')
                }
                return res.data
            },err=>{

            })
        },
        logout({commit}, token){ // 退出登录
            return Api('post','/user/logout', token,).then(res=>{
                // console.log(res.data)
                return res.data
            },err=>{

            })
        },




        // 首页
        getHomeList({commit}){ // 首页
            Api('get','/combination/pc/home', '',).then(res=>{
                // console.log(res.data)
                if(res.data.IsSuccess){
                    Storage.setLocal(res.data.Data, 'getHomeList')
                    commit('getHomeList')
                }
            },err=>{

            })
        },
        collegedetailen({commit}, collegeId){ // 课程详情
            return Api('get',`/college/collegedetailen/${collegeId}`, '',).then(res=>{
                // console.log(res.data)
                if(res.data.IsSuccess){
                    Storage.setLocal(res.data.Data, 'collegedetailen')
                    commit('collegedetailen')
                    return res.data
                }
            },err=>{

            })
        },
        playauth({commit}, datas){ // 课程解码
            return Api('post','/college/playauth', datas.token, datas).then(res=>{
                // console.log(res.data)
                if(res.data.IsSuccess){
                    // Storage.setLocal(res.data.Data, 'getevaluate')
                    // commit('getevaluate')
                }
                return res.data
            },err=>{

            })
        },
        status({commit}, datas){  // 判断是否购买
            return Api('post','/order/status',datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        getevaluate({commit}, datas){ // 评论列表
            return Api('post','/college/getevaluate', '', datas).then(res=>{
                // console.log(res.data)
                if(res.data.IsSuccess){
                    Storage.setLocal(res.data.Data, 'getevaluate')
                    commit('getevaluate')
                }
                return res.data
            },err=>{

            })
        },
        schoolmate({commit}, datas){ // 学员动态
            return Api('get','/combination/schoolmate', '').then(res=>{
                // console.log(res.data)
                if(res.data.IsSuccess){
                    
                }
                return res.data
            },err=>{

            })
        },
        addvaluate({commit}, datas){ // 课程评价
            return Api('post','/college/addvaluate', datas.token, datas).then(res=>{
                // console.log(res.data)
                if(res.data.IsSuccess){
                    
                }
                return res.data
            },err=>{

            })
        },


        // 在线课程
        category({commit, dispatch}){  // 课程分类
            return Api('post','/college/pc/category','').then(res=>{
                // console.log(res.data)
                if(res.data.IsSuccess){
                    // console.log(res.data.Date)
                    // commit('category', res.data.Data)
                    let data = {
                        CategoryIdr: '', CategoryIdr2: '', DataOrderType: 1, DataOrderWay: 1, SearchCollegeName:'',
                        PageIndex: 1, PageSize: 10,
                    }
                    // dispatch('collegelist', data)
                }
                return res.data
            },err=>{

            })
        },
        collegelist({commit}, datas){  // 课程分类列表
            return Api('post','/college/pc/search','', datas).then(res=>{
                // console.log(res.data)
                if(res.data.IsSuccess){
                    // console.log(res.data.Date)
                    // commit('collegelist', res.data.Data)
                }
                return res.data
            },err=>{

            })
        },
        recommend({commit}, datas){  // 【推荐】教师+课程
            return Api('get','/college/pc/recommend','', datas).then(res=>{
                return res.data
            },err=>{

            })
        },



        // 线下活动
        activityCategory({commit}){  // 活动分类
            return Api('get','/activity/category','').then(res=>{
                return res.data
            },err=>{

            })
        },
        activityList({commit},datas){  // 活动列表
            return Api('post','/activity/list',datas.token,datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        activityDetail({commit},datas){  // 活动详情
            return Api('post',`/activity/detail/${datas.activityId}`,datas.token,datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        bannerInfo({commit},datas){  // 获取banner
            return Api('get',`/banner/info?groupName=${datas}`,'',).then(res=>{
                return res.data
            },err=>{

            })
        },



        // 新闻动态
        newsCategory({commit},datas){  // 新闻分类
            return Api('get',`/news/category`,'',).then(res=>{
                return res.data
            },err=>{

            })
        },
        newsList({commit},datas){  // 新闻列表
            return Api('post',`/news/list`,'', datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        newsDetail({commit}, newsId){  // 新闻详情
            return Api('get',`/news/detail/${newsId}`,'',).then(res=>{
                return res.data
            },err=>{

            })
        },




        // 箴创社区
        articleList({commit},datas){  // 动态列表
            return Api('post',`/article/list`,datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        commentlist({commit},datas){  // 动态评论列表
            return Api('post',`/article/commentlist`,datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        replylist({commit},datas){  // 动态评论回复列表
            return Api('post',`/article/replylist`,'', datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        myArticle({commit},datas){  // 我的发帖
            return Api('post',`/article/my`, datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        addArticle({commit},datas){  // 发表动态
            return Api('post',`/article/add`, datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        comment({commit},datas){  // 发表评论、回复
            return Api('post',`/article/comment`, datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        getmyfavoriate({commit},datas){  // 我的收藏
            return Api('post',`/article/getmyfavoriate`, datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        zan({commit},datas){  // 点赞
            return Api('post',`/combination/zan`, datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        collect({commit},datas){  // 收藏
            return Api('post',`/combination/collect`, datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },



        // 个人中心
        getUser({commit},datas){  // 获取用户信息
            return Api('post',`/user/get`, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        myCollege({commit},datas){  // 我的课程
            return Api('post',`/college/my`, datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        myCollegeFavoriate({commit},datas){  // 我的收藏课程
            return Api('post',`/college/getmyfavoriate`, datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        myActivity({commit},datas){  // 我的活动
            return Api('post',`/activity/my`, datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        createorder({commit},datas){  // 创建订单
            return Api('post',`/order/createorder`, datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        myorder({commit},datas){  // 订单记录
            return Api('post',`/order/my`, datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        updateUser({commit},datas){  // 用户信息修改 
            return Api('post',`/user/update`, datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        feedback({commit},datas){  // 用户反馈
            return Api('post',`/combination/feedback`, datas.token, datas).then(res=>{
                return res.data
            },err=>{

            })
        },
        


        
        // register({commit}, datas){  // 注册
        //     Api('post','/user/register', datas).then(res=>{
        //         console.log(res.data)
        //         if(res.data.IsSuccess){
        //             // console.log(res.data.Date)
        //         }
        //     },err=>{

        //     })
        // },
        // login({commit}, datas){  // 登录
        //     Api('post','/user/login', {Mobile:'', Pwd:''}).then(res=>{
        //         console.log(res.data)
        //         if(res.data.IsSuccess){
        //             // console.log(res.data.Date)
        //         }
        //     },err=>{

        //     })
        // },
    }

})

export default store