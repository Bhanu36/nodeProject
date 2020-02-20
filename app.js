const express = require('express');
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose');


//import routes
const postRoute = require('./routes/get.routes')
const regRoute = require('./routes/registration.routes')


dotenv.config();
//connect to DBc
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true,useUnifiedTopology:true },
    () => {
        console.log("connected DB");
    })

//MiddleWare
app.use(express.json())




//route middlewares
app.use('/', regRoute)
// app.use('/api/user',  )
app.use('/api/posts',postRoute)

app.listen(3000, () => console.log('server up and running'))
