import axios from "axios";

export type ReqModel = {
    url: string;
    method: RequestType;
    payload?: any;
    axiosInstance: any;
    successCallback?: (data: any) => void;
}

export enum RequestType {
    POST, GET, PUT
}

export class ReqConfigModel {
    data: any;
    headers: any;

    constructor(data: any, headers: any) {
        this.data = data;
        this.headers = headers;
    }
}
