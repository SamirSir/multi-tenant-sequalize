// import 'dotenv/config';
import express, { Request, Response, NextFunction, Express } from "express";
import cors from "cors";

import routes from './routes';
import models, { sequelize } from './models';
import { config } from "./configs/config";

const app: Express = express();

// settings
app.set('port', config.port || 3000);

// * Application-Level Middleware * //

// Third-Party Middleware
app.use(cors());

// Built-In Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log({ req });
    // req['context'] = {
    //     models,
    //     me: models.users[1],
    // };
    req['context'] = {
        models,
        me: models.User,
    };
    next();
});

// * Routes * //
app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);
app.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res.send("Hello World, This is Multitenancy world");
});

// mount sequalize and start the server
const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    app.listen(app.get('port'), () => {
        console.error(`App running on port ${app.get('port')} ...`);
    });
});
