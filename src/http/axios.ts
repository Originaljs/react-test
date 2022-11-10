import axios from "axios";
const baseURL: string = 'http://ywq-sim.c0c43f82e3ca14f4f844596a4c08bdfc6.cn-shanghai.alicontainer.com/';

var token: string = '';
if (window.name) {
    token = JSON.parse(window.name).token;
}
// config axios
export const instance = axios.create({
    timeout: 7000, // 请求超时时间
    baseURL: baseURL,
    method: 'post',
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Authorization': `jwt <${token}>`
    }
});

instance.interceptors.request.use(
    (data: any) => {
        data.params = Object.assign({}, data.params);
        return data;
    },
    (msg: any) => {
        //console.log(msg);
    }
);
instance.interceptors.response.use(
    (res: any) => {
        return res.data;
    },
    (msg: any) => {
        // console.log(msg);
    }
);
