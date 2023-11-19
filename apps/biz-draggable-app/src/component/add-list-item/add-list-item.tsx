import axios from "../../utility/axios-helper";
import { SyntheticEvent, useState } from "react";
import { Button, Col, Form, Stack, Card, Modal } from "react-bootstrap";
import useAxio from "../../hook/http/rest-client";
import { ReqModel, RequestType } from "../../hook/http/rest-req-model";
import { ListItemDto } from "../../model/list-item-dto";
import { FaRegPlusSquare, FaRegSave } from 'react-icons/fa';

type AddListItemProp = {
    listId: number;
    sucessCallback: () => void;
}

export function AddListItem(props: AddListItemProp) {
    const [listItem, setListItem] = useState<ListItemDto>(new ListItemDto());
    const [modal, setModal] = useState<boolean>(false);
    const [response, error, loading, send] = useAxio();

    function handleSubmit() {
        console.log('target list item data', listItem);
        listItem.listId = props.listId;
        addListItemReqModel.payload = listItem;
        send(addListItemReqModel);
    }

    const addListItemSuccessCallback = (addListItemSuccessRes: any) => {
        console.log('listItemSuccessRes', addListItemSuccessRes);
        if (addListItemSuccessRes && addListItemSuccessRes.data) {
            props.sucessCallback();//to reload the lists
            setModal(false);
        }
    }

    let addListItemReqModel: ReqModel = {
        method: RequestType.POST,
        axiosInstance: axios,
        url: "/api/v1/biz-draggable-list/list-item/",
        successCallback: addListItemSuccessCallback
    };

    const handleModal = () => {
        setModal(!modal);
    }

    return (
        <>

            <Button style={{ "width": "100%" }} onClick={handleModal} className="text-center"><FaRegPlusSquare></FaRegPlusSquare></Button>
            <Modal show={modal} onHide={handleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add List Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Stack gap={2}>
                            <Form.Control required type="text" onChange={(event) => { listItem.title = event.target.value }} defaultValue={listItem.title} placeholder="Item Title" />
                            <Form.Control required type="text" onChange={(event) => { listItem.description = event.target.value }} defaultValue={listItem.description} placeholder="Item Description" />
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