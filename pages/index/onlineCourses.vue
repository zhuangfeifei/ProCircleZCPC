<template>
    <div id="onlineCourses">
        <div class="swiper">
            <div class="cascader">
                <el-cascader-panel :options="options" :props="{ expandTrigger: 'hover' }"></el-cascader-panel>
            </div>
            <el-carousel height="500px">
                <el-carousel-item v-for="(item,index) in getHomeList.BannerList" :key="index">
                    <!-- <img class="swiperImg" :src="item.ImageUrl" alt="" srcset=""> -->
                    <div class="swiper_imgs"></div>
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="onlineCourses_main">

            <div class="zc indexService">
                <i class="el-icon-d-arrow-right"></i>
                <h3>全部课程</h3>
                <p></p>
            </div>

            <div class="allCourse">
              分类：<span v-for="(item,index) in category" :key="index" :class="{activeClass: index == classIndex}" @click="classActives(index)">{{item.CategoryName}}</span>
            </div>
            <div class="infinite-list-wrapper">
            
                <ul class="list" v-infinite-scroll="load">
                    <li v-for="(item,index) in collegelist" :key="index" class="list-item">
                      <div class="courseList">
                        <div><img :src="item.SmallImageUrl" alt="" srcset=""></div>
                        <section>
                          <h3>{{item.Title}}</h3>
                          <p>{{item.Description}}</p>
                        </section>
                      </div>
                    </li>
                </ul>
                <p v-if="loading">加载中...</p>
                <p v-if="noMore">没有更多了</p>
            
            </div>

        </div>

    </div>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
// import vueiInfinite from 'vue-infinite-scroll'
// import Vue from 'vue'
// Vue.use(vueiInfinite)
export default {
    data(){
        return{
            count: 15, classIndex:0,
        loading: false,
            value: [],
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
        }
    },
    computed:{
        ...mapState({
            getHomeList: state => state.getHomeList,
            category: state => state.category,
            collegelist: state => state.collegelist,
        }),
        noMore () {
            return this.count >= 20
        },
        disabled () {
            return this.loading || this.noMore
        }
    }, 
    created(){
        this.$store.dispatch('category')
    },
    methods: {
        handleChange(value) {
            console.log(value);
        },
        load () {
            this.count += 2
            console.log('435')
            // this.loading = true
            // setTimeout(() => {
            // this.loading = false
            // }, 2000)
        },
        classActives(index){
            this.classIndex = index
            let datas = {
                CategoryId: this.category[index].CategoryId, PageIndex: 1, PageSize: 10, Type: 1
            }
            console.log(this.category[index].CategoryId,index)
            this.$store.dispatch('collegelist', datas)
        }
    }
}
</script>
<style lang="less" scoped>
#onlineCourses{
    width: 100%; height: 100%; padding-top: 61px; box-sizing: border-box;
}

.swiper{
  width: calc(100% - 500px); min-width: 1111px; margin: 0 auto; position: relative;
  .swiper_imgs{width: 100%; height: 100%;
    background: #fff url(https://cdn2.jianshu.io/assets/web/gupao-43e5e6af6d2d1b2639ab8da6cdcdd1ed.png) no-repeat center center;
  }
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
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




.onlineCourses_main{
  width: calc(100% - 500px); min-width: 1111px; height: 500px; margin: 0px auto;
}
.zc{
  width: 100%; height: 50px; margin: 0 auto; display: flex; align-items: center; margin-top: 20px; position: relative;
}
.indexServiceList{
  width: 100%; height: 200px; display: flex; flex-wrap: wrap;
  div{width: 350px; height: 100%; background-color: #99a9bf; margin-right: 30px;}
  div:nth-child(3n){margin: 0}
}


.allCourse{
  width: 100%; margin-bottom: 20px;
  span{margin-left: 20px; padding: 5px 10px; cursor: pointer;}
  .activeClass{ background-color: lightcoral; color: white;}
}

.list{ overflow-y: auto;}
.list>li{
    display: inline-block; width: 100%; height: 300px;
    .courseList{
      width: 100%; height: 100%; display: flex;
        div{
            width: 300px; height: 200px; background-color: lightblue;
            img{width: 100%; height: 100%;}
        }
    }
}


</style>


