import axios from "../../utility/axios-helper";
import { useState } from "react";
import { Button, Form, Stack, Modal } from "react-bootstrap";
import useAxio from "../../hook/http/rest-client";
import { ReqModel, RequestType } from "../../hook/http/rest-req-model";
import { ListItemDto } from "../../model/list-item-dto";
import { FaRegEdit } from 'react-icons/fa';

type EditListItemProp = {
    listItemId: number;
    sucessCallback: () => void;
}

export function EditListItem(props: EditListItemProp) {
    const [listItem, setListItem] = useState<ListItemDto>(new ListItemDto());
    const [modal, setModal] = useState<boolean>(false);
    const [response, error, loading, send] = useAxio();

    function handleSubmit() {
        console.log('target list item edit data', listItem);
        editListItemReqModel.payload = listItem;
        send(editListItemReqModel);
    }

    const editListItemSuccessCallback = (editListItemSuccessRes: any) => {
        console.log('editListItemSuccessCallback', editListItemSuccessRes);
        if (editListItemSuccessRes && editListItemSuccessRes.data) {
            props.sucessCallback();//to reload the lists
            setModal(false);
        }
    }

    const getListItemSuccessCallback = (getListItemSuccessRes: any) => {
        console.log('getListItemSuccessCallback', getListItemSuccessRes);
        if (getListItemSuccessRes && getListItemSuccessRes.data) {
            setListItem(getListItemSuccessRes.data as ListItemDto);
        } else {
            setModal(false);
        }
    }

    let editListItemReqModel: ReqModel = {
        method: RequestType.PUT,
        axiosInstance: axios,
        url: "/api/v1/biz-draggable-list/list-item",
        successCallback: editListItemSuccessCallback
    };

    let getListItemReqModel: ReqModel = {
        method: RequestType.GET,
        axiosInstance: axios,
        url: "/api/v1/biz-draggable-list/list-item/",
        successCallback: getListItemSuccessCallback
    };

    const handleModal = () => {
        setModal(!modal);
        console.log('modal', modal, 'props.listItemId', props.listItemId);
        if (!modal && props.listItemId > 0) {
            let getReqModel = getListItemReqModel;
            getReqModel.url += props.listItemId;
            send(getReqModel);
        }
    }

    return (
        <>
            <FaRegEdit style={{ cursor: "pointer" }} className="float-end" onClick={handleModal}></FaRegEdit>
            <Modal show={modal} onHide={handleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit List Item Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Stack gap={2}>
                            <Form.Control required type="text" onChange={(event) => { listItem.title = event.target.value }} defaultValue={listItem.title} placeholder="List Item Title" />
                            <Form.Control required type="text" onChange={(event) => { listItem.description = event.target.value }} defaultValue={listItem.description} placeholder="List Item Description" />
                        </Stack>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModal}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}