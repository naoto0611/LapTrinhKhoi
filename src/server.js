// import libraries and modules
import express from 'express';
import configViewEngine from './configs/viewEngine.js';
import initWebRoute from './routes/web.js'
import * as dotenv from 'dotenv';
dotenv.config();
import db from './configs/connectDB.js';
import bcrypt, { hash } from "bcrypt";
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';


//Creating express server
const app = express();
const webPort = process.env.WEB_PORT || 3020;


// Port for API
const api = express();
const apiPort = process.env.API_PORT || 3123;

//secret key in .env
const jwtSecret = process.env.JWT_SECRET;

//---------------------------//
// Connect to db
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

//---------------------------//
//setup view engine
configViewEngine(app);

//init web route
initWebRoute(app);

// middleware

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

app.get('easyBlock', (req, res) => {
  res.render('indexEasy.ejs');
});

app.get('/mediumBlock', (req, res) => {
  res.render('indexMedium.ejs');
});

app.get('/hardBlock', (req, res) => {
  res.render('indexHard.ejs');
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

app.get('/admin', (req, res) => {
  res.render('admin.ejs');
});


// const users =[]

// app.get('/users', (req, res) => {
//   res.json(users)
// })

// app.post('/users', async (req, res) => {
//   try {
//     // hash the password with bcrypt
//     const salt = await bcrypt.genSalt();
//     const hashedPassword = await bcrypt.hash(req.body.password, salt);

//     const user = {
//       name: req.body.name,
//       password: hashedPassword
//     }
//     users.push(user);
//     res.status(201).send();


//     console.log('salt', salt);
//     console.log('hashed password', hashedPassword);
//   } catch {
//     res.status(500).send();
//   }
// })


// app.post('/users/login', async (req, res) => {
//   const user = users.find(user => user.name = req.body.name);
//   if (user == null) {
//     return res.status(400).send('User not found');
//   }
//   try {
//     if (await bcrypt.compare(req.body.password, user.password)) {
//       res.send('Success');
//     } else {
//       res.send('You are not allowed');
//     }
//   } catch {
//     res.status(500).send();
//   }
// })

//---------------------------------//

api.get('/api/protected-resource', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected resource', user: req.user });
});

// Middlewate to authenticate
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;
    next();
    console.log('Token from client:', token);
    console.log('Decoded token:', decoded);
  } catch (error) {
    return res.status(403).json({ message: 'Invalid token' });
  }
}

// Sign up
app.post('/register', async (req, res) => {
  const { fullName, dob, username, password } = req.body;
  try {
    const existingUser = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser) {
      return res.json({ success: false, message: 'exist' });
    }
    const accountType = 0;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = await db.none('INSERT INTO users(username, user_dob, accountname, userpassword, accounttype) VALUES($1, $2, $3, $4, $5)', [fullName, dob, username, hashedPassword, accountType]);

    res.json({ success: true, message: 'Registration successful' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: 'Registration failed' });
  }
});
// Sign in
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await db.oneOrNone('SELECT * FROM users WHERE accountname = $1', [username]);

    if (user && bcrypt.compareSync(password, user.userpassword)) {
      const userId = user.userid;
      const accountType = user.accounttype;
      const token = jwt.sign({ userId }, jwtSecret, { expiresIn: '10h' });
      res.json({ success: true, message: token, account_type: accountType });
    } else {
      res.json({ success: false, message: 'Login failed' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ success: false, message: 'An error occurred during login' });
  }
});


app.post('/saveresult', async (req, res) => {
  const { level, result, token } = req.body;
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = decoded.userId;
    await db.none('INSERT INTO result (userid, result_level, result_point) VALUES ($1, $2, $3)', [userId, level, result]);
    res.json({ success: true, message: 'Result saved successfully' });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ success: false, message: 'Error saving result' });
  }
});




// Start the web server
app.listen(webPort, () => {
  console.log(`Web Server is running on port ${webPort}`);
});

// Start the API server
api.listen(apiPort, () => {
  console.log(`API Server is running on port ${apiPort}`);
});


