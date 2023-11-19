import { Controller, Get, Logger, Param, Post, Body, Put } from '@nestjs/common';
import { DraggableListService } from './draggable-list.service';
import { List } from '../../database/entity/list';
import { ListItem } from '../../database/entity/list-item';
import { ListItemMoveReq } from './model/list-item-move-req';

@Controller('/api/v1/biz-draggable-list')
export class DraggableListController {

    constructor(private draggableListService: DraggableListService) {
    }

    @Get("/list")
    public async getLists() {
        return await this.draggableListService.fetchListAndListItems();
    }

    @Get("/list/:listId")
    public async getListById(@Param('listId') listId: number) {
        return await this.draggableListService.fetchById(listId);
    }

    @Post("/list/:listId")
    public async deleteListById(@Param('listId') listId: number) {
        return await this.draggableListService.deleteById(listId);
    }

    @Post("/list")
    public async addList(@Body() list: List) {
        Logger.log(list);
        return await this.draggableListService.save(list);
    }

    @Put("/list")
    public async updateList(@Body() list: List) {
        Logger.log(list);
        return await this.draggableListService.update(list);
    }

    @Get("/list-item")
    public async getListItems() {
        return await this.draggableListService.fetchListItems();
    }

    @Get("/list-item/:itemId")
    public async getListItemById(@Param('itemId') listItemId: number) {
        return await this.draggableListService.fetchListItemById(listItemId);
    }

    @Post("/list-item/:itemId")
    public async deleteListItemById(@Param('itemId') listItemId: number) {
        return await this.draggableListService.deleteListItemById(listItemId);
    }

    @Post("/list-item")
    public async addListItem(@Body() listItem: ListItem) {
        Logger.log(listItem);
        return await this.draggableListService.saveList(listItem);
    }

    @Put("/list-item")
    public async updateListItem(@Body() listItem: ListItem) {
        Logger.log(listItem);
        return await this.draggableListService.updateListItem(listItem);
    }

    @Post("/list-item-move")
    public async updateListItemListId(@Body() listItemMoveReq: ListItemMoveReq) {
        Logger.log("data request: ", listItemMoveReq);
        return await this.draggableListService.updateListItemListId(listItemMoveReq);
    }
}
