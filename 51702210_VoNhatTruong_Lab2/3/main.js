const http = require('http');
const URL = require('url');
const queryString = require('querystring');
const fs = require('fs');

let students;
fs.readFile('data.json', (err, data) => {
    if (err) throw err;
    students = JSON.parse(data);
});
const server = http.createServer((req,res) =>{
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    const url = URL.parse(req.url);
    if(url.pathname === '/students'){
        let query = queryString.decode(url.query);
        if(req.method === 'POST'){
            let body;
            req.on('data', data =>  body = data.toString('utf8'));
            req.on('end', () => {
                let input = queryString.decode(body)
                let new_student = {
                    "id": input.id,
                    "name": input.name
                }
                students.push(new_student)
                res.end(JSON.stringify(new_student))
            })
        }
        else if(req.method === 'DELETE'){
            let indexOfStudent = students.findIndex(student => student.id === query.id);
            if(indexOfStudent > -1){
                students.splice(indexOfStudent, 1);
                res.end(JSON.stringify('Da Xoa'))
            }else{
                res.end(JSON.stringify('Khong tim thay student'))
            }
        }
        else if(req.method === 'PUT'){
            let indexOfStudent = students.findIndex(student => student.id === query.id);
            if(indexOfStudent > -1){
                let body;
                req.on('data', data =>  body = data.toString('utf8'));
                req.on('end', () => {
                    let input = queryString.decode(body)
                    students[indexOfStudent] = {
                        "id": input.id,
                        "name": input.name
                    }
                })
                res.end(JSON.stringify('Da Cap Nhat'))
            }else{
                res.end(JSON.stringify('Khong tim thay student'))
            }
        }
        else{
            query.id ? res.end(JSON.stringify(students.find(student => student.id === query.id))) : res.end(JSON.stringify(students))
        }
    }else{
        res.end(JSON.stringify('NOT FOUND'))
    }
})


server.listen(8080,() =>{
    console.log('server running at localhost:8080')
})