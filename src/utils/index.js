import Cookie from 'js-cookie';


export function checkLogin(){
    return Cookie.get('access_token')
}

//  通用的导出csv方法
export function exportDataAsCsvFile(data){

    let fileData = encodeURIComponent(data.data.file_data),
        downDom = document.createElement('a');

    downDom.setAttribute('href', 'data:text/csv;charset=utf-8,\ufeff' + fileData);
    downDom.setAttribute('download', data.data.file_name + '.csv');
    downDom.click();
    downDom = null;
}
