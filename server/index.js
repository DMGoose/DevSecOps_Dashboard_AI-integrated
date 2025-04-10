require("dotenv").config(); // 加载环境变量
const express = require('express');
const cors = require('cors')

const AIRoutes = require('./routes/AIRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", AIRoutes);

const server = app.listen(process.env.PORT, ()=> {
    console.log('Server started on port '+ process.env.PORT);
});

