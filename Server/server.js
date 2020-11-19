const express = require('express');
const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());                    // body parser
app.use(express.urlencoded());         // HTML forms parser

app.listen(PORT, _ => console.log(`server is listening on ${PORT}`));