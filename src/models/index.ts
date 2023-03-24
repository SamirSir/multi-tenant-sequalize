import DataTypes, { Sequelize } from "sequelize";

import getUserModel from "./user";
import getMessageModel from "./message";
import { config } from "../configs/config";

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

Object.keys(models).forEach((key) => {
    if ("associate" in models[key]) {
        models[key].associate(models);
    }
});

export { sequelize };

export default models;
