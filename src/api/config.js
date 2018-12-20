import axios from 'axios';
import Cookie from 'js-cookie'
import $ from 'jquery'

import {Loading} from 'element-ui';

let globalLoading = null;

const ALL_URL = {
    // 线上
    // baseUrl: 'http://admin.dailyyoga.com.cn/appadmin/'
    // 本地
    // baseUrl: 'http://115.29.202.161:8081/appadmin/'
    // 测试
    baseUrl: 'http://115.29.202.161:18197/admin/'
    // 郎玉清
    // baseUrl: 'http://115.29.202.161:18190/admin/',
    //  林军
    // baseUrl: 'http://115.29.202.161:18192/admin/'
};

const TIME_OUT = 50000;

axios.defaults.baseURL = ALL_URL.baseUrl;

function beforeRequest(config){

    globalLoading = Loading.service({
        fullscreen: true,
        background: 'rgba(255, 255, 255, 0.4)'
    });

    let token = Cookie.get('access_token');

    if(token){
        if(config.params) config.params.token = token;
        if(config.data) {
            config.data.token = token;
            config.data = $.param(config.data);
        }
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
requestInstance._upLoadUrl = '//115.29.202.161:8090/appadmin/common/upload';

export default requestInstance;
