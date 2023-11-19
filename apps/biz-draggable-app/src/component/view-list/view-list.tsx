import { Card, Col, Stack } from "react-bootstrap";
import { AddListItem } from "../add-list-item/add-list-item";
import "./view-list.css";
import { EditListItem } from "../edit-list-item/edit-list-item";
import { EditList } from "../edit-list/edit-list";
import { ListDto } from "../../model/list-dto";
import { DeleteListItem } from "../delete-list-item/delete-list-item";
import { DeleteList } from "../delete-list/delete-list";


type ViewListProp = {
    listDto: ListDto;
    onItemDropEndEvent: (itemId: number) => void;
    onItemDragStartEvent: (itemId: number, listId: number) => void;
    onSuccessCallback: () => void;
}

export default function ViewList(props: ViewListProp) {

    const handleItemDragStartEvent = (listItemId: number, listId: number) => {
        console.log("handleItemDragStartEvent started for itemId-id", listItemId, "listId-id", listId);
        props.onItemDragStartEvent(listItemId, listId);
    }

    const handleItemOnDropEvent = (listId: number) => {
        console.log('handleItemOnDropEvent ended at listId-id', listId);
        props.onItemDropEndEvent(listId);
    }

    const handleReloadDashbaordCallback = () => {
        props.onSuccessCallback();
    }

    const handleOnDragOverEvent = (e: any) => {
        e.preventDefault();
    }

    const list = props.listDto.listItems.length ?
        (
            <Stack gap={2}>
                {
                    props.listDto.listItems.map((item) => {
                        return (
                            <Card key={item.id}
                                id={item.title}
                                className="ms-1 card-item"
                                draggable
                                onDragStart={() => { handleItemDragStartEvent(item.id, props.listDto.id) }}
                            >
                                <Card.Header>
                                    <Stack direction="horizontal" gap={2} className="text-right">
                                        {item.title}
                                        <EditListItem listItemId={item.id} sucessCallback={props.onSuccessCallback} ></EditListItem>
                                        <DeleteListItem listItemId={item.id} sucessCallback={props.onSuccessCallback} ></DeleteListItem>
                                    </Stack>
                                </Card.Header>
                                <Card.Body>
                                    {item.description}
                                </Card.Body>
                            </Card>
                        )
                    })
                }
                <AddListItem listId={props.listDto.id} sucessCallback={handleReloadDashbaordCallback} />
            </Stack >
        ) : <AddListItem listId={props.listDto.id} sucessCallback={handleReloadDashbaordCallback} />


    return (
        <Col key={props.listDto.id}>
            <Card onDrop={() => { handleItemOnDropEvent(props.listDto.id) }}
                onDragOver={handleOnDragOverEvent}
                style={{ "height": "100%" }}>
                <Card.Header>
                    <div>
                        <Stack direction="horizontal" gap={2} className="text-right">
                            {props.listDto.title}
                            <EditList sucessCallback={props.onSuccessCallback} listId={props.listDto.id}></EditList>
                            <DeleteList sucessCallback={props.onSuccessCallback} listId={props.listDto.id}></DeleteList>
                        </Stack>
                    </div>
                </Card.Header>
                <Card.Body>
                    {list}
                </Card.Body>
            </Card>
        </Col>
    );
}

