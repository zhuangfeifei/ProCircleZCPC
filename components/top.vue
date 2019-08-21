<template>
    <div id="top">
        <div v-if="isTop" class="login_top">
            <img src="~/static/images/zhen.png" alt="" srcset="">
            <div class="login_Btn" v-if="!isLoading" @click="routers">登录/注册</div>
            <div v-else class="tuichu">
                <img @click="router" class="LogoUrl" :src="userinfor.LogoUrl || userinfors.LogoUrl" alt="" srcset="">
                <span @click="logout">退出</span>
            </div>
        </div>
        <div v-if="isTop" class="nav">
            <div class="titleList">
                <div v-for="(item,index) in tabTitle" :key="index" @click="handleSelect(index)">
                    <span :class="{activeClass: index==indexUrlActive}">{{item.title}}</span>
                    <section v-if="index < 4"></section>
                </div>
            </div>
        </div>

        <div v-else class="header">
            <div class="titleList">
                <img src="~/static/images/zhen.png" alt="" srcset="">
                <div v-for="(item,index) in tabTitle" :key="index" @click="handleSelect(index)">
                    <span :class="{activeClass: index==indexUrlActive}">{{item.title}}</span>
                    <section v-if="index < 4"></section>
                </div>
                <div v-if="!isLoading" class="login" @click="routers">登录/注册</div>
                <img v-else @click="router" class="header_pro" :src="userinfor.LogoUrl || userinfors.LogoUrl" alt="" srcset="">
            </div>
        </div>

        <el-dialog :visible.sync="centerDialogVisible" width="500px" center :modal-append-to-body="false">
            <div class="logins"> 
                <img class="zhen" src="~/static/images/zhen.png" alt="" srcset="">
                <p>登录箴创学院</p>
                <div v-if="!isWx">
                    <div class="phone">
                        <div class="phoneValue">
                            <section>+86</section><input v-model="phone" type="text" placeholder="请输入手机号">
                        </div>
                        <div class="send" @click="getCode" :class="{codeActive: !isCode}">{{isCode ? '发送验证码' : time}}</div>
                    </div>
                    <div class="code"><input v-model="code" type="text" placeholder="请输入接收到的验证码"></div>
                    <div class="loginBtn" @click="quickLogin" :class="{loginBtns: phone && code}"><img src="~/static/images/you.png" alt="" srcset=""></div>
                </div>
                <div v-else class="wxLogin">
                    <img :src="wxCode" alt="" srcset="">
                    <div>请使用微信扫描二维码登录<br/>“箴创学院”</div>
                </div>
                <div class="other"><el-divider>其它登录方式</el-divider></div>
                <img v-if="!isWx" class="wx" @click="wxMethod" src="~/static/images/wxs.png" alt="" srcset="">
                <span v-else @click="isWx=false">手机验证码登录</span>
            </div>
        </el-dialog>

        <!-- <div id="tangchuang" v-if="centerDialogVisible">
            <div class="logins"> 
                <img class="zhen" src="~/static/images/zhen.png" alt="" srcset="">
                <p>登录箴创学院</p>
                <div v-if="!isWx">
                    <div class="phone">
                        <div class="phoneValue">
                            <section>+86</section><input v-model="phone" type="text" placeholder="请输入手机号">
                        </div>
                        <div class="send" @click="getCode" :class="{codeActive: !isCode}">{{isCode ? '发送验证码' : time}}</div>
                    </div>
                    <div class="code"><input v-model="code" type="text" placeholder="请输入接收到的验证码"></div>
                    <div class="loginBtn" @click="quickLogin" :class="{loginBtns: phone && code}"><img src="~/static/images/you.png" alt="" srcset=""></div>
                </div>
                <div v-else class="wxLogin">
                    <img :src="wxCode" alt="" srcset="">
                    <div>请使用微信扫描二维码登录<br/>“箴创学院”</div>
                </div>
                <div class="other"><el-divider>其它登录方式</el-divider></div>
                <img v-if="!isWx" class="wx" @click="wxMethod" src="~/static/images/wxs.png" alt="" srcset="">
                <span v-else @click="isWx=false">手机验证码登录</span>
            </div>
        </div> -->

    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Storage from '~/store/storage'
export default {
    props:['userinfor'],
    data(){
        return{
            isWx: false,
            userinfors:'',
            tabTitle:[
                {title:'首页', url:'index'},
                {title:'在线课程', url:'index-onlineCourses'},
                {title:'线下活动', url:'index-offlineActivities'},
                {title:'新闻动态', url:'index-news'},
                {title:'箴创社区', url:'index-community'},
            ], 
            activeIndex: 0,centerDialogVisible: false,
            phone:'', code:'',
            isCode: true, time:60,
            a:'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJAuNSJZJicFdlibpltSzPicp6qftFriclpN6iaKk6N1dgNBu8zyQ2OUueMZ9ghqxAQYsHwiaKdd1B5zgOg/132',
            wxCode:'',
            urlPage:''
        }
    },
    computed:{
        ...mapState({
            isTop: state => state.isTop,
            isLoading: state => state.isLoading,
        }),
        indexUrlActive() {
            if(this.$store.state.indexUrlActive == '0' || this.$store.state.indexUrlActive == undefined){
                this.$store.commit('indexUrlActive')
            }
            return this.$store.state.indexUrlActive
        },
    },
    created(){
        // console.log(Storage.getLocal('userinfor'))
        this.userinfors = Storage.getLocal('userinfor')
        // console.log(this.userinfors)
        
    },
    methods:{
        handleSelect(index) {
            this.$store.dispatch('setLocal', { data:index, name:'indexUrlActive'})
            this.$store.commit('indexUrlActive')
            this.$router.push({name: this.tabTitle[index].url})
            setTimeout(()=>{
                if ($('html').scrollTop()) {
                    $('html').animate({ scrollTop: 0 }, 0);
                    return false;
                }
                $('body').animate({ scrollTop: 0 }, 0);
            },150)
        },
        routers(){
            Storage.clear()
            setTimeout(()=>{
                this.centerDialogVisible = true
            },100)
        },
        router(){
            this.$router.push({name:'index-my'})
            setTimeout(()=>{
                if ($('html').scrollTop()) {
                    $('html').animate({ scrollTop: 0 }, 0);
                    return false;
                }
                $('body').animate({ scrollTop: 0 }, 0);
            },150)
        },
        getUsers(){
            this.$store.dispatch('getcache', Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'')
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    // this.$store.commit('isLoading', true)
                    // this.$router.go(0)
                }else{
                    // this.$store.commit('isLoading', false)
                    this.$message({
                        message: res.Message,
                        type: 'error',
                        center: true,
                        offset: 50
                    });
                }
            })
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
        quickLogin(){
            let data = {
                Mobile: this.phone, Captcha: this.code, FriendCode:''
            }
            if(this.phone && this.code){
                this.$store.dispatch('quickLogin', data)
                .then(res=>{
                    // console.log(res)
                    if(res.IsSuccess){
                        Storage.setLocal(res.Data, 'userinfor')
                        this.$message({
                            message: '登录成功！',
                            type: 'success',
                            center: true,
                            offset: 50
                        });
                        this.centerDialogVisible = false
                        // this.$store.commit('isLoading', true)
                        this.userinfors = Storage.getLocal('userinfor')
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
        wxMethod(){
            this.$store.dispatch('wxloginurl', {UrlSuffix: this.urlPage})
            .then((res)=>{
                // console.log(res)
                if(res.IsSuccess){
                    this.wxCode = res.Data
                    // this.$router.push({name:'index-wxLogin', query:{wxCode: res.Data}})
                    window.location.href = res.Data
                    // this.isWx=true
                }
            })
        },
        logout(){
            this.$store.dispatch('logout', Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'')
            .then((res)=>{
                // console.log(res)
                if(res.IsSuccess){
                    Storage.setLocal('','userinfor')
                    Storage.clear()
                    this.$store.commit('isLoading', false)
                    this.$message({
                        message: '退出成功！',
                        type: 'success',
                        center: true,
                        offset: 50
                    });
                    this.$router.go(0)
                }
            })
        },
    },
    watch: {
      $route: {
        handler: function(val, oldVal){
            // console.log(val)
            this.urlPage = val.fullPath
            if(val.name === 'index') {
                this.$store.dispatch('setLocal', { data:0, name:'indexUrlActive'})
                this.$store.commit('indexUrlActive')
            }
            if(val.name === 'index-onlineCourses') {
                this.$store.dispatch('setLocal', { data:1, name:'indexUrlActive'})
                this.$store.commit('indexUrlActive')
            }
            if(val.name === 'index-offlineActivities') {
                this.$store.dispatch('setLocal', { data:2, name:'indexUrlActive'})
                this.$store.commit('indexUrlActive')
            }
            if(val.name === 'index-news') {
                this.$store.dispatch('setLocal', { data:3, name:'indexUrlActive'})
                this.$store.commit('indexUrlActive')
            }
            if(val.name === 'index-community') {
                this.$store.dispatch('setLocal', { data:4, name:'indexUrlActive'})
                this.$store.commit('indexUrlActive')
            }
        },
        // 深度观察监听
        deep: true
      }
    }
}
</script>
<style lang="less" scoped>
#top{
    width: 100%; box-shadow:0px 0px 40px 0px rgba(0,0,0,0.2); font-size: 18px;
    background-color: #FFFFFF;
    position: fixed; top: 0; left: 0; 
    z-index: 1001;
}


.login_top{
    width: 1000px; height: 111px; display: flex; align-items: center;
    justify-content: center; margin: 0 auto; position: relative;
    img:nth-child(1){width: 113px; height: 32px;}
    .login_Btn{
        width: 130px; height: 33px; background-color: #FC6619; color: white; font-size: 12px;
        font-family:PingFangSC-Semibold; font-weight:600; text-align: center; line-height: 33px;
        position: absolute; top: 39px; right: -23px; border-radius: 19px; cursor: pointer;
    }
    .login_Btn:hover{background-color: #FF8C51;}
    .tuichu{
        width: 100px; position: absolute; top: 30px; right: -23px;
        span{ font-size: 12px; cursor: pointer; color:#939393;}
        .LogoUrl{width: 50px; height: 50px; border-radius: 50%; cursor: pointer;}
    }
}

.nav{
    width: 100%; height: 68px; border-top: 1px solid #EEEEEE;
    .titleList{
        width: 1000px; height: 100%; margin: 0 auto; display: flex; justify-content: center; box-sizing: border-box;
        align-items: center; color: #515356; font-family:PingFangSC-Regular; font-weight:400; padding: 0 10px;
        .activeClass{ color: #FF5E1B; }
        div{
            cursor: pointer; display: flex; margin-right: 59px;
            section{
                width: 2px; height: 16px; background-color: #EEEEEE;margin-top: 5px; margin-left: 59px;
            }
        }
    }
}



.header{
    width: 100%; height: 81px; border-top: 1px solid #EEEEEE;
    .titleList{
        width: 1000px; height: 100%; margin: 0 auto; display: flex; box-sizing: border-box;
        align-items: center; color: #515356; font-family:PingFangSC-Regular; font-weight:400; padding: 0 10px;
        .activeClass{ color: #FF5E1B; }
        img:nth-child(1){width: 113px; height: 36px; margin-right: 80px;}
        .header_pro{width: 50px; height: 50px; margin-left: 180px; border-radius: 50%; cursor: pointer;}
        div{
            cursor: pointer; font-size: 14px; display: flex; margin-right: 19px;
            section{
                width: 2px; height: 16px; background-color: #EEEEEE; margin-left: 19px; margin-top: 3px;
            }
        }
        .login{
            width: 130px; height: 33px; background-color: #FC6619; color: white; font-size: 12px;
            font-family:PingFangSC-Semibold; font-weight:600; text-align: center; line-height: 33px;
            border-radius: 19px; cursor: pointer; display: inline-block; margin-left: 200px;
        }
        .login:hover{background-color: #FF8C51;}
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


.tangchuang{
    width: 100%; height: 100vh; background: rgba(0,0,0,0.2); position: fixed; top: 0; left: 0; z-index: 10000;
}

</style>


