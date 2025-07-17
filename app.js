// don't ever use & in the folder.

const express = require('express') 
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
require('dotenv').config() // Load environment variables from .env file


// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes
app.use('/api/v1/tasks', tasks)

// middleware
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async() => {
    try{
        await connectDB(process.env.MONGO_URI) // Use the MONGO_URI from .env file
        app.listen(port, console.log(`server is listening on ${port}`))
    }
    catch(error){
        console.error(error)
    }
}

start()
