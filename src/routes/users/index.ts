import { Router } from "express";
import { adaptMiddleware } from "../../adapter/express/adapterMiddleware";
import { adaptRoute } from "../../adapter/express/adapterRoute";
import { makeCreateUserController } from "../../factories/CreateUser/CreateUserFactory";
import { makeListUserController } from "../../factories/ListUser/ListUserFactory";
import { makeLoadUserController } from "../../factories/LoadUser/LoadUserFactory";
import { makeUpdateUserController } from "../../factories/UpdateUser/UpdateUserFactory";
import { makeAuthMiddleware } from "../../factories/middleware/AuthMiddlewareFactory";

const router = Router();
const auth = adaptMiddleware(makeAuthMiddleware());

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 *   get:
 *     summary: List all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       403:
 *         description: Forbidden
 *
 * /users/{user_id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: User data
 *       404:
 *         description: User not found
 *   put:
 *     summary: Update user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 */

router.post("/", auth, adaptRoute(makeCreateUserController()));
router.get("/", auth, adaptRoute(makeListUserController()));
router.get("/:user_id", auth, adaptRoute(makeLoadUserController()));
router.put("/:user_id", auth, adaptRoute(makeUpdateUserController()));

export default router;
