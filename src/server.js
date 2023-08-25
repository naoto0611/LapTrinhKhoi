// import libraries and modules
import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import initWebRoute from './routes/web.js'
import * as dotenv from 'dotenv';
dotenv.config();

//Creating express server
const app = express();

//port in .env
const port = process.env.PORT; 

//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('homepage.ejs')
})

app.get('/level', (req, res) => {
  res.render('chooseLevel.ejs');
});

app.get('/block', (req, res) => {
  res.render('index.ejs');
});

app.get('/level/easy', (req, res) => {
  res.render('easyLevel.ejs');
});

app.get('/level/medium', (req, res) => {
  res.render('mediumLevel.ejs');
});

app.get('/level/hard', (req, res) => {
  res.render('hardLevel.ejs');
});

app.listen(port, () => {
  console.log(`port: ${port}`)
})
