import requestInstance from './config';
import {Message} from 'element-ui';
import $ from 'jquery';


function commonHandle(res, cb) {
    if (res.data.errno === 0) {
        cb && cb(res.data);
    } else {
        Message({
            type: 'error',
            message: res.data.errmsg
        });
    }
}

let $http = {

    uploadUrl: requestInstance._upLoadUrl,

    login(data, callback) {
        requestInstance.post('login/login', $.param(data)).then(res => {
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
        requestInstance.post(`${nameSpace}/create`, $.param(params)).then(res => {
            commonHandle(res, callback);
        })
    },

    delete(nameSpace, params, callback) {
        requestInstance.post(`${nameSpace}/delete`, $.param(params)).then(res => {
            commonHandle(res, callback);
        })
    },

    update(nameSpace, params, callback) {
        requestInstance.post(`${nameSpace}/update`, $.param(params)).then(res => {
            commonHandle(res, callback);
        })
    },

    commonReq(method, url, param, callback) {
        let params = method === 'get' ? {params: param} : $.param(param);
        requestInstance[method](url, params).then(res => {
            commonHandle(res, callback);
        })
    }

};

export default $http;
