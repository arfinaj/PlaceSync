import mongoose from "mongoose";

const interviewSchema= new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Job",
        required:true,
    },
    title:{
        type:String,
        required:true,
        trim:true,

    },
    recruiter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    company:{
        type:String,
        required:true,
        trim:true,
    },
    date:{
        type:Date,
        required:true,
    },
    mode:{
        type:String,
        required:true,
        enum:["Online","Offline"],
    },
    meetingLink:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        enum:["Scheduled",
        "Completed",
        "Cancelled",
        "Selected",
        "Rejected",],
        default:"Scheduled",
    },
    notes:{
        type:String,
        trim:true,
    },
    
},{
        timestamps: true
    }
)

const Interview=mongoose.model("Interview", interviewSchema)
export default Interview;