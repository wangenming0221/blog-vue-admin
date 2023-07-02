import useStore from "@/store";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { message, notification, Modal } from 'ant-design-vue';
import { messageConfirm } from "./modal";
import { getToken, token_prefix } from "./token";

// 是否显示重新登录
export let isRelogin = { show: false };

const requests = axios.create({
  baseURL: "/api",
  timeout: 10000,
  // 请求头
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// 请求拦截器
requests.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 请求带token
    if (getToken()) {
      config.headers["Authorization"] = token_prefix + getToken();
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 配置响应拦截器
requests.interceptors.response.use(
  (response: AxiosResponse) => {
    switch (response.data.code) {
      case 400:
        notification.error({
            message: '失败',
            description: response.data.msg
        });
        break;
      case 402:
        const { user } = useStore();
        if (!isRelogin.show) {
          isRelogin.show = true;
          messageConfirm("登录状态已过期，您可以继续留在该页面，或者重新登录")
            .then(() => {
              isRelogin.show = false;
              user.LogOut().then(() => {
                location.href = "/login";
              });
            })
            .catch(() => {
              isRelogin.show = false;
            });
        }
        break;
      case 500:
        notification.error({
            message: '失败',
            description: response.data.msg
          });
        break;
    }
    return response;
  },
  (error: AxiosError) => {
    let msg = error.message || "网络错误";
    if (msg == "Network Error") {
        msg = "后端接口连接异常";
    } else if (msg.includes("timeout")) {
        msg = "系统接口请求超时";
    } else if (msg.includes("Request failed with status code")) {
        msg = "系统接口" + msg.substring(msg.length - 3) + "异常";
    }
    message.error(msg);
    return Promise.reject(error);
  }
);

// 对外暴露
export default requests;