import DataTypes, { Sequelize } from "sequelize";

import getUserModel from "./user.model";
import getMessageModel from "./message.model";
import config from "../configs";

const sequelize = new Sequelize(
    config.database1.name,
    config.database1.username,
    config.database1.password,
    {
        dialect: "postgres",
    },
);

const models = {
    User: getUserModel(sequelize, DataTypes),
    Message: getMessageModel(sequelize, DataTypes),
};

export { sequelize };

export default models;
