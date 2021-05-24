require('dotenv').config()
const express = require('express');
const sequelize = require('./db')
const models = require('./models/models');
const cors = require('cors');
const router = require('./routes/index');
const ErrorHandler = require('./middleware/ErrorHandlingMiddleware');

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);


app.use(ErrorHandler);


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, ()=>{
        console.log(`Server started at port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}



start();