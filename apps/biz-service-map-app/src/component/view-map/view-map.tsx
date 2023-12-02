import React, { CSSProperties, useEffect, useState } from "react";
import {  Button, Col, Container,  OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import {  FaRegDotCircle,  FaVolleyballBall } from "react-icons/fa";
import { ServiceMapRes } from "../../model/service-map-res";
import { ElementProps } from "./model/element-prop"
import "./view-map.css"

type ViewMapProp = {
    serviceMapList: ServiceMapRes[]
}

export function ViewMap(props:ViewMapProp) {

    const getPannelWidth = (): number => {
        return ((window.innerWidth / 100) * 100);
    }
    const getPannelCenterX = (): number => {
        return (pannelWidth / 2) + ((window.innerWidth / 100) );
    }
    const [pannelHeight, setPannelHeight] = useState<number>(window.innerHeight);
    const [pannelWidth, setPannelWidth] = useState<number>(getPannelWidth());
    const [pannelCenterX, setPannelCenterX] = useState<number>(getPannelCenterX());
    const [pannelCenterY, setPannelCenterY] = useState<number>(window.innerHeight / 2);
    const [view, setView] = useState<string>("single");
    const [serviceMapList, setServiceMapList] = useState<ServiceMapRes[]>(props.serviceMapList);
    const [arrangeServiceMap, setArrangeServiceMap] = useState<boolean>(false);


    useEffect(() => {
        console.log('re-render services map');
        if (!arrangeServiceMap) {
            if (view === "single") {
                renderServiceMap("single", 1,pannelHeight/3);
            } else if (view === "layered") {
                 renderServiceMap("layered", 2,pannelHeight/5);
            }
        }
        window.addEventListener('mousemove', mouseMoveHandler);
        window.addEventListener('resize', handleResize)
        return (() => {
            window.removeEventListener('mousemove', mouseMoveHandler);
            window.removeEventListener('resize', handleResize)

        })
    }, [serviceMapList, pannelWidth, pannelHeight, view])

    function handleResize(this: Window) {
        setPannelHeight(this.innerHeight);
        setPannelWidth(getPannelWidth());
        setPannelCenterX(getPannelCenterX());
        setPannelCenterY(this.innerHeight / 2);
        setArrangeServiceMap(false);
    }

    function mouseMoveHandler(this: Window, ev: MouseEvent) {
        const index: number = serviceMapList.findIndex(x => x.isMouseDown);
        if (index != -1) {
            changeServicePosition(index, ev.clientX, ev.clientY);
        }
    }

    function changeServicePosition(index: number, clientX: number, clientY: number) {
        let serviceMapListObj: ServiceMapRes[] = [...serviceMapList];
        let serviceMapObj: ServiceMapRes = { ...serviceMapListObj[index] };
        let serviceMapNewProps: ElementProps = { ...serviceMapObj.elementProps };
        let newXLocation = clientX - (serviceMapNewProps.mouseClickX ? serviceMapNewProps.mouseClickX : 0);
        let newYLocation = clientY - (serviceMapNewProps.mouseClickY ? serviceMapNewProps.mouseClickY : 0);
        serviceMapNewProps.mouseClickX = clientX;
        serviceMapNewProps.mouseClickY = clientY;
        serviceMapNewProps.leftX = (serviceMapNewProps.getPositionFromPx(serviceMapNewProps.left) + newXLocation);
        serviceMapNewProps.topY = (serviceMapNewProps.getPositionFromPx(serviceMapNewProps.top) + newYLocation);
        serviceMapNewProps.left = serviceMapNewProps.leftX + "PX";
        serviceMapNewProps.top = serviceMapNewProps.topY + "PX";
        serviceMapNewProps.centerX = (serviceMapNewProps.getPositionFromPx(serviceMapNewProps.width) / 2) + serviceMapNewProps.leftX;
        serviceMapNewProps.centerY = (serviceMapNewProps.getPositionFromPx(serviceMapNewProps.height) / 2) + serviceMapNewProps.topY;
        serviceMapObj.elementProps = serviceMapNewProps;
        serviceMapListObj[index] = serviceMapObj;
        setServiceMapList(serviceMapListObj);
    }

    const handleOnMouseDownEvent = (event: React.MouseEvent, serviceMap: ServiceMapRes, index: number) => {
        event.preventDefault();
        if (!serviceMap.isMouseDown) {
            const serviceMapListObj: ServiceMapRes[] = [...serviceMapList];
            let serviceMapObj: ServiceMapRes = { ...serviceMapListObj[index] };
            serviceMapObj.isMouseDown = true;
            serviceMapObj.elementProps = { ...serviceMapObj.elementProps };
            serviceMapObj.elementProps.mouseClickX = event.clientX;
            serviceMapObj.elementProps.mouseClickY = event.clientY;
            serviceMapObj.elementProps.zIndex = 100;
            serviceMapListObj[index] = serviceMapObj;
            setServiceMapList(serviceMapListObj);
        }
    }

    const handleOnMouseUpEvent = (event: React.MouseEvent<HTMLInputElement>, serviceMap: ServiceMapRes, index: number) => {
        if (serviceMapList.findIndex(x => x.isMouseDown) != -1) {
            const serviceMapListObj: ServiceMapRes[] = [...serviceMapList];
            serviceMapListObj.forEach(x => {
                x.isMouseDown = false;
                x.elementProps = { ...x.elementProps };
                x.elementProps.zIndex = 0;
            });
            setServiceMapList(serviceMapListObj);
        }
    }

    const renderServiceMap = (viewType: string, numberOfLayers: number, distanceBetweenLayer:number) => {
        setView(viewType);
        //reset top & left of each element to arrange the componenets
        const serviceMapListObj: ServiceMapRes[] = [...serviceMapList];

        const innerLayerRadius: number = distanceBetweenLayer;
        const outerLayerRadius: number = numberOfLayers > 1 ? distanceBetweenLayer *2 : distanceBetweenLayer;
        const numberOfObjectsInLayer = (360/(serviceMapList.length));
        let isInnerLayer: boolean = true;

        serviceMapListObj.forEach((service, index) => {
            service.elementProps = { ...service.elementProps };
            if (service.consumerServiceId) {

                let y: number = 0;
                let x: number = 0;
                let radius: number = 0;
                if (isInnerLayer) {
                    radius = innerLayerRadius;
                } else {
                    radius = outerLayerRadius;
                }

                y = Math.round((Math.sin((numberOfObjectsInLayer * index) * (Math.PI / 180)) * radius) + (pannelCenterY - service.elementProps.getPositionFromPx(service.elementProps.height) / 2));
                x = Math.round((Math.cos((numberOfObjectsInLayer * index) * (Math.PI / 180)) * radius) + (pannelCenterX - service.elementProps.getPositionFromPx(service.elementProps.width) / 2));

                service.elementProps.topY = y;
                service.elementProps.leftX = x;
                service.elementProps.top = service.elementProps.topY + "PX";
                service.elementProps.left = service.elementProps.leftX + "PX";
                service.elementProps.centerX = (service.elementProps.getPositionFromPx(service.elementProps.width) / 2) + service.elementProps.leftX;
                service.elementProps.centerY = (service.elementProps.getPositionFromPx(service.elementProps.height) / 2) + service.elementProps.topY;
            } else {
                service.elementProps.topY = (pannelCenterY - service.elementProps.getPositionFromPx(service.elementProps.height) / 2);
                service.elementProps.leftX = (pannelCenterX - service.elementProps.getPositionFromPx(service.elementProps.width) / 2);
                service.elementProps.top = service.elementProps.topY + "PX";
                service.elementProps.left = service.elementProps.leftX + "PX";
                service.elementProps.centerX = (service.elementProps.getPositionFromPx(service.elementProps.width) / 2) + service.elementProps.leftX;
                service.elementProps.centerY = (service.elementProps.getPositionFromPx(service.elementProps.height) / 2) + service.elementProps.topY;
            }
            isInnerLayer = !isInnerLayer;
        })
        setArrangeServiceMap(true);
        setServiceMapList(serviceMapListObj);
    }


    return <Container fluid className="mm-service-container p-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <g fill="none" stroke="#8B8181">
                {
                    serviceMapList && serviceMapList.filter(x => x.consumerServiceId > 0).map((serviceMap, index) => {
                        return (
                            <path
                                key={serviceMap.consumerServiceId}
                                className="mm-service-path"
                                d={
                                    serviceMap
                                        .elementProps
                                        .getPathString(
                                            serviceMapList.find(x => x.consumerServiceId === 0)?.elementProps.centerX,
                                            serviceMapList.find(x => x.consumerServiceId === 0)?.elementProps.centerY,
                                            serviceMap.elementProps.leftX ? serviceMap.elementProps.leftX + 50 : 0,
                                            serviceMap.elementProps.topY ? serviceMap.elementProps.topY + 50 : 0,
                                        )
                                } />
                        )
                    })
                }
            </g>
        </svg>
        <Row className="ms-service">

            <Col className="ms-service-box nopadding p-0" xs={10}>
                {
                    <div className="top-nav">
                        <Button onClick={()=>{renderServiceMap("single",1,pannelHeight/3)}} variant={view === "single" ? "secondary" : "light"} className="mr-5" >Single <FaRegDotCircle /></Button>
                        <Button onClick={()=>{renderServiceMap("layered",2,pannelHeight/5)}} variant={view === "layered" ? "secondary" : "light"} className="mr-5">Layerd <FaVolleyballBall /></Button>
                    </div>
                }

                {
                    serviceMapList && serviceMapList.map((serviceMap, index) => {
                        return (
                                <div
                                    className="mm-service"
                                    key={serviceMap.consumerServiceId}
                                    style={serviceMap.elementProps as CSSProperties}
                                    onMouseDown={(event: React.MouseEvent<HTMLInputElement>) => { handleOnMouseDownEvent(event, serviceMap, index); }}
                                    onMouseUp={(event: React.MouseEvent<HTMLInputElement>) => { handleOnMouseUpEvent(event, serviceMap, index); }}
                                >
                                    <span style={{ "transform": serviceMap.elementProps.transformOposite, "position": "absolute" }}>
                                        {serviceMap.consumerServiceName ? serviceMap.consumerServiceName : serviceMap.serviceName}
                                    </span>
                                    <span className="mm-service-connector"></span>
                                </div>
                        )
                    })
                }
            </Col >

        </Row>
    </Container >

}