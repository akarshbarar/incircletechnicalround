import express from 'express';
import addArticle from './article/addArticle';
import getAllArticles from './article/getAllArticle';
import search from './article/search';
import deleteArticle from './article/deleteArticle';
import updateArticle from './article/updateArticle';

const router = express.Router();

router.use('/article',addArticle);
router.use('/article',getAllArticles);
router.use('/article', deleteArticle);
router.use('/article', updateArticle);

router.use('/article',search);

export default router;