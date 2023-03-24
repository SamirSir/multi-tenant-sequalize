// import 'dotenv/config';
import express, { Request, Response, NextFunction, Express } from "express";
import cors from "cors";

import routes from './routes';
import config from "./configs";
import sequelizeConnection1 from "./configs/connection";

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
// app.use((req: Request, res: Response, next: NextFunction) => {
//     req['context'] = {
//         models,
//         me: models.User,
//     };
//     next();
// });

app.use((
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.status(500).json({ message: err.message });
});

// * Routes * //
app.use('/users', routes.user);
// app.use('/session', routes.session);
// app.use('/messages', routes.message);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({ message: "Hello World, This is Multitenancy world" });
});

// mount sequalize and start the server
const eraseDatabaseOnSync = false;

sequelizeConnection1.sync({ force: eraseDatabaseOnSync }).then(async () => {
    console.log('Database synced successfully');
}).catch((error) => {
    console.error('Error !!!', error);
});

app.listen(app.get('port'), () => {
    console.error(`App running on port ${app.get('port')} ...`);
});
