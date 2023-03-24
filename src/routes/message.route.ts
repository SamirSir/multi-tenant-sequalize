import { Router } from 'express';
import messageController from '../controllers/message.controller';

const router = Router();

router.post('/', messageController.create);

router.get('/', messageController.findAll);

router.get('/:id', messageController.findById);

router.put('/:id', messageController.update);

router.delete('/:id', messageController.remove);

export default router;
