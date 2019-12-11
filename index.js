const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');


//import routes
const authRoute = require('./routes/auth')
const postRoute = require('./routes/post')
const data ="abcde"


dotenv.config();
//connect to DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true,useUnifiedTopology:true },
    () => {
        console.log("connected DB");
    })

//MiddleWare
app.use(express.json())




//route middlewares
app.use('/api/user', authRoute)
app.use('/api/posts',postRoute)

app.listen(3000, () => console.log('server up and running'))
