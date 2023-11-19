import axios from "../../utility/axios-helper";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import useAxio from "../../hook/http/rest-client";
import { ReqModel, RequestType } from "../../hook/http/rest-req-model";
import { ListItemDto } from "../../model/list-item-dto";
import { FaRegTrashAlt } from 'react-icons/fa';

type DeleteListItemProp = {
    listItemId: number;
    sucessCallback: () => void;
}

export function DeleteListItem(props: DeleteListItemProp) {
    const [listItem, setListItem] = useState<ListItemDto>(new ListItemDto());
    const [modal, setModal] = useState<boolean>(false);
    const [response, error, loading, send] = useAxio();

    function handleSubmit() {
        console.log('target list item data', listItem);
        deleteListItemReqModel.url += listItem.id;
        send(deleteListItemReqModel);
    }

    const deleteListItemSuccessCallback = (deleteListItemSuccessRes: any) => {
        console.log('listItemSuccessRes', deleteListItemSuccessRes);
        if (deleteListItemSuccessRes && deleteListItemSuccessRes.data) {
            props.sucessCallback();//to reload the lists
            setModal(false);
        }
    }

    let deleteListItemReqModel: ReqModel = {
        method: RequestType.POST,
        axiosInstance: axios,
        url: "/api/v1/biz-draggable-list/list-item/",
        successCallback: deleteListItemSuccessCallback
    };

    const getListItemSuccessCallback = (getListItemSuccessRes: any) => {
        console.log('getListItemSuccessCallback', getListItemSuccessRes);
        if (getListItemSuccessRes && getListItemSuccessRes.data) {
            setListItem(getListItemSuccessRes.data as ListItemDto);
        } else {
            setModal(false);
        }
    }


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

            <FaRegTrashAlt style={{ cursor: "pointer" }} className="float-end" onClick={handleModal}></FaRegTrashAlt>
            <Modal show={modal} onHide={handleModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete List Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Modal.Body>
                        <p>Are you sure, you want to remove <b>{listItem.title}</b>.</p>
                        <p><b>Removing:</b> will remove the item and it's details associated and will not be recoverable.</p>
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