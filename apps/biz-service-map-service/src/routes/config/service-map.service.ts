import { Injectable } from "@nestjs/common";
import { ServiceRepository } from "../../database/repository/service.repository";
import { ServiceMapRepository } from "../../database/repository/service-map.repository";
import { ServiceMapRes } from "./model/service-map-res";

@Injectable()
export class ServiceMapService {

    constructor(
        private serviceRepository: ServiceRepository,
        private serviceMapRepository: ServiceMapRepository) { }

    public async fetchServiceMapList(serviceId: number): Promise<ServiceMapRes[]> {
        let serviceMapResList = [] as ServiceMapRes[];
        let serviceMapList = await this.serviceMapRepository.findAllByServiceId(serviceId);
        let service = await this.serviceRepository.findById(serviceId);
        if (serviceMapList && serviceMapList.length > 0) {
            for (var serviceMap = 0; serviceMap < serviceMapList.length; serviceMap++) {
                let consumerService = await this.serviceRepository.findById(serviceMapList[serviceMap].consumerServiceId);
                if(consumerService && service){
                    let serviceMapRes = ServiceMapRes.toServiceMapRes(service ,consumerService);
                    serviceMapResList.push(serviceMapRes);
                }
            }
        }
        serviceMapResList.push(
        {
            active:true,
            serviceId:service?.id || 0,
            serviceName: service?.name || "",
            consumerServiceId:0,
            consumerServiceName:"",
            createdDate:service?.createdDate || new Date(),
            updatedDate: service?.updatedDate || new Date()
        });
        return serviceMapResList;
    }
}