import { Row, Container, Col } from 'react-bootstrap';
import { ListDto } from '../model/list-dto';
import useAxio from "../hook/http/rest-client";
import axios from "../utility/axios-helper";
import { ReqModel, RequestType } from '../hook/http/rest-req-model';
import { useEffect, useState } from 'react';
import { UpdateDto } from '../model/update-dto';
import { AddList } from '../component/add-list/add-list';
import "./draggable-list.css";
import ViewList from '../component/view-list/view-list';

export function DraggableList() {
    const [draggedItemId, setDraggedItemId] = useState(0);
    const [draggedListId, setDraggedListId] = useState(0);
    const [droppedListId, setDroppedListId] = useState(0);
    const [lists, setLists] = useState<ListDto[]>([]);
    const [response, error, loading, send] = useAxio();

    const getListsCallback = (getListsResponse: any) => {
        setLists(getListsResponse.data as ListDto[]);
    }

    const moveListItemCallback = (moveListItemResponse: any) => {
        console.log("moveListItemResponse ", moveListItemResponse);
        if (moveListItemResponse && moveListItemResponse.data) {
            const updateListItemRes = moveListItemResponse.data as UpdateDto;
            if (updateListItemRes.affected > 0) {
                send(getListsReqModel);
            }
        }
    }

    let getListsReqModel: ReqModel = {
        method: RequestType.GET,
        axiosInstance: axios,
        url: "/api/v1/biz-draggable-list/list",
        successCallback: getListsCallback
    };
    let moveListItemReqModel: ReqModel = {
        method: RequestType.POST,
        axiosInstance: axios,
        url: "/api/v1/biz-draggable-list/list-item-move",
        successCallback: moveListItemCallback
    };

    const refreshListsCallback = () => {
        send(getListsReqModel);
    }

    useEffect(() => {
        send(getListsReqModel);
    }, []);

    useEffect(() => {
        console.log("useEffect selected listItemId ", draggedItemId, " from listId", draggedListId, " to listId", droppedListId);
        if (draggedListId === droppedListId) {
            console.log("same list");
        } else if (droppedListId && droppedListId > 0) {
            console.log("changing list item association", draggedListId);
            moveListItemReqModel.payload = {
                listItemId: draggedItemId,
                listId: droppedListId
            };
            send(moveListItemReqModel);
        }
        else {
            console.log("destination list is invalid");
        }
    }, [droppedListId])

    const onItemDragStartEventFunc = (listItemId: number, listId: number) => {
        setDraggedItemId(listItemId);
        setDraggedListId(listId);
        setDroppedListId(0);
        console.log("onItemDragStartEventFunc listItemId", listItemId, "listId", listId);
    }

    const onItemDropEndEventFunc = (listId: number) => {
        setDroppedListId(listId);
        console.log("onItemDropEndEventFunc listId", listId, " droppedListId", droppedListId);
    }

    return (
        <div>
            <Container fluid className="list-container">
                <br />
                <Row>
                    <Col xs={12} className="list-container-col">
                        <Row xs={1} md={4} lg={6} className="g-4">
                            {loading && <p>loading...</p>}
                            {!loading && error && <p>error occured .....</p>}
                            {!loading && !error && !lists?.length && <p>no data found</p>}
                            {
                                !loading && !error && lists && lists.length &&
                                (
                                    (lists as ListDto[]).map((list) => {
                                        return (
                                            <ViewList key={list.id} listDto={list}
                                                onItemDragStartEvent={onItemDragStartEventFunc}
                                                onItemDropEndEvent={onItemDropEndEventFunc}
                                                onSuccessCallback={refreshListsCallback}
                                            />
                                        )
                                    })
                                )
                            }
                            <AddList sucessCallback={refreshListsCallback}></AddList>
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}