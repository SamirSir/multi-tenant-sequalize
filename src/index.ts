import express, { Request, Response, NextFunction, Express } from "express";
import cors from "cors";

import routes from './routes';
import configs from "./configs";
import { sequelizeCommonDbInstance } from "./configs/connection";
import { createTenantSeeds } from "./services/utility.service";
import { connectTenantDbMiddleware } from "./middlewares";

/**
 * @abstract
 * unhandledRejection
 * uncaughtException
 * processTicksAndRejections
*/
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", reason);
});

const multitenantExpressApp: Express = express();

// settings
multitenantExpressApp.set('port', configs.port || 3000);

// * Application-Level Middleware * //
// Third-Party Middleware
multitenantExpressApp.use(cors());

// Built-In Middleware
multitenantExpressApp.use(express.json());
multitenantExpressApp.use(express.urlencoded({ extended: true }));

// Custom Middleware
multitenantExpressApp.use(connectTenantDbMiddleware);
multitenantExpressApp.use((
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    return res.status(500).json({ message: err.message });
});

// * Routes * //
multitenantExpressApp.use('/users', routes.userRoutes);
multitenantExpressApp.use('/messages', routes.messageRoutes);
multitenantExpressApp.use('/tenants', routes.tenantRoutes);

multitenantExpressApp.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res
        .status(200)
        .json({ message: "Hello, this is multitenancy world!" });
});

// Initialize app by syncing common database
const eraseCommonDBOnSync = true;
sequelizeCommonDbInstance.sync({ force: eraseCommonDBOnSync }).then(async () => {
    if (eraseCommonDBOnSync) await createTenantSeeds();
    console.log(`Common database synced successfully`);

    multitenantExpressApp.listen(multitenantExpressApp.get('port'), () => {
        console.log(`App running on port ${multitenantExpressApp.get('port')} ...`);
    });

}).catch((error) => {
    console.error('Error Syncing Common Database', error);
});
