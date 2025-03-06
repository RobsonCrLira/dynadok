import { Router } from "express";
import { adaptMiddleware } from "../../adapter/express/adapterMiddleware";
import { adaptRoute } from "../../adapter/express/adapterRoute";
import { makeCreateUserController } from "../../factories/CreateUser/CreateUserFactory";
import { makeListUserController } from "../../factories/ListUser/ListUserFactory";
import { makeLoadUserController } from "../../factories/LoadUser/LoadUserFactory";
import { makeUpdateUserController } from "../../factories/UpdateUser/UpdateUserFactory";
import { makeAuthMiddleware } from "../../factories/middleware/AuthMiddewareFactory";

const router = Router();
const auth = adaptMiddleware(makeAuthMiddleware());

router.post("/", auth, adaptRoute(makeCreateUserController()));
router.get("/", auth, adaptRoute(makeListUserController()));
router.get("/:user_id", auth, adaptRoute(makeLoadUserController()));
router.put("/:user_id", auth, adaptRoute(makeUpdateUserController()));

export default router;
