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
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
        </head>
        </head>
        <body>
            <form action="/login" style="width: 40%;margin: 50px auto;" method="POST">
                <h1>Login Form</h1>
                <div class="form-group">
                <label for="email">Email address:</label>
                <input type="email" class="form-control" placeholder="Enter email" name="email" required>
                </div>
                <div class="form-group">
                <label for="pwd">Password:</label>
                <input type="password" class="form-control" placeholder="Enter password" name="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </body>
        </html>
        `)
    }
    else if(url.pathname === '/login'){
        let email = "vonhattruong@gmail.com";
        let password = 'vonhattruong';
        if(req.method !== 'POST'){
            res.end('Khong ho tro GET')
        }
        let body;
        req.on('data', data =>  body = data.toString('utf8'));
        req.on('end', () => {
            let input = queryString.decode(body)
            if(input.email === email && input.password === password){
                res.end('login success')
            }else{
                res.end('login fail')
            }
        })
    }else{
        res.end('Page not found')
    }
})


server.listen(8080,() =>{
    console.log('server running at localhost:8080')
})