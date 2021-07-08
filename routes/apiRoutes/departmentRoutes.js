const db = require('../../db/connection');

// View all departments
function viewAllDept() {
    db.query(`SELECT name FROM department`),
    function(err, res) {
        if (err) throw err;
        console.log(res);
    };
};

viewAllDept();