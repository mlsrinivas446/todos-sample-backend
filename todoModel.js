const mongoose = require("mongoose")

const TodoSchema = mongoose.Schema({
    text: {type: String, required: true}
})


module.exports = mongoose.model("TodoSchema", TodoSchema)