const express = require("express");
const mysql = require("mysql");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}))
const db = mysql.createPool({
    host:'remotemysql.com',
    user:'gEda8W9xpc',
    password:'HnCwPadNf4',
    database:'gEda8W9xpc'
})
app.listen(3001,()=>{
    console.log("running server")
})

app.get("/all-activities",(req,res)=>{
    const sqlSelect = "select * from activity_stream"
    db.query(sqlSelect,(err,result)=>{
        res.json(result);
    })
})
app.get("/messages/:username",(req,res)=>{
    const sqlSelect = "select * from messages where username = ?"
    db.query(sqlSelect,[req.params.username],(err,result)=>{
        res.json(result);
    })
})
app.delete("/messages/delete/:msgID",(req,res)=>{
    const sqlDelete = "Delete from messages where msgID = ?"
    db.query(sqlDelete,[req.params.msgID],(err,result)=>{
        res.json(result);
    })
})
app.post("/messages/add",(req,res)=>{
    const sqlinsert = "INSERT  into messages (username,message) values (?,?)"
    db.query(sqlinsert,[req.body.username,req.body.message],(err,result)=>{
        res.json(result);
    })
})
app.put("/messages/update",(req,res)=>{
    const sqlinsert = "update messages set message = ?  where msgID = ?"
    db.query(sqlinsert,[req.body.msg,req.body.msgID],(err,result)=>{
        res.json(result);
    })
})
app.get("/usercheck/:username/:password",(req,res)=>{
    const sqlselect = "select userID from userdata where username= ? and pass =? "
    db.query(sqlselect,[req.params.username,req.params.password],(err,result)=>{
        res.json(result);
    })
})
app.post("/usercheck",(req,res)=>{
    const sqlselect = "insert into userdata (username,pass)  values (?,?)"
    db.query(sqlselect,[req.body.username,req.body.pass],(err,result)=>{
        res.json(result);
    })
})