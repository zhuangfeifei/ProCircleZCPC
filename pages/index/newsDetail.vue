<template>
    <div id="newsDetail">

        <nav><img @click="$router.push({name:'index-playback', query:{id:37}})" src="~/static/images/banner.jpg" alt="" srcset=""></nav>

        <div class="newsDetailMain">
            <div class="newsDetailMainLeft">
                <h3>{{newsDetail.Title}}</h3>
                <p>{{newsDetail.CreateTime}}</p>
                <div v-html="newsDetail.Content"></div>
            </div>
            <div class="newsDetailMainRight">
                <div @click="detail(item.Id)" v-for="(item,index) in newsDetail.RelNews" :key="index">
                    <section><img :src="item.SmallImageUrl" alt="" srcset=""></section>
                    <p>{{item.Title}}</p>
                </div>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{ 
            newsDetail:''
        }
    },
    computed:{

    },
    created(){
        this.detail(this.$route.query.id)
    },
    methods:{
        detail(id){
            this.$store.dispatch('newsDetail', id)
            .then(res=>{
                if(res.IsSuccess){
                    this.newsDetail = res.Data
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
#newsDetail{
    width: 100%; height: 100%; background-color: #F7F7F7; padding-top: 30px; padding-bottom: 30px;
}

nav{
    width: 1200px; height: 300px; background-color: #E3E3E3; margin: 0 auto; border-radius: 10px;
    img{width: 100%; height: 100%; border-radius: 10px;}
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

.newsDetailMain{
    width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; margin-top: 30px;
    .newsDetailMainLeft{
        width: 805px; background-color: white; border-radius: 10px; padding: 20px;
        h3{font-size: 26px; margin-bottom: 10px;}
        p{font-size: 14px; margin-bottom: 10px;}
    }
    .newsDetailMainRight{
        width: 365px; 
        div{
            width: 100%; height: 254px; background-color: white; text-align: center; 
            border-radius: 10px; margin-bottom: 30px; cursor: pointer;
            section{
                width: 100%; height: 196px; background-color: #E3E3E3;
                border-top-left-radius: 10px; border-top-right-radius: 10px;
                img{width: 100%; height: 100%;border-top-left-radius: 10px; border-top-right-radius: 10px;}
            }
            p{font-size: 18px; line-height: 58px; color: #333333; display: inline-block; width: 100%; height: 58px; .ellipsis;}
        }
    }
}

</style>

