const mongoose = require('mongoose');
const { create } = require('./User');

const todoSchema = new mongoose.Schema(
    {
        text :{ type: String, required: true },
        completed : { type: Boolean, default: false },
    },
)

const taskSchema = new mongoose.Schema({
    title : { type: String, required: true },
    description : { type: String, required: true },
    status : { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    dueDate : { type: Date, required: true },
    priority : { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    assignedTo :[{type: mongoose.Schema.Types.ObjectId, ref: 'user'}],
    createdBy : {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    attachments : [{ type: String }],
    todoChecklist : [todoSchema],
    progress : { type: Number, default: 0 },
},
{ timestamps: true }
)

module.exports = mongoose.model("Task" , taskSchema)