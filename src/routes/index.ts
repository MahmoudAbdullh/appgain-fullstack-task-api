import { Router, Request, Response, NextFunction } from 'express';
import {InitLayout, UpdateLayout} from '../controller/Layout/layout.controller';
import {LayoutValidation} from '../controller/Layout/Validations';
const router = Router();

router.route('/')
.get(InitLayout)
.put(LayoutValidation, UpdateLayout)

export default router;