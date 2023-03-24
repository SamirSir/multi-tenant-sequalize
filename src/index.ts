// import 'dotenv/config';
import express, { Request, Response, NextFunction, Express } from "express";
import cors from "cors";

import routes from './routes';
import models, { sequelize } from './models';

const app: Express = express();

// settings
app.set('port', process.env.PORT || 3000);

// * Application-Level Middleware * //

// Third-Party Middleware
app.use(cors());

// Built-In Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware
app.use((req, res, next) => {
    req.context = {
        models,
        me: models.users[1],
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

console.log({ 'env': process.env });

// mount sequalize and start the server
const eraseDatabaseOnSync = true;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
    app.listen(app.get('port'), () => {
        console.error(`App running on port ${app.get('port')} ...`);
    });
});
