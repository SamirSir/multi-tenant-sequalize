import { Sequelize } from "sequelize-typescript";
import configs from ".";
import { Databases } from "../enums/databases.enums";
import { Messages } from "../models/message.model";
import { Users } from "../models/user.model";

// const sequelizeConnections = [];
// configs has array lo databases
// configs.databases.forEach(database => {

// case 1: database with diffrenet schema
// register models to specific databases

// const models = [];
// switch (database.name) {
//     case Databases.VAROSA_DB_1:
//         models.push(Users);
//         break;

//     case Databases.VAROSA_DB_2:
//         models.push(Messages);
//         break;
// }

//     const sequelizeConnection = new Sequelize(
//         database.name,
//         database.username,
//         database.password,
//         {
//             host: database.host,
//             dialect: "postgres",
//             logging: false,
//             models
//         }
//     );
//     sequelizeConnections.push(sequelizeConnection);
// });

// case 2: all databases has same schema
const models = [Users, Messages];

const sequelizeTenantDatabase1 = new Sequelize(
    configs.database1.name,
    configs.database1.username,
    configs.database1.password,
    {
        host: configs.database1.host,
        dialect: "postgres",
        logging: false,
        models
    }
);

const sequelizeTenantDatabase2 = new Sequelize(
    configs.database2.name,
    configs.database2.username,
    configs.database2.password,
    {
        host: configs.database2.host,
        dialect: "postgres",
        logging: false,
        models
    }
);

export { sequelizeTenantDatabase1, sequelizeTenantDatabase2 };
