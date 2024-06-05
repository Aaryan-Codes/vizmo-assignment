require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const connectDB = require('./Utils/DB');
const userRoutes = require('./Routes/userRoutes');
const postRoutes = require('./Routes/postRoutes');


app.get('/',(req,res)=>{
    res.send("Hello from the server side!!!");
})

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

// Routes
app.use('/api/users',userRoutes);
app.use('/api/blogs/',postRoutes);

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running @ ${PORT}`);
    })
})
