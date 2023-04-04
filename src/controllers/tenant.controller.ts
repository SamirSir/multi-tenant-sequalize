import { RequestHandler, Request, Response, NextFunction } from "express";
import { Tenants } from "../models";

const create: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const teannts = Tenants.create({ ...request.body });
        return response
            .status(200)
            .json({
                message: 'User created successfully.',
                teannts
            });
    } catch (error) {
        console.error({ error });
        return response
            .status(500)
            .json({
                message: 'Internal server error.',
                error
            });
    }
}

const findOne: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params;
        const tenant: Tenants = await Tenants.findByPk(id);
        // const tenant: Tenants | null = await Tenants.findOne({ where: { name: id } });
        return response
            .status(200)
            .json({
                message: 'Tenant fetched successfully.',
                tenant
            });
    } catch (error) {
        console.error({ error });
        return response
            .status(500)
            .json({
                message: 'Internal server error.',
                error
            });
    }
}

const findAll: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const tenants: Tenants[] = await Tenants.findAll();
        return response
            .status(200)
            .json({
                message: 'Tenants fetched successfully.',
                tenants
            });
    } catch (error) {
        console.error({ error });
        return response
            .status(500)
            .json({
                message: 'Internal server error.',
                error
            });
    }
}

export default {
    create,
    findOne,
    findAll
};
