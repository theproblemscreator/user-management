import express from 'express';
const router = express.Router();
import {createUser, loginUser, logoutUser, profileDetail} from '../controllers/UserController.js'
import verifyUser from '../middleware/authMiddleware.js';

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fname
 *               - lname
 *               - email
 *               - mobile
 *               - password
 *             properties:
 *               fname:
 *                 type: string
 *                 example: John
 *               lname:
 *                 type: string
 *                 example: Doe
 *               email:
 *                 type: string
 *                 example: john.doe@example.com
 *               mobile:
 *                 type: string
 *                 example: 9876543210
 *               password:
 *                 type: string
 *                 example: secret123
 *               token:
 *                 type: string
 *                 example: jwt_token_here
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */

router.post('/users', createUser);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User Login
 *     description: Login using either email or mobile along with password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailormobile:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: yourPassword123
 *             required:
 *               - emailormobile
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */

router.post('/login', loginUser);

 /**
     * @openapi
     * /api/profileDetails:
     *  get:
     *     tags:
     *     - User
     *     description: Get user profile details
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: User profile details retrieved successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 statusCode:
     *                   type: integer
     *                 data:
     *                   type: object
     *                   properties:
     *                     id:
     *                       type: string
     *                     fname:
     *                       type: string
     *                     lname:
     *                       type: string
     *                     mobile:
     *                       type: string
     *                     email:
     *                       type: string
     *       400:
     *         description: Invalid Token or Something Went Wrong
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 statusCode:
     *                   type: integer
     */
router.get('/profileDetails',verifyUser , profileDetail);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Logout the authenticated user
 *     description: Logs out the currently authenticated user by invalidating the token.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logout successful
 *       401:
 *         description: Unauthorized – Token missing or invalid
 *       500:
 *         description: Server error
 */

router.post('/logout', verifyUser , logoutUser);
export default router;