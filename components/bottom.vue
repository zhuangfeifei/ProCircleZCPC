<template>
    <div class="footer">
        <div class="bottom">
            <div class="bottom_web">
            <h5>网站导航</h5>
            <p v-for="(item,index) in tabTitle" :key="index" @click="handleSelect(index)">{{item.title}}</p>
            </div>
            <div class="about">
            <div>
                <h5>关于箴创</h5>
                <p>联系我们</p>   
                <!-- <p>意见反馈</p> -->
                <h4>135-6435-0056</h4>
            </div>
            <div>
                <h5>箴创运营小二微信</h5>
                <img src="~/static/images/xiaoer.jpg" alt="" srcset="">
            </div>
            <div>
                <h5>箴创小程序</h5>
                <img src="~/static/images/xcxcode.jpg" alt="" srcset="">
            </div>
            </div>
            <div class="search">
                <h5>建议反馈</h5>
                <textarea placeholder="使用过程中遇到任何问题均可反馈给我们哦~" v-model="content" required maxlength="500" cols="30" rows="5"></textarea>
                <img class="opinion_xiu" src="~/static/images/xiugai.png" alt="" srcset="">
                <div id="users">
                    <div class="LogoUrlDiv" v-if="userinfor">
                        <img class="LogoUrl" :src="userinfor.LogoUrl || userinfors.LogoUrl || a" alt="" srcset="" />
                        <span>{{userinfor.UserName || userinfors.UserName}}</span>
                    </div>
                    <div class="tijiao" :class="{isLoadings: !userinfor}" @click="feedback">{{userinfor?'提交':'请先登录'}}</div>
                </div>
                <p>苏州箴创管理咨询有限公司 版权所有 苏ICP备19001576号</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Storage from '~/store/storage'
export default {
    props:['userinfor'],
    data(){
        return{
            a: require('~/static/images/user.png'),
            content:'',
            userinfors:'',
            isLoading: false,
            tabTitle:[
                {title:'首页', url:'index'},
                {title:'在线课程', url:'index-onlineCourses'},
                {title:'线下活动', url:'index-offlineActivities'},
                {title:'新闻动态', url:'index-news'},
                {title:'箴创社区', url:'index-community'},
            ], 
        }
    },
    computed:{
        ...mapState({
            indexUrlActive: state => state.indexUrlActive,
        })
    },
    created(){
        this.userinfors = Storage.getLocal('userinfor')
        // console.log(this.userinfor)
        // this.getUsers()
    },
    methods:{
        getUsers(){
            this.$store.dispatch('getcache', Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'')
            .then(res=>{
                // console.log(res)
                if(res.IsSuccess){
                    // this.isLoading = true
                }
            })
        },
        feedback(){
            if(this.content != ''){
                this.$store.dispatch('feedback', {token: Storage.getLocal('userinfor')?Storage.getLocal('userinfor').Token:'', Content: this.content})
                .then(res=>{
                    // console.log(res)
                    if(res.IsSuccess){
                        this.content = ''
                        this.$message({
                            message: '发送成功！',
                            type: 'success',
                            center: true,
                            offset: 50
                        });
                    }
                })
            }
        },
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
    }
}
</script>
<style lang="less" scoped>
.footer{
    width: 100%; height: 265px; background-color: #515356; letter-spacing: 1px;
    .bottom{
      width: 1000px; height: 100%; margin: 0 auto; padding-top: 41px;
      font-size: 12px; color: #B2B2B2; display: flex;
      h5{font-size: 10px; color: #FFFFFF; font-family:PingFangSC-Regular; font-weight:400; margin-bottom: 13px;}
      p{line-height: 24px;}
      .bottom_web{
        width: 105px; height: 150px; border-right: 2px solid #EEEEEE; p{cursor: pointer;}
      }
      .about{
        width: 552px; height: 150px; border-right: 2px solid #EEEEEE; display: flex;
        justify-content: space-around; padding-left: 15px; padding-right: 30px;
        h4{font-size: 10px; color: #FFFFFF; font-family:PingFangSC-Regular; font-weight:400; margin-top: 13px;}
        img{width: 90px; height: 90px; background-color: #EEEEEE;}
      }
      .search{
        padding-left: 84px; position: relative;
        textarea{
            width: 250px; height: 71px; resize: none; border: 0; background:none; outline: none; color: white;
            padding: 10px; overflow: hidden; text-indent: 15px; line-height: 20px; border: 1px solid rgba(255,255,255,0.2);
        }
        .opinion_xiu{
            width: 9px; height: 10px; position: absolute;; top: 43px; left: 95px;
        }
        #users{
            width: 250px; margin-top: 6px; display: flex; justify-content: space-between; font-size: 12px;
            .LogoUrl{
                width: 20px; height: 20px; border-radius: 50%; margin-right: 8px;
            }
            .LogoUrlDiv{display: flex; align-items: center;}
            .tijiao{color: #FC6619; font-size: 10px; cursor: pointer;}
            .isLoadings{color: gray;}
        }
      }
    }
}


</style>


