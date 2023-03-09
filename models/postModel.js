const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var postsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    text:{
        type:String,
        required:true,
        unique:true,
    },
    tags:{
        type:Array,
        default:[]
    },
    viewsCount:{
        type:Number,
        default:0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
    ,
    imageUrl: {
        type: String
    },
}, {
    timestamps:true,
});

//Export the model
module.exports = mongoose.model("Posts", postsSchema);