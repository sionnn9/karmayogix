import { Schema } from "mongoose";

const advinoSchema = new Schema({
    longitude: {
        type: Number,
    },
    latitude: {
        type: Number,
    },
    areaNAme:{
        type: String,
    },
    lane:{
        type: String,
    }
})

export default mongoose.model("Advino", advinoSchema);