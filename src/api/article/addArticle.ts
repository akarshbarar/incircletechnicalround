import express, { Request, Response } from "express";
import Article from "../../models/articles";
import isValid from "../../utils/isValid";
import logger from "../../utils/logger";
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Add:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         title:
 *           type: string
 *           description: Title to be added
 *         content:
 *           type: string
 *           description: Content to be added
 *       example:
 *         title: Title Example
 *         content: Content Example
 */
/**
  * @swagger
  * tags:
  *   name: Add Article
  *   description: Add Article API
  */
/**
 * @swagger
 * /api/v1/article/add:
 *   post:
 *     summary: Create a new article
 *     description: Create a new article with a title and content
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The article title
 *               content:
 *                 type: string
 *                 description: The article content
 *     responses:
 *       200:
 *         description: Article created successfully
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */
router.post("/add", async (req: Request, res: Response) => {
  try {
    const isObjectValid: boolean = isValid(req.body, [
      'title',
      'content'
    ]);
    if (isObjectValid === false) {
      return res.status(400).send({
        status: "Error",
        msg: "Please Provide Valid Data",
      });
    }
    const {title, content} = req.body;
    const article = new Article({
      title,
      content
    });
    await article.save();
    return res.status(200).send({
      status: 'Success',
      message: 'Article Saved successfully',
    });

  } catch (error) {
    logger.error(`error msg :: ${error}`);
    return res.status(500).send({
      msg: error,
    });
  }
});

export default router;
