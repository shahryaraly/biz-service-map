import useAxio from "../hook/http/rest-client";
import axios from "../utility/axios-helper";
import { ReqModel, RequestType } from '../hook/http/rest-req-model';
import { useEffect, useState } from 'react';
import "./service-map.css";
import {ViewMap} from '../component/view-map/view-map';
import { ServiceMapRes } from '../model/service-map-res';
import { ElementProps } from "../component/view-map/model/element-prop";

export function ServiceMap() {
    const [serviceMapList, setServiceMapList] = useState<ServiceMapRes[]>([]);
    const [response, error, loading, send] = useAxio();

    const getServiceMapListCallback = (serviceMapListRes: any) => {
        if(serviceMapListRes && serviceMapListRes.data){
           let serviceMapList: ServiceMapRes[]= serviceMapListRes.data;
           serviceMapList.forEach(serviceMap => {
                    serviceMap.elementProps = new ElementProps("120PX", "0PX", "100PX", "100PX");
                    serviceMap.isMouseDown = false;
                    serviceMap.isMouseMoving = false;
            });
            setServiceMapList(serviceMapList);
        }
    }

    let getServiceMapListReqModel: ReqModel = {
        method: RequestType.GET,
        axiosInstance: axios,
        url: "/api/v1/biz-service-map/list/1",
        successCallback: getServiceMapListCallback
    };

    useEffect(() => {
        send(getServiceMapListReqModel);
    }, []);

    return (<>
                            {loading && <p>loading...</p>}
                            {!loading && error && <p>error occured .....</p>}
                            {!loading && !error && !serviceMapList?.length && <p>waiting for 1st list to be added...</p>}
                            {
                                !loading && !error && serviceMapList && serviceMapList.length &&
                                (
                                    <ViewMap serviceMapList={serviceMapList}/>
                                )
                            }

</>
);
}