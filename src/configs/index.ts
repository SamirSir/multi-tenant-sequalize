import dotenv from "dotenv";

dotenv.config();

const mustExist = <T>(value: T | undefined, name: string): T => {
    if (!value) {
        console.log(`Missing Config: ${name} !!!`);
        process.exit(1);
    }
    return value;
};

export default {
    port: mustExist(process.env.PORT, "PORT"),
    databseCommon: {
        name: mustExist(process.env.DB_COMMON_NAME, "DB_COMMON_NAME"),
        username: mustExist(process.env.DB_COMMON_USERNAME, "DB_COMMON_USERNAME"),
        password: mustExist(process.env.DB_COMMON_PASSWORD, "DB_COMMON_PASSWORD"),
        host: mustExist(process.env.DB_COMMON_HOST, "DB_COMMON_HOST")
    },
    database1: {
        name: mustExist(process.env.DB_1_NAME, "DB_1_NAME"),
        username: mustExist(process.env.DB_1_USERNAME, "DB_1_USERNAME"),
        password: mustExist(process.env.DB_1_PASSWORD, "DB_1_PASSWORD"),
        host: mustExist(process.env.DB_1_HOST, "DB_1_HOST")
    },
    database2: {
        name: mustExist(process.env.DB_2_NAME, "DB_2_NAME"),
        username: mustExist(process.env.DB_2_USERNAME, "DB_2_USERNAME"),
        password: mustExist(process.env.DB_2_PASSWORD, "DB_2_PASSWORD"),
        host: mustExist(process.env.DB_2_HOST, "DB_2_HOST")
    }
};
