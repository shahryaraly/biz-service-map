import { Injectable } from "@nestjs/common";
import { Service } from '../entity/service';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppConstant } from "../../common/constant/app.constant";

@Injectable()
export class ServiceRepository {
    constructor(
        @InjectRepository(Service, AppConstant.DB_CONFIG_NAME)
        private serviceRepository: Repository<Service>) {
    }

    public async findAll(): Promise<Service[]> {
        return await this.serviceRepository.find();
    }

    public async findById(serviceId: number): Promise<Service | null> {
        return await this.serviceRepository.findOneById(serviceId);
    }

    public async deleteById(serviceId: number): Promise<any> {
        const result = this.serviceRepository.delete({ id: serviceId });
        return result;
    }

    public async save(service: Service): Promise<Service> {
        let { id, ...serviceToSave } = service;
        return await this.serviceRepository.save(serviceToSave);
    }

    public async update(service: Service): Promise<any> {
        let { id, ...serviceToUpdate } = service;
        return await this.serviceRepository.update(service.id, serviceToUpdate);
    }

}