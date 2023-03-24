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
    port: mustExist(process.env.PORT, "PORT"),
    database1: {
        name: mustExist(process.env.DATABASE1, "DATABASE1"),
        username: mustExist(process.env.DATABASE_USER, "DATABASE_USER"),
        password: mustExist(process.env.DATABASE_PASSWORD, "DATABASE_PASSWORD"),
    },
    database2: {
        name: mustExist(process.env.DATABASE2, "DATABASE2"),
        username: mustExist(process.env.DATABASE_USER, "DATABASE_USER"),
        password: mustExist(process.env.DATABASE_PASSWORD, "DATABASE_PASSWORD"),
    }
};
