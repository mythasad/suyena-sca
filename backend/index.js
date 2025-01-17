import express from 'express';
const PORT = 8268;

const app = express();

app.listen(PORT, ()=>{
    console.log(`Server is listening to the port ${PORT}`)
})

