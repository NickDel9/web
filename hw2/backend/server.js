const express = require('express')

var cors = require('cors');
const app = express()
app.use(cors());
app.use(express.json());

const db = require('./db_functions.js') // gain access to mongoDB database
const port = 3000

app.post('/register', async (req, res) => {
    //email validation
  await db.searchOnDatabase(req, res)
});

app.get('/getProfile:credits', async (req, res) => {
    // user's profile getter
  await db.getProfile(req ,res)
});

app.post('/profile', async (req, res) => {
    //user auth
  await db.checkLogIn(req, res)
});

// start server
app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`)
})