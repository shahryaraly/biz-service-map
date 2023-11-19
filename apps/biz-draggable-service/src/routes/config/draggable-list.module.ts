import { Module } from '@nestjs/common';
import { DraggableListController } from './draggable-list.controller';
import { DraggableListService } from './draggable-list.service';
import { DBModule } from '../../database/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [DBModule, ConfigModule],
    providers: [DraggableListService],
    controllers: [DraggableListController],
})
export class DraggableListModule {

}