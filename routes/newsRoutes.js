import express from 'express';
import {createNews , deleteNews, getAllNews , updateNews } from '../controllers/NewsController.js';

const router = express.Router();

/**
 * @swagger
 * /api/news:
 *   get:
 *     summary: Get all news
 *     tags: [News]
 *     responses:
 *       200:
 *         description: List of news items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   news_id:
 *                     type: integer
 *                   news_title:
 *                     type: string
 *                   news_desc:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *   post:
 *     summary: Create a news item
 *     tags: [News]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - news_title
 *               - news_desc
 *             properties:
 *               news_title:
 *                 type: string
 *               news_desc:
 *                 type: string
 *     responses:
 *       201:
 *         description: News created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 news_id:
 *                   type: integer
 *                 news_title:
 *                   type: string
 *                 news_desc:
 *                   type: string
 */

router.post('/news',createNews);


router.get('/news',getAllNews);

/**
 * @swagger
 * /api/news/{id}:
 *   delete:
 *     summary: Delete a news item
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the news to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: News deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: News deleted successfully
 *       404:
 *         description: News not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: News not found
 *       500:
 *         description: Server error
 */
router.delete('/news/:id',deleteNews);

/**
 * @swagger
 * /api/news/{id}:
 *   put:
 *     summary: Update a news item
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the news to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               news_title:
 *                 type: string
 *                 example: Updated News Title
 *               news_desc:
 *                 type: string
 *                 example: Updated news description content.
 *     responses:
 *       200:
 *         description: News updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: News updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     news_id:
 *                       type: integer
 *                     news_title:
 *                       type: string
 *                     news_desc:
 *                       type: string
 *       404:
 *         description: News not found
 *       500:
 *         description: Server error
 */

router.put('/news/:id',updateNews);
export default router;
