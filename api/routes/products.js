const express = require("express");
const router = express.Router();
const pool = require("../modules/database");

router.get("/products", (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    connection.query(
      `SELECT product.id, product.name AS product_name, product.url_image, product.price,
            product.discount, category.id AS category_id, category.name AS category_name FROM product
            JOIN category ON product.category = category.id ORDER BY category.id`,
      (err, rows) => {
        connection.release();
        if (!err) {
          res.json(rows);
        } else {
          res.json({
            error: err,
          });
        }
      }
    );
  });
});

router.post("/searchproducts", (req, res) => {
  const { searchField } = req.body;
  pool.getConnection((err, connection) => {
    if (err) {
      res.json({
        error: err,
      });
    }
    connection.query(
      `SELECT product.id, product.name AS product_name, product.url_image, product.price,
            product.discount, category.id AS category_id, category.name AS category_name FROM product
            JOIN category ON product.category = category.id AND product.name
            LIKE ${connection.escape("%" + searchField + "%")} ORDER BY category.id`,
      (err, rows) => {
        connection.release();
        if (!err) {
          res.json(rows);
        } else {
          res.json({
            error: err,
          });
        }
      }
    );
  });
});

module.exports = router;
