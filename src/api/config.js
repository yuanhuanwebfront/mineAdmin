import axios from 'axios';
import Cookie from 'js-cookie'

import {Loading} from 'element-ui';

let globalLoading = null;

const ALL_URL = {
    // 线上
    // baseUrl: 'http://admin.dailyyoga.com.cn/appadmin/'
    // 杨飞
    // baseUrl: 'http://115.29.202.161:8097/newadmin/'
    // 本地
    // baseUrl: 'http://115.29.202.161:8081/appadmin/'
    // 庞晓楠
    // baseUrl: 'http://115.29.202.161:8082/appadmin/'
    // 测试
    baseUrl: 'http://115.29.202.161:8090/appadmin/'
    // 温旭峰
    // baseUrl: 'http://115.29.202.161:8098/appadmin/'
    // 朱佳琪
    // baseUrl: 'http://115.29.202.161:8085/appadmin/'
    // 郭晓伟
    // baseUrl: 'http://115.29.202.161:8096/appadmin/'
    // 林军
    // baseUrl: 'http://115.29.202.161:8088/appadmin/'
    // 徐会涛
    // baseUrl: 'http://115.29.202.161:8089/appadmin/'
    // 钱军强
    // baseUrl: 'http://115.29.202.161:8095/appadmin/'
    // 张慧敏
    // baseUrl: 'http://115.29.202.161:8092/appadmin/'
    // 梁福明
    // baseUrl: 'http://115.29.202.161:8200/appadmin/'
};

const TIME_OUT = 50000;

axios.defaults.baseURL = ALL_URL.baseUrl;

function beforeRequest(config){

    globalLoading = Loading.service({
        fullscreen: true,
        background: 'rgba(255, 255, 255, 0.4)'
    });

    let S_ADMIN = Cookie.get('SADMIN'),
        U_ADMIN = Cookie.get('UADMIN');

    if(S_ADMIN && U_ADMIN){
        config.headers.SADMIN = S_ADMIN;
        config.headers.UADMIN = U_ADMIN;
    }

    return config;
}

function finishRequest(res){
    if(globalLoading){
        globalLoading.close();
        globalLoading = null;
    }
    return res;
}

let requestInstance = axios.create({
    baseURL: ALL_URL.baseUrl,
    timeout: TIME_OUT
});

requestInstance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
requestInstance.interceptors.request.use(beforeRequest);
requestInstance.interceptors.response.use(finishRequest);

export default requestInstance;
