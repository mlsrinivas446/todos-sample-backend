const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const TodoSchema = require("./todoModel")
const app = express()
app.use(express.json())
app.use(cors({origin: "*"}))

const PORT = 5000

// establish DBAndServer

function initializeDbAndServer() {
    try {
        app.listen(PORT, () => {
            console.log(`server running at `, PORT)
        })
        mongoose.connect("mongodb+srv://mlsrinivas2233:kEV0uqSqJ1X4VBFQ@cluster0.iskje.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("mongoDB connected")
    }
    catch (error) {
        console.log(error)
    }
}

initializeDbAndServer()


app.post("/add-todo",async (req, res) => {
    try {
        const { text } = req.body 
        await TodoSchema.create({ text })
        return res.json("Todo added successfully" )
        
    }
    catch (error) {
        console.log(error)
    }
    
})

app.get("/get-todos", async (req, res) => {
    try {
        const todo=await TodoSchema.find({})
        return res.json({todo})
    }
    catch (error) {
        return res.sendStatus(500).json({message: "Error get todos"})
    }
})

app.put("/update-todo/:id", async (req, res) => {
    try {
        const { text } = req.body
        const { id } = req.params
        await TodoSchema.updateOne({_id: id}, {$set : {text}})
        return res.json("Todo updated successfully")
    }
    catch (error) {
        return res.sendStatus(500).json({message: "Error update todos"})
    }
})

app.delete("/delete-todo/:id", async (req, res) => {
    try {
        const {id} = req.params
        await TodoSchema.deleteOne({_id: id})
        return res.json("todo deleted successfully")
    }
    catch (error) {
        return res.sendStatus(500).json({message: "Error delete todos"})
    }
})