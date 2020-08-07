<template>
  <div>
    <van-tabs v-model="active" swipeable sticky>
      <van-tab v-for="(item,index) in category" :title="item.title" :key="index">
        <!-- 下拉加载组件包裹视频展示组件 -->
        <van-list
          v-model="item.loading"
          :finished="item.finished"
          :immediate-check="false"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div class="singleArticleParent">
            <single-article
              class="singleArticle"
              :article="CategoryItem"
              v-for="(CategoryItem,categoryIndex) in item.list"
              :key="categoryIndex"
            ></single-article>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import singleArticle from "./article/singleArticle";

export default {
  data() {
    return {
      category: [],
      active: 0,
    };
  },
  components: {
    singleArticle,
  },
  watch: {
    active() {
      this.selectAriticle();
    },
  },
  created() {
    this.selectCategory();
  },
  mounted() {},
  methods: {
    async selectCategory() {
      const res = await this.$http.get("/category");
      this.changeCategory(res.data);
    },

    changeCategory(data) {
      const category1 = data.map((item, index) => {
        item.list = [];
        item.page = 0;
        item.finished = false;
        item.loading = false;
        item.pagesize = 10;
        return item;
      });
      // console.log(category1);
      this.category = category1;
      this.selectAriticle();
    },

    async selectAriticle() {
      const cItem = this.categoryItem();

      const res = await this.$http.get("/detail/" + cItem._id, {
        params: {
          page: cItem.page,
          pagesize: cItem.pagesize,
        },
      });
      cItem.list.push(...res.data);
      cItem.loading = false;
      if(res.data.length<cItem.pagesize){
        cItem.finished=true
      }
    },

    categoryItem() {
      const categoryItem = this.category[this.active];
      return categoryItem;
    },

    onLoad() {
      const categoryItem = this.categoryItem();
      setTimeout(() => {
        categoryItem.page += 1;
        this.selectAriticle();
      }, 1000);
    },
  },
};
</script>

<style scoped lang="less">
.singleArticleParent {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .singleArticle {
    width: 45%;
    margin: 1.389vw 0;
  }
}
</style>
