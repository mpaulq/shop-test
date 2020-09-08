const express = require("express");
let mysql = require("mysql");
const router = express.Router();
const pool = require("../modules/database");

router.get("/", (req, res) => {
  let { name, category, sort, order, discount, limit, offset } = req.query;
  const discountCondition = discount? 0: -1;
  let sql = 'SELECT * FROM product WHERE discount > ?';
  let arguments = [discountCondition];
  if(name) {
    sql += ' AND name LIKE ?';
    arguments.push('%'+name+'%');
  }
  if(category) {
    sql += ' AND category = ?';
    arguments.push(Number(category))
  }
  if(sort) {
    if(!order){
      order = 'ASC';
    }
    sql += ` ORDER BY ${sort} ${order}`;
  } else {
    sql += ' ORDER BY category ASC';
  }
  if(limit) {
    if(!offset) {
      offset = '0';
    }
    sql += ' LIMIT ?, ?';
    arguments.push(Number(offset), Number(limit));
  }
  sql = mysql.format(sql, arguments);

  pool.getConnection((err, connection) => {
    if (err) {
      res.status(500).json({
        error: err
      });
    }
    connection.query(
     sql, (err, rows, fields) => {
        connection.release();
        if (err) {
          res.status(500).json({
            error: err
          });
        }
        res.status(200).json({
          searchField: name,
          sort: sort,
          order: order,
          discount: discount,
          limit: limit,
          offset: offset,
          products: rows,
        })
      }
    );
  });
});

module.exports = router;
