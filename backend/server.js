require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mainRouter = require('./routes/index');
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', mainRouter);


app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}...`)
})
