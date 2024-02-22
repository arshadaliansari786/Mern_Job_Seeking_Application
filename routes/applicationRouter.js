import express from "express";
import {
  employerGetAllApplications,
  jobseekerDeleteApplication,
  jobseekerGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @swagger
 * /api/application/post:
 *   post:
 *     description: Submit a job application
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Application details to be submitted
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Applicant's name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Applicant's email
 *               coverLetter:
 *                 type: string
 *                 description: Cover letter for the job application
 *               phone:
 *                 type: string
 *                 description: Applicant's phone number
 *               address:
 *                 type: string
 *                 description: Applicant's address
 *               jobId:
 *                 type: string
 *                 description: ID of the job being applied for
 *               resume:
 *                 type: string
 *                 format: binary
 *                 description: Resume file (PNG, JPEG, or WebP format)
 *     responses:
 *       200:
 *         description: Application submitted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the application was submitted successfully
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the application submission
 *                   example: Application Submitted!
 *                 application:
 *                   $ref: '#/components/schemas/Application'  // Reference to a schema definition
 *       400:
 *         description: Bad request, employer not allowed to access this resource or missing fields
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
router.post("/post", isAuthenticated, postApplication);


/**
 * @swagger
 * /api/application//employer/getall:
 *   get:
 *     description: Get all job applications submitted to the authenticated employer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job applications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the job applications were retrieved successfully
 *                   example: true
 *                 applications:
 *                   type: array
 *                   description: List of job applications submitted to the authenticated employer
 *                   items:
 *                     $ref: '#/components/schemas/Application'  // Reference to a schema definition
 *       400:
 *         description: Bad request, job seeker not allowed to access this resource
 *       500:
 *         description: Internal server error
 */

router.get("/employer/getall", isAuthenticated, employerGetAllApplications);

/**
 * @swagger
 * /api/application//jobseeker/getall:
 *   get:
 *     description: Get all job applications submitted by the authenticated job seeker
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Job applications retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the job applications were retrieved successfully
 *                   example: true
 *                 applications:
 *                   type: array
 *                   description: List of job applications submitted by the authenticated job seeker
 *                   items:
 *                     $ref: '#/components/schemas/Application'  // Reference to a schema definition
 *       400:
 *         description: Bad request, employer not allowed to access this resource
 *       500:
 *         description: Internal server error
 */
router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);

/**
 * @swagger
 * /api/application/delete/:id:
 *   delete:
 *     description: Delete a job application submitted by the authenticated job seeker
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job application to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job application deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the job application was deleted successfully
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the job application deletion
 *                   example: Application Deleted!
 *       400:
 *         description: Bad request, employer not allowed to access this resource
 *       404:
 *         description: Job application not found
 *       500:
 *         description: Internal server error
 */

router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);

export default router;
