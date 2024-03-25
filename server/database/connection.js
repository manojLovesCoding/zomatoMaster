
const mongoose = require('mongoose');

export default async () => {

    return await mongoose.connect("mongodb+srv://Amith:Amit1234@shapeai.0cckre4.mongodb.net/zomato?retryWrites=true&w=majority&appName=shapeAI");
}