<template>
  <div id="errors">
      <section>
        <img src="~/static/images/undraw_Taken_if77.png" alt="" srcset="">
        <p v-if="error.statusCode==404">页面不见了，请检查网络</p>
        <h2 v-else>500服务器错误</h2>
      </section>
      <div><nuxt-link to="/"><img class="goto" src="~/static/images/shua.png" alt="" srcset=""></nuxt-link></div>
  </div>
</template>
 
<script>
export default {
  props:['error'],
}
</script>
<style lang="less" scoped>
#errors{
    width: 100%; height: 100%; padding-top: 200px; text-align: center;
    section{
        width: 100%; margin: 0 auto; text-align: center;
    }
    a{color: black; text-decoration: underline;}
    img{margin-bottom: 40px;}
    p{font-size: 14px;}
    div{
        width:231px; margin: 0 auto; margin-top: 82px;
        height:50px; cursor: pointer;
        background:linear-gradient(270deg,rgba(255,94,146,1) 0%,rgba(255,135,52,1) 100%);
        box-shadow:0px 10px 14px 0px rgba(187,81,81,0.28);
        border-radius:25px;
        .goto{width: 20px; height: 20px; margin-top: 15px;}
    }
}
</style>