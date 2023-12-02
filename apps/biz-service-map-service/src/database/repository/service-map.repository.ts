import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppConstant } from "../../common/constant/app.constant";
import { ServiceMap } from "../entity/service-map";

@Injectable()
export class ServiceMapRepository {
    constructor(
        @InjectRepository(ServiceMap, AppConstant.DB_CONFIG_NAME)
        private serviceMapRepository: Repository<ServiceMap>) {
    }

    public async findAll(): Promise<ServiceMap[]> {
        return await this.serviceMapRepository.find();
    }

    public async findAllByServiceId(serviceId: number): Promise<ServiceMap[]> {
        return await this.serviceMapRepository.find({ where: { serviceId: serviceId } });
    }

    public async findById(serviceMapId: number): Promise<ServiceMap | null> {
        return await this.serviceMapRepository.findOneById(serviceMapId);
    }

    public async deleteById(serviceMapId: number): Promise<any> {
        const result = this.serviceMapRepository.delete({ id: serviceMapId });
        return result;
    }

    public async save(serviceMap: ServiceMap): Promise<ServiceMap> {
        let { id, ...serviceMapToSave } = serviceMap;
        return await this.serviceMapRepository.save(serviceMapToSave);
    }

    public async update(serviceMap: ServiceMap): Promise<any> {
        let { id, ...serviceMapToUpdate } = serviceMap;
        return await this.serviceMapRepository.update(serviceMap.id, serviceMapToUpdate);
    }

}