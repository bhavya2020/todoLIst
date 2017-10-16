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
        `select max(id) i from todos;`,
        (err,rows)=>{
            if(err) throw err;
            let mi =rows[0].i;
            if(mi !=null) {
                conn.query(
                    `insert into todos values (?,?,false);`,
                    [mi+1, task],
                    (err) => {
                        if (err) throw err;
                        cb();
                    }
                )
            }else {
                conn.query(
                    `insert into todos values (1,?,false);`,
                    [task],
                    (err) => {
                        if (err) throw err;
                        cb();
                    }
                )

            }
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
        }
    );
    conn.query(
         `update todos set id=id-1 where id > ?;`,
        [id,id],
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