// import libraries and modules
import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import initWebRoute from './routes/web.js'
import * as dotenv from 'dotenv';
dotenv.config();
import bcrypt, { hash } from "bcrypt";
import * as jwt from "jsonwebtoken";

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


const users =[]

app.get('/users', (req, res) => {
  res.json(users)
})

app.post('/users', async (req, res) => {
  try {
    // hash the password with bcrypt
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = {
      name: req.body.name,
      password: hashedPassword
    }
    users.push(user);
    res.status(201).send();
    
    console.log('salt', salt);
    console.log('hashed password', hashedPassword);
  } catch {
    res.status(500).send();
  }
})

app.post('/users/login', async (req, res) => {
  const user = users.find(user => user.name = req.body.name);
  if (user == null) {
    return res.status(400).send('User not found');
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.send('Success');
    } else {
      res.send('You are not allowed');
    }
  } catch {
    res.status(500).send();
  }
})

const randomStr = () => require('crypto').randomBytes(64).toString('hex');
console.log('token', randomStr);