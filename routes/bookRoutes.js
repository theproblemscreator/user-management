import express from 'express';
import { createBook, getAllBooks ,deleteBook,updateBook} from '../controllers/BookController.js';

const router = express.Router();
 

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         book_id:
 *           type: integer
 *           description: Unique identifier for the book
 *         book_name:
 *           type: string
 *           description: Name of the book
 *         book_price:
 *           type: number
 *           format: float
 *           description: Price of the book
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Book creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Book update timestamp
 * 
 *     BookInput:
 *       type: object
 *       required:
 *         - book_name
 *         - book_price
 *       properties:
 *         book_name:
 *           type: string
 *           description: Name of the book
 *         book_price:
 *           type: number
 *           format: float
 *           description: Price of the book
 */


/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       201:
 *         description: Book created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */

router.post('/books', createBook);
/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */
router.get('/books',getAllBooks);
/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     responses:
 *       200:
 *         description: Book deleted
 */
router.delete('/books/:id',deleteBook);
/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       200:
 *         description: The updated book
 */
router.put('/books/:id',updateBook);

export default router;
