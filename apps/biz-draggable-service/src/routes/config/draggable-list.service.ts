import { List } from "../../database/entity/list";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ListRepository } from "../../database/repository/list.repository";
import { ListItemRepository } from "../../database/repository/list-item.repository";
import { ListItem } from "../../database/entity/list-item";
import { ListItemMoveReq } from "./model/list-item-move-req";
import { ListRes } from "./model/list-res";
import { ListItemRes } from "./model/list-item-res";

@Injectable()
export class DraggableListService {

    constructor(
        private listRepository: ListRepository,
        private listItemRepository: ListItemRepository) { }

    public async fetchListAndListItems(): Promise<ListRes[]> {
        let listsRes = [] as ListRes[];
        let lists = await this.listRepository.findAll();
        if (lists && lists.length > 0) {
            for (var list = 0; list < lists.length; list++) {
                let listRes = ListRes.toListRes(lists[list]);
                let listItems = await this.listItemRepository.findAllByListId(lists[list].id);
                if (listItems && listItems.length > 0) {
                    for (var listItem = 0; listItem < listItems.length; listItem++) {
                        listRes.listItems.push(ListItemRes.toListItemRes(listItems[listItem]));
                    }
                }
                listsRes.push(listRes);
            }
        }
        return listsRes;
    }


    public async fetchLists(): Promise<List[]> {
        return await this.listRepository.findAll();
    }

    public async fetchById(listId: number): Promise<List> {
        const result = await this.listRepository.findById(listId);
        if (result) {
            return result;
        }
        else {
            throw new NotFoundException();
        }
    }

    public async deleteById(listId: number): Promise<any> {
        return await this.listRepository.deleteById(listId);
    }

    public async save(list: List): Promise<List> {
        return await this.listRepository.save(list);
    }

    public async update(list: List): Promise<any> {
        return await this.listRepository.update(list);
    }

    public async fetchListItems(): Promise<ListItem[]> {
        return await this.listItemRepository.findAll();
    }

    public async fetchListItemById(listItemId: number): Promise<ListItem> {
        const result = await this.listItemRepository.findById(listItemId);
        if (result) {
            return result;
        }
        else {
            throw new NotFoundException();
        }
    }

    public async deleteListItemById(listItemId: number): Promise<any> {
        return await this.listItemRepository.deleteById(listItemId);
    }

    public async saveList(listItem: ListItem): Promise<ListItem> {
        return await this.listItemRepository.save(listItem);
    }

    public async updateListItem(listItem: ListItem): Promise<any> {
        return await this.listItemRepository.update(listItem);
    }

    public async updateListItemListId(listItemMoveReq: ListItemMoveReq): Promise<any> {
        return await this.listItemRepository.updateLisItemListId(listItemMoveReq.listItemId, listItemMoveReq.listId);
    }

}