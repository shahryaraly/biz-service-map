import { AppConstant } from "../constant/app.constant";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => {
                return {
                    ...configService.get(AppConstant.DB_PROP_CONFIG),
                };
            },
            name: AppConstant.DB_CONFIG_NAME,
            inject: [ConfigService]

        }),
    ],
})
export class DBProviderModule { }
