import configs from "../configs";
import { Tenants } from "../models";

const createTenantSeeds = async () => {
    await Tenants.create({
        name: configs.database1.name,
        username: configs.database1.username,
        password: configs.database1.password,
    })

    await Tenants.create({
        name: configs.database2.name,
        username: configs.database2.username,
        password: configs.database2.password,
    });
};

export { createTenantSeeds }