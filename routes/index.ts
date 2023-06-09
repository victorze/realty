import 'express-async-errors';
import { Router } from 'express';
import authRoutes from './authRoutes';
import appRoutes from './appRoutes';
const router = Router();

router.use('/auth', authRoutes);
router.use('/', appRoutes);

export default router;
