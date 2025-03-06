import { Router } from "express";
import { adaptRoute } from "../../adapter/express/adapterRoute";
import { makeLoginUserController } from "../../factories/LoginUser/LoginUserFactory";
import { makeSignUpController } from "../../factories/SignUp/SignUpFactory";

const router = Router();

router.post("/signup", adaptRoute(makeSignUpController()));
router.post("/login", adaptRoute(makeLoginUserController()));

export default router;
