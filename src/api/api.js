import requestInstance from './config';
import {Message} from 'element-ui';
import qs from 'querystring'


function commonHandle(res, cb){
    if(res.data.errno === 0){
        cb && cb(res.data);
    }else{
        Message({
            type: 'error',
            message: res.data.errmsg
        });
    }
}


let $http = {

    login (data, callback){
        requestInstance.post('login/login', qs.stringify(data)).then(res => {
            commonHandle(res, callback);
        })
    },

    getList (nameSpace, params, callback){

        const PAGE_SIZE = 10;

        params.page_size = params.page_size || PAGE_SIZE;

        requestInstance.get(`${nameSpace}/list`, {params}).then(res => {
            commonHandle(res, callback);
        })

    }
    
};

export default $http;
