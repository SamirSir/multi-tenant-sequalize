import { NextFunction, Request, Response } from "express";

export const createUser = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {

    if (!request.body)
        return response
            .status(400)
            .json({ message: 'body params missing' });

    const data = {
        username: 'username',
        email: 'email',
        password: 'password',
        phone: 'phone',
        image: 'image'
    };

    return data;
};
