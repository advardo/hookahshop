require('dotenv').config()
const express = require('express');

const PORT = process.env.PORT;

const app = express();

app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})