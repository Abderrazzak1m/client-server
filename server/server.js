const express = require('express')
const app = express()
const port = 8000

app.get('/', (req, res)=>{
    res.send("hi i m here")
})
app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})