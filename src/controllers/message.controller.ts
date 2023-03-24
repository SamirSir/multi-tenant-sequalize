import { NextFunction, Request, Response } from "express";
import { UUIDV4 } from "sequelize";

class MessageController {
    findAll =  async (request: Request, response: Response, next: NextFunction) => {
        return response.send(Object.values(request['context'].models.messages));
    }

    findOne =  async (request: Request, response: Response, next: NextFunction) => {
        return response.send(request['context'].models.messages[request.params.messageId]);
    }

    create =  async (request: Request, response: Response, next: NextFunction) => {
        const id = UUIDV4();
        const message = {
            id,
            text: request.body.text,
            userId: request['context'].me.id,
        };

        request['context'].models.messages[id] = message;

        return response.send(message);
    }

    delete =  async (request: Request, response: Response, next: NextFunction) => {
        const {
            [request.params.messageId]: message,
            ...otherMessages
        } = request['context'].models.messages;

        request['context'].models.messages = otherMessages;

        return response.send(message);
    }
}
export default new MessageController();
