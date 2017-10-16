const mysql =require('mysql2');
const config=require('../config.json');

const dbconfig={
    host:config.DB.host,
    database:config.DB.database,
    user:config.DB.user,
    password:config.DB.password
};



exports.addtodo= function insertTodo(task,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `insert into todos(task,done) values (?,false);`,
        [task],
        (err) =>{
            if(err) throw err;
            cb();
        }
    )
};
exports.showtodo=function selectTodo(cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `select * from todos;`,
        (err,rows) =>{
            if(err) throw err;
            cb(rows);
        }
    )};

exports.deletetodo=function deleteTodo(id,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `delete from todos where id = ?;`,
        [id],
        (err) =>{
            if(err) throw err;
            cb();
        }
    )
};
exports.checktodo=function checkTodo(id,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `update todos set done=true where id = ? ;`,
        [id],
        (err) =>{
            if(err) throw err;
            cb();
        }
    )
};
exports.unchecktodo=function uncheckTodo(id,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `update todos set done=false where id = ? ;`,
        [id],
        (err) =>{
            if(err) throw err;
            cb();
        }
    )
};