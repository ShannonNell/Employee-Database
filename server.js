const db = require('./db/connection');
const conTable = require('console.table');

const PORT = process.env.PORT || 3001;
console.log('Listening on port 3001.');

// viewAllDept();

//WORKING ALL DEPT returned as [] 
// // View all departments
// async function viewAllDept() {
//     const sql = `SELECT name FROM department;`;
//     return db
//         .promise()
//         .query(sql)
//         .then(([rows, fields]) => {
//             let depts = [];
//             rows.forEach(element => {
//                 depts.push(element.name)
//             });
//             console.log(depts);
//             return depts
//         })
//         .catch((err) => console.log(err));
// }

function viewAllDept() {
    db.query(`SELECT * FROM department;`, function(err, res) {
        if (err) throw err;
        console.table(res);
    })
}

viewAllDept();