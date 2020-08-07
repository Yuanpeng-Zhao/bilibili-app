<template>
  <div>
    <div class="userTopBar">
      <user-top-bar :cuserInfo="cmodel"></user-top-bar>
    </div>

    <edit-banner :cmodel="cmodel" @fromChild="getChild"></edit-banner>
  </div>
</template>

<script>
import userTopBar from "components/content/userTopBar";
import editBanner from "components/content/editBanner";

export default {
  data() {
    return {
      cmodel: {},
    };
  },
  components: {
    userTopBar,
    editBanner,
  },
  created() {},
  mounted() {},
  methods: {
    getChild(value) {
      this.cmodel = value;
    },
  },
};
</script>

<style scoped lang="less">
.userTopBar {
  margin-bottom: 2.778vw;
}
</style>
