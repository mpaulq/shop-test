require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const productRoutes = require('./api/routes/products');

app.use(express.static('public'));

app.use(express.json());

app.use('/scripts', express.static(`${__dirname}/node_modules`));

//Routes
app.use(productRoutes);

app.use((req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
})

app.listen(port, () => {
    console.log(`Server up on port ${port}`)
})