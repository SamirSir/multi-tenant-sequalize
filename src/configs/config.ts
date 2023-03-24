import * as path from "path";

require("dotenv").config({
    path: path.join(__dirname, "../../.env"),
});

const mustExist = <T>(value: T | undefined, name: string): T => {
    if (!value) {
        console.log(`Missing Config: ${name} !!!`);
        process.exit(1);
    }
    return value;
};

export const config = {
    env: mustExist(process.env.ENVIRONMENT, "ENVIRONMENT"),
    port: mustExist(process.env.PORT, "PORT"),
    database1: {
        name: mustExist(process.env.DATABASE1, "DATABASE1"),
        username: mustExist(process.env.DB_USER, "DB_USER"),
        password: mustExist(process.env.DB_PASSWORD, "DB_PASSWORD"),
    },
    database2: {
        name: mustExist(process.env.DATABASE2, "DATABASE2"),
        username: mustExist(process.env.DB_USER, "DB_USER"),
        password: mustExist(process.env.DB_PASSWORD, "DB_PASSWORD"),
    }
};