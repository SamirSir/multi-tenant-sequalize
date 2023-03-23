import express, { Request, Response, NextFunction, Express } from "express";
import cors from "cors";
import userRoutes from "./routes/user.routes";

const app: Express = express();

// console.log({ 'env': process.env });

// middlewares
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/user", userRoutes);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    return res.send("Hello World, This is Multitenancy world");
});

// setting
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
    console.error(`App running on port ${app.get('port')} ...`);
});
