import mongoose from "mongoose"

//creating string
let BASE_URL = "mongodb://localhost:27017/sample-db-2026"

let connectToDb = async ()  =>{
    try {
        let conn = await mongoose.connect(BASE_URL)
        console.log(`Connect To : ${conn.connection.name}`)
        
    } catch (error) {
        console.log(error)
    }
}

export default connectToDb