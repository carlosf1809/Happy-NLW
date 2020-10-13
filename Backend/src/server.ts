import express from 'express';

const app = express();

app.get('/users', (request, response)=>{
    return response.json({message: "Hello Word"})
})

app.listen(3333, ()=>{
    console.log("🚀 server started on port 3333 ")
});

