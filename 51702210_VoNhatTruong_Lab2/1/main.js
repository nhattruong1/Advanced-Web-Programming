const http = require('http');
const URL = require('url');
const queryString = require('querystring');

const server = http.createServer((req,res) =>{
    res.writeHead(200, {
        'Content-Type': 'text/html'
    })
    const url = URL.parse(req.url);
    if(url.pathname === '/'){
        res.end(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="/result" method="GET">
        <table>
            <tr>
                <td>So hang 1:</td>
                <td>
                    <input type="number" name="a" required>
                </td>
            </tr>
            <tr>
                <td>So hang 2:</td>
                <td>
                    <input type="number" name="b" required>
                </td>
            </tr>
            <tr>
                <td>Phep tinh:</td>
                <td>
                    <select name="method" required>
                        <option value="0" selected disabled>Chon phep tinh</option>
                        <option value="1">phep cong</option>
                        <option value="2">phep tru</option>
                        <option value="3">phep nhan</option>
                        <option value="4">phep chia</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td><input type="submit"></td>
            </tr>
        </table>
    </form>
</body>
</html>
        `);
    }
    else if(url.pathname === '/result'){
        let query = queryString.decode(url.query);
        if(!query.a){
            res.end("A null")
        }
        if(!query.b){
            res.end("b null")
        }
        if(!query.method){
            res.end("choose method")
        }else{
            if(query.method === '1'){
                res.end(query.a + '+' + query.b + '=' + (parseInt(query.a) + parseInt(query.b)))
            }
            if(query.method === '2'){
                res.end(query.a + '-' + query.b + '=' + (parseInt(query.a) - parseInt(query.b)))
            }
            if(query.method === '3'){
                res.end(query.a + '*' + query.b + '=' + (parseInt(query.a) * parseInt(query.b)))
            }
            if(query.method === '4'){
                res.end(query.a + '/' + query.b + '=' + (parseInt(query.a) / parseInt(query.b)))
            }
        }
    }else{
        res.end('NOT FOUND')
    }
})


server.listen(8080,() =>{
    console.log('server running at localhost:8080')
})