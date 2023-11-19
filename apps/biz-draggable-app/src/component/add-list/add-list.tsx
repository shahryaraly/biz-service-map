import axios from "../../utility/axios-helper";
import { SyntheticEvent, useState } from "react";
import { Button, Col, Form, Stack, Card } from "react-bootstrap";
import useAxio from "../../hook/http/rest-client";
import { ReqModel, RequestType } from "../../hook/http/rest-req-model";
import { ListDto } from "../../model/list-dto";
import { FaRegSave } from 'react-icons/fa';

export function AddList(props: any) {
    const [list, setList] = useState<ListDto>(new ListDto());
    const [response, error, loading, send] = useAxio();

    function handleSubmit(e: SyntheticEvent) {
        e.preventDefault();
        console.log('target list data', list);
        addListReqModel.payload = list;
        send(addListReqModel);
    }

    const addListSuccessCallback = (addListSuccessRes: any) => {
        console.log('addListSuccessRes', addListSuccessRes);
        if (addListSuccessRes && addListSuccessRes.data) {
            let listRefresh = { ...list };
            listRefresh.title = "";
            setList(listRefresh);
            props.sucessCallback();
        }
    }

    let addListReqModel: ReqModel = {
        method: RequestType.POST,
        axiosInstance: axios,
        url: "/api/v1/biz-draggable-list/list/",
        successCallback: addListSuccessCallback
    };

    return (
        <Col>
            <Card>
                <Card.Header>Add List</Card.Header>
                <Card.Body>
                    <Card.Subtitle></Card.Subtitle>
                    <Form onSubmit={handleSubmit}>
                        <Stack gap={2}>
                            <Form.Control required type="text" onChange={(event) => { list.title = event.target.value }} defaultValue={list.title} placeholder="Title" />
                            <Button type="submit">Save <FaRegSave></FaRegSave></Button>
                        </Stack>
                    </Form>
                </Card.Body>
            </Card>
        </Col>
    );


}