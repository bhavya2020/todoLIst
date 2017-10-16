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
        `insert into todos(task,done) values ("?",false)`,
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
        `select * from todos`,
        (err,rows) =>{
            if(err) throw err;
            cb(rows);
        }
    )}
