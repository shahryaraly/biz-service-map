import { ListItemDto } from "./list-item-dto";

export class ListDto {
    id: number = 0;
    title: string = "";
    listItems: ListItemDto[] = [];
}