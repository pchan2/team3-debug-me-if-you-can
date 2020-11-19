const express = require('express');
const app = express();
const PORT = process.env.PORT || 4002;

app.use(express.json());
app.use(express.urlencoded());

app.listen(PORT, _ => console.log(`server is listening on ${PORT}`));