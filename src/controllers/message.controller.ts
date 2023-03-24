import { RequestHandler, NextFunction, Request, Response } from "express";
import { Messages } from "../models/message.model";

const create: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    const message = await Messages.create({ ...request.body });
    return response
        .status(200)
        .json({
            message: 'Message created successfully.',
            data: message
        });
}

const findAll: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    const messages: Messages[] = await Messages.findAll();
    return response
        .status(200)
        .json({
            message: 'Messages fetched successfully.',
            data: messages
        });
}

const findById: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const message: Messages | null = await Messages.findByPk(id);
    return response
        .status(200)
        .json({
            message: 'Message fetched successfully.',
            data: message
        });
}

const update: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    await Messages.update({ ...request.body }, { where: { id } });
    const updatedmessage: Messages | null = await Messages.findByPk(id);
    return response
        .status(200)
        .json({
            message: 'Message updated successfully.',
            data: updatedmessage
        });
}

const remove: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const deletedmessage: Messages | null = await Messages.findByPk(id);
    await Messages.destroy({ where: { id } });
    return response
        .status(200)
        .json({
            message: 'Message deleted successfully.',
            data: deletedmessage
        });
}

export default {
    create,
    findAll,
    findById,
    update,
    remove
};
