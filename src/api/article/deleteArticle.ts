import express, { Request, Response } from "express";
import Article from "../../models/articles";
import isValid from "../../utils/isValid";
import logger from "../../utils/logger";
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Delete:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         title:
 *           type: string
 *           description: Data to be delete
 *       example:
 *         title: Delete Example
 */
/**
  * @swagger
  * tags:
  *   name: Delete Article
  *   description: Delete Article API
  */
/**
 * @swagger
 * /api/v1/article/delete:
 *   delete:
 *     summary: Delete a  article
 *     description: Delete a article with a title
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
 *     responses:
 *       200:
 *         description: Article Deleted successfully
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */
router.delete("/delete", async (req: Request, res: Response) => {
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
    const titleToDelete = req.body.title;

    const result = await Article.deleteOne({ title: titleToDelete });

    if (result.deletedCount === 1) {
    logger.info(`Successfully deleted post with title "${titleToDelete}".`);
        return res.status(200).send({
            status: 'Success',
            message: 'Article Delete successfully',
        });
    } else {
    logger.info(`No post found with title "${titleToDelete}".`);
      return res.status(200).send({
        status: 'Success',
        message: `No post found with title "${titleToDelete}".`
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
