import { Router } from 'express';
import tenantController from '../controllers/tenant.controller';

const router = Router();

router.post('/', tenantController.create);

router.get('/:id', tenantController.findOne);

router.get('/', tenantController.findAll);


export default router;
