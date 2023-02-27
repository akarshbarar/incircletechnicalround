import express, { Request, Response } from "express";
import Article from "../../models/articles";
import isValid from "../../utils/isValid";
import logger from "../../utils/logger";
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Update:
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
  *   name: Update Article
  *   description: Update Article API
  */
/**
 * @swagger
 * /api/v1/article/update:
 *   put:
 *     summary: Update an article
 *     description: Update an  article with a title and content
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
 *         description: Article Updated successfully
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */
router.put("/update", async (req: Request, res: Response) => {
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
    const titleToUpdate = title;
    const update = { content: content };
    const result:any = await Article.updateOne({ title: titleToUpdate }, update);

    console.log(result)
    if (result.modifiedCount === 1) {
    logger.info(`Successfully updated post with title "${titleToUpdate}".`);
        return res.status(200).send({
            status: 'Success',
            message: 'Article Updated successfully',
        });
    } else {
    return res.status(200).send({
        status: 'Success',
        message: `No post found with title "${titleToUpdate}".`
      });
    }

  } catch (error) {
    logger.error(`error msg :: ${error}`);
    return res.status(500).send({
      msg: error,
    });
  }
});

export default router;
