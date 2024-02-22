import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

/**
 * @swagger 
 * /api/job/getall:
 *   get:
 *     description: Get all active jobs
 *     responses:
 *       200:
 *         description: Active jobs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the active jobs were retrieved successfully
 *                   example: true
 *                 jobs:
 *                   type: array
 *                   description: List of active jobs
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: Job ID
 *                         example: "1234567890abcdef12345678"
 *                       title:
 *                         type: string
 *                         description: Job title
 *                         example: "Software Engineer"
 *                       description:
 *                         type: string
 *                         description: Job description
 *                         example: "Exciting opportunity for a skilled software engineer."
 *                       // Add more properties as needed
 *       500:
 *         description: Internal server error
 */

router.get("/getall", getAllJobs);

/**
 * @swagger
 * /api/job/post:
 *   post:
 *     description: Post a new job
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Job details to be posted
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Job title
 *               description:
 *                 type: string
 *                 description: Job description
 *               category:
 *                 type: string
 *                 description: Job category
 *               country:
 *                 type: string
 *                 description: Country where the job is located
 *               city:
 *                 type: string
 *                 description: City where the job is located
 *               location:
 *                 type: string
 *                 description: Specific location within the city
 *               fixedSalary:
 *                 type: number
 *                 description: Fixed salary for the job
 *               salaryFrom:
 *                 type: number
 *                 description: Salary range start
 *               salaryTo:
 *                 type: number
 *                 description: Salary range end
 *             required:
 *               - title
 *               - description
 *               - category
 *               - country
 *               - city
 *               - location
 *     responses:
 *       200:
 *         description: Job posted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the job was posted successfully
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the job posting
 *                   example: Job Posted Successfully!
 *                 job:
 *       400:
 *         description: Bad request, please provide full job details
 *       401:
 *         description: Unauthorized, job seeker not allowed to access this resource
 *       500:
 *         description: Internal server error
 */
router.post("/post", isAuthenticated, postJob);

/**
 * @swagger
 * /api/job/getmyjobs:
 *   get:
 *     description: Get jobs posted by the authenticated user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Jobs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the jobs were retrieved successfully
 *                   example: true
 *                 myJobs:
 *       400:
 *         description: Bad request, job seeker not allowed to access this resource
 *       500:
 *         description: Internal server error
 */
router.get("/getmyjobs", isAuthenticated, getMyJobs);

/**
 * @swagger
 * /api/job/update/{id}:
 *   put:
 *     description: Update a job by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job to be updated
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 *       400:
 *         description: Bad request, job seeker not allowed to access this resource
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */

router.put("/update/:id", isAuthenticated, updateJob);

/**
 * @swagger
 * /api/job/delete/:id:
 *   delete:
 *     description: Delete a job by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job to be deleted
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the job was deleted successfully
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message indicating the success of the job deletion
 *                   example: Job Deleted!
 *       400:
 *         description: Bad request, job seeker not allowed to access this resource
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete/:id", isAuthenticated, deleteJob);
/**
 * @swagger
 * /api/job/getJobById/{id}:
 *   get:
 *     summary: Get a single job by ID
 *     description: Retrieve details of a job based on its unique identifier.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the job to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the job was retrieved successfully.
 *                   example: true

 *       400:
 *         description: Bad request, job seeker not allowed to access this resource.
 *       404:
 *         description: Job not found. The specified ID does not match any existing job.
 *       500:
 *         description: Internal server error.
 */
router.get("/getJobById/:id", isAuthenticated, getSingleJob);

export default router;
