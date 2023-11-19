import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ListRepository } from './repository/list.repository';
import { List } from './entity/list';
import { AppConstant } from '../common/constant/app.constant';
import { ListItem } from './entity/list-item';
import { ListItemRepository } from './repository/list-item.repository';

@Module({
    imports: [TypeOrmModule.forFeature([List, ListItem], AppConstant.DB_CONFIG_NAME)],
    providers: [ListRepository, ListItemRepository],
    exports: [ListRepository, ListItemRepository]
})

export class DBModule { }