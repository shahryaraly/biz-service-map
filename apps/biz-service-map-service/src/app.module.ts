import { Module } from "@nestjs/common";
import { ServiceMapModule } from "./routes/config/service-map.module";
import { DBModule } from "./database/db.module";
import { DBProviderModule } from "./common/provider/db.provider.module";
import { ConfigModule } from "@nestjs/config";
import dbConfig from "./core/db.config";

@Module({
    imports: [
        ServiceMapModule,
        DBModule,
        DBProviderModule,
        ConfigModule.forRoot({ load: [dbConfig] })
    ]
}
)
export class AppModule { }