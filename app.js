//     const http = require('http')
//    const fs = require("fs")
//     const port = 8080

//     function onRequest(request, response){
//         response.writeHead(200, {"Content-type": "text/html"})
//         fs.readFile("./index.html", null, function(error, data){
//             if(error){
//                 response.writeHead(404);
//                 response.write("file not found boi")
//             } else {
//                 response.write(data)
//             }
//             response.end()
//         })
        
//     }

//     const server = http.createServer(onRequest)



//     server.listen(port)


const express = require("express")
const app = express()
const path = require("path")

app.use(express.static("../stock-market-ai"))

app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./index.html"))
})

app.all("*",(req,res)=>{
    res.status(404).send("couldnt find resource")
})

app.listen(8080,() => {
    console.log("server is listening on 8080")
})

