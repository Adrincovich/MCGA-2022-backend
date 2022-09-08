const mongoose = require("mongoose")  //requiere mongoose del package

const {Schema} = mongoose  //clase para crear esquema

const ProductScheme = new Schema({  //inicializamos productos
    id: {
        type: Schema.Types.ObjectId
    },
    name: {
        type: String,
        require: true,
        maxLength: 30
    },
    description: {
        type: String,
        maxLength: 100,
    },
    price: {
        type: Number,
        require: true,
        minLength: 1
    },
    stock: {
        type: Number,
        require: true,
        minLength: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("Products", ProductScheme) //por ultimo exportamos