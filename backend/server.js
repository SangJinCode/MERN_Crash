import express from 'express';
import dotenv from "dotenv"
import { connectDB} from './config/db.js';
import path from "path";

import productRoutes from "./routes/product.route.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//resolve() 함수를 이용해 현재 경로를 받아온다.
const __dirname = path.resolve();
console.log(__dirname)

app.use(express.json()); //allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
})