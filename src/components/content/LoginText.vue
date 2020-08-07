<template>
  <div>
    <van-field 
    :label="label" 
    :type="type" 
    :placeholder="placeholder" 
    :rule="rule" 
    v-model="content" />
  </div>
</template>

<script>
export default {
  props: ["label", "type", "placeholder", "rule"],
  data() {
    return {
      content: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    TextChecked() {
      const rue = new RegExp(this.rule)
      if(rue.test(this.content)){
        // console.log(1);
        this.$emit('inputCheck', this.content)
      }
    }
  },
  watch: {
    content() {
      this.TextChecked();
    }
  }
};
</script>

<style scoped lang="less">
</style>
