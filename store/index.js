import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Api from '../axios/api'

const store = ()=> new Vuex.Store({

    state:{
        imgUrl:'192.168.1.157',
        indexUrlActive:'0',
        getHomeList:'',// 首页
        category:'',  // 课程分类
        collegelist:'',  // 课程分类列表
    },

    mutations:{
        changeImg(state, res){
            state.imgUrl = res
        },
        indexUrlActive(state, res){
            state.indexUrlActive = res
        },
        getHomeList(state, res){
            state.getHomeList = res
        },
        category(state, res){
            state.category = res
        },
        collegelist(state, res){
            state.collegelist = res
        },
    },

    actions:{
        setImg({state,commit,dispatch}, img){
            commit('changeImg', img)
        },
        getHomeList({commit}){ // 首页
            Api('get','/combination/home').then(res=>{
                console.log(res.data)
                if(res.data.IsSuccess){
                    commit('getHomeList', res.data.Data)
                }
            },err=>{

            })
        },
        category({commit, dispatch}){  // 课程分类
            Api('post','/college/category').then(res=>{
                console.log(res.data)
                if(res.data.IsSuccess){
                    // console.log(res.data.Date)
                    commit('category', res.data.Data)
                    let data = {
                        CategoryId: res.data.Data[0].CategoryId, PageIndex: 1, PageSize: 10, Type: 1
                    }
                    dispatch('collegelist', data)
                }
            },err=>{

            })
        },
        collegelist({commit}, datas){  // 课程分类列表
            Api('post','/college/collegelist', datas).then(res=>{
                console.log(res.data)
                if(res.data.IsSuccess){
                    // console.log(res.data.Date)
                    commit('collegelist', res.data.Data)
                }
            },err=>{

            })
        },
        phoneCode({commit}, datas){  // 获取验证码
            Api('post','/user/captcha', datas).then(res=>{
                console.log(res.data)
                if(res.data.IsSuccess){
                    // console.log(res.data.Date)
                }
            },err=>{

            })
        },
        register({commit}, datas){  // 注册
            Api('post','/user/register', datas).then(res=>{
                console.log(res.data)
                if(res.data.IsSuccess){
                    // console.log(res.data.Date)
                }
            },err=>{

            })
        },
        login({commit}, datas){  // 登录
            Api('post','/user/login', {Mobile:'', Pwd:''}).then(res=>{
                console.log(res.data)
                if(res.data.IsSuccess){
                    // console.log(res.data.Date)
                }
            },err=>{

            })
        },
        quicklogin({commit}, datas){  // 快速登录
            Api('post','/user/quicklogin', {Mobile:'', Captcha:'', FriendCode:''}).then(res=>{
                console.log(res.data)
                if(res.data.IsSuccess){
                    // console.log(res.data.Date)
                }
            },err=>{

            })
        },
        logout({commit}, datas){  // 退出登录
            Api('post','/user/logout', datas).then(res=>{
                console.log(res.data)
                if(res.data.IsSuccess){
                    // console.log(res.data.Date)
                }
            },err=>{

            })
        },
    }

})

export default store