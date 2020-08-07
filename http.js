import axios from 'axios'
import router from './src/router'
import Vue from 'vue'

const http = axios.create({
  baseURL:'http://112.74.99.5:3000/web/api'
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  
  if(localStorage.getItem('token')&&localStorage.getItem('id')){
    config.headers.Authorization='bearer '+localStorage.getItem('token')
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  if(error.response.status==401 || error.response.status==402){
    router.push('/login')
    Vue.prototype.$msg.fail(error.response.data.message)
  }
  return Promise.reject(error);
});
export default http