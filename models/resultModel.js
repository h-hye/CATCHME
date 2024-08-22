const mongoose = require("mongoose");
const resultSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        result:{
            type:String,
            required:true        
        }
    },
    {
        timestamps:true
    }
);

//스키마 -> 모델
const Result = mongoose.model("Result",resultSchema);
module.exports = Result;