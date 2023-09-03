import express from 'express';
import homeController from '../controller/homeController.js';
import bodyParser from 'body-parser';
let jsonParser = bodyParser.json();
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getRankingData);
    router.get('/easyBlock', homeController.getEasyQuestionData);
    router.get('/mediumBlock', homeController.getMediumQuestionData);
    router.get('/hardBlock', homeController.getHardQuestionData);
    router.post('/add-new-question', homeController.addQuestion);
    router.get('/admin', homeController.getQuestionDetail);
    return app.use('/', router)
}

export default initWebRoute;