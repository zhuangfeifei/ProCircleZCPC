import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import Api from '../axios/api'

const store = ()=> new Vuex.Store({

    state:{
        imgUrl:'192.168.1.157',
        indexUrlActive:0,
        getHomeList:'',
        asd:''
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
        asd(state, res){
            state.asd = res
        },
    },

    actions:{
        setImg({state,commit,dispatch}, img){
            commit('changeImg', img)
        },
        getHomeList({commit}){
            console.log(1)
            Api('get','/pc/api/v1/combination/home').then(res=>{
                console.log(res.data)
                if(res.data.IsSuccess){
                    commit('getHomeList', res.data.Data)
                }
            },err=>{

            })
        },
        asd({commit}){
            console.log(1)
            Api('post','/zcxy/api/v1/manager/user/GetUserList', {PageSiz: 10, PageIndex: 1}).then(res=>{
                console.log(res.data)
                if(res.data.IsSuccess){
                    console.log(res.data.Date)
                    commit('asd', res.data.Date)
                }
            },err=>{

            })
        },
    }

})

export default store