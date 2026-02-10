import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongo.config.js";
import shortUrlRoutes from "./routes/shortUrl.routes.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB()
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.log(error);
}); 

app.use("/api",shortUrlRoutes);

app.get("/",(req,res) => {
    res.send("Hello World!");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
}); 

