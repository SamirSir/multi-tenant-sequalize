import { RequestHandler, Request, Response, NextFunction } from "express";
import { connectTenantDB } from "../configs/connection";

export const connectTenantDbMiddleware: RequestHandler = async (request: Request, response: Response, next: NextFunction) => {
    try {
        const tenantId = request.headers['tenant-id'] as string;
        if (!tenantId) return response.status(500).json({ message: 'TenantId missing in request header.' });
        const sequelizeTenantDb = await connectTenantDB(tenantId);
        const eraseDatabaseOnSync = false;
        await sequelizeTenantDb.sync({ force: eraseDatabaseOnSync }).then(async () => {
            console.log('Tenant database synced successfully', { tenantId });
            next();
        }).catch((error) => {
            console.error('Error while syncing tenant database', error);
        });
    } catch (error) {
        console.error('Internal server error', error);
    }

}