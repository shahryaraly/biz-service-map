import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRepository } from './repository/service.repository';
import { Service } from './entity/service';
import { AppConstant } from '../common/constant/app.constant';
import { ServiceMap } from './entity/service-map';
import { ServiceMapRepository } from './repository/service-map.repository';

@Module({
    imports: [TypeOrmModule.forFeature([Service, ServiceMap], AppConstant.DB_CONFIG_NAME)],
    providers: [ServiceRepository, ServiceMapRepository],
    exports: [ServiceRepository, ServiceMapRepository]
})

export class DBModule { }