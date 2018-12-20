import requestInstance from './config';
import {Message} from 'element-ui';
import Cookie from 'js-cookie';
import $ from 'jquery';
import router from '../router';

function commonHandle(res, cb) {
    if (res.data.error_code === 0) {
        cb && cb(res.data);
    } else {

        Message({
            type: 'error',
            message: res.data.error_desc
        });

        if(res.data.error_code === 1005){
            Cookie.remove('access_token');
            router.push({name: 'login'});
        }
    }
}

let $http = {

    uploadUrl: requestInstance._upLoadUrl,

    login(data, callback) {
        requestInstance.post('user/login', $.param(data)).then(res => {
            commonHandle(res, callback);
        })
    },

    getPermission(callback){
        requestInstance.get('user/me', {token: Cookie.get('access_token')}).then(res => {
            commonHandle(res, callback);
        })
    },

    getList(nameSpace, params, callback) {

        const PAGE_SIZE = 20;

        params.page_size = params.page_size || PAGE_SIZE;

        requestInstance.get(`${nameSpace}/list`, {params}).then(res => {
            commonHandle(res, callback);
        })

    },

    getEdit(nameSpace, params, callback) {
        requestInstance.get(`${nameSpace}/edit`, {params}).then(res => {
            commonHandle(res, callback);
        })
    },

    create(nameSpace, params, callback) {
        requestInstance.post(`${nameSpace}/create`, params).then(res => {
            commonHandle(res, callback);
        })
    },

    delete(nameSpace, params, callback) {
        requestInstance.post(`${nameSpace}/delete`, params).then(res => {
            commonHandle(res, callback);
        })
    },

    update(nameSpace, params, callback) {
        requestInstance.post(`${nameSpace}/update`, params).then(res => {
            commonHandle(res, callback);
        })
    },

    commonReq(method, url, param, callback) {
        let params = method === 'get' ? {params: param} : param;
        requestInstance[method](url, params).then(res => {
            commonHandle(res, callback);
        })
    },

    getQiniuToken(params){
        return requestInstance.get('comm/qiniu/simple', {params});
    }

};

export default $http;
