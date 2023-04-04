import { Sequelize } from "sequelize-typescript";
import configs from ".";
import { Messages, Tenants, Users } from "../models";

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

const commonDbModels = [Tenants];
const sequelizeCommonDbInstance = new Sequelize(
    configs.databseCommon.name,
    configs.databseCommon.username,
    configs.databseCommon.password,
    {
        host: configs.databseCommon.host,
        dialect: "postgres",
        logging: false,
        models: commonDbModels
    }
);

/**
 * @params tenantId // i.e database name
*/
const connectTenantDB = async (tenantId: string): Promise<Sequelize> => {
    const tenant: Tenants = await Tenants.findOne({ where: { name: tenantId } });
    const sequelizeTenantDb = new Sequelize(
        tenant.dataValues.name,
        tenant.dataValues.username,
        tenant.dataValues.password,
        {
            host: tenant.dataValues.host,
            dialect: "postgres",
            logging: false,
            models
        }
    );
    return sequelizeTenantDb;
}

export { sequelizeCommonDbInstance, connectTenantDB };
