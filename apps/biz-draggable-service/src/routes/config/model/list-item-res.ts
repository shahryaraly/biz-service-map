import { ListItem } from "../../../database/entity/list-item";

export class ListItemRes {
    id: number;
    listId: number;
    title: string;
    description: string;

    public static toListItemRes(listItem: ListItem): ListItemRes {
        let listItemRes = new ListItemRes();
        listItemRes.id = listItem.id;
        listItemRes.listId = listItem.listId;
        listItemRes.title = listItem.title;
        listItemRes.description = listItem.description;
        return listItemRes;
    }
}