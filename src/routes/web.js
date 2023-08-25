import express from 'express';
import homeController from '../controller/homeController.js';
import bodyParser from 'body-parser';
let jsonParser = bodyParser.json();
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getRankingData);
    return app.use('/', router)
}

export default initWebRoute;