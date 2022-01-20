import axios from "axios";
import Element from "element-ui";
import store from "./store";
import router from "./router";

const baseUrl = "http://localhost:8080";

// 前置拦截
axios.interceptors.request.use(config => {
    let token = localStorage.getItem("token");
    if (token) {
        config.headers.token = `${token}`;
    }
    config.url = baseUrl + config.url;
    return config;
});
//后置拦截
axios.interceptors.response.use(config => {
    const res = response.data;
    console.log("后置拦截");
    if (res.code === 200) {
        return response;
    } else {
        // 弹窗异常消息
        Element.Message({
            message: response.data.msg,
            type: "error",
            duration: 2 * 1000
        });
        // 直接拒绝往下面返回结果消息
        return Promise.reject(response.data.msg);
    }
},
    error => {
        console.log("err" + error);
        if (error.response.data) {
            error.message = error.response.data.msg;
        }
        // 根据请求状态觉得是否登录或者提示其他
        if (error.response.status === 401) {
            store.commit("REMOVE_INFO");
            router.push({
                path: "/login"
            });
            error.message = "请重新登录";
        }
        if (error.response.status === 403) {
            error.message = "权限不足，无法访问"
        }
        Element.Message({
            message: error.message,
            type: "error",
            duration: 3 * 1000
        })
        return Promise.reject(error);
    }
)
