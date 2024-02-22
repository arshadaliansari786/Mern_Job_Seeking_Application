import express from "express";
import {isAuthenticated} from "../middlewares/auth.js"
import { getUser, login, logout, register } from "../controllers/userController.js";
const router = express.Router();


/**
 * @swagger
 * /api/users/register:
 *   post:
 *     description: Register a new user
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (minimum 6 characters)
 *               role:
 *                 type: string
 *                 description: User's role (e.g., "user" or "admin")
 *             required:
 *               - name
 *               - email
 *               - phone
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request, please fill the entire form
 *       409:
 *         description: Email already registered
 */
router.post('/register',register)

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     description: User login
 *     requestBody:
 *       description: User login data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's registered email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *               role:
 *                 type: string
 *                 description: User's role (e.g., "user" or "admin")
 *             required:
 *               - email
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: User logged in successfully
 *       400:
 *         description: Bad request, please provide email, password, and role
 *       401:
 *         description: Invalid email or password
 *       404:
 *         description: User with provided email and role not found
 */

router.post('/login',login)

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     description: User logout
 *     responses:
 *       201:
 *         description: User logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the logout was successful
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the logout status
 *                   example: Logged Out Successfully.
 *       500:
 *         description: Internal server error
 */

router.get("/logout", isAuthenticated, logout);


/**
 * @swagger
 * /api/users/getUser:
 *   get:
 *     description: Get user details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the user details were retrieved successfully
 *                   example: true
 *                 user:
 *                   type: object
 *                   description: User details
 *                   example:
 *                     _id: "1234567890abcdef12345678"
 *                     name: "John Doe"
 *                     email: "john.doe@example.com"
 *                     phone: "+1234567890"
 *                     role: "user"
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */

router.get("/getuser", isAuthenticated, getUser);
export default router