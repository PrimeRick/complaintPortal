const express = require("express");
const cors = require("cors");
const mainRouter = require('./routes/index');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/v1', mainRouter);

app.listen(PORT,()=>{
    console.log(`app listening on port ${PORT}`)
})