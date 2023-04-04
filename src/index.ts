import express, { Request, Response, NextFunction, Express } from "express";
import cors from "cors";

import routes from './routes';
import configs from "./configs";
import { sequelizeCommonDbInstance, sequelizeTenantDatabase1, sequelizeTenantDatabase2 } from "./configs/connection";
import { TenantsEnum } from './enums';

/**
 * @abstract
 * unhandledRejection
 * uncaughtException
 * processTicksAndRejections
 */
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", reason, promise);
});

const app: Express = express();

// settings
app.set('port', configs.port || 3000);

// * Application-Level Middleware * //

// Third-Party Middleware
app.use(cors());

// Built-In Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware
app.use(async (req: Request, res: Response, next: NextFunction) => {

    const tenantId = req.headers['tenant-id'];

    if (!tenantId) return res.status(500).json({ message: 'TenantId missing in request header.' });
    const eraseDatabaseOnSync = false;

    switch (tenantId) {
        case TenantsEnum.TENANT_DB_1:
            await sequelizeTenantDatabase1.sync({ force: eraseDatabaseOnSync }).then(async () => {
                console.log(`Database 1 synced successfully`);
            }).catch((error) => {
                console.error('Error Syncing Database 1', error);
            });
            break;

        case TenantsEnum.TENANT_DB_2:
            await sequelizeTenantDatabase2.sync({ force: eraseDatabaseOnSync }).then(async () => {
                console.log(`Database 2 synced successfully`);
            }).catch((error) => {
                console.error('Error Syncing Database 2', error);
            });
            break;

        default:
            return res.status(400).json({ message: 'Tenant not found.' });
    }
    next();
    // req['context'] = {
    //     models,
    //     me: models.User,
    // };
});

app.use((
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return res.status(500).json({ message: err.message });
});

// * Routes * //
app.use('/users', routes.user);
app.use('/messages', routes.message);
// app.use('/session', routes.session);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res
        .status(200)
        .json({ message: "Hello, this is multitenancy world!" });
});

// mount sequalize and start the server
const eraseDatabaseOnSync = true;

// For case 1: seperate DBs with seperate ER
// sequelizeConnections.forEach((connection, index) => {
//     connection.sync({ force: eraseDatabaseOnSync }).then(async () => {
//         console.log(`Database-${index + 1} synced successfully`);
//     }).catch((error) => {
//         console.error('Error !!!', error);
//     });
// });

// Case 2: common ER with different DBs
// sequelizeTenantDatabase1.sync({ force: eraseDatabaseOnSync }).then(async () => {
//     console.log(`Database 1 synced successfully`);
// }).catch((error) => {
//     console.error('Error Syncing Database 1', error);
// });

// sequelizeTenantDatabase2.sync({ force: eraseDatabaseOnSync }).then(async () => {
//     console.log(`Database 2 synced successfully`);
// }).catch((error) => {
//     console.error('Error Syncing Database 2', error);
// });

sequelizeCommonDbInstance.sync({ force: false }).then(async () => {
    console.log(`Common database synced successfully`);
}).catch((error) => {
    console.error('Error Syncing Common Database', error);
});

app.listen(app.get('port'), () => {
    console.log(`App running on port ${app.get('port')} ...`);
});

