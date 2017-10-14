const express =require('express'),
    path=require('path')
    ,app= express();
const mysql =require('mysql2');
const conn = mysql.createConnection({
    host: 'localhost',
    database: 'dbone',
    user: 'userone',
    password: 'Bb12345!'
});

function insertTodo(task,done) {
    conn.query(
        `insert into todos(task,done) values ("${task}",${done})`,
        (err) =>{
            if(err) throw err;
        }
    )
}
function selectTodo() {
    conn.query(
        `select * from todos`,
        (err,rows) =>{
            if(err) throw err;
            return rows;
        }
    )}


app.get('/',(req,res)=> res.send('Hello'));

app.get('/todos', (req,res)=> {res.sendFile(path.join(__dirname ,'index.html'))});

app.get('/addtodo', (req,res) =>{
   insertTodo(req.query.newtodo,false);
    res.redirect('/showtodos')
});


app.get('/showtodos',(req,res)=>{

    res.sendFile(path.join(__dirname ,'index.html'))});


app.listen(4444,()=>
    console.log('http://localhost:4444/'));