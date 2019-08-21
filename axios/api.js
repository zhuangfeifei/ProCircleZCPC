import Vue from 'vue'
import axios from 'axios'
// import $ from 'jquery'
import { Loading } from 'element-ui';
// import qs from 'qs'

let urls = false ? '/axios' : 'https://www.proseer.cn/zcxypc/api'
let loading

axios.defaults.baseURL = urls

// 请求拦截
axios.interceptors.request.use(function (config) {
    // loading = Loading.service({
    //     lock: true,
    //     text: '加载中...',
    //     spinner: 'el-icon-loading',
    //     background: 'rgba(0, 0, 0, 0)',
    //     // target:'#__nuxt'
    // });
    
    return config

  }, function (error) {
    
    return Promise.reject(error)
})

// 请求
const fetch = (method , url, token, params = '') => {
    
    axios.defaults.headers.post['Content-Type'] = 'application/json'
    axios.defaults.headers.post['Token'] = token
    
    // 判断是否是FormData
    const data = params
    // const data = qs.stringify(params)
    //   const data = Object.prototype.toString.call(params) === '[object FormData]' ? params : headers.Content_Type === 'application/json' ? params : params == '' ? params : JSON.stringify(params)   
    return new Promise((resolve, reject) => {
        axios({method, url, data})
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            reject(error)
        })
    })
} 

// 响应拦截
axios.interceptors.response.use(function (response) {
    
    loading && loading.close();

    return response;

  }, function (error) {
      
    loading && loading.close();
    
    return Promise.reject(error)
})

export default fetch