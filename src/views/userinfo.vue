<template>
  <div>
    <user-top-bar :cuserInfo="model"></user-top-bar>
    <!-- 上面为导航条部分 -->
    <img class="backImg" src="../assets/img/bannerTop_new.png" alt="">

    <user-detail :userInfo="model"></user-detail>
    <user-article></user-article>
  </div>
</template>

<script>
import userTopBar from "components/content/userTopBar";
import userDetail from "components/content/userDetail";
import userArticle from "components/content/userArticle";

export default {
  data() {
    return {
      model:{}
    };
  },
  components: {
    userTopBar,
    userDetail,
    userArticle
  },
  created() {
    this.userInfoData()
  },
  mounted() {},
  methods: {
    async userInfoData(){
      const res= await this.$http.get('/user/'+localStorage.getItem('id')
      )
      this.model=res.data[0]
    }
  },
};
</script>

<style scoped lang="less">
.backImg{
  height: 91px;
  width: 100%;
}
</style>
