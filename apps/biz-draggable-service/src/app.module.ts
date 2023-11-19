import { Module } from "@nestjs/common";
import { DraggableListModule } from "./routes/config/draggable-list.module";
import { DBModule } from "./database/db.module";
import { DBProviderModule } from "./common/provider/db.provider.module";
import { ConfigModule } from "@nestjs/config";
import dbConfig from "./core/db.config";

@Module({
    imports: [
        DraggableListModule,
        DBModule,
        DBProviderModule,
        ConfigModule.forRoot({ load: [dbConfig] })
    ]
}
)
export class AppModule { }