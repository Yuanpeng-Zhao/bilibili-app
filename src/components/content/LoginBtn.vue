<template>
    <div class="btnParent" @click="registerClick">
        <div 
        class="LoginBtn" 
        >{{btnText}}</div>
    </div>
</template>

<script>
export default {
    props:['btnText'],
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        registerClick(){
            
            this.$emit('registerSubmit')

        }
    }
};
</script>

<style scoped lang="less">
.LoginBtn{
    height: 45px;
    background-color: #ff9db5;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 22.5px;
    font-size: 4.444vw;
}
.btnParent{
    margin: 15px 10px;
}
</style>
