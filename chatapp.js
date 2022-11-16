const http=require('http');
const fs=require('fs');
const server=http.createServer((req,res)=> {
    const url=req.url;
    const method=req.method;
    if(url==='/'){
        //const filepath=path.join(_dirname,'message.txt');
        fs.readFile('message.txt',{encoding:'utf-8'},(err,data)=>{
            if(err){
            console.log(err);
            res.write('<html>');
            }
        res.write('<head><title>Enter Message</title></head>');
        res.write(`<body>${data}</body>`);
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button>Send</button></form></body>');
        res.write('</html>');
         return res.end();
        })
    }
    else if(url==='/message' && method==='POST'){
        const body=[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            body.push(chunk);
        })
        return req.on('end',()=>{
            const parseBody=Buffer.concat(body).toString();
            //console.log(parseBody);
            const message=parseBody.split('=')[1];
            console.log(message);
            fs.writeFile('message.txt',message,(err)=>{
               res.statusCode=302;
               res.setHeader('Location','/');
               return res.end();               
            })
        })
    }
    else{
     res.setHeader('Content-Type','text/html');
     res.write('<html>');
     res.write('<head><title>My Server Page</title></head>');
     res.write('<body><h1>Hello From Node js</h1></body>')
    }
})
server.listen(3000);