const express = require('express')
const dbJson = require("./items-db.json")
const app = express()
const port = 8000
app.use("/images", express.static("public"))
//middlwer

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    next();
})

app.get('/list', (req, res)=>{
    console.log("GET" + (new Date((Date.now())).toISOString()))
    res.send(dbJson)
})
app.post('/bid', (req, res)=>{
    console.log("POST" + (new Date((Date.now())).toISOString()))
    
    const id = req.query.id
    console.log("id = " +id)
    
    const newBid = req.query.newbid
    console.log("newbid = " +newBid)

    const newBiduser = req.query.newbiduser
    console.log("newBiduser = " +newBiduser)

    if (newBid === undefined || newBid == "undefined" || newBid == "null") {
        console.log("new bid is missing");
        res.status(400).send("new bid is missing");
        return;     
    }

    if (newBidUser === undefined || newBidUser == "undefined" || newBidUser == "null") {
        console.log("new bid user is missing");
        res.status(400).send("new bid user is missing");
        return;
    }

    const match = dbJson.find(item => item.id == id);

    if (match == undefined)  {
        console.log("invalid or missing item ID");
        res.status(400).send("invalid or missing item ID");
        return;
    }

    if (match.lastBid >= newBid) {
        console.log("Bid is not high enough");
        res.status(400).send("Bid is not high enough");
        return;
    }

    match.lastBid = newBid;
    match.lastBidUser = newBidUser;
    res.send("ok")
})
app.listen(port, ()=>{
    setInterval(virtualBid, 5000)
    console.log(`http://localhost:${port}`)
})

function virtualBid(){
    dbJson.forEach((item)=>{
        const increase = Math.random()*2;
        item.lastBid *= Number(1.0 + (increase/100))
        item.lastBidUser = "anonymous"
    })
}