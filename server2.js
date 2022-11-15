const http=require('http');
const server=http.createServer((req,res)=>{
    console.log(req.url,req.methods,req.headers);
    res.setHeader('Content','text/html');
    res.write('<html>')
    res.write('<head><title>My First Page</title></head>')
    if(req.url=='/home'){
        res.write('<body><h1>Welcome to my Home</h1></body>')
    }else if(req.url=='/about'){
        res.write('<body><h1>Welcome to About us Page</h1></body>')
    }else
    res.write('<body><h1>Welcome to my Node js Project</h1></body>')
    res.write('</html>')
    res.end()
    })
      server.listen(3000);