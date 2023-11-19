import { registerAs } from '@nestjs/config';
import { db } from '../core/config';
import { AppConstant } from '../common/constant/app.constant';

export default registerAs(AppConstant.DB_PROP_CONFIG, () => ({
    type: 'mssql',
    host: db.host,
    port: parseInt(db.port),
    username: db.user,
    password: db.password,
    database: db.name,
    synchronize: false,
    autoLoadEntities: true,
    logging: true,
    options: {
        enableArithAbort: true,
        trustServerCertificate: true,
    },
    retryAttempts: 0,
}));
