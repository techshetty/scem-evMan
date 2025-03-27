const express =require('express')
const cors=require('cors')
require('dotenv').config()
const app=express();
const port=process.env.PORT|8080;
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{
return res.send("soscEvm api is running....");
})

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})

//compiler routes

app.post('/compile',async(req,res)=>{
    const {lang,ver,inp,code}=req.body;
    const rs=await fetch(process.env.cmpAPI,{
        method: "POST",
        body: JSON.stringify({
            "language": lang,
            "version": ver,
        "files": [
            {
                "name": "main",
                "content": code
            }
        ],
        "stdin": inp
        })
    })
    const rj=await rs.json();
    if(rj.stderr) return res.status(500).json({Compilation: "failed",Error: rj.stderr})
    return res.status(200).json({compilation : "success",stdout: rj.run.stdout})
})