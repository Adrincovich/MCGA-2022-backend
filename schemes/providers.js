const mongoose = require('mongoose');

const { Schema } = mongoose;

const ProvidersSchemas = new Schema({
    id:{
        type: Schema.Types.ObjectId
    },
    name:{
        type: String,
        required: true,
        maxlenght: 30
    },
    email:{
        type: String,
        maxlenght: 50,
    },
    dir:{
        type: String,
        maxlenght: 50,
    },
    tel:{
        type: String,
        required: true,
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("providers", ProvidersSchemas);