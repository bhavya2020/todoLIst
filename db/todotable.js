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
function selectTodo(cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `select * from todos order by id;`,
        (err,rows) =>{
            if(err) throw err;
            cb(rows);
        }
    )};

function deleteTodo(id,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `delete from todos where id = ?;`,
        [id],
        (err) =>{
            if(err) throw err;
            conn.query(
                `update todos set id=id-1 where id > ?;`,
                [id],
                (err) =>{
                    if(err) throw err;
                    cb();
                }
            )
        }
    );

}
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
exports.delete=function delet(cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `select id from todos  where done=true;`,
        (err,rows) =>{
            if(err) throw err;
            for(let x of rows)
            {

               if(x===rows[rows.length-1]) {
                   console.log(x.id);
                   deleteTodo(x.id, cb);

               }
                deleteTodo(x.id,()=>{})
            }
        }
    )
};
exports.up=function up(id,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `update todos set id=0 where id = ?;`,
        [id-1],
        (err) => { if(err)
            throw err;
           }
    );

    conn.query(
        `update todos set id=id-1 where id = ?;`,
        [id],
        (err) => { if(err)
            throw err;
            }
    );
    conn.query(
        `update todos set id=? where id = 0;`,
        [id],
        (err) => { if(err)
            throw err;
            cb();
        }
    );

};

exports.down=function down(id,cb) {
    const conn = mysql.createConnection(dbconfig);
    conn.query(
        `update todos set id=0 where id = ?;`,
        [parseInt(id)+1],
        (err) => { if(err)
            throw err;
        }
    );

    conn.query(
        `update todos set id=id+1 where id = ?;`,
        [id],
        (err) => { if(err)
            throw err;
        }
    );
    conn.query(
        `update todos set id=? where id = 0;`,
        [id],
        (err) => { if(err)
            throw err;
            cb();
        }
    );

};
exports.deletetodo=deleteTodo;
exports.showtodo=selectTodo;