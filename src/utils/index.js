import Cookie from 'js-cookie';

const utils = {

    checkLogin (){
        return Cookie.get('SADMIN') && Cookie.get('UADMIN')
    }

};

export default utils;
