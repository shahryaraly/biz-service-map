import axios from "../../utility/axios-helper";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useAxio from "../../hook/http/rest-client";
import { ReqModel, RequestType } from "../../hook/http/rest-req-model";
import { ListDto } from "../../model/list-dto";
import { FaRegTrashAlt } from 'react-icons/fa';

type DeleteListProp = {
    listId: number;
    sucessCallback: () => void;
}

export function DeleteList(props: DeleteListProp) {
    const [list, setList] = useState<ListDto>(new ListDto());
    const [modal, setModal] = useState<boolean>(false);
    const [response, error, loading, send] = useAxio();

    function handleSubmit() {
        console.log('target list item data', list);
        deleteListReqModel.url += list.id;
        send(deleteListReqModel);
    }

    const deleteListSuccessCallback = (deleteListSuccessRes: any) => {
        console.log('ListSuccessRes', deleteListSuccessRes);
        if (deleteListSuccessRes && deleteListSuccessRes.data) {
            props.sucessCallback();//to reload the lists
            setModal(false);
        }
    }

    let deleteListReqModel: ReqModel = {
        method: RequestType.POST,
        axiosInstance: axios,
        url: "/api/v1/biz-draggable-list/list/",
        successCallback: deleteListSuccessCallback
    };

    const getListSuccessCallback = (getListSuccessRes: any) => {
        console.log('getListSuccessCallback', getListSuccessRes);
        if (getListSuccessRes && getListSuccessRes.data) {
            setList(getListSuccessRes.data as ListDto);
        } else {
            setModal(false);
        }
    }


    let getListReqModel: ReqModel = {
        method: RequestType.GET,
        axiosInstance: axios,
        url: "/api/v1/biz-draggable-list/list/",
        successCallback: getListSuccessCallback
    };

    const handleModal = () => {
        setModal(!modal);
        console.log('modal', modal, 'props.ListId', props.listId);
        if (!modal && props.listId > 0) {
            let getReqModel = getListReqModel;
            getReqModel.url += props.listId;
            send(getReqModel);
        }
    }

    return (
        <>

            <FaRegTrashAlt style={{ cursor: "pointer" }} className="float-end" onClick={handleModal}></FaRegTrashAlt>
            <Modal show={modal} onHide={handleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete List</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Body>
                        <p>Are you sure, you want to remove <b>{list.title}</b>.</p>
                        <p><b>Removing:</b> will remove the item and it's associated items & will not be recoverable.</p>
                    </Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModal}>Close</Button>
                    <Button variant="primary" onClick={handleSubmit}>Save</Button>
                </Modal.Footer>
            </Modal>
        </>
    );


}