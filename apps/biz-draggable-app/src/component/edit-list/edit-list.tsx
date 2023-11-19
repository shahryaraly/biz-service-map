import axios from "../../utility/axios-helper";
import { useState } from "react";
import { Button, Form, Stack, Card, Modal } from "react-bootstrap";
import useAxio from "../../hook/http/rest-client";
import { ReqModel, RequestType } from "../../hook/http/rest-req-model";
import { FaRegEdit } from 'react-icons/fa';
import { ListDto } from "../../model/list-dto";

type EditListProp = {
    listId: number;
    sucessCallback: () => void;
}

export function EditList(props: EditListProp) {
    const [list, setList] = useState<ListDto>(new ListDto());
    const [modal, setModal] = useState<boolean>(false);
    const [response, error, loading, send] = useAxio();

    function handleSubmit() {
        console.log('target list edit data', list);
        editListReqModel.payload = list;
        send(editListReqModel);
    }

    const editListSuccessCallback = (editListSuccessRes: any) => {
        console.log('editListSuccessCallback', editListSuccessRes);
        if (editListSuccessRes && editListSuccessRes.data) {
            props.sucessCallback();//to reload the lists
            setModal(false);
        }
    }

    const getListSuccessCallback = (getListSuccessRes: any) => {
        console.log('getListSuccessCallback', getListSuccessRes);
        if (getListSuccessRes && getListSuccessRes.data) {
            setList(getListSuccessRes.data as ListDto);
        } else {
            setModal(false);
        }
    }

    let editListReqModel: ReqModel = {
        method: RequestType.PUT,
        axiosInstance: axios,
        url: "/api/v1/biz-draggable-list/list/",
        successCallback: editListSuccessCallback
    };

    let getListReqModel: ReqModel = {
        method: RequestType.GET,
        axiosInstance: axios,
        url: "/api/v1/biz-draggable-list/list/",
        successCallback: getListSuccessCallback
    };

    const handleModal = () => {
        setModal(!modal);
        console.log('modal', modal, 'props.listId', props.listId);
        if (!modal && props.listId > 0) {
            let getReqModel = getListReqModel;
            getReqModel.url += props.listId;
            send(getReqModel);
        }
    }

    return (
        <>
            <FaRegEdit style={{ cursor: "pointer" }} className="float-end" onClick={handleModal}></FaRegEdit>
            <Modal show={modal} onHide={handleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit List Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Stack gap={2}>
                            <Form.Control required type="text" onChange={(event) => { list.title = event.target.value }} defaultValue={list.title} placeholder="List Title" />
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