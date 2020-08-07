<template>
  <div class="home">
    <user-topBar :cuserInfo="model"></user-topBar>
    
    <home-content></home-content>
  </div>
</template>

<script>
import userTopBar from "components/content/userTopBar";
import homeContent from "../components/content/homeContent";

export default {
  data() {
    return {
      model: {},
    };
  },
  components: {
    userTopBar,
    homeContent,
  },
  created() {
    this.userInfoData();
  },
  mounted() {},
  methods: {
    async userInfoData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
  },
};
</script>

<style scoped lang="less">
.home {
  background-color: white;
}
</style>
