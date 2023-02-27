import express, { Request, Response } from "express";
import Article from "../../models/articles";
import isValid from "../../utils/isValid";
import logger from "../../utils/logger";
const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Get:
 */
/**
  * @swagger
  * tags:
  *   name: Get All Article
  *   description: Get All Article API
  */
/**
 * @swagger
 * /api/v1/article/getall:
 *   get:
 *     summary: Get All Article 
 *     description: API to get all articles
 *     responses:
 *       200:
 *         description: Article fetched successfully
 *       400:
 *         description: Bad request, missing or invalid parameters
 *       500:
 *         description: Internal server error
 */
router.get("/getall", async (req: Request, res: Response) => {
  try {
    const isObjectValid: boolean = isValid(req.body, []);
    if (isObjectValid === false) {
      return res.status(400).send({
        status: "Error",
        msg: "Please Provide Valid Data",
      });
    }
    const articles = await Article.find({});

    return res.status(200).send({
      status: 'Success',
      message: 'Article fetched successfully',
      data: articles
    });

  } catch (error) {
    logger.error(`error msg :: ${error}`);
    return res.status(500).send({
      msg: error,
    });
  }
});

export default router;
