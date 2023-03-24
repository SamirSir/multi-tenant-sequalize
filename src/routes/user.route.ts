import { Router } from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.post('/', userController.create);

router.get('/', userController.findAll);

router.get('/:userId', userController.findById);

router.get('/:userId', userController.update);

router.get('/:userId', userController.remove);

export default router;
