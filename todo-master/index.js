const fs = require('fs');
const mysql = require('mysql2');
const conf = JSON.parse(fs.readFileSync('conf.json'));
const connection = mysql.createConnection(conf);

const executeQuery = (sql) => {
    return new Promise((resolve, reject) => {      
          connection.query(sql, function (err, result) {
             if (err) {
                console.error(err);
                reject();     
             }   
             console.log('done');
             resolve(result);         
       });
    })
 }

 const createTable = () => {
    return executeQuery(`
    CREATE TABLE IF NOT EXISTS todo
       ( id INT PRIMARY KEY AUTO_INCREMENT, 
          name VARCHAR(255) NOT NULL, 
          completed BOOLEAN ) 
       `);      
 }

 const insert = (todo) => {
    const template = `
    INSERT INTO todo (name, completed) VALUES ('$NAME', '$COMPLETED')
       `;
    let sql = template.replace("$NAME", todo.name);
    sql = sql.replace("$COMPLETED", todo.completed);
    return executeQuery(sql); 
 }

 const select = () => {
    const sql = `
    SELECT id, name, completed FROM todo 
       `;
    return executeQuery(sql); 
 }

 [
    { 
         id: 1, 
         name: 'studiare TPSI', 
         completed: 0 
  },
  { 
         id: 2, 
         name: 'ripassare Storia', 
         completed: 0 
  }
  ]

  createTable().then(() => {
    insert({name: "test " + new Date().getTime(), completed: false}).then((result) => {
       select().then(console.log);
    });
 });