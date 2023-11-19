import { Injectable } from "@nestjs/common";
import { List } from '../entity/list';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppConstant } from "../../common/constant/app.constant";

@Injectable()
export class ListRepository {
    constructor(
        @InjectRepository(List, AppConstant.DB_CONFIG_NAME)
        private listRepository: Repository<List>) {
    }

    public async findAll(): Promise<List[]> {
        return await this.listRepository.find();
    }

    public async findById(listId: number): Promise<List | null> {
        return await this.listRepository.findOneById(listId);
    }

    public async deleteById(listId: number): Promise<any> {
        const result = this.listRepository.delete({ id: listId });
        return result;
    }

    public async save(list: List): Promise<List> {
        let { id, ...listToSave } = list;
        return await this.listRepository.save(listToSave);
    }

    public async update(list: List): Promise<any> {
        let { id, ...listToUpdate } = list;
        return await this.listRepository.update(list.id, listToUpdate);
    }

}