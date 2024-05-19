const express = require("express");
const path = require("path");
const app = express(); 
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const session = require('express-session');
const { google } = require('googleapis');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const multer = require('multer'); 
const upload = multer({ dest: 'uploads/' });
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const router = require("./routes");
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); 
const { TaskUser } = require("./models/user");


require("dotenv").config();

//cart files and db required//
require("./db/conn");
 
//middle wares//
const port = process.env.PORT || 3000;

//app.use and set//  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
const sessionStore = new session.MemoryStore;
app.use(express.json());
app.use(cookieParser('SECRET')); 
app.use(session({
    cookie: { maxAge: 30000 },
    store: sessionStore,
    saveUninitialized: false,
    resave: false,
    secret: 'secret',
    unset: "destroy"
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/', router)

//getting/posting/putting/deleting/editing files//

app.get('/register', async(req, res) => {
    try {
        const task = await TaskUser.find({});
        // Send the sanitized user data as JSON response
        res.status(200).json(task);
      } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

app.get('/login', async(req, res) => {
  try {
      const task = await TaskUser.find({});
      // Send the sanitized user data as JSON response
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
  }
})

app.post(
    "/register", async(req, res) => {
         
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }
        
    try {
        // Check for existing user
        const existingUser = await TaskUser.findOne({ email: req.body.email });
        if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
        }
    
        // Generate salt and hash password
        const salt = await bcrypt.genSalt(10);
    
        // Create new user object
        const newUser = new TaskUser({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            refer: req.body.refer,
            email: req.body.email,
            username: req.body.username,
            password: await bcrypt.hash(req.body.password, salt),
            password2: await bcrypt.hash(req.body.password2, salt),
            role: req.body.role || 'user' // Set role, default to 'user'
        });
    
        await newUser.save();
        // Prepare sanitized user data (exclude password fields)
          const sanitizedUser = {
            _id: newUser._id.toString(), // Convert ObjectID to string
            firstname: newUser.firstname,
            lastname: newUser.lastname,
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
            password2: newUser.password2,
            role: newUser.role,
            createdAt: newUser.createdAt.toISOString(), // Convert date to ISO string
          };

          // Send sanitized user data as JSON response
            res.status(201).json(sanitizedUser);
            
            
        } catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }

    }
);

app.get("/login", (req, res) => {
    if (req.session.user) {

        TaskUser.findById({
                email: req.params.id
            },
            'email', (err, user) => {
                if (err) {
                    res.status(500).send(err);
                } else {

                }
                // Send the sanitized user data as JSON response
                res.send(TaskUser)
            });
    } else {
        res.status(401).send(
            'User not found'
        );

    }
    
})

app.post('/login', async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }

  try {
      const user = await TaskUser.findOne({ email: req.body.email });
      if (!user) {
          return res.status(404).json({ message: 'User does not exist.' });
      }

      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (!cmp) {
          return res.status(401).json({ message: 'Wrong username or password.' });
      }

      const payload = { user: { id: user._id.toString(), role: user.role } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10d' });

      const cookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // Secure flag for HTTPS
          signed: true,
          maxAge: 10 * 24 * 60 * 60 * 1000 // 10 days
      };

      res.cookie('access_token', token, cookieOptions);

      const sanitizedUser = {
          _id: user._id.toString(),
          email: user.email,
          createdAt: user.createdAt.toISOString(),
      };

      res.status(200).json(sanitizedUser);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});



  

app.get("/logout", (req, res) => {
  req.session.user = null; // Set session user to null
  req.session.destroy(); // Destroy session data

  // Clear the access token cookie using matching options
  res.clearCookie("access_token", {
    httpOnly: true,
    sameSite: "strict",
    signed: true,
    secure: true,
  });

  // Send a success response indicating logout
  res.status(200).json({ message: "Logout successful" });
});

//forgot password//
//If neccessary//

app.post('/forgot', async(req, res) => {
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET
  const REDIRECT_URL = process.env.REDIRECT_URL
  const REFRESH_TOKEN = process.env.REFRESH_TOKEN
  console.log(REFRESH_TOKEN)
  const OAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
  OAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })

  if (req.session && req.session.userId) {
    return res.status(403).json({ message: "Password reset not allowed when logged in." });
  }

  const user = await TaskUser.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({ message: 'User does not exist.' });
  }

  // Generate and set password reset token
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  // Set token expire date to 1 hour in the future
  user.resetPasswordExpires = Date.now() + 3600000;

  await user.save();

  // Send email
  const accessToken = await
  OAuth2Client.getAccessToken()
 const Transport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: "sipboyjohn@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        })
  const mailOptions = {
    to: user.email,
    from: 'vitusjohnoguike@gmail.com',
    subject: 'Node.js Password Reset',
    text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           http://${req.headers.host}/reset/${user.resetPasswordToken}\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`
  };
  Transport.sendMail(mailOptions, (err) => {
    res.status(200).json({ message: 'An e-mail has been sent to ' + user.email + ' with further instructions.' });
  });


})

  app.get('/reset/:token', async (req, res) => {
    const user = await TaskUser.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(404).json({ message: 'Password reset token is invalid or has expired.' });
    }
    // Render reset password form
    res.render('reset', { token: req.params.token });
  });
  
  app.post('/reset/:token', async (req, res) => {
    const user = await TaskUser.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(404).json({ message: 'Password reset token is invalid or has expired.' });
    }
  
    // Check if passwords match
    if (req.body.password !== req.body.confirm) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }
  
    // Update password and remove reset token and expiration time
    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
  
    await user.save();
  
    // Redirect to login page
    res.redirect('/login');
  });
  


app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})

module.exports = app;




