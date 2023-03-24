import { Sequelize } from "sequelize-typescript";
import configs from ".";
import { Users } from "../models/user.model";

const sequelizeConnection1 = new Sequelize({
    database: configs.database1.name,
    host: configs.database1.host,
    username: configs.database1.username,
    password: configs.database1.password,
    dialect: "postgres",
    logging: false,
    models: [
        Users
    ]
});

export default sequelizeConnection1;