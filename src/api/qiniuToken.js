import $http from "./api";

export function uploadToken(params) {
    return $http.getQiniuToken(params);
}

export const uploadFolder = "trump/";

export const uploadImagesUrl = "https://qiniucdn.dailyyoga.com.cn/";

export const uploadVideoUrl = "https://sessionpackage.dailyyoga.com.cn/";

export const uploadImagesType = 1;

export const uploadVideoType = 2;
