import { Module } from '@nestjs/common';
import { ServiceMapController } from './service-map.controller';
import { ServiceMapService } from './service-map.service';
import { DBModule } from '../../database/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [DBModule, ConfigModule],
    providers: [ServiceMapService],
    controllers: [ServiceMapController],
})
export class ServiceMapModule {

}