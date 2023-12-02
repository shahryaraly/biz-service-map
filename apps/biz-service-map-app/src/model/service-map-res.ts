import { ElementProps } from "../component/view-map/model/element-prop"

export class ServiceMapRes {
    serviceId: number = 0;
    serviceName: string = "";
    consumerServiceId: number = 0;
    consumerServiceName: string = "";
    active: boolean = false;
    createdDate: Date = new Date();
    updatedDate: Date = new Date();
    elementProps: ElementProps = new ElementProps("120PX", "0PX", "100PX", "100PX");
    isMouseDown?: boolean;
    isMouseMoving?: boolean;
}