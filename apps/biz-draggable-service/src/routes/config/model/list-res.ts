import { List } from "../../../database/entity/list";
import { ListItemRes } from "./list-item-res";

export class ListRes {
    id: number;
    title: string;
    listItems: ListItemRes[];

    public static toListRes(list: List): ListRes {
        let listRes = new ListRes();
        listRes.id = list.id;
        listRes.title = list.title;
        listRes.listItems = [];
        return listRes;
    }
}