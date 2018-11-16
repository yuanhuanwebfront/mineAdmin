function addToDouble(num){
    return num >= 10 ? num : '0' + num
}

let filterMap = {

    date (val, format){

        let date = new Date(val),
            year = date.getFullYear(),
            month = addToDouble(date.getMonth() + 1),
            day = addToDouble(date.getDate()),
            hour = addToDouble(date.getHours()),
            minutes = addToDouble(date.getMinutes()),
            seconds = addToDouble(date.getSeconds());

        return format.replace(/yyyy/g, year).replace(/MM/g, month).replace(/dd/g, day).replace(/hh/g, hour).replace(/mm/g, minutes).replace(/ss/g, seconds);

    },

    money(val){
        return '￥' + parseFloat(val).toFixed(2)
    }



};

export default filterMap;
