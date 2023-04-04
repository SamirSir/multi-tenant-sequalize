import { RequestHandler, NextFunction, Request, Response } from "express";
import { Users } from "../models/user.model";

const create: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const users = Users.create({ ...request.body });
        return response
            .status(200)
            .json({
                message: 'User created successfully.',
                data: users
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
    const users: Users[] = await Users.findAll();
    return response
        .status(200)
        .json({
            message: 'Users fetched successfully.',
            data: users
        });
}

const findById: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const user: Users | null = await Users.findByPk(id);
    return response
        .status(200)
        .json({
            message: 'User fetched successfully.',
            data: user
        });
}

const update: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    await Users.update({ ...request.body }, { where: { id } });
    const updatedUser: Users | null = await Users.findByPk(id);
    return response
        .status(200)
        .json({
            message: 'User updated successfully.',
            data: updatedUser
        });
}

const remove: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const deletedUser: Users | null = await Users.findByPk(id);
    await Users.destroy({ where: { id } });
    return response
        .status(200)
        .json({
            message: 'User deleted successfully.',
            data: deletedUser
        });
}

export default {
    create,
    findAll,
    findById,
    update,
    remove
};
