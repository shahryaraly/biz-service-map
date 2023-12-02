import { Controller, Get, Param} from '@nestjs/common';
import { ServiceMapService } from './service-map.service';

@Controller('/api/v1/biz-service-map')
export class ServiceMapController {

    constructor(private draggableListService: ServiceMapService) {
    }

    @Get("/list/:serviceId")
    public async getLists(@Param('serviceId') serviceId: number) {
        return await this.draggableListService.fetchServiceMapList(serviceId);
    }

}
