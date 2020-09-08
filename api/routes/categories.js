const express = require("express");
const router = express.Router();
const pool = require("../modules/database");

router.get('/', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) {
            res.status(500).json({
                error: err
            });
        }
        connection.query(`SELECT * FROM category ORDER BY id`, (err, rows) => {
            if(err) {
                res.status(500).json({
                    error: err
                });
            }
            res.status(200).json({
                categories: rows
            });
        });
    });
});

module.exports = router;