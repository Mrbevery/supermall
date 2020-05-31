import axios from "axios";
import { Toast } from "vant";
import Loading from "../store/index";

//测试接口
const url = 'http://152.136.185.210:8000/api/n3';

let config = {
  baseURL: url
};

const _axios = axios.create(config);

// 请求拦截
_axios.interceptors.request.use(
  req => {
    // 当getters里面的isLoading为true再显示请求加载
    if (Loading.getters.isLoading) {
      Toast.loading({
        forbidClick: true,
        message: "加载中..."
      });
    }
    return req;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截
_axios.interceptors.response.use(
  res => {
    Toast.clear();
    return res.data;
  },
  err => {
    Toast.clear();
    return Promise.reject(err);
  }
);

// 全局注册axios
window.axios = _axios;
