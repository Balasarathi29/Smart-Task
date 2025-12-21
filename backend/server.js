require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

{/* Middleware for CORS */}

app.use(
    cors({
        origin : process.env.CLIENT_URL || "*",
        methods : ["GET","PUT","POST","DELETE"],
        allowedHeaders : ["Content-Type","Authorization"]
    })
)
//database connection 

connectDB();

// Middleware

app.use(express.json());

//Routes
// app.use("/api/auth" , authRoutes);
// app.use("/api/task" , taskRoutes);
// app.use("/api/user" , userRoutes);
// app.use("/api/report" , reportRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})