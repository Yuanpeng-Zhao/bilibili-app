<template>
  <div @click="pathPush()" class="singleArticle">
    <div class="imgParent">
      <img :src="article.img" alt />
      <div class="bottom">
        <div class="icon-play2">
          <span class="video">111</span>
        </div>
        <div class="icon-file-text">
          <span class="commont">{{!article.commentlen?66:article.commentlen}}</span>
        </div>
      </div>
    </div>
    <p>{{article.name}}</p>
  </div>
</template>

<script>
export default {
  props: ["article"],
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {
    pathPush(){
      if(this.$route.path!='/detail/'+this.article.id){
        this.$router.push('/detail/'+this.article.id)
      }
    }
  },
};
</script>

<style scoped lang="less">
.singleArticle {
  img {
    width: 100%;
  }
  p {
    font-size: 3.333vw;
  }
  .imgParent {
    position: relative;
    .bottom {
      display: flex;
      position: absolute;
      bottom: 0.278vw;
      padding: 0 2.222vw;
      background: linear-gradient(0deg,rgb(0,0,.85),transparent);
      color: white;
      left: 0;
      right: 0;
      justify-content: space-between;

    }
  }
}
</style>
