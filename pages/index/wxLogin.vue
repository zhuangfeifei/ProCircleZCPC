<template>
    <div id="wxLogin">
        
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Storage from '~/store/storage'
export default {
    data(){
        return{
            list:''
        }
    },
    computed:{
        ...mapState({
            indexUrlActive: state => state.indexUrlActive,
        })
    },
    created(){
        // this.$route.query.wxCode
        // window.location.href = this.$route.query.wxCode
        // let list = {Code:this.$route.query.code, State:this.$route.query.state}
        // console.log(list)
        // this.$store.dispatch('wxlogin', list)
        // .then(res=>{
        //     console.log(res)
        //     if(res.IsSuccess){
        //         Storage.setLocal(res.Data, 'userinfor')
        //         this.$message({
        //             message: '登录成功！',
        //             type: 'success',
        //             center: true,
        //             offset: 50
        //         });
        //         this.$router.go(-1)
        //     }else{
        //         this.$message({
        //         message: res.Message,
        //         type: 'error',
        //         center: true,
        //         offset: 50
        //     });
        //     }
        // })
    },
    methods:{
        
    }
}
</script>
<style lang="less" scoped>
#wxLogin{
    width: 100%; height: 500px;
}


</style>


