import express, { Request, Response } from "express";
import Article from "../../models/articles";
import isValid from "../../utils/isValid";
import logger from "../../utils/logger";
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Search:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Value to be fetched
 *       example:
 *         title: Title Example
 */
/**
  * @swagger
  * tags:
  *   name: Search By Article
  *   description: Search Article API 
  */
/**
 * @swagger
 * /api/v1/article/search:
 *   post:
 *     summary: Search Article by Title
 *     description: Search Article 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Value to be searched
 *               content:
 *                 type: string
 *                 description: The article content
 *     responses:
 *       200:
 *         description: Article Searched successfully
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */
router.post("/search", async (req: Request, res: Response) => {
  try {
    const isObjectValid: boolean = isValid(req.body, [
      'title',
    ]);
    if (isObjectValid === false) {
      return res.status(400).send({
        status: "Error",
        msg: "Please Provide Valid Data",
      });
    }
    const  searchValue  = req.body.title;
    const query = { $or: [{ title: { $regex: searchValue , $options: 'i' } }, { content: { $regex: searchValue, $options: 'i' } }] };

    const article = await  Article.find(query).exec();
    return res.status(200).send({
      status: 'Success',
      message: 'Article Fetched successfully',
      data: article
    });

  } catch (error) {
    logger.error(`error msg :: ${error}`);
    return res.status(500).send({
      msg: error,
    });
  }
});

export default router;
