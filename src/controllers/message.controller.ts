import { RequestHandler, NextFunction, Request, Response } from "express";
import { Messages } from "../models/message.model";

const create: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const message = await Messages.create({ ...request.body });
        return response
            .status(200)
            .json({
                message: 'Message created successfully.',
                data: message
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
        const messages: Messages[] = await Messages.findAll();
        return response
            .status(200)
            .json({
                message: 'Messages fetched successfully.',
                data: messages
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

const findById: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params;
        const message: Messages | null = await Messages.findByPk(id);
        return response
            .status(200)
            .json({
                message: 'Message fetched successfully.',
                data: message
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

const update: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params;
        await Messages.update({ ...request.body }, { where: { id } });
        const updatedmessage: Messages | null = await Messages.findByPk(id);
        return response
            .status(200)
            .json({
                message: 'Message updated successfully.',
                data: updatedmessage
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

const remove: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const { id } = request.params;
        const deletedmessage: Messages | null = await Messages.findByPk(id);
        await Messages.destroy({ where: { id } });
        return response
            .status(200)
            .json({
                message: 'Message deleted successfully.',
                data: deletedmessage
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
    findAll,
    findById,
    update,
    remove
};
