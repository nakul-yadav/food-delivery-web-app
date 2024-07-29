import  mongoose from "mongoose";




 export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://nakulyadav:Jaishreeram@cluster0.khlszvk.mongodb.net/resume').then(()=>console.log("db cionect"))
    
}









