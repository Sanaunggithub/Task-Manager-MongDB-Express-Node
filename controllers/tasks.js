const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')
const getAllTasks = asyncWrapper ( async(req, res) => {
        // find({}) returns all documents in the collection
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    }
)

const createTask = asyncWrapper (async (req, res) => {
        // req.body is what the user sends in the request body
        const task = await Task.create(req.body)
        res.status(201).json({task})

})

const getTask = asyncWrapper (async (req, res, next) => {
    
        const{id:taskID} = req.params // req.params is object. req.params.id is string
        const task = await Task.findOne({ _id :taskID }) // if don't find return null
        // Because in MongoDB:
        // {
        // "_id": "66aabc1234567890...",
        // "name": "Do laundry",
        // "completed": false
        // }

        if(!task){
            return next(createCustomError(`No task with id: ${taskID}`, 404))
        }
        res.status(200).json({task})
    }
)


const deleteTask = asyncWrapper (async (req, res) => {
    
        const{id:taskID} = req.params   
        const task = await Task.findOneAndDelete({_id: taskID})
        
        if(!task){
            return res.status(404).json({msg: `No task with id: ${taskID}`})
        }
        
        res.status(200).json({task})
    }
)

// Patch method
const updateTask = asyncWrapper (async(req, res) => {
    
        const {id:taskID} = req.params
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body,{
            new:true, // By default, findOneAndUpdate() returns the old version of the document before the update.
            runValidators: true, // By default, Mongoose does not validate the data when you use findOneAndUpdate().
        }) 

        if(!task){
            return res.status(404).json({msg: `No task with id: ${taskID}`})
        }

        res.status(200).json({task})
    }
)

// // Put method
// const editTask = async(req, res) => {
//     try {
//         const {id:taskID} = req.params
//         const task = await Task.findOneAndUpdate({_id: taskID}, req.body,{
//             new:true, 
//             runValidators: true, 
//             overwrite: true
//         }) 

//         if(!task){
//             return res.status(404).json({msg: `No task with id: ${taskID}`})
//         }

//         res.status(200).json({task})
//     }
//     catch(error) {
//         res.status(500).json({msg:error.message})
//     }
// }

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};
