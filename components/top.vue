<template>
    <div id="top">
        <el-menu :default-active="indexUrlActive" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <!-- <img class="logoTop" src="~/static/images/vue.png" alt="" srcset=""> -->
            <div class="logoTop"></div>
            <el-menu-item v-for="(item,index) in tabTitle" :index="index+''" :key="index">{{item.title}}</el-menu-item>
            <el-menu-item index="6" class="login" @click="login">登录</el-menu-item>
            <el-menu-item index="7" class="login" @click="register">注册</el-menu-item>
        </el-menu>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
export default {
    data(){
        return{
            tabTitle:[
                {title:'首页', url:'index'},
                {title:'在线课程', url:'index-onlineCourses'},
                {title:'线下活动'},
                {title:'企业服务'},
                {title:'新闻动态'},
                {title:'箴创学院'},
            ], 
            activeIndex: '0',
        }
    },
    computed:{
        ...mapState({
            indexUrlActive: state => state.indexUrlActive,
        })
    },
    methods:{
        handleSelect(key, keyPath) {
            // console.log(key, keyPath);
            this.$store.commit('indexUrlActive', key)
            this.$router.push({name: this.tabTitle[parseInt(key)].url})
        },
        login(){
            let data = {
                Mobile: '18106220219', Type: 1
            }
            this.$store.dispatch('phoneCode', data)
        },
        register(){
            let data = {
                Mobile: '18506181016', Pwd:'123456qwe.', Captcha:'877534', FriendCode:''
            }
            this.$store.dispatch('register', data)
        },
    }
}
</script>
<style lang="less" scoped>
#top{
    width: 100%; position: fixed; top: 0; left: 0; z-index: 1000; background-color: #545c64;
}



.el-menu-demo{
    width: calc(100% - 500px); min-width: 1111px; margin: 0 auto; border-bottom: 1px solid #545c64;
    a{
        // color: black;
        text-decoration: none;
    }
    .login{
        float: right;
    }
    .logoTop{
        width: 100px; height: 50px; float: left; margin-top: 5px; margin-right: 50px; background-color: #99a9bf;
    }
}

</style>


