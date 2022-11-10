import { instance } from './axios'

export const putOperation = (params: any, td: Function) => {
    instance.post("api/qeda/operation/", params).then(function (res) {
        td && td(res);
    });
};

export const operation = (params: any, td: Function) => {
    instance.get("api/qeda/operation?result_id=" + params).then(function (res) {
        td && td(res);
    });
};

export const userCode = (td: Function, design_id?: string) => {
    instance.get(design_id ? `api/qeda/code/?design_id=${design_id}` : "api/qeda/code/").then(function (res) {
        td && td(res);
    });
};

export const userCodePost = (params: any, td: Function) => {
    instance.post("api/qeda/code/", params).then(function (res) {
        td && td(res);
    });
};

export const userCodePut = (params: any, td: Function) => {
    instance.put("api/qeda/code/", params).then(function (res) {
        td && td(res);
    });
};