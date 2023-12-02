import { Service } from "../../../database/entity/service";
import { ServiceMap } from "../../../database/entity/service-map";

export class ServiceMapRes {
    serviceId: number;
    serviceName: string;
    consumerServiceId: number;
    consumerServiceName: string;
    active: boolean;
    createdDate: Date;
    updatedDate: Date;
    

    public static toServiceMapRes(service: Service ,consumerService: Service): ServiceMapRes {
        let serviceMapRes = new ServiceMapRes();
        serviceMapRes.serviceId = service.id;
        serviceMapRes.serviceName = service.name;
        serviceMapRes.consumerServiceId = consumerService.id;
        serviceMapRes.consumerServiceName = consumerService.name;
        serviceMapRes.active = consumerService.active;
        serviceMapRes.createdDate = consumerService.createdDate;
        serviceMapRes.updatedDate = consumerService.updatedDate;
        return serviceMapRes;
    }
}