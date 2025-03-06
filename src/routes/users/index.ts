import { Router } from 'express';
import { adaptRoute } from '../../adapter/express/adapterRoute';
import { makeCreateUserController } from '../../factories/CreateUser/CreateUserFactory';
import { makeListUserController } from '../../factories/ListUser/ListUserFactory';
import { makeLoadUserController } from '../../factories/LoadUser/LoadUserFactory';
import { makeUpdateUserController } from '../../factories/UpdateUser/UpdateUserFactory';

const router = Router();

router.post('/', adaptRoute(makeCreateUserController()));
router.get('/', adaptRoute(makeListUserController()));
router.get('/:user_id', adaptRoute(makeLoadUserController()));
router.get('/:user_id', adaptRoute(makeUpdateUserController()));

export default router;
