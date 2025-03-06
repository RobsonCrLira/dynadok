import { Router } from 'express';
import { adaptRoute } from '../../adapter/express/adapterRoute';
import { makeSignUpController } from '../../factories/SignUp/SignUpFactory';

const router = Router();

router.post('/signup', adaptRoute(makeSignUpController()));

export default router;
