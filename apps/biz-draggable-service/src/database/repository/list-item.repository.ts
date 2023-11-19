import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppConstant } from "../../common/constant/app.constant";
import { ListItem } from "../entity/list-item";

@Injectable()
export class ListItemRepository {
    constructor(
        @InjectRepository(ListItem, AppConstant.DB_CONFIG_NAME)
        private listItemRepository: Repository<ListItem>) {
    }

    public async findAll(): Promise<ListItem[]> {
        return await this.listItemRepository.find();
    }

    public async findAllByListId(listId: number): Promise<ListItem[]> {
        return await this.listItemRepository.find({ where: { listId: listId } });
    }

    public async findById(listItemId: number): Promise<ListItem | null> {
        return await this.listItemRepository.findOneById(listItemId);
    }

    public async deleteById(listItemId: number): Promise<any> {
        const result = this.listItemRepository.delete({ id: listItemId });
        return result;
    }

    public async save(listItem: ListItem): Promise<ListItem> {
        let { id, ...listItemToSave } = listItem;
        return await this.listItemRepository.save(listItemToSave);
    }

    public async update(listItem: ListItem): Promise<any> {
        let { id, ...listItemToUpdate } = listItem;
        return await this.listItemRepository.update(listItem.id, listItemToUpdate);
    }

    public async updateLisItemListId(listItemId: number, listId: number): Promise<any> {
        return await this.listItemRepository
            .createQueryBuilder()
            .update(ListItem)
            .set({ listId: listId })
            .where("id=:listItemId", { listItemId: listItemId })
            .execute();
    }

}