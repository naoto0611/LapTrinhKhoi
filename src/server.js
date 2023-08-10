// import libraries and modules
const express = require('express');
const configViewEngine = require('./configs/viewEngine.js');
const dotenv = require('dotenv');

dotenv.config();
//Creating express server
const app = express();

//port in .env
const port = process.env.PORT; 

//setup view engine
configViewEngine(app);

// middleware
app.use(express.json());
app.use(express.urlencoded());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('homepage.ejs')
})

app.use(express.static('public')); // Serve static files from the 'public' directory

app.listen(port, () => {
  console.log(`port: ${port}`)
})
